<script lang="ts" setup>
import { NCollapseItem, NCollapse, NButton, NSpace } from 'naive-ui';
import useSocksProxies from '@/composables/useSocksProxies';
import pluralize from '@/helpers/pluralize';
import useSocksProxy from '@/composables/useSocksProxy';
import { useRouter } from 'vue-router';
import LaSpinner from '~icons/la/spinner';

const { socksProxies, isLoading, isError, error } = useSocksProxies();
const router = useRouter();
const { connectToSocksProxy } = useSocksProxy();
const clickSocksProxy = (hostname: string, port: number) => {
  connectToSocksProxy(hostname, port);
  router.push('/');
};
</script>
<template>
  <h1 class="text-xl">Select proxy location</h1>
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
