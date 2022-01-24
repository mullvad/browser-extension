<script lang="ts" setup>
import { NButton, NCollapse, NCollapseItem, NSpace } from 'naive-ui';

import IconLabel from '@/components/IconLabel.vue';
import RecentLocationButtons from '@/components/RecentLocationButtons.vue';
import MostUsedLocationSelector from '@/components/MostUsedLocationSelector.vue';

import useSocksProxies from '@/composables/useSocksProxies';
import useSocksProxy from '@/composables/useSocksProxy';
import useLocations from '@/composables/useLocations';
import useHistoricConnections from '@/composables/useHistoricConnections';
import getRandomSocksProxy from '@/helpers/getRandomSocksProxy';

const { toggleLocations } = useLocations();
const { data: socksProxies, isLoading, isError, error } = useSocksProxies();
const { connectToSocksProxy } = useSocksProxy();
const { storeSocksProxyUsage, mostRecent } = useHistoricConnections();

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
  <p v-if="isLoading" class="text-lg flex items-center">
    <IconLabel text="Loading proxy servers list" type="spinner" />
  </p>
  <p v-else-if="isError">{{ error }}</p>
  <div v-else>
    <div v-if="mostRecent" class="flex space-x-4 mb-4">
      <div>
        <p>Last used:</p>
        <RecentLocationButtons />
      </div>
      <div>
        <p>Most used:</p>
        <MostUsedLocationSelector />
      </div>
    </div>
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
