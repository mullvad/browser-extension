<script lang="ts" setup>
import { computed, ref, watch } from 'vue';
import { NCard, NCollapseTransition, NIcon, NSwitch, NTag } from 'naive-ui';

import Button from '@/components/Buttons/Button.vue';
import FeChevronDown from '@/components/Icons/FeChevronDown.vue';
import FeChevronUp from '@/components/Icons/FeChevronUp.vue';
import FeInfo from '@/components/Icons/FeInfo.vue';
import SplitButton from '@/components/Buttons/SplitButton.vue';
import TitleCategory from '@/components/TitleCategory.vue';
import InUseTag from '@/components/Proxy/InUseTag.vue';

import useActiveTab from '@/composables/useActiveTab';
import useLocations from '@/composables/useLocations';
import useProxyPermissions from '@/composables/useProxyPermissions';
import useRandomProxy from '@/composables/useRandomProxy';
import useSocksProxy from '@/composables/useSocksProxy';

const showDetailsAllWebsites = ref(false);
const showDetailsCurrentTab = ref(false);
const showDetailsRandom = ref(false);

const { activeTabDomain, isAboutPage, isExtensionPage } = useActiveTab();
const { proxySelect } = useLocations();
const { isGranted, requestPermissions } = useProxyPermissions();
const { toggleRandomProxyMode, randomProxyMode } = useRandomProxy();
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
  toggleGlobalProxy,
} = useSocksProxy();
import useSocksProxies from '@/composables/useSocksProxies';
import useStore from '@/composables/useStore';

const { flatProxiesList } = useStore();
const { getSocksProxies } = useSocksProxies();

const currentTabExcluded = computed(() => excludedHosts.value.includes(activeTabDomain.value));

const currentTabProxyDetails = computed(() => {
  return hostProxiesDetails.value[activeTabDomain.value] || null;
});

const isCurrentTabProxyOverriden = computed(() => randomProxyMode.value);

const isAllWebsitesProxyOverriden = computed(() =>
  !randomProxyMode.value && !currentHostProxyEnabled.value ? false : true,
);

watch(isGranted, (newValue) => {
  // If permissions are granted and proxies list is empty
  if (newValue && (!flatProxiesList.value || flatProxiesList.value.length === 0)) {
    getSocksProxies();
  }
});
</script>

