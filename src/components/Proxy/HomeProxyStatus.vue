<script lang="ts" setup>
import { computed, inject, ref, watch } from 'vue';
import { NSwitch, NTabPane, NTabs } from 'naive-ui';

import Button from '@/components/Buttons/Button.vue';
import SplitButton from '@/components/Buttons/SplitButton.vue';
import IconLabel from '@/components/IconLabel.vue';
import TitleCategory from '@/components/TitleCategory.vue';

import useActiveTab from '@/composables/useActiveTab';
import useConnection, { ConnectionKey, defaultConnection } from '@/composables/useConnection';
import useLocations from '@/composables/useLocations';
import useProxyPermissions from '@/composables/useProxyPermissions';
import useSocksProxies from '@/composables/useSocksProxies/useSocksProxies';
import useSocksProxy from '@/composables/useSocksProxy';
import { checkDomain } from '@/helpers/domain';

const { activeTabHost, isBrowserPage } = useActiveTab();
const { updateConnection } = useConnection();
const { proxySelect } = useLocations();
const { isGranted, requestPermissions } = useProxyPermissions();
const { getSocksProxies } = useSocksProxies();
const {
  allowProxy,
  currentHostProxyEnabled,
  hostProxiesDetails,
  excludedHosts,
  globalProxyEnabled,
  globalProxyDetails,
  neverProxyHost,
  removeCustomProxy,
  removeGlobalProxy,
  toggleDomainProxy,
  toggleSubDomainProxy,
  toggleGlobalProxy,
} = useSocksProxy();
const { connection } = inject(ConnectionKey, defaultConnection);

const currentHostExcluded = computed(() => excludedHosts.value.includes(activeTabHost.value));

const tabDomain = computed(() => {
  const { domain, hasSubdomain, subDomain } = checkDomain(activeTabHost.value);

  return {
    domain,
    hasSubdomain,
    subDomain,
  };
});

const hasSubDomainProxy = computed(() => {
  if (!tabDomain.value.hasSubdomain) return false;
  return !!hostProxiesDetails.value[tabDomain.value.subDomain];
});

const truncatedDomain = computed(() => {
  const host = tabDomain.value.domain;
  return host.length <= 16 ? host : `${host.substring(0, 8)}...${host.slice(-8)}`;
});

const truncatedSubDomain = computed(() => {
  const host = tabDomain.value.subDomain;
  return host.length <= 16 ? host : `${host.substring(0, 8)}...${host.slice(-8)}`;
});

const domainProxyDetails = computed(() => {
  return hostProxiesDetails.value[tabDomain.value.domain] || null;
});

const subDomainProxyDetails = computed(() =>
  hostProxiesDetails.value[activeTabHost.value] && activeTabHost.value !== tabDomain.value.domain
    ? hostProxiesDetails.value[activeTabHost.value]
    : null,
);

const subDomainProxyEnabled = computed(() => {
  const host = activeTabHost.value;
  return hostProxiesDetails.value[host]?.socksEnabled ?? false;
});

const lastClickedTab = ref<string | null>(null);

const defaultActiveTab = computed(() => {
  // Check subdomain first (active proxy or excluded)
  if (
    tabDomain.value.hasSubdomain &&
    (subDomainProxyEnabled.value || excludedHosts.value.includes(tabDomain.value.subDomain))
  ) {
    return 'current-sub-domain';
  }
  // Check domain (active proxy or excluded)
  if (
    domainProxyDetails.value?.socksEnabled ||
    excludedHosts.value.includes(tabDomain.value.domain)
  ) {
    return 'current-domain';
  }
  // Default to all websites
  return 'all-websites';
});

const activeTab = computed(() => lastClickedTab.value || defaultActiveTab.value);

const handleTabClick = (tabName: string) => {
  lastClickedTab.value = tabName;
};

const handleProxySelect = async (host?: string) => {
  proxySelect(host);
  await getSocksProxies();
};
const handleRemoveGlobalProxy = () => {
  removeGlobalProxy();
  updateConnection();
};

const handleToggleGlobalProxy = () => {
  toggleGlobalProxy();
  updateConnection();
};

const handleRemoveProxy = (host: string) => {
  removeCustomProxy(host);
  // Force switch to default tab otherwise it doesn't work
  lastClickedTab.value = defaultActiveTab.value;
};

watch([currentHostProxyEnabled, subDomainProxyEnabled, domainProxyDetails, excludedHosts], () => {
  lastClickedTab.value = null;
});
</script>

