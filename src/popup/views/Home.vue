<template>
  <div>
    <header class="header-home">
      <div class="logo">
        <img src="../../assets/svg/logo.svg" />
        <div class="home-title">
          <span>MULLVAD</span>
          <span>Privacy companion</span>
        </div>
      </div>
      <!-- Link to settings view
      <img src="../../assets/svg/settings.svg" style="visibility: hidden" /> -->
    </header>

    <div>
      <section class="connection">
        <div v-if="checking" class="checking container">
          <div>
            <img src="../../assets/svg/spinner.svg" />
            <p>Checking connection</p>
          </div>

          <div v-if="socksEnabled" class="socks-error">
            <p>
              The connection is set to use the proxy. <br />
              If you can't load any page, disconnect the proxy to connect to the internet directly.
            </p>
            <Button @button-click="socksReset" color="red">Disconnect proxy</Button>
          </div>
        </div>

        <div v-else-if="connection.ip" class="container">
          <div v-if="connection.city || connection.country" class="location">
            <h2>
              <span v-if="connection.city">
                {{ connection.city }}
              </span>
              <span v-if="connection.country">, {{ connection.country }} </span>
            </h2>

            <div v-if="connection.isMullvad" class="mullvad-status">
              <img src="../../assets/svg/lock.svg" />
              <p>
                Mullvad <span v-if="connection.protocol">({{ connection.protocol }})</span>
              </p>
            </div>
          </div>
          <div v-else class="container">
            <h2>Unknown</h2>
          </div>

          <div v-if="showConnDetails" class="conn-details">
            <p v-if="connection.ip">IP: {{ connection.ip }}</p>
            <p v-if="connection.provider">Provider: {{ connection.provider }}</p>
            <!-- <p>DNS server: coming soon</p> -->
            <p v-if="connection.server">Server: {{ connection.server }}</p>

            <section v-if="connection.isMullvad" class="proxy">
              <div v-if="connection.isMullvad">
                <div v-if="incognitoAllowed" class="proxy-controls">
                  <split-button v-if="connection.protocol.includes('WireGuard')" size="big">
                    <template v-slot:left-button>
                      <Button
                        v-if="connection.protocol.includes('SOCKS')"
                        @button-click="socksDisconnect"
                        split="left"
                        color="red"
                      >
                        Disconnect proxy
                      </Button>
                      <Button v-else @button-click="socksConnect" split="left" color="green">
                        Connect proxy
                      </Button>
                    </template>

                    <template v-slot:right-button>
                      <Button split="right" color="blue" title="Switch proxy location">
                        <router-link to="/location">
                          <img src="../../assets/svg/location.svg" />
                        </router-link>
                      </Button>
                    </template>
                  </split-button>

                  <Button v-else-if="!socksEnabled" @button-click="socksConnect" color="green">
                    Connect proxy
                  </Button>
                  <Button v-else @button-click="socksDisconnect" color="red">
                    Disconnect proxy
                  </Button>
                </div>

                <div v-else>
                  Allow <em>Run in Private Windows</em> in the extension settings to use the proxy.
                </div>
              </div>

              <!-- To show provy even if not Mullvad
              <p v-else>
                To connect through the proxy, an active Mullvad VPN connection is required.
              </p> -->
            </section>
          </div>

          <div @click="toggleDetails" id="show-details" :class="showClass">
            <p v-if="showConnDetails">Show less</p>
            <p v-else>Advanced</p>
          </div>
        </div>

        <div v-else class="container">
          <h2>No connection detected</h2>
        </div>
      </section>

      <section>
        <div v-if="recommendedExtensions.length > 0">
          <div v-for="ext in recommendedExtensions" :key="ext.id">
            <recommendation
              :name="ext.name"
              :description="ext.description"
              :cta="ext.installed ? 'enable' : 'install'"
            />
          </div>
        </div>
      </section>

      <section class="sub-section">
        <router-link to="/privacy-extensions" v-slot="{ navigate }" custom>
          <div @click="navigate" role="link" class="container">
            <h3>Privacy extensions</h3>
            <div>
              <img v-if="!recommendedExtensions.length == 0" src="../../assets/svg/warning.svg" />
              <img src="../../assets/svg/chevron-right.svg" />
            </div>
          </div>
        </router-link>
      </section>

      <section class="sub-section">
        <router-link to="/privacy-settings" v-slot="{ navigate }" custom>
          <div @click="navigate" role="link" class="container">
            <h3>Privacy settings</h3>
            <div>
              <img src="../../assets/svg/chevron-right.svg" />
            </div>
          </div>
        </router-link>
      </section>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

import { connCheck, setWebRTC } from '@/helpers';
import { getSocksConfig, setSocks, SocksConfig } from '@/helpers/socks';
import { localStorage } from '@/helpers/localStorage';
import { Connection } from '@/helpers/connCheck';
import { Extension } from '@/helpers/extensions';

import Recommendation from '../components/Recommendation.vue';
import SplitButton from '../components/SplitButton.vue';
import Button from '../components/Button.vue';

