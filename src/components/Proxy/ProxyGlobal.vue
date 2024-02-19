<script lang="ts" setup>
import { NCard, NSwitch, NTooltip } from 'naive-ui';

import Button from '@/components/Buttons/Button.vue';
import TitleCategory from '@/components/TitleCategory.vue';

import useLocations from '@/composables/useLocations';
import useSocksProxy from '@/composables/useSocksProxy';

const { hostProxySelect, toggleLocations } = useLocations();
const {
  globalProxyDetails,
  globalProxyDNSEnabled,
  globalProxyEnabled,
  toggleGlobalProxy,
  toggleGlobalProxyDNS,
} = useSocksProxy();

const handleProxySelect = () => {
  hostProxySelect.value = false;
  toggleLocations();
};
</script>

<template>
  <n-card :bordered="false" class="mb-4">
    <div class="flex justify-between">
      <TitleCategory title="Proxy for all websites" />
      <n-tooltip v-if="globalProxyDetails.server">
        <template #trigger>
          <n-switch :value="globalProxyEnabled" @update-value="toggleGlobalProxy()" />
        </template>
        <span> {{ globalProxyEnabled ? 'Proxy enabled' : 'Proxy disabled' }}</span>
      </n-tooltip>
    </div>

    <div v-if="globalProxyDetails.server" class="mb-3">
      <h1>{{ globalProxyDetails.country }}, {{ globalProxyDetails.city }}</h1>
      <ul class="mb-2">
        <li>Proxy Server: {{ globalProxyDetails.server }}</li>
        <li>
          Proxy DNS
          <n-tooltip v-if="globalProxyDetails.server">
            <template #trigger>
              <n-switch
                :value="globalProxyDNSEnabled"
                size="small"
                @update-value="toggleGlobalProxyDNS"
              />
            </template>
            <span> {{ globalProxyDNSEnabled ? 'DNS proxied' : 'DNS not proxied' }}</span>
          </n-tooltip>
        </li>
      </ul>
    </div>

    <Button @click="handleProxySelect"> Select location </Button>
  </n-card>
</template>
