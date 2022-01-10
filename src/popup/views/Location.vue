<script lang="ts" setup>
import { NCollapseItem, NCollapse, NButton, NSpace } from 'naive-ui';
import useSocksProxies from '@/composables/useSocksProxies';
import pluralize from '@/helpers/pluralize';
import useSocksProxy from '@/composables/useSocksProxy';
import LaSpinner from '~icons/la/spinner';
import useLocations from '@/composables/useLocations';

const { toggleLocations } = useLocations();
const { socksProxies, isLoading, isError, error } = useSocksProxies();
const { connectToSocksProxy } = useSocksProxy();
const clickSocksProxy = (hostname: string, port: number) => {
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
    Loading proxies<LaSpinner class="ml-2 animate-spin" />
  </p>
  <p v-else-if="isError">{{ error }}</p>
  <n-collapse v-else arrow-placement="right">
    <n-collapse-item
      v-for="{ country, cities } in socksProxies"
      :key="country"
      :name="country"
      :title="country"
    >
      <template #header-extra
        >{{ pluralize('city', cities.length, 'cities') }} /
        {{
          pluralize(
            'proxy',
            cities.reduce((acc, { proxyList }) => acc + proxyList.length, 0),
            'proxies',
          )
        }}</template
      >
      <n-collapse arrow-placement="right">
        <n-collapse-item
          v-for="{ city, proxyList } in cities"
          :key="city"
          :name="city"
          :title="city"
        >
          <template #header-extra>{{ pluralize('proxy', proxyList.length, 'proxies') }}</template>
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
