<script lang="ts" setup>
import { NCollapseItem, NCollapse, NButton, NSpace } from 'naive-ui';

import IconLabel from '@/components/IconLabel.vue';

import useSocksProxies from '@/composables/useSocksProxies';
import useSocksProxy from '@/composables/useSocksProxy';
import useLocations from '@/composables/useLocations';
import useHistoricConnections from '@/composables/useHistoricConnections';
import getRandomSocksProxy from '@/helpers/getRandomSocksProxy';

const { toggleLocations } = useLocations();
const { data: socksProxies, isLoading, isError, error } = useSocksProxies();
const { connectToSocksProxy } = useSocksProxy();
const { storeSocksProxyUsage, sortedConnections } = useHistoricConnections();

const clickSocksProxy = (country: string, city: string, hostname: string, port: number) => {
  storeSocksProxyUsage({ country, city, hostname });
  connectToSocksProxy(hostname, port);
  toggleLocations();
};
const clickCountryOrCity = (country: string, city?: string) => {
  const { hostname, port } = getRandomSocksProxy({
    socksProxies: socksProxies.value,
    country,
    city,
  });
  storeSocksProxyUsage({ country, city });
  connectToSocksProxy(hostname, port);
  toggleLocations();
};
</script>

<template>
  <p class="mb-8">
    While connected through the proxy, your real location and your VPN location are masked with a
    private and secure location in the selected region.
  </p>
  <div v-if="sortedConnections.length" class="mb-8">
    <p>Most frequently used:</p>
    <ul>
      <li v-for="connection in sortedConnections.slice(0, 3)" :key="connection">
        {{ [connection.country, connection.city, connection.hostname].filter(Boolean).join(', ') }}:
        {{ connection.count }}
      </li>
    </ul>
  </div>
  <p v-if="isLoading" class="text-lg flex items-center">
    <IconLabel text="Loading proxy servers list" type="spinner" />
  </p>
  <p v-else-if="isError">{{ error }}</p>
  <n-collapse v-else arrow-placement="right">
    <n-collapse-item v-for="{ country, cities } in socksProxies" :key="country" :name="country">
      <template #header>
        <n-button quaternary @click.prevent="clickCountryOrCity(country)">
          {{ country }}
        </n-button>
      </template>
      <n-collapse arrow-placement="right">
        <n-collapse-item
          v-for="{ city, proxyList } in cities"
          :key="city"
          :name="city"
          :title="city"
        >
          <template #header>
            <n-button quaternary @click.prevent="clickCountryOrCity(country, city)">
              {{ city }}
            </n-button>
          </template>
          <n-space vertical>
            <n-button
              v-for="proxy in proxyList"
              :key="proxy.hostname"
              secondary
              medium
              @click="clickSocksProxy(country, city, proxy.hostname, proxy.port)"
            >
              {{ proxy.hostname }}
            </n-button>
          </n-space>
        </n-collapse-item>
      </n-collapse>
    </n-collapse-item>
  </n-collapse>
</template>

<style scoped>
p {
  color: var(--light-grey);
}
</style>
