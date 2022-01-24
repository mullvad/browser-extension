<script lang="ts" setup>
import { NButton, NCollapse, NCollapseItem, NSpace } from 'naive-ui';

import IconLabel from '@/components/IconLabel.vue';
import LocationTabs from '@/components/LocationTabs.vue';

import useSocksProxies from '@/composables/useSocksProxies';
import useSocksProxy from '@/composables/useSocksProxy';
import useLocations from '@/composables/useLocations';
import useHistoricConnections from '@/composables/useHistoricConnections/useHistoricConnections';
import getRandomSocksProxy from '@/helpers/getRandomSocksProxy';
import type { HistoricConnection } from '@/composables/useHistoricConnections/HistoricConnections.types';
import useFilteredSocksProxies from '@/composables/useFilteredSocksProxies';

const { toggleLocations } = useLocations();
const { data: allSocksProxies, isLoading, isError, error } = useSocksProxies();
const { socksProxies, clearFilter } = useFilteredSocksProxies();
const { connectToSocksProxy } = useSocksProxy();
const { storeSocksProxyUsage } = useHistoricConnections();

const clickSocksProxy = (country: string, city: string, hostname: string, port?: number) => {
  storeSocksProxyUsage({ country, city, hostname });
  connectToSocksProxy(hostname, port);
  toggleLocations();
  clearFilter();
};

const clickCountryOrCity = (country: string, city?: string) => {
  const { hostname, port } = getRandomSocksProxy({
    socksProxies: allSocksProxies.value,
    country,
    city,
  });
  storeSocksProxyUsage({ country, city });
  connectToSocksProxy(hostname, port);
  toggleLocations();
  clearFilter();
};

const selectLocation = (connection: HistoricConnection) => {
  const { country, city, hostname } = connection;
  if (hostname) {
    clickSocksProxy(country, city, hostname);
  } else {
    clickCountryOrCity(country, city);
  }
};
</script>

<template>
  <p class="mb-8">
    While connected through the proxy, your real location and your VPN location are masked with a
    private and secure location in the selected region.
  </p>
  <p v-if="isLoading" class="text-lg flex items-center">
    <IconLabel text="Loading proxy servers list" type="spinner" />
  </p>
  <p v-else-if="isError">{{ error }}</p>
  <div v-else>
    <LocationTabs :selectLocation="selectLocation" />
    <n-collapse arrow-placement="right">
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
  </div>
</template>

<style scoped>
p {
  color: var(--light-grey);
}
</style>
