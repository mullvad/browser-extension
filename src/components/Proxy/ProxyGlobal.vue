<script lang="ts" setup>
import { NCard, NCheckbox, NDivider, NSwitch, NTooltip } from 'naive-ui';

import Button from '@/components/Buttons/Button.vue';
import TitleCategory from '@/components/TitleCategory.vue';

import useLocations from '@/composables/useLocations';
import useSocksProxy from '@/composables/useSocksProxy';

const { hostProxySelect, toggleLocations } = useLocations();
const {
  globalProxyDetails,
  globalProxyDNSEnabled,
  globalProxyEnabled,
  removeGlobalProxy,
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
    <TitleCategory title="Default proxy (all websites)" />
    <n-divider />
    <div class="flex justify-between">
      <div v-if="globalProxyDetails.server" class="mb-3">
        <h1>{{ globalProxyDetails.country }}, {{ globalProxyDetails.city }}</h1>
        <ul class="mb-2">
          <li>Proxy Server: {{ globalProxyDetails.server }}</li>
          <li>
            Proxy DNS
            <n-checkbox
              size="large"
              :checked="globalProxyDNSEnabled"
              :focusable="false"
              @update-checked="toggleGlobalProxyDNS"
            />
          </li>
        </ul>
      </div>

      <n-tooltip v-if="globalProxyDetails.server">
        <template #trigger>
          <n-switch :value="globalProxyEnabled" @update-value="toggleGlobalProxy()" />
        </template>
        <span> {{ globalProxyEnabled ? 'Proxy enabled' : 'Proxy disabled' }}</span>
      </n-tooltip>
    </div>

    <div class="flex justify-between">
      <Button @click="handleProxySelect"> Select location </Button>
      <Button v-if="globalProxyDetails.server" @click="removeGlobalProxy"> Remove proxy </Button>
    </div>
  </n-card>
</template>
