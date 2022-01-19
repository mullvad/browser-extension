<script lang="ts" setup>
import { NCollapseItem, NCollapse, NButton, NSpace } from 'naive-ui';

import IconLabel from '@/components/IconLabel.vue';

import useSocksProxies from '@/composables/useSocksProxies';
import useSocksProxy from '@/composables/useSocksProxy';
import useLocations from '@/composables/useLocations';
import getRandomSocksProxy from '@/helpers/getRandomSocksProxy';

const { toggleLocations } = useLocations();
const { data: socksProxies, isLoading, isError, error } = useSocksProxies();
const { connectToSocksProxy, storeSocksProxyUsage, historicConnections } = useSocksProxy();
const clickSocksProxy = (hostname: string, port: number) => {
  connectToSocksProxy(hostname, port);
  toggleLocations();
};
const clickCountryOrCity = (country: string, city?: string) => {
  const { hostname, port } = getRandomSocksProxy({
    socksProxies: socksProxies.value,
    country,
    city,
  });
  storeSocksProxyUsage({ country, city, hostname, port });
  clickSocksProxy(hostname, port);
};
const list = [];
for (const [key, count] of historicConnections.value.entries()) {
  const [country, city, hostname, port] = key.split(',');
  list.push({ country, city, hostname, port, count });
}
list.sort((a, b) => b.count - a.count);
</script>

<template>
  <p class="mb-8">
    While connected through the proxy, your real location and your VPN location are masked with a
    private and secure location in the selected region.
  </p>
  <p v-if="list.length">Most frequently used: {{ list[0] }}</p>
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
              @click="clickSocksProxy(proxy.hostname, proxy.port)"
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
