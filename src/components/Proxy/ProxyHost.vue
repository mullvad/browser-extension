<script lang="ts" setup>
import { computed } from 'vue';
import { NCard, NSwitch, NTooltip } from 'naive-ui';

import Button from '@/components/Buttons/Button.vue';
import TitleCategory from '@/components/TitleCategory.vue';

import useActiveTab from '@/composables/useActiveTab';
import useLocations from '@/composables/useLocations';
import useSocksProxy from '@/composables/useSocksProxy';
import useStore from '@/composables/useStore';

const { activeTabHost } = useActiveTab();
const { hostProxySelect, toggleLocations } = useLocations();
const {
  currentHostProxyDetails,
  currentHostProxyDNSEnabled,
  currentHostProxyEnabled,
  toggleCurrentHostProxy,
  toggleCurrentHostProxyDNS,
} = useSocksProxy();
const { excludedHosts } = useStore();

const title = computed(() => `Proxy for ${activeTabHost.value}`);
const currentHostExcluded = computed(() => excludedHosts.value.includes(activeTabHost.value));

const neverProxyHost = () => {
  excludedHosts.value = [...excludedHosts.value, activeTabHost.value];
};

const allowProxy = () => {
  excludedHosts.value = excludedHosts.value.filter((excluded) => excluded !== activeTabHost.value);
};

const handleProxySelect = () => {
  hostProxySelect.value = true;
  toggleLocations();
};
</script>

<template>
  <n-card :bordered="false" class="mb-4">
    <div class="flex justify-between">
      <TitleCategory :title="title" />
      <n-tooltip v-if="currentHostProxyDetails && !currentHostExcluded">
        <template #trigger>
          <n-switch :value="currentHostProxyEnabled" @update-value="toggleCurrentHostProxy" />
        </template>
        <span> {{ currentHostProxyEnabled ? 'Proxy enabled' : 'Proxy disabled' }}</span>
      </n-tooltip>
    </div>

    <div v-if="currentHostProxyDetails && !currentHostExcluded" class="mb-3">
      <h1>{{ currentHostProxyDetails.country }}, {{ currentHostProxyDetails.city }}</h1>
      <ul class="mb-2">
        <li>Proxy Server: {{ currentHostProxyDetails.server }}</li>
        <li>
          Proxy DNS
          <n-tooltip v-if="currentHostProxyDetails && !currentHostExcluded">
            <template #trigger>
              <n-switch
                :value="currentHostProxyDNSEnabled"
                size="small"
                @update-value="toggleCurrentHostProxyDNS"
              />
            </template>
            <span> {{ currentHostProxyDNSEnabled ? 'DNS proxied' : 'DNS not proxied' }}</span>
          </n-tooltip>
        </li>
      </ul>
    </div>

    <div>
      <Button
        v-if="currentHostExcluded"
        class="flex items-center justify-center"
        @click="allowProxy"
      >
        <p>
          Allow proxy for <strong>{{ activeTabHost }}</strong>
        </p>
      </Button>

      <div v-else class="flex justify-between">
        <Button class="flex items-center justify-center" @click="handleProxySelect">
          Select location
        </Button>

        <Button class="flex items-center justify-center" @click="neverProxyHost">
          Never proxy
        </Button>
      </div>
    </div>
  </n-card>
</template>
