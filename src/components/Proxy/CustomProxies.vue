<script lang="ts" setup>
import { computed } from 'vue';
import { NCard, NCheckbox, NDivider, NSwitch, NTooltip } from 'naive-ui';

import Button from '@/components/Buttons/Button.vue';
import TitleCategory from '@/components/TitleCategory.vue';

import useSocksProxy from '@/composables/useSocksProxy';
import useLocations from '@/composables/useLocations';

import { openPopup } from '@/helpers/browserExtension';

const { customProxy, hostProxySelect, toggleLocations } = useLocations();

// For some reason importing `hostProxiesDetails` directly from useStore()
// will cause the value not to be reactively updated
const {
  allowProxy,
  excludedHosts,
  hostProxiesDetails,
  removeCustomProxy,
  toggleCustomProxy,
  toggleCustomProxyDNS,
} = useSocksProxy();

const proxies = computed(() =>
  Object.entries(hostProxiesDetails.value).map(([host, proxy]) => ({ host, proxyDetails: proxy })),
);

const handleCustomProxySelect = (host: string) => {
  customProxy.value = host;
  hostProxySelect.value = true;
  toggleLocations();
};
</script>

<template>
  <NCard v-if="excludedHosts.length <= 0 && proxies.length <= 0" :bordered="false">
    <p>
      No custom proxies configured. You can configure the proxy through
      <a class="underline cursor-pointer" @click="openPopup">the popup</a>.
    </p>
  </NCard>

  <NCard v-if="proxies.length > 0" :bordered="false" class="mb-4">
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

      <div class="flex justify-between">
        <Button @click="handleCustomProxySelect(host)">Select location</Button>
        <Button color="error" @click="removeCustomProxy(host)">Remove proxy</Button>
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
