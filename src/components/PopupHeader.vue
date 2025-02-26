<script lang="ts" setup>
import { computed, inject } from 'vue';
import { NIcon, NTag } from 'naive-ui';

import FeCheck from '@/components/Icons/FeCheckCircle.vue';
import FeCog from '@/components/Icons/FeCog.vue';
import FeDrop from '@/components/Icons/FeDrop.vue';
import FeXCircle from '@/components/Icons/FeXCircle.vue';
import FeHelpCircle from '@/components/Icons/FeHelpCircle.vue';
import MuSpinner from '@/components/Icons/MuSpinner.vue';

import { openOptions } from '@/helpers/browserExtension';

import useActiveTab from '@/composables/useActiveTab';
import { ConnectionKey, defaultConnection } from '@/composables/useConnection';

defineProps<{
  isLeaking: boolean;
  isErrorDNS: boolean;
  isLoadingDNS: boolean;
  isMullvadDNS: boolean;
  isMullvadDoh: boolean;
}>();

const { activeTabHost } = useActiveTab();
const { connection, isLoading } = inject(ConnectionKey, defaultConnection);

const isMullvad = computed(() => connection.value.isMullvad);
</script>

<template>
  <div class="flex justify-between mb-3">
    <h3 class="font-bold break-words ml-3">{{ activeTabHost }}</h3>

    <div class="flex flex-row">
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
