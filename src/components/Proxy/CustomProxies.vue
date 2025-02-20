<script lang="ts" setup>
import { computed, ref } from 'vue';
import { NCard, NCheckbox, NDivider, NIcon, NInput, NSwitch, NTooltip } from 'naive-ui';

import Button from '@/components/Buttons/Button.vue';
import IconLabel from '@/components/IconLabel.vue';
import FeGlobe from '@/components/Icons/FeGlobe.vue';
import SplitButton from '@/components/Buttons/SplitButton.vue';
import TitleCategory from '@/components/TitleCategory.vue';

import { isValidDomain, normalizeToFQDN } from '@/helpers/domain';

import useSocksProxy from '@/composables/useSocksProxy';
import useLocations from '@/composables/useLocations';

const { proxySelect } = useLocations();

// For some reason importing `hostProxiesDetails` directly from useStore()
// will cause the value not to be reactively updated
const {
  allowProxy,
  excludedHosts,
  globalProxyDetails,
  globalProxyEnabled,
  hostProxiesDetails,
  neverProxyHost,
  removeCustomProxy,
  removeGlobalProxy,
  toggleCustomProxy,
  toggleCustomProxyDNS,
  toggleGlobalProxy,
  toggleGlobalProxyDNS,
} = useSocksProxy();

const inputProxyDomain = ref('');
const inputProxyDomainError = ref(false);

const combinedHosts = computed(() => {
  const allHosts = [...Object.keys(hostProxiesDetails.value), ...excludedHosts.value];
  return [...new Set(allHosts)].sort((a, b) => a.localeCompare(b));
});

const handleCustomProxySelectManual = () => {
  const normalizedDomain = normalizeToFQDN(inputProxyDomain.value);
  if (normalizedDomain && isValidDomain(normalizedDomain)) {
    proxySelect(normalizedDomain);
    inputProxyDomainError.value = false;
  } else {
    inputProxyDomainError.value = true;
  }
};

const neverProxyHostManual = () => {
  if (inputProxyDomain.value && isValidDomain(inputProxyDomain.value)) {
    neverProxyHost(inputProxyDomain.value);
    inputProxyDomain.value = '';
    inputProxyDomainError.value = false;
  } else {
    inputProxyDomainError.value = true;
  }
};

const clearError = () => {
  inputProxyDomainError.value = false;
};
</script>

<template>
  <NCard :bordered="false">
    <TitleCategory title="Add proxy for a domain (or subdomain)" />
    <div class="flex items-center mt-2">
      <NInput
        v-model:value="inputProxyDomain"
        placeholder="Enter domain name"
        class="mr-2 flex-grow"
        :status="inputProxyDomainError ? 'error' : undefined"
        clearable
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
    <div v-if="inputProxyDomainError" class="text-red-500 text-sm mt-1">
      Please enter a valid domain name
    </div>

    <n-divider />
    <div>
      <div class="flex inline-flex items-center mb-2">
        <h1 class="font-semibold text-lg text-gray-200">All websites</h1>
        <p class="ml-1">(except for domains listed below)</p>
      </div>

      <div v-if="globalProxyDetails.server" class="flex justify-between">
        <div class="mb-2">
          <p class="text-white inline-flex items-center">
            <n-icon size="20">
              <FeGlobe />
            </n-icon>
            <span class="ml-2"
              >{{ globalProxyDetails.city }}, {{ globalProxyDetails.country }}</span
            >
          </p>
          <div class="flex">
            <h4 class="font-semibold">Server</h4>
            <div class="ml-2">{{ globalProxyDetails.server }}</div>
          </div>
          <div class="flex">
            <h4 class="font-semibold pr-2">Proxy DNS</h4>
            <n-checkbox
              size="large"
              :checked="globalProxyDetails.proxyDNS"
              :focusable="false"
              @update-checked="toggleGlobalProxyDNS"
            />
          </div>
        </div>

        <n-switch :value="globalProxyEnabled" @update-value="toggleGlobalProxy()" />
      </div>

      <div class="flex justify-between">
        <Button size="small" @click="proxySelect()">
          {{ globalProxyDetails.server ? 'Change location' : 'Select location' }}
        </Button>
        <Button
          v-if="globalProxyDetails.server"
          size="small"
          color="error"
          @click="removeGlobalProxy"
        >
          Remove proxy
        </Button>
      </div>
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
          <div class="mb-2">
            <p class="text-white inline-flex items-center">
              <n-icon size="20">
                <FeGlobe />
              </n-icon>
              <span class="ml-2"
                >{{ hostProxiesDetails[host].country }}, {{ hostProxiesDetails[host].city }}</span
              >
            </p>
            <div class="flex">
              <h4 class="font-semibold">Server</h4>
              <div class="ml-2">{{ hostProxiesDetails[host].server }}</div>
            </div>
            <div class="flex">
              <h4 class="font-semibold pr-2">Proxy DNS</h4>
              <n-checkbox
                size="large"
                :checked="hostProxiesDetails[host].proxyDNS"
                :focusable="false"
                @update-checked="toggleCustomProxyDNS(host)"
              />
            </div>
          </div>
        </div>

        <div class="flex justify-between">
          <Button size="small" class="flex items-center justify-center" @click="proxySelect(host)">
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
