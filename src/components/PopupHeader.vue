<script lang="ts" setup>
import { computed, inject } from 'vue';
import { NIcon, NTag } from 'naive-ui';

import FeCog from '@/components/Icons/FeCog.vue';
import FeDrop from '@/components/Icons/FeDrop.vue';
import FeHelpCircle from '@/components/Icons/FeHelpCircle.vue';
import FeLock from '@/components/Icons/FeLock.vue';
import FeLockOff from '@/components/Icons/FeLockOff.vue';
import FePower from './Icons/FePower.vue';
import FeShuffle from '@/components/Icons//FeShuffle.vue';
import FeXCircle from '@/components/Icons/FeXCircle.vue';
import MuSpinner from '@/components/Icons/MuSpinner.vue';
import TitleCategory from '@/components/TitleCategory.vue';

import { openOptions } from '@/helpers/browserExtension';

import useActiveTab from '@/composables/useActiveTab';
const {
  isError: isErrorDNS,
  isLeaking,
  isLoading: isLoadingDNS,
  isMullvadDNS,
  isMullvadDoh,
} = useCheckDnsLeaks();
import { ConnectionKey, defaultConnection } from '@/composables/useConnection';
import useRandomProxy from '@/composables/useRandomProxy';
import useCheckDnsLeaks from '@/composables/useCheckDnsLeaks';

defineProps<{
  isProxyInUse: boolean;
}>();

const { activeTabHost, isAboutPage, isExtensionPage } = useActiveTab();
const { randomProxyMode } = useRandomProxy();
const { connection, isLoading, isError } = inject(ConnectionKey, defaultConnection);

const isMullvad = computed(() => connection.value.isMullvad);
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
            <FeShuffle v-if="randomProxyMode" class="text-success" />
            <FePower v-else class="text-success" />
          </n-icon>
        </template>
      </n-tag>

      <n-tag round type="info" class="ml-1">
        <span> VPN </span>
        <template #icon>
          <n-icon size="20">
            <MuSpinner v-if="isLoading" />
            <FeLock v-else-if="isMullvad" class="text-success" />
            <FeHelpCircle v-else-if="isError" class="text-warning" />
            <FeLockOff v-else class="text-error" />
          </n-icon>
        </template>
      </n-tag>

      <n-tag round type="info" class="ml-1">
        <span v-if="isMullvadDoh"> DOH </span>
        <span v-else> DNS </span>
        <template #icon>
          <n-icon size="20">
            <MuSpinner v-if="isLoadingDNS" />
            <FeHelpCircle v-else-if="isErrorDNS" class="text-warning" />
            <FeDrop v-else-if="isLeaking && isMullvad" class="text-error" />
            <FeXCircle v-else-if="isLeaking && !isMullvad" class="text-error" />
            <FeLock v-else-if="isMullvadDNS || isMullvadDoh" class="text-success" />
          </n-icon>
        </template>
      </n-tag>

      <n-icon size="20" class="hover:text-white cursor-pointer ml-2 mt-1" @click="openOptions()">
        <FeCog />
      </n-icon>
    </div>
  </div>
</template>