<template>
  <div>
    <TitleCategory v-if="!isAboutPage && !isExtensionPage" title="Proxies" class="ml-3 mb-2" />
  </div>
  <n-card v-if="isGranted" :bordered="false" class="mb-2">
    <div v-if="!isAboutPage && !isExtensionPage" class="border-[#354f6b] border-b-1 mb-3 pb-3">
      <div
        class="flex justify-between cursor-pointer"
        @click="showDetailsCurrentTab = !showDetailsCurrentTab"
      >
        <div class="flex">
          <TitleCategory :level="3" title="Current tab" />
          <InUseTag v-if="!isCurrentTabProxyOverriden && currentHostProxyEnabled" />
        </div>

        <div class="flex flex-row items-center">
          <n-switch
            v-if="currentTabProxyDetails"
            :value="currentHostProxyEnabled"
            :disabled="isCurrentTabProxyOverriden"
            @update-value="toggleDomainProxy(activeTabDomain)"
            @click.stop
            class="mr-2"
          />

          <n-icon size="20" class="cursor-pointer">
            <FeChevronUp v-if="showDetailsCurrentTab" />
            <FeChevronDown v-else />
          </n-icon>
        </div>
      </div>

      <n-collapse-transition :show="showDetailsCurrentTab" class="mt-2">
        <div class="flex items-center mb-2">
          <n-icon size="20" class="mr-3">
            <FeInfo />
          </n-icon>
          <p>
            Proxy configured for <strong>{{ activeTabDomain }}</strong
            >.
          </p>
        </div>

        <div v-if="currentTabExcluded" class="mb-3">
          <p class="mb-4">{{ activeTabDomain }} is set to never be proxied.</p>
          <Button size="small" @click="allowProxy(activeTabDomain)"
            >Allow proxy for {{ activeTabDomain }}</Button
          >
        </div>
        <div v-if="!currentTabExcluded">
          <div v-if="currentTabProxyDetails" class="flex justify-between">
            <div class="mb-2">
              <h4 class="font-semibold">
                {{ currentTabProxyDetails.city }}, {{ currentTabProxyDetails.country }}
              </h4>
              <div class="flex">
                <h4 class="font-semibold">Server</h4>
                <div class="ml-2">{{ currentTabProxyDetails.server }}</div>
              </div>
            </div>
          </div>

          <div class="flex justify-between">
            <Button size="small" @click="proxySelect(activeTabDomain)">
              {{ currentTabProxyDetails ? 'Change location' : 'Select location' }}
            </Button>
            <SplitButton
              v-if="currentTabProxyDetails"
              size="small"
              main-color="error"
              sub-color="white"
              main-text="Reset"
              sub-text="Never proxy"
              @main-click="removeCustomProxy(activeTabDomain)"
              @sub-click="neverProxyHost(activeTabDomain)"
            />
            <Button
              v-else
              size="small"
              class="flex items-center justify-center"
              @click="neverProxyHost(activeTabDomain)"
            >
              Never proxy
            </Button>
          </div>
        </div>
      </n-collapse-transition>
    </div>

    <div class="border-[#354f6b] border-b-1 mb-3 pb-3">
      <div
        class="flex justify-between cursor-pointer"
        @click="showDetailsAllWebsites = !showDetailsAllWebsites"
      >
        <div class="flex flex-row items-center">
          <TitleCategory :level="3" title="All websites" />
          <InUseTag v-if="!isAllWebsitesProxyOverriden && globalProxyEnabled" />
        </div>

        <div class="flex flex-row items-center">
          <n-switch
            v-if="globalProxyDetails.server"
            :value="globalProxyEnabled"
            :disabled="isAllWebsitesProxyOverriden"
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
            Proxy configured for <strong>all websites</strong>, with the exception of domain
            specific proxies.
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

    <div class="">
      <div
        class="flex justify-between cursor-pointer"
        @click="showDetailsRandom = !showDetailsRandom"
      >
        <div class="flex flex-row items-center">
          <TitleCategory :level="3" title="Random mode" />
          <InUseTag v-if="randomProxyMode" />
        </div>

        <div class="flex flex-row items-center">
          <n-switch
            :value="randomProxyMode"
            @update-value="toggleRandomProxyMode()"
            @click.stop
            class="mr-2"
          />

          <n-icon size="20" class="cursor-pointer">
            <FeChevronUp v-if="showDetailsRandom" />
            <FeChevronDown v-else />
          </n-icon>
        </div>
      </div>

      <n-collapse-transition :show="showDetailsRandom" class="mt-2">
        <div class="flex items-center mb-2">
          <n-icon size="20" class="mr-3">
            <FeInfo />
          </n-icon>
          <p>
            When enabled, a random proxy is assigned per domain. On browser restart, proxies are
            rotated.
            <br />
            This will override any other proxy.
          </p>
        </div>
      </n-collapse-transition>
    </div>
  </n-card>

  <n-card v-else type="line" justify-content="start">
    <TitleCategory :level="2" title="Proxy permissions missing" />

    <div class="flex items-center mb-2">
      <n-icon size="20" class="mr-3">
        <FeInfo />
      </n-icon>
      <p>In order to use proxies, the following permissions are required:</p>
    </div>

    <div class="flex flex-col">
      <ul>
        <li>
          <strong><n-tag round size="small" type="info"> tabs </n-tag></strong> to show proxy
          settings from the active tab
        </li>
        <li>
          <strong><n-tag round size="small" type="info"> proxy </n-tag></strong> to configure and
          use Mullvad proxy servers
        </li>
        <li>
          <strong><n-tag round size="small" type="info"> all_urls </n-tag></strong> to have granular
          proxy settings
        </li>
      </ul>

      <Button size="small" class="mt-3" @click="requestPermissions"> Grant permissions </Button>
    </div>
  </n-card>
</template>
