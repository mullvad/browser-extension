<script lang="ts" setup>
import { computed, inject, ref } from 'vue';
import { NSwitch, NTabPane, NTabs } from 'naive-ui';

import Button from '@/components/Buttons/Button.vue';
import SplitButton from '@/components/Buttons/SplitButton.vue';
import IconLabel from '@/components/IconLabel.vue';
import TitleCategory from '@/components/TitleCategory.vue';

import useActiveTab from '@/composables/useActiveTab';
import { ConnectionKey, defaultConnection } from '@/composables/useConnection';
import useListProxies from '@/composables/useSocksProxies/useSocksProxies';
import useLocations from '@/composables/useLocations';
import useProxyPermissions from '@/composables/useProxyPermissions';
import useSocksProxy from '@/composables/useSocksProxy';

const { activeTabHost, isBrowserPage } = useActiveTab();
const { proxyPermissionsGranted, triggerRequestProxyPermissions } = useProxyPermissions();
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
const { getSocksProxies } = useListProxies();
const { proxySelect } = useLocations();
const { connection } = inject(ConnectionKey, defaultConnection);

const currentHostExcluded = computed(() => excludedHosts.value.includes(activeTabHost.value));

const truncatedActiveTabHost = computed(() => {
  // Adjust this based on design
  return activeTabHost.value.length <= 25
    ? activeTabHost.value
    : `${activeTabHost.value.substring(0, 15)}...${activeTabHost.value.slice(-15)}`;
});

const lastClickedTab = ref<string | null>(null);
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

        <n-switch :value="globalProxyEnabled" @update-value="toggleGlobalProxy()" />
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
          @click="removeGlobalProxy"
        >
          Remove proxy
        </Button>
      </div>
    </n-tab-pane>

    <n-tab-pane v-if="!isBrowserPage" name="current-website" :tab="truncatedActiveTabHost">
      <div v-if="currentHostExcluded">
        <p class="break-words mb-4">
          <strong>{{ activeTabHost }}</strong> is set to never be proxied.
        </p>

        <Button
          size="small"
          class="flex items-center justify-center"
          @click="allowProxy(activeTabHost)"
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
          This proxy is used by <strong>{{ activeTabHost }}</strong
          >.
        </p>

        <div class="flex justify-between">
          <Button
            size="small"
            class="flex items-center justify-center"
            @click="handleProxySelect(activeTabHost)"
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
              @main-click="removeCustomProxy(activeTabHost)"
              @sub-click="neverProxyHost(activeTabHost)"
            />
          </div>
        </div>
      </div>

      <div v-else>
        <p class="break-words mb-4">
          When enabled, this proxy is used by <strong>{{ activeTabHost }}</strong
          >.
        </p>

        <div class="flex justify-between">
          <Button
            size="small"
            class="flex items-center justify-center"
            @click="handleProxySelect(activeTabHost)"
          >
            {{ currentHostProxyDetails ? 'Change location' : 'Select location' }}
          </Button>

          <Button
            size="small"
            class="flex items-center justify-center"
            @click="neverProxyHost(activeTabHost)"
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
