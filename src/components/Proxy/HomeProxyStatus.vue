<script lang="ts" setup>
import { computed, inject } from 'vue';
import { NSwitch, NTabPane, NTabs, NTag } from 'naive-ui';

import Button from '@/components/Buttons/Button.vue';
import SplitButton from '@/components/Buttons/SplitButton.vue';
import IconLabel from '@/components/IconLabel.vue';
import TitleCategory from '@/components/TitleCategory.vue';

import useActiveTab from '@/composables/useActiveTab';
import { ConnectionKey, defaultConnection } from '@/composables/useConnection';
import useLocations from '@/composables/useLocations';
import useSocksProxy from '@/composables/useSocksProxy';

const { activeTabHost, isBrowserPage } = useActiveTab();
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
const { hostProxySelect, toggleLocations } = useLocations();
const { connection } = inject(ConnectionKey, defaultConnection);

const currentHostExcluded = computed(() => excludedHosts.value.includes(activeTabHost.value));

const handleProxySelect = (customProxy: boolean) => {
  hostProxySelect.value = customProxy;
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

  <n-tabs v-else type="line" justify-content="space-evenly">
    <template #prefix>
      <TitleCategory title="Proxy" />
    </template>

    <n-tab-pane name="default" tab="All websites">
      <template #tab>
        <div class="flex items-center">
          All websites
          <n-tag round :bordered="false" type="success" class="mr-4"> active </n-tag>
        </div>
      </template>

      <div class="flex justify-between mb-3">
        <div v-if="globalProxyDetails.server">
          <h4 class="font-semibold">
            {{ globalProxyDetails.city }}, {{ globalProxyDetails.country }}
          </h4>
          <div class="flex">
            <h4 class="font-semibold">Server</h4>
            <div class="ml-2">{{ globalProxyDetails.server }}</div>
          </div>
        </div>

        <n-switch
          v-if="globalProxyDetails.server"
          :value="globalProxyEnabled"
          @update-value="toggleGlobalProxy()"
        />
      </div>

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

    <n-tab-pane v-if="!isBrowserPage" name="current" tab="Current website">
      <div v-if="currentHostProxyDetails">
        <div class="flex justify-between mb-3">
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
            <h1 class="font-semibold text-lg mb-2 text-gray-200">{{ host }}</h1>
            <n-switch
              v-if="currentHostProxyDetails"
              :value="currentHostProxyEnabled"
              @update-value="toggleCurrentHostProxy()"
            />
          </div>
        </div>

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

      <div v-else class="flex justify-between">
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
    </n-tab-pane>
  </n-tabs>
</template>
