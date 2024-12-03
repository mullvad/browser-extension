<script lang="ts" setup>
import { computed, inject, ref } from 'vue';
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
const { proxyPermissionsGranted, triggerRequestProxyPermissions } = useProxyPermissions();
const { getSocksProxies } = useSocksProxies();
const {
  allowProxy,
  currentHostProxyDetails,
  currentHostProxyEnabled,
  excludedHosts,
  globalProxyEnabled,
  globalProxyDetails,
  neverProxyHost,
  removeCustomProxy,
  removeGlobalProxy,
  toggleCurrentHostProxy,
  toggleGlobalProxy,
} = useSocksProxy();
const { connection } = inject(ConnectionKey, defaultConnection);
const lastClickedTab = ref<string | null>(null);

const currentHostExcluded = computed(() => excludedHosts.value.includes(activeTabHost.value));

const tabDisplayHost = computed(() => {
  const { hasSubdomain, domain } = checkDomain(activeTabHost.value);

  console.log('hasSubdomain', hasSubdomain, domain);

  // Check if there's a proxy configured for the parent domain
  const hasParentDomainProxy =
    hasSubdomain &&
    Object.keys(currentHostProxyDetails.value || {}).length > 0 &&
    currentHostProxyDetails.value?.server;

  // If parent domain has a proxy configured, show the parent domain
  if (hasParentDomainProxy) {
    return domain;
  }

  // Otherwise show the full hostname
  return activeTabHost.value;
});

const truncatedActiveTabHost = computed(() => {
  const host = tabDisplayHost.value;
  return host.length <= 25 ? host : `${host.substring(0, 15)}...${host.slice(-15)}`;
});

const defaultActiveTab = computed(() =>
  currentHostProxyEnabled.value || currentHostExcluded.value ? 'current-website' : 'all-websites',
);
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
</script>

<template>
  <n-tabs
    v-if="proxyPermissionsGranted"
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

    <n-tab-pane v-if="!isBrowserPage" name="current-website" :tab="truncatedActiveTabHost">
      <div v-if="currentHostExcluded">
        <p class="break-words mb-4">
          <strong>{{ tabDisplayHost }}</strong> is set to never be proxied.
        </p>

        <Button
          size="small"
          class="flex items-center justify-center"
          @click="allowProxy(tabDisplayHost)"
        >
          <p>
            Allow proxy for <strong>{{ truncatedActiveTabHost }}</strong>
          </p>
        </Button>
      </div>

      <div v-else-if="currentHostProxyDetails">
        <div class="flex justify-between mb-2">
          <div>
            <div class="flex">
              <h4 class="font-semibold">
                {{ currentHostProxyDetails.city }}, {{ currentHostProxyDetails.country }}
              </h4>
            </div>
            <div class="flex">
              <h4 class="font-semibold">Server</h4>
              <div class="ml-2">{{ currentHostProxyDetails.server }}</div>
            </div>
          </div>

          <div class="flex justify-between">
            <n-switch
              v-if="currentHostProxyDetails"
              :value="currentHostProxyEnabled"
              @update-value="toggleCurrentHostProxy()"
            />
          </div>
        </div>

        <IconLabel
          v-if="currentHostProxyEnabled && !connection.isMullvad"
          type="warning"
          class="my-2"
        >
          <strong>{{ truncatedActiveTabHost }}</strong> can't be reached, either disable the proxy
          in use or connect to Mullvad VPN.
        </IconLabel>

        <p v-else class="break-words mb-4">
          This proxy is used by <strong>{{ tabDisplayHost }}</strong
          >.
        </p>

        <div class="flex justify-between">
          <Button
            size="small"
            class="flex items-center justify-center"
            @click="handleProxySelect(tabDisplayHost)"
          >
            {{ currentHostProxyDetails ? 'Change location' : 'Select location' }}
          </Button>

          <div>
            <SplitButton
              size="small"
              main-color="error"
              sub-color="white"
              main-text="Remove proxy"
              sub-text="Never proxy"
              @main-click="removeCustomProxy(tabDisplayHost)"
              @sub-click="neverProxyHost(tabDisplayHost)"
            />
          </div>
        </div>
      </div>

      <div v-else>
        <p class="break-words mb-4">
          When enabled, this proxy is used by <strong>{{ tabDisplayHost }}</strong
          >.
        </p>

        <div class="flex justify-between">
          <Button
            size="small"
            class="flex items-center justify-center"
            @click="handleProxySelect(tabDisplayHost)"
          >
            {{ currentHostProxyDetails ? 'Change location' : 'Select location' }}
          </Button>

          <Button
            size="small"
            class="flex items-center justify-center"
            @click="neverProxyHost(tabDisplayHost)"
          >
            Never proxy
          </Button>
        </div>
      </div>
    </n-tab-pane>

    <n-tab-pane
      v-if="!proxyPermissionsGranted"
      name="permissions"
      tab="Permissions missing"
      class="flex flex-col"
    >
      <ul>
        <li>- <strong>tabs</strong> to show proxy settings from the active tab</li>
        <li>- <strong>proxy</strong> to configure and use Mullvad proxy servers</li>
        <li>- <strong>&lt;all_urls&gt;</strong> to have granular proxy settings</li>
      </ul>

      <Button size="small" class="mt-3" @click="triggerRequestProxyPermissions">
        Grant permissions
      </Button>
    </n-tab-pane>
  </n-tabs>

  <n-tabs v-if="!proxyPermissionsGranted" type="line" justify-content="start">
    <template #prefix>
      <TitleCategory title="Proxy" />
    </template>

    <n-tab-pane v-if="!proxyPermissionsGranted" name="permissions" tab="Permissions missing">
      <div class="flex flex-col">
        <ul>
          <li>- <strong>tabs</strong> to show proxy settings from the active tab</li>
          <li>- <strong>proxy</strong> to configure and use Mullvad proxy servers</li>
          <li>- <strong>&lt;all_urls&gt;</strong> to have granular proxy settings</li>
        </ul>

        <Button size="small" class="mt-3" @click="triggerRequestProxyPermissions">
          Grant permissions
        </Button>
      </div>
    </n-tab-pane>
  </n-tabs>
</template>
