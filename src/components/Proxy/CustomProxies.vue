<script lang="ts" setup>
import { computed, ref } from 'vue';
import {
  NCard,
  NCheckbox,
  NDivider,
  NIcon,
  NCollapseTransition,
  NInput,
  NSwitch,
  NTooltip,
} from 'naive-ui';

import Button from '@/components/Buttons/Button.vue';
import FeChevronDown from '@/components/Icons/FeChevronDown.vue';
import FeChevronUp from '@/components/Icons/FeChevronUp.vue';
import FeInfo from '@/components/Icons/FeInfo.vue';
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
const showDetailsAllWebsites = ref(false);
const expandedHosts = ref<Record<string, boolean>>({});

const combinedHosts = computed(() => {
  const allHosts = [...Object.keys(hostProxiesDetails.value), ...excludedHosts.value];
  return [...new Set(allHosts)].sort((a, b) => a.localeCompare(b));
});

const toggleHostDetails = (host: string) => {
  expandedHosts.value[host] = !expandedHosts.value[host];
};

const isHostExpanded = (host: string) => {
  return !!expandedHosts.value[host];
};

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

    <n-divider class="!mb-3" />

    <div class="border-[#354f6b] border-b mb-3 pb-3">
      <div
        class="flex justify-between cursor-pointer"
        @click="showDetailsAllWebsites = !showDetailsAllWebsites"
      >
        <TitleCategory :level="3" title="All websites" />
        <div class="flex flex-row items-center">
          <n-switch
            v-if="globalProxyDetails.server"
            :value="globalProxyEnabled"
            @update-value="toggleGlobalProxy()"
            @click.stop
            class="mr-2"
          />
          <n-icon size="20" class="cursor-pointer">
            <FeChevronUp v-if="showDetailsAllWebsites" />
            <FeChevronDown v-else />
          </n-icon>
        </div>
      </div>

      <n-collapse-transition :show="showDetailsAllWebsites" class="mt-2">
        <div class="flex items-center mb-2">
          <n-icon size="20" class="mr-3">
            <FeInfo />
          </n-icon>
          <p>
            Proxy configured for <strong>all websites</strong>, with the exception of domains listed
            below.
          </p>
        </div>

        <div v-if="globalProxyDetails.server" class="mb-3">
          <div class="flex">
            <h4 class="font-semibold">Location</h4>
            <div class="ml-2">{{ globalProxyDetails.city }}, {{ globalProxyDetails.country }}</div>
          </div>
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

        <div class="flex justify-between">
          <Button size="small" @click="proxySelect()" class="mr-2">
            {{ globalProxyDetails.server ? 'Change location' : 'Select location' }}
          </Button>
          <Button
            v-if="globalProxyDetails.server"
            size="small"
            color="error"
            @click="removeGlobalProxy"
          >
            Reset
          </Button>
        </div>
      </n-collapse-transition>
    </div>

    <div
      v-for="(host, index) in combinedHosts"
      :key="host"
      :class="[
        'border-[#354f6b] border-b-1 pb-3',
        {
          'mb-3': index < combinedHosts.length - 1,
          'border-b-0': index === combinedHosts.length - 1,
        },
      ]"
    >
      <div class="flex justify-between cursor-pointer" @click="toggleHostDetails(host)">
        <TitleCategory :level="3" :title="host" />
        <div class="flex flex-row items-center">
          <n-tooltip
            v-if="
              host in hostProxiesDetails &&
              !excludedHosts.includes(host) &&
              hostProxiesDetails[host].server
            "
          >
            <template #trigger>
              <n-switch
                :value="hostProxiesDetails[host].socksEnabled"
                @update-value="toggleCustomProxy(host)"
                @click.stop
                class="mr-2"
              />
            </template>
            <span>{{
              hostProxiesDetails[host].socksEnabled ? 'Proxy enabled' : 'Proxy disabled'
            }}</span>
          </n-tooltip>
          <n-icon size="20" class="cursor-pointer">
            <FeChevronUp v-if="isHostExpanded(host)" />
            <FeChevronDown v-else />
          </n-icon>
        </div>
      </div>

      <n-collapse-transition :show="isHostExpanded(host)" class="mt-2">
        <template v-if="host in hostProxiesDetails && !excludedHosts.includes(host)">
          <div class="flex items-center mb-2">
            <n-icon size="20" class="mr-3">
              <FeInfo />
            </n-icon>
            <p>
              Proxy configured for <strong>{{ host }}</strong
              >.
            </p>
          </div>

          <div v-if="hostProxiesDetails[host].server" class="mb-3">
            <div class="flex">
              <h4 class="font-semibold">Location</h4>
              <div class="ml-2">
                {{ hostProxiesDetails[host].city }}, {{ hostProxiesDetails[host].country }}
              </div>
            </div>
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

          <div class="flex justify-between">
            <Button size="small" @click="proxySelect(host)" class="mr-2">
              {{ hostProxiesDetails[host].server ? 'Change location' : 'Select location' }}
            </Button>
            <SplitButton
              v-if="hostProxiesDetails[host].server"
              size="small"
              main-color="error"
              sub-color="white"
              main-text="Reset"
              sub-text="Never proxy"
              @main-click="removeCustomProxy(host)"
              @sub-click="neverProxyHost(host)"
            />
            <Button
              v-else
              size="small"
              class="flex items-center justify-center"
              @click="neverProxyHost(host)"
            >
              Never proxy
            </Button>
          </div>
        </template>

        <template v-else>
          <div class="flex items-center mb-2">
            <n-icon size="20" class="mr-3">
              <FeInfo />
            </n-icon>
            <p>
              <strong>{{ host }}</strong> is set to never be proxied.
            </p>
          </div>
          <Button size="small" @click="allowProxy(host)">Allow proxying</Button>
        </template>
      </n-collapse-transition>
    </div>
  </NCard>
</template>
