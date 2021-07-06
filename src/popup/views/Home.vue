<template>
  <div>
    <div class="status">
      <h2 :class="statusIcon">{{ title }}</h2>

      <div v-if="!checking">
        <p v-if="location">{{ location }}</p>
        <p v-if="connection.ip"><b>IP:</b> {{ connection.ip }}</p>
        <p v-if="connection.provider"><b>Provider:</b> {{ connection.provider }}</p>
        <p v-if="connection.server"><b>Server:</b> {{ connection.server }}</p>
      </div>
    </div>

    <hr />

    <div class="settings">
      <div>
        <h3>Settings</h3>
      </div>

      <div class="switch-container">
        <p>Disable WebRTC</p>
        <label class="switch">
          <input
            type="checkbox"
            v-model="webrtcDisabled"
            @change="toggleWebrtc($event.target.checked)"
          />
          <span class="slider round"></span>
        </label>
      </div>
    </div>

    <hr />

    <div class="socks-proxy">
      <h3>Socks Proxy</h3>
      <div v-if="connection.isMullvad">
        <div v-if="incognitoAllowed">
          <router-link
            v-if="connection.protocol == 'WireGuard' || 'SOCKS through WireGuard'"
            to="/location"
            v-slot="{ navigate }"
            custom
          >
            <button @click="navigate" @keypress.enter="navigate" role="link">
              Switch location
            </button>
          </router-link>
          <button v-if="!socksEnabled" @click="socksConnect">Connect through socks</button>
          <button v-else @click="socksDisconnect">Disconnect socks</button>
        </div>

        <div v-else>
          Allow <em>Run in Private Windows</em> (in the extension settings) to use socks proxy.
        </div>
      </div>

      <div v-else>
        <template v-if="socksEnabled">
          <p>
            You have a socks connection activated. <br />
            If you can't access internet, disable socks to access internet directly.
          </p>
          <button @click="socksDisable">Disable socks</button>
        </template>

        <p v-else>To connect through socks, you need to have an active connection to Mullvad.</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

import { connCheck, setWebRTC } from '@/helpers';
import { getSocksConfig, setSocks, SocksConfig } from '@/helpers/socks';
import { localStorage } from '@/helpers/localStorage';
import { Connection } from '@/helpers/connCheck';

export default Vue.extend({
  data() {
    return {
      checking: true,
      incognitoAllowed: false,
      socksEnabled: false,
      socksConfig: {} as SocksConfig,
      webrtcDisabled: true,
      connection: {
        city: '',
        country: '',
        ip: '',
        server: '',
        protocol: '',
        provider: '',
        isMullvad: false,
      } as Connection,
    };
  },
  methods: {
    toggleWebrtc(checked: boolean): void {
      setWebRTC(checked);
    },
    async socksConnect(): Promise<void> {
      // FIXME: Without destructuring, this.socksConfig == {}
      const socksConfig = { ...this.socksConfig };

      setSocks(true, socksConfig);
      localStorage.socksEnabled.set(true);

      this.socksEnabled = true;
      await this.updateConnection();
    },
    async socksDisconnect(): Promise<void> {
      setSocks(false);
      localStorage.socksEnabled.set(false);

      this.socksEnabled = false;
      await this.updateConnection();
    },
    async socksDisable(): Promise<void> {
      setSocks(false);
      localStorage.socksEnabled.set(false);
      localStorage.socksConfig.remove();
      this.socksEnabled = false;

      await this.updateConnection();
    },
    async updateConnection(): Promise<void> {
      const connection = await connCheck();

      this.connection = connection;
    },
  },
  computed: {
    location(): string {
      if (this.connection.city && this.connection.country) {
        return `${this.connection.city}, ${this.connection.country}`;
      } else if (!this.connection.city && this.connection.country) {
        return this.connection.country;
      } else if (this.connection.city && !this.connection.country) {
        return this.connection.city;
      } else {
        return 'Unknown';
      }
    },
    title(): string {
      if (this.checking) {
        return 'Checking connection';
      }

      if (this.connection.protocol) {
        return this.connection.protocol;
      } else {
        return 'Not Mullvad';
      }
    },
    statusIcon(): string {
      if (this.checking) {
        return 'checking';
      }

      if (this.connection.isMullvad) {
        return 'connected';
      } else {
        return 'disconnected';
      }
    },
  },
  async created(): Promise<void> {
    try {
      const incognitoAllowed = await browser.extension.isAllowedIncognitoAccess();
      const webrtcDisabled = await localStorage.webrtcDisabled.get();

      const socksConfig = await localStorage.socksConfig.get();
      const socksEnabled = await localStorage.socksEnabled.get();

      this.webrtcDisabled = webrtcDisabled;
      this.socksEnabled = socksEnabled;
      this.incognitoAllowed = incognitoAllowed;

      // ConnCheck on popup start
      // Try 2 times on error as a workaround (See connCheck for details)
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
/* SIMPLE CSS RESET */
*,
*::after,
*::before {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  position: relative;
}

body {
  background-color: #294d73;
  margin: 1rem;
  font-family: Noto Sans Display, sans-serif;
  color: white;
  width: 14em;
}

hr {
  margin: 0.5em 0;
  size: 0em;
  color: transparent;
}

/* FONTS
Some errors in console due to loading method,
maybe use a loader instead?
 */

@font-face {
  font-family: 'Noto Sans Display';
  src: url('/src/fonts/NotoSansDisplay-SemiBold.woff2') format('woff2'),
    url('/src/fonts/NotoSansDisplay-SemiBold.woff') format('woff');
  font-weight: 600;
  font-style: normal;
}

@font-face {
  font-family: 'Noto Sans Display';
  src: url('/src/fonts/NotoSansDisplay-Regular.woff2') format('woff2'),
    url('/src/fonts/NotoSansDisplay-Regular.woff') format('woff');
  font-weight: normal;
  font-style: normal;
}

.spinner {
  width: 1rem;
}

/* HEADER */
.connected::before {
  display: inline-flex;
  content: '';
  background-image: url(../../assets/svg/lock.svg);
  background-size: 1em 1em;
  height: 1em;
  width: 1em;
  margin-right: 0.3rem;
}

.checking::before {
  display: inline-flex;
  content: '';
  background-image: url(../../assets/svg/spinner.svg);
  background-size: 1em 1em;
  height: 1em;
  width: 1em;
  margin-right: 0.3rem;
}

.disconnected::before {
  display: inline-flex;
  content: '';
  background-image: url(../../assets/svg/unlock.svg);
  background-size: 1em 1em;
  height: 1em;
  width: 1em;
  margin-right: 0.3rem;
}

/* STATUS */
.status {
  & p:not(:first-child) {
    font-size: 0.9em;
  }
}

/* WEBRTC */
.switch-container {
  display: flex;
  align-items: center;
}

/* switch */
.switch {
  position: relative;
  display: inline-block;
  width: 61px;
  height: 34px;
  margin-left: 0.5rem;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border: solid 1px white;
  /* background-color: #ccc; */
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

/* Toggle circle */
.slider:before {
  position: absolute;
  content: '';
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  -webkit-transition: 0.4s;
  transition: 0.4s;
  background-color: #e34039;
}

input:checked + .slider::before {
  background-color: #44ad4d;
}

input:checked + .slider:before {
  transform: translateX(24px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}
</style>
