<template>
  <div class="location">
    <button @click="handleBack">back</button>
    <details v-for="country in Object.keys(servers)" :key="country" class="country">
      <summary>{{ country }}</summary>

      <details v-for="city in Object.keys(servers[country])" :key="city" class="city">
        <summary>
          {{ city }}
        </summary>

        <div v-for="server in servers[country][city]" :key="server.hostname" class="server">
          <div @click="handleSelect(server.socks_name)">
            {{ server.hostname }}
          </div>
        </div>
      </details>
    </details>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import router from '../router';

import { Servers } from '@/helpers/servers';
import { localStorage } from '@/helpers/localStorage';
import { getSocksConfig, setSocks } from '@/helpers/socks';

export default Vue.extend({
  name: 'Location',
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

      // console.log('handleSelect socksName: ', socksName);
      // console.log('handleSelect socksConfig: ', socksConfig);

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

    // TODO: Open the view to the current Mullvad server
  },
});
</script>

<style lang="scss">
.country {
  border-bottom: 1px solid #192e45;

  > summary {
    padding: 0.5em;
    list-style: none;

    &:hover {
      cursor: pointer !important;
    }
    // For chrome
    &::-webkit-details-marker {
      display: none;
    }
  }
}

.city {
  padding: 0.5em 0 0.5em 1em;
  background-color: #192e45;

  > summary {
    list-style: none;

    &:hover {
      cursor: pointer !important;
    }
    // For chrome
    &::-webkit-details-marker {
      display: none;
    }
  }

  .server {
    padding: 0.5em 0;

    div {
      padding-left: 1em;
      cursor: pointer !important;

      &:hover {
        background-color: #0c1722;
      }
    }
  }
}
</style>
