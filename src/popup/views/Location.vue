<template>
  <div>
    <header class="header-title">
      <img src="../../assets/svg/chevron-down-circle.svg" @click="handleBack" />
      <h2>Select proxy location</h2>
      <br style="visibility: hidden" />
    </header>

    <section>
      <div class="info container">
        <p>
          While connected through the proxy, your real location and your VPN location are masked
          with a private and secure location in the selected region.
        </p>
      </div>

      <div v-for="country in Object.keys(servers)" :key="country">
        <accordion :title="country" class="country">
          <accordion
            v-for="city in Object.keys(servers[country])"
            :key="city"
            :title="city"
            class="city"
          >
            <div v-for="server in servers[country][city]" :key="server.hostname" class="server">
              <div @click="handleSelect(server.socks_name)">
                {{ server.hostname }}
              </div>
            </div>
          </accordion>
        </accordion>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import router from '../router';
import Accordion from '../components/Accordion.vue';

import { Servers } from '@/helpers/servers';
import { localStorage } from '@/helpers/localStorage';
import { getSocksConfig, setSocks } from '@/helpers/socks';

export default Vue.extend({
  name: 'Location',
  components: {
    Accordion,
  },
  data() {
    return {
      servers: {} as Servers,
      currentProtocol: '',
      socksName: '',
    };
  },
  methods: {
    handleSelect(socksName: string) {
      const socksConfig = getSocksConfig(this.currentProtocol, socksName);
      setSocks(true, socksConfig);

      localStorage.socksConfig.set(socksConfig);
      localStorage.socksEnabled.set(true);

      // Redirect to Home route
      router.push('/');
    },
    handleBack() {
      router.push('/');
    },
  },
  async created(): Promise<void> {
    const servers = await localStorage.servers.get();
    const socksProtocols = await localStorage.socksProtocols.get();

    // FIXME: Order servers [1-n]
    this.servers = servers;
    this.currentProtocol = socksProtocols.current;
  },
});
</script>

<style lang="scss">
@import '../../assets/scss/colors';

/* SERVERS LIST */
.city {
  .accordion-header {
    padding-left: 3rem;
    background-color: $blue40;

    &:hover {
      background-color: $blue60;
    }
  }
}

.server {
  padding: 0.8rem 1rem;
  padding-left: 4.5rem;
  cursor: pointer;

  &:hover {
    background-color: $blue60;
  }
}
</style>
