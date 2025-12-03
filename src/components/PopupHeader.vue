<script lang="ts" setup>
import { computed, inject, watch } from 'vue';
import { NIcon, NTag } from 'naive-ui';

import FeCheck from '@/components/Icons/FeCheckCircle.vue';
import FeCog from '@/components/Icons/FeCog.vue';
import FeDrop from '@/components/Icons/FeDrop.vue';
import FeInfo from '@/components/Icons//FeInfo.vue';
import FeXCircle from '@/components/Icons/FeXCircle.vue';
import FeHelpCircle from '@/components/Icons/FeHelpCircle.vue';
import MuSpinner from '@/components/Icons/MuSpinner.vue';
import TitleCategory from '@/components/TitleCategory.vue';

import { openOptions } from '@/helpers/browserExtension';

import useActiveTab from '@/composables/useActiveTab';
import { ConnectionKey, defaultConnection } from '@/composables/useConnection';
import useSocksProxy from '@/composables/useSocksProxy';
import useRandomProxy from '@/composables/useRandomProxy';

defineProps<{
  isLeaking: boolean;
  isErrorDNS: boolean;
  isLoadingDNS: boolean;
  isMullvadDNS: boolean;
  isMullvadDoh: boolean;
}>();

const { activeTabHost, isAboutPage, isExtensionPage } = useActiveTab();
const { connection, isLoading } = inject(ConnectionKey, defaultConnection);
const { globalProxyEnabled, currentHostProxyEnabled } = useSocksProxy();
const { randomProxyMode } = useRandomProxy();

const isMullvad = computed(() => connection.value.isMullvad);
const isProxyInUse = computed(
  () => randomProxyMode.value || currentHostProxyEnabled.value || globalProxyEnabled.value,
);
</script>

<template>
  <div class="flex justify-between mb-3">
    <div>
      <TitleCategory v-if="!isAboutPage && !isExtensionPage" :title="activeTabHost" class="ml-3" />
    </div>

    <div class="flex flex-row self-end">
      <n-tag v-if="isProxyInUse" round type="info">
        <span> Proxy </span>
        <template #icon>
          <n-icon size="20">
            <FeInfo />
          </n-icon>
        </template>
      </n-tag>

      <n-tag round type="info">
        <span> VPN </span>
        <template #icon>
          <n-icon size="20">
            <MuSpinner v-if="isLoading" />
            <FeCheck v-else-if="isMullvad" class="text-success" />
            <FeXCircle v-else class="text-error" />
          </n-icon>
        </template>
      </n-tag>

      <n-tag round type="info">
        <span v-if="isMullvadDoh"> DOH </span>
        <span v-else> DNS </span>
        <template #icon>
          <n-icon size="20">
            <MuSpinner v-if="isLoadingDNS" />
            <FeHelpCircle v-else-if="isErrorDNS" class="text-warning" />
            <FeDrop v-else-if="isLeaking && isMullvad" class="text-error" />
            <FeXCircle v-else-if="isLeaking && !isMullvad" class="text-error" />
            <FeCheck v-else-if="isMullvadDNS" class="text-success" />
            <FeCheck v-else-if="isMullvadDoh" class="text-success" />
          </n-icon>
        </template>
      </n-tag>

      <n-icon size="20" class="hover:text-white cursor-pointer ml-2 mt-1" @click="openOptions()">
        <FeCog />
      </n-icon>
    </div>
  </div>
</template>
