<script setup lang="ts">
import { computed } from 'vue';
import { NCard, NList, NListItem, NEmpty } from 'naive-ui';
import CurrentProxyDetails from '@/components/Proxy/CurrentProxyDetails.vue';
import TitleCategory from '@/components/TitleCategory.vue';
import useStore from '@/composables/useStore';

const { hostProxiesDetails, globalProxyDetails } = useStore();

const activeHostProxies = computed(() =>
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  Object.entries(hostProxiesDetails.value).filter(([_, proxy]) => proxy.socksEnabled),
);

const hasProxies = computed(
  () => globalProxyDetails.value.socksEnabled || activeHostProxies.value.length > 0,
);
</script>

<template>
  <NCard title="Proxy Settings" :bordered="false">
    <NEmpty v-if="!hasProxies" description="No Proxy set" />
    <NList v-else>
      <NListItem v-if="globalProxyDetails.socksEnabled">
        <TitleCategory title="Global Proxy (All Websites)" />
        <CurrentProxyDetails :proxyDetails="globalProxyDetails" />
      </NListItem>
      <NListItem v-for="[host, proxy] in activeHostProxies" :key="host">
        <TitleCategory :title="host" />
        <CurrentProxyDetails :proxyDetails="proxy" />
      </NListItem>
    </NList>
  </NCard>
</template>
