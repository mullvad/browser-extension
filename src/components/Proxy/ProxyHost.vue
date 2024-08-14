<script lang="ts" setup>
import { computed } from 'vue';
import { NCard, NCheckbox, NDivider, NSwitch, NTooltip } from 'naive-ui';

import Button from '@/components/Buttons/Button.vue';
import SplitButton from '@/components/Buttons/SplitButton.vue';
import TitleCategory from '@/components/TitleCategory.vue';

import useActiveTab from '@/composables/useActiveTab';
import useLocations from '@/composables/useLocations';
import useSocksProxy from '@/composables/useSocksProxy';

const { activeTabHost } = useActiveTab();
const { hostProxySelect, toggleLocations } = useLocations();
const {
  allowProxy,
  currentHostProxyDetails,
  currentHostProxyDNSEnabled,
  currentHostProxyEnabled,
  excludedHosts,
  neverProxyHost,
  removeCustomProxy,
  toggleCurrentHostProxy,
  toggleCurrentHostProxyDNS,
} = useSocksProxy();

const title = computed(() => `Proxy for ${activeTabHost.value}`);
const currentHostExcluded = computed(() => excludedHosts.value.includes(activeTabHost.value));
const currentHostProxied = computed(() => (currentHostProxyDetails.value ? true : false));

const handleProxySelect = () => {
  hostProxySelect.value = true;
  toggleLocations();
};
</script>

<template>
  <n-card :bordered="false">
    <TitleCategory :title="title" />
    <n-divider />
    <div class="flex justify-between">
      <div v-if="currentHostProxyDetails && !currentHostExcluded" class="mb-3">
        <h1>{{ currentHostProxyDetails.country }}, {{ currentHostProxyDetails.city }}</h1>
        <ul class="mb-2">
          <li>Proxy Server: {{ currentHostProxyDetails.server }}</li>
          <li>
            Proxy DNS
            <n-checkbox
              size="large"
              :checked="currentHostProxyDNSEnabled"
              :focusable="false"
              @update-checked="toggleCurrentHostProxyDNS"
            />
          </li>
        </ul>
      </div>

      <n-tooltip v-if="currentHostProxyDetails && !currentHostExcluded">
        <template #trigger>
          <n-switch :value="currentHostProxyEnabled" @update-value="toggleCurrentHostProxy" />
        </template>
        <span> {{ currentHostProxyEnabled ? 'Proxy enabled' : 'Proxy disabled' }}</span>
      </n-tooltip>
    </div>

    <div>
      <Button
        v-if="currentHostExcluded"
        class="flex items-center justify-center"
        @click="allowProxy(activeTabHost)"
      >
        <p>
          Allow proxy for <strong>{{ activeTabHost }}</strong>
        </p>
      </Button>

      <div v-else class="flex justify-between">
        <Button class="flex items-center justify-center" @click="handleProxySelect">
          Select location
        </Button>

        <div>
          <SplitButton
            v-if="currentHostProxied"
            main-color="error"
            sub-color="white"
            main-text="Remove proxy"
            sub-text="Never proxy"
            @main-click="removeCustomProxy(activeTabHost)"
            @sub-click="neverProxyHost(activeTabHost)"
          />
          <Button
            v-else
            class="flex items-center justify-center"
            @click="neverProxyHost(activeTabHost)"
          >
            Never proxy
          </Button>
        </div>
      </div>
    </div>
  </n-card>
</template>