export default Vue.extend({
  components: {
    Recommendation,
    SplitButton,
    Button,
  },
  data() {
    return {
      checking: true,
      showConnDetails: false,
      incognitoAllowed: false,
      socksEnabled: false,
      socksConfig: {} as SocksConfig,
      connection: {
        city: '',
        country: '',
        ip: '',
        server: '',
        protocol: '',
        provider: '',
        isMullvad: false,
      } as Connection,
      recommendedExtensions: [] as Extension[],
    };
  },
  computed: {
    showClass(): string {
      return this.showConnDetails ? 'show-less' : 'show-more';
    },
  },
  methods: {
    async toggleDetails(): Promise<void> {
      const updated = !this.showConnDetails;

      this.showConnDetails = updated;
      await localStorage.showConnDetails.set(updated);
    },
    toggleWebrtc(checked: boolean): void {
      setWebRTC(checked);
    },
    async socksConnect(): Promise<void> {
      const socksConfig = { ...this.socksConfig };

      setSocks(true, socksConfig);
      await localStorage.socksEnabled.set(true);

      this.socksEnabled = true;
      await this.updateConnection();
    },
    async socksDisconnect(): Promise<void> {
      setSocks(false);
      await localStorage.socksEnabled.set(false);

      this.socksEnabled = false;
      await this.updateConnection();
    },
    async socksReset(): Promise<void> {
      setSocks(false);
      await localStorage.socksEnabled.set(false);
      this.socksEnabled = false;

      // Delete sock config (in case connection protocol has changed)
      await localStorage.socksConfig.remove();

      await this.updateConnection();
    },
    async updateConnection(): Promise<void> {
      const connection = await connCheck();

      this.connection = connection;
    },
  },
  async created(): Promise<void> {
    try {
      const extensions = await localStorage.extensions.get();
      const recommendedExtensions = extensions
        .filter((ext) => ext.ignored === false)
        .filter((ext) => ext.enabled === false || ext.installed === false);

      this.recommendedExtensions = recommendedExtensions;
      this.showConnDetails = await localStorage.showConnDetails.get();
      this.incognitoAllowed = await browser.extension.isAllowedIncognitoAccess();
    } catch (error) {
      console.log(error);
    }

    // Get settings for connection and do a ConnCheck
    try {
      const socksConfig = await localStorage.socksConfig.get();
      const socksEnabled = await localStorage.socksEnabled.get();

      this.socksEnabled = socksEnabled;

      // ConnCheck on popup start
      const connection = await connCheck();

      // Set connection to storage for reuse in Location (Maybe not needed?)
      localStorage.connection.set(connection);
      this.connection = connection;

      if (socksEnabled) {
        this.socksEnabled = socksEnabled;
      }

      // Connected to Mullvad
      if (connection.protocol) {
        // If no socksConfig in storage
        if (!socksConfig) {
          // Generate default config and save it to storage
          const defaultConfig = getSocksConfig(connection.protocol);
          localStorage.socksConfig.set(defaultConfig);
          this.socksConfig = defaultConfig;
        }

        // If socks is already connected
        if (socksConfig && socksEnabled) {
          this.socksConfig = socksConfig;
          this.socksEnabled = true;
        }

        // If socks is present, but not enabled
        if (socksConfig && !socksEnabled) {
          this.socksConfig = socksConfig;
        }
      }

      // Not connected to Mullvad, and socks present
      if (!connection.isMullvad && socksConfig) {
        this.socksConfig = socksConfig;
      }

      this.checking = false;
    } catch (error) {
      this.checking = false;
    }
  },
});
</script>

<style lang="scss">
@import '../../assets/scss/base';
@import '../../assets/scss/buttons';

////////////
/* HEADER */
////////////

.header-home {
  @extend .header;
}

.home-title {
  display: flex;
  flex-flow: column;

  span {
    font-size: 1.2rem !important;
    line-height: 20px;

    &:last-child {
      font-weight: 400;
    }
  }
}

.logo {
  display: flex;
  align-items: center;

  img {
    height: 2.5rem;
  }

  span {
    font-family: $header;
    font-weight: 700;
    font-size: 1.4rem;
    margin-left: 0.5rem;
  }
}

////////////////
/* CONNECTION */
////////////////

.connection {
  @extend .light-text;

  h2 {
    font-size: 1.2rem;
    color: $white;
  }
}

.checking {
  margin: 0.2rem 0;

  div:first-child {
    display: inline-flex;
    align-items: center;

    p {
      font-size: 1.2rem;
      font-family: $header;
      color: $white;
    }

    img {
      height: 1.3rem;
      margin-right: 0.5rem;
    }
  }

  .socks-error {
    margin: 0.3rem 0 0.6rem 0;
  }
}

.location {
  display: flex;
  flex-direction: column;

  :first-child {
    display: inline-flex;
  }
}

.mullvad-status {
  display: inline-flex;
  height: 1rem;
  margin-bottom: 0.6rem;

  img {
    margin-right: 0.2rem;
  }
}

.conn-details {
  margin-bottom: 0.3rem;
}

#show-details {
  &:hover {
    cursor: pointer;
  }
}

.show-more {
  ::after {
    content: url('../../assets/svg/chevron-down.svg');
    top: 4px;
    left: 4px;
  }

  p:hover {
    color: $white !important;
  }
}

.show-less {
  ::after {
    content: url('../../assets/svg/chevron-up.svg');
    top: 4px;
    left: 4px;
  }

  p:hover {
    color: $white !important;
  }
}

///////////
/* PROXY */
///////////

.proxy {
  margin: 0.5em 0;
}

.proxy-controls {
  display: flex;
  flex-direction: column;
  align-items: center;
}

//////////////
/* SUB-MENU */
//////////////

.sub-section {
  background-color: $blue;
  border-bottom: 1px solid $dark-blue;
  cursor: pointer;

  &:hover {
    background-color: $blue80;
  }

  .container {
    display: flex;
    justify-content: space-between;
    align-items: center;

    img {
      height: 1.2rem;
    }
  }
}
</style>
