<script lang="ts" setup>
import { computed, ref } from 'vue';
import { NCard, NCheckbox, NDivider, NSwitch, NTooltip, NInput } from 'naive-ui';

import Button from '@/components/Buttons/Button.vue';
import IconLabel from '@/components/IconLabel.vue';
import SplitButton from '@/components/Buttons/SplitButton.vue';
import TitleCategory from '@/components/TitleCategory.vue';

import useSocksProxy from '@/composables/useSocksProxy';
import useLocations from '@/composables/useLocations';

const { customProxy, hostProxySelect, toggleLocations } = useLocations();

// For some reason importing `hostProxiesDetails` directly from useStore()
// will cause the value not to be reactively updated
const {
  allowProxy,
  excludedHosts,
  hostProxiesDetails,
  neverProxyHost,
  removeCustomProxy,
  toggleCustomProxy,
  toggleCustomProxyDNS,
} = useSocksProxy();

const manualProxyDomain = ref('');
const manualProxyDomainError = ref(false);

const combinedHosts = computed(() => {
  const allHosts = [...Object.keys(hostProxiesDetails.value), ...excludedHosts.value];
  return [...new Set(allHosts)].sort((a, b) => a.localeCompare(b));
});

const handleCustomProxySelect = (host: string) => {
  customProxy.value = host;
  hostProxySelect.value = true;
  toggleLocations();
  manualProxyDomain.value = '';
};

const neverProxyHostManual = () => {
  if (manualProxyDomain.value) {
    neverProxyHost(manualProxyDomain.value);
    manualProxyDomain.value = '';
    manualProxyDomainError.value = false;
  } else {
    manualProxyDomainError.value = true;
  }
};

const handleCustomProxySelectManual = () => {
  if (manualProxyDomain.value) {
    handleCustomProxySelect(manualProxyDomain.value);
    manualProxyDomain.value = '';
    manualProxyDomainError.value = false;
  } else {
    manualProxyDomainError.value = true;
  }
};

const clearError = () => {
  manualProxyDomainError.value = false;
};
</script>

<template>
  <NCard :bordered="false">
    <TitleCategory title="Add proxy for a domain" />
    <div class="flex items-center mt-2">
      <NInput
        v-model:value="manualProxyDomain"
        placeholder="Enter domain name"
        class="mr-2 flex-grow"
        :status="manualProxyDomainError ? 'error' : undefined"
        @focus="clearError"
      />

      <SplitButton
        size="small"
        main-color="blue"
        sub-color="white"
        main-text="Select location"
        sub-text="Never proxy"
        @main-click="handleCustomProxySelectManual"
        @sub-click="neverProxyHostManual"
      />
    </div>
    <div v-if="manualProxyDomainError" class="text-red-500 text-sm mt-1">
      Please enter a domain name
    </div>

    <div v-for="host in combinedHosts" :key="host" :bordered="false" class="mb-4">
      <n-divider />
      <div class="flex justify-between">
        <h1 class="font-semibold text-lg mb-2 text-gray-200">
          {{ host }}
        </h1>
        <template v-if="host in hostProxiesDetails && !excludedHosts.includes(host)">
          <n-tooltip v-if="hostProxiesDetails[host].server">
            <template #trigger>
              <n-switch
                :value="hostProxiesDetails[host].socksEnabled"
                @update-value="toggleCustomProxy(host)"
              />
            </template>
            <span>{{
              hostProxiesDetails[host].socksEnabled ? 'Proxy enabled' : 'Proxy disabled'
            }}</span>
          </n-tooltip>
        </template>
      </div>

      <template v-if="host in hostProxiesDetails && !excludedHosts.includes(host)">
        <div v-if="hostProxiesDetails[host].server" class="mb-3">
          <h1>{{ hostProxiesDetails[host].country }}, {{ hostProxiesDetails[host].city }}</h1>
          <ul class="mb-2">
            <li>Proxy Server: {{ hostProxiesDetails[host].server }}</li>
            <li>
              Proxy DNS
              <n-checkbox
                size="large"
                :checked="hostProxiesDetails[host].proxyDNS"
                :focusable="false"
                @update-checked="toggleCustomProxyDNS(host)"
              />
            </li>
          </ul>
        </div>

        <div class="flex justify-between">
          <Button
            size="small"
            class="flex items-center justify-center"
            @click="handleCustomProxySelect(host)"
          >
            Change location
          </Button>

          <div>
            <SplitButton
              size="small"
              main-color="error"
              sub-color="white"
              main-text="Remove proxy"
              sub-text="Never proxy"
              @main-click="removeCustomProxy(host)"
              @sub-click="neverProxyHost(host)"
            />
          </div>
        </div>
      </template>

      <template v-else>
        <div class="flex justify-between">
          <IconLabel type="info" class="mb-3"> Never proxied </IconLabel>
          <Button @click="allowProxy(host)">Allow proxying</Button>
        </div>
      </template>
    </div>
  </NCard>
</template>
