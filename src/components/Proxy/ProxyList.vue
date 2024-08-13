<script setup lang="ts">
import { computed } from 'vue';
import { NCard } from 'naive-ui';

import CurrentProxyDetails from '@/components/Proxy/CurrentProxyDetails.vue';
import TitleCategory from '@/components/TitleCategory.vue';
import LocationDrawer from '@/components/ConnectionDetails/LocationDrawer.vue';
import ProxyGlobal from '@/components/Proxy/ProxyGlobal.vue';

import useStore from '@/composables/useStore';

const { hostProxiesDetails } = useStore();
const proxies = computed(() =>
  Object.entries(hostProxiesDetails.value).map(([host, proxy]) => ({ host, proxy })),
);
</script>

<template>
  <ProxyGlobal />
  <NCard :bordered="false">
    <TitleCategory title="Custom proxies" />
    <NCard v-for="{ host, proxy } in proxies" :key="host" :bordered="false" class="mb-4">
      <TitleCategory :title="host" />
      <CurrentProxyDetails :proxyDetails="proxy" />
    </NCard>
  </NCard>

  <LocationDrawer />
</template>
