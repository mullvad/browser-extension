<script lang="ts" setup>
import { computed, inject } from 'vue';
import { NSwitch, NTabPane, NTabs, NTag } from 'naive-ui';

import Button from '@/components/Buttons/Button.vue';
import SplitButton from '@/components/Buttons/SplitButton.vue';
import IconLabel from '@/components/IconLabel.vue';
import TitleCategory from '@/components/TitleCategory.vue';

import useActiveTab from '@/composables/useActiveTab';
import { ConnectionKey, defaultConnection } from '@/composables/useConnection';
import useListProxies from '@/composables/useListProxies';
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
const { hostProxySelect, toggleLocations } = useLocations();
const { connection } = inject(ConnectionKey, defaultConnection);

const currentHostExcluded = computed(() => excludedHosts.value.includes(activeTabHost.value));

const truncatedActiveTabHost = computed(() => {
  return activeTabHost.value.length <= 25
    ? activeTabHost.value
    : `${activeTabHost.value.substring(0, 18)}...${activeTabHost.value.slice(-7)}`;
});

const handleProxySelect = async (customProxy: boolean) => {
  hostProxySelect.value = customProxy;
  await getSocksProxies();
  toggleLocations();
};
</script>

<template>
  <IconLabel v-if="currentHostProxyEnabled && !connection.isMullvad" type="warning" class="my-2">
    <strong>{{ activeTabHost }}</strong> can't be reached, either disable the proxy in use or
    connect to Mullvad VPN.
  </IconLabel>

  <div v-if="currentHostExcluded">
    <IconLabel type="info" class="my-2">
      <strong>{{ activeTabHost }}</strong> is set to never be proxied
    </IconLabel>
    <Button class="flex items-center justify-center" @click="allowProxy(activeTabHost)">
      <p>
        Allow proxy for <strong>{{ activeTabHost }}</strong>
      </p>
    </Button>
  </div>

  <n-tabs v-else-if="proxyPermissionsGranted" type="line" justify-content="start">
    <template #prefix>
      <TitleCategory title="Proxy" />
    </template>

    <n-tab-pane name="all-websites">
      <template #tab>
        <div class="flex items-center">
          All websites
          <n-tag round :bordered="false" type="success" class="mx-2"> in use </n-tag>
        </div>
      </template>

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

      <p class="mb-4">
        {{ globalProxyEnabled ? 'This' : 'When enabled, this' }} proxy is used by
        <strong>all websites</strong>, with the exception of domain specific proxies.
      </p>

      <div class="flex justify-between">
        <Button size="small" @click="handleProxySelect(false)">
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

    <n-tab-pane v-if="!isBrowserPage" name="current" :tab="truncatedActiveTabHost">
      <div v-if="currentHostProxyDetails">
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

        <p class="break-all mb-4">
          This proxy is used by <strong>{{ activeTabHost }}</strong
          >.
        </p>

        <div class="flex justify-between">
          <Button
            size="small"
            class="flex items-center justify-center"
            @click="handleProxySelect(true)"
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
        <p class="break-all mb-4">
          When enabled, this proxy is used by <strong>{{ activeTabHost }}</strong
          >.
        </p>

        <div class="flex justify-between">
          <Button
            size="small"
            class="flex items-center justify-center"
            @click="handleProxySelect(true)"
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
