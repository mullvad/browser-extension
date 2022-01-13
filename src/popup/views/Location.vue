<script lang="ts" setup>
import { NCollapseItem, NCollapse, NButton, NSpace } from 'naive-ui';
import LaSpinner from '~icons/la/spinner';
import useSocksProxies from '@/composables/useSocksProxies';
import useSocksProxy from '@/composables/useSocksProxy';
import useLocations from '@/composables/useLocations';
import getRandomSocksProxy from '@/helpers/getRandomSocksProxy';

const { toggleLocations } = useLocations();
const { data: socksProxies, isLoading, isError, error } = useSocksProxies();
const { connectToSocksProxy } = useSocksProxy();
const clickSocksProxy = (hostname: string, port: number) => {
  connectToSocksProxy(hostname, port);
  toggleLocations();
};
const clickCountry = (event: Event, country: string) => {
  event.stopPropagation();
  const { hostname, port } = getRandomSocksProxy({ socksProxies: socksProxies.value, country });
  clickSocksProxy(hostname, port);
};
const clickCity = (event: Event, country: string, city: string) => {
  event.stopPropagation();
  const { hostname, port } = getRandomSocksProxy({
    socksProxies: socksProxies.value,
    country,
    city,
  });
  clickSocksProxy(hostname, port);
};
</script>
<template>
  <p class="mb-8">
    While connected through the proxy, your real location and your VPN location are masked with a
    private and secure location in the selected region.
  </p>
  <p v-if="isLoading" class="text-lg flex items-center">
    Loading proxies<LaSpinner class="ml-2 animate-spin" />
  </p>
  <p v-else-if="isError">{{ error }}</p>
  <n-collapse v-else arrow-placement="right">
    <n-collapse-item v-for="{ country, cities } in socksProxies" :key="country" :name="country">
      <template #header>
        <n-button quaternary @click="clickCountry($event, country)">
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
            <n-button quaternary @click="clickCity($event, country, city)">
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