<template>
  <n-tabs
    v-if="isGranted"
    type="line"
    justify-content="start"
    :value="activeTab"
    @update:value="handleTabClick"
  >
    <template #prefix>
      <TitleCategory title="Proxy" />
    </template>

    <n-tab-pane name="all-websites" tab="All websites">
      <div v-if="globalProxyDetails.server" class="flex justify-between">
        <div class="mb-2">
          <h4 class="font-semibold">
            {{ globalProxyDetails.city }}, {{ globalProxyDetails.country }}
          </h4>
          <div class="flex">
            <h4 class="font-semibold">Server</h4>
            <div class="ml-2">{{ globalProxyDetails.server }}</div>
          </div>
        </div>

        <n-switch :value="globalProxyEnabled" @update-value="handleToggleGlobalProxy()" />
      </div>

      <IconLabel v-if="globalProxyEnabled && !connection.isMullvad" type="warning" class="mb-2">
        Internet can't be reached, either disconnect the proxy for <strong>all websites</strong> or
        connect to Mullvad VPN.
      </IconLabel>

      <p v-else class="mb-2">
        {{ globalProxyEnabled ? 'This' : 'When enabled, this' }} proxy is used by
        <strong>all websites</strong>, with the exception of domain specific proxies.
      </p>

      <div class="flex justify-between">
        <Button size="small" @click="handleProxySelect()">
          {{ globalProxyDetails.server ? 'Change location' : 'Select location' }}
        </Button>
        <Button
          v-if="globalProxyDetails.server"
          size="small"
          color="error"
          @click="handleRemoveGlobalProxy"
        >
          Remove proxy
        </Button>
      </div>
    </n-tab-pane>

    <n-tab-pane v-if="!isBrowserPage" name="current-domain" :tab="truncatedDomain">
      <div>
        <h3 class="font-bold mb-2 break-words">{{ tabDomain.domain }}</h3>
        <div v-if="excludedHosts.includes(tabDomain.domain)">
          <p class="mb-4">This domain is set to never be proxied.</p>
          <Button size="small" @click="allowProxy(tabDomain.domain)">Allow proxy for domain</Button>
        </div>
        <div v-else>
          <div v-if="domainProxyDetails" class="flex justify-between mb-2">
            <div>
              <h4 class="font-semibold">
                {{ domainProxyDetails.city }}, {{ domainProxyDetails.country }}
              </h4>
              <div class="flex">
                <h4 class="font-semibold">Server</h4>
                <div class="ml-2">{{ domainProxyDetails.server }}</div>
              </div>
            </div>
            <n-switch
              :value="domainProxyDetails?.socksEnabled"
              @update-value="() => toggleDomainProxy(tabDomain.domain)"
            />
          </div>
          <div class="flex justify-between">
            <Button size="small" @click="handleProxySelect(tabDomain.domain)">
              {{ domainProxyDetails ? 'Change location' : 'Select location' }}
            </Button>
            <SplitButton
              v-if="domainProxyDetails"
              size="small"
              main-color="error"
              sub-color="white"
              main-text="Remove proxy"
              sub-text="Never proxy"
              @main-click="removeCustomProxy(tabDomain.domain)"
              @sub-click="neverProxyHost(tabDomain.domain)"
            />
            <Button
              v-else
              size="small"
              class="flex items-center justify-center"
              @click="neverProxyHost(tabDomain.domain)"
            >
              Never proxy
            </Button>
          </div>
        </div>
      </div>
    </n-tab-pane>

    <n-tab-pane v-if="hasSubDomainProxy" name="current-sub-domain" :tab="truncatedSubDomain">
      <div class="mb-6">
        <h3 class="font-bold mb-2 break-words">{{ tabDomain.subDomain }}</h3>
        <div v-if="currentHostExcluded">
          <p class="mb-4">This subdomain is set to never be proxied.</p>
          <Button size="small" @click="allowProxy(tabDomain.subDomain)"
            >Allow proxy for this subdomain</Button
          >
        </div>
        <div v-else>
          <div v-if="subDomainProxyDetails" class="flex justify-between mb-2">
            <div>
              <h4 class="font-semibold">
                {{ subDomainProxyDetails.city }}, {{ subDomainProxyDetails.country }}
              </h4>
              <div class="flex">
                <h4 class="font-semibold">Server</h4>
                <div class="ml-2">{{ subDomainProxyDetails.server }}</div>
              </div>
            </div>
            <n-switch
              :value="subDomainProxyEnabled"
              @update-value="toggleSubDomainProxy(tabDomain.subDomain)"
            />
          </div>
          <div class="flex justify-between">
            <Button size="small" @click="handleProxySelect(tabDomain.subDomain)">
              {{ subDomainProxyDetails ? 'Change location' : 'Select location' }}
            </Button>
            <SplitButton
              v-if="subDomainProxyDetails"
              size="small"
              main-color="error"
              sub-color="white"
              main-text="Remove proxy"
              sub-text="Never proxy"
              @main-click="handleRemoveProxy(tabDomain.subDomain)"
              @sub-click="neverProxyHost(tabDomain.subDomain)"
            />
          </div>
        </div>
      </div>
    </n-tab-pane>
  </n-tabs>

  <n-tabs v-else type="line" justify-content="start">
    <template #prefix>
      <TitleCategory title="Proxy" />
    </template>

    <n-tab-pane name="permissions" tab="Permissions missing">
      <div class="flex flex-col">
        <ul>
          <li>- <strong>tabs</strong> to show proxy settings from the active tab</li>
          <li>- <strong>proxy</strong> to configure and use Mullvad proxy servers</li>
          <li>- <strong>&lt;all_urls&gt;</strong> to have granular proxy settings</li>
        </ul>

        <Button size="small" class="mt-3" @click="requestPermissions"> Grant permissions </Button>
      </div>
    </n-tab-pane>
  </n-tabs>
</template>
