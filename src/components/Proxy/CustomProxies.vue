<script lang="ts" setup>
import { computed } from 'vue';
import { NCard, NCheckbox, NDivider, NSwitch, NTooltip } from 'naive-ui';

import Button from '@/components/Buttons/Button.vue';
import TitleCategory from '@/components/TitleCategory.vue';

import useSocksProxy from '@/composables/useSocksProxy';
import useStore from '@/composables/useStore';

// For some reason importing `hostProxiesDetails` directly from useStore()
// will cause the value not to be reactively updated
const { excludedHosts } = useStore();
const { toggleCustomProxy, toggleCustomProxyDNS, hostProxiesDetails } = useSocksProxy();

const proxies = computed(() =>
  Object.entries(hostProxiesDetails.value).map(([host, proxy]) => ({ host, proxyDetails: proxy })),
);

const allowProxy = (host: string) => {
  excludedHosts.value = excludedHosts.value.filter((excluded) => excluded !== host);
};
</script>

<template>
  <NCard :bordered="false" class="mb-4">
    <TitleCategory title="Custom proxies" />
    <div v-for="{ host, proxyDetails } in proxies" :key="host" :bordered="false" class="mb-4">
      <n-divider />
      <div class="flex justify-between">
        <h1 class="font-semibold text-lg mb-2 text-gray-200">{{ host }}</h1>
        <n-tooltip v-if="proxyDetails.server">
          <template #trigger>
            <n-switch :value="proxyDetails.socksEnabled" @update-value="toggleCustomProxy(host)" />
          </template>
          <span> {{ proxyDetails.socksEnabled ? 'Proxy enabled' : 'Proxy disabled' }}</span>
        </n-tooltip>
      </div>

      <div v-if="proxyDetails.server" class="mb-3">
        <h1>{{ proxyDetails.country }}, {{ proxyDetails.city }}</h1>
        <ul class="mb-2">
          <li>Proxy Server: {{ proxyDetails.server }}</li>
          <li>
            Proxy DNS
            <n-checkbox
              size="large"
              :checked="proxyDetails.proxyDNS"
              :focusable="false"
              @update-checked="toggleCustomProxyDNS(host)"
            />
          </li>
        </ul>
      </div>
    </div>
  </NCard>

  <NCard v-if="excludedHosts.length > 0" :bordered="false">
    <TitleCategory title="Excluded from proxying" />
    <div v-for="host in excludedHosts" :key="host" :bordered="false" class="mb-4">
      <n-divider />
      <div class="flex justify-between">
        <h1 class="font-semibold text-lg mb-2 text-gray-200">{{ host }}</h1>
        <Button @click="allowProxy(host)"> Allow proxying </Button>
      </div>
    </div>
  </NCard>
</template>
