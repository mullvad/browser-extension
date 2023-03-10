<script lang="ts" setup>
import { computed, inject } from 'vue';
import { NCard } from 'naive-ui';

import ConnectionLocation from '@/components/ConnectionLocation/ConnectionLocation.vue';
import AdvancedDns from '@/components/ConnectionDetails/AdvancedDns.vue';
import AdvancedInfo from '@/components/ConnectionDetails/AdvancedInfo.vue';
import IconLabel from '@/components/IconLabel.vue';
import TitleCategory from '@/components/TitleCategory.vue';
import ProxyDetails from '@/components/ProxyDetails/ProxyDetails.vue';

import UsingMullvadConnectionStatus from '@/components/ConnectionStatus/UsingMullvadConnectionStatus.vue';
import DnsLeakStatus from '@/components/ConnectionStatus/DnsLeakStatus.vue';

import { ConnectionKey, defaultConnection } from '@/composables/useConnection';

const { isLoading, isError, connection } = inject(ConnectionKey, defaultConnection);
const connected = computed(() => connection.value.isMullvad);
</script>

<template>
  <TitleCategory title="Connection" />

  <n-card :bordered="false">
    <p class="text-xl mb-4">
      <IconLabel v-if="isLoading" text="Checking connection" type="spinner" />
      <IconLabel v-else-if="isError" text="Couldn't get connection details" type="warning" />
      <ConnectionLocation v-else class="mb-2" />
    </p>

    <div class="mb-4">
      <UsingMullvadConnectionStatus v-if="connected" />
      <AdvancedInfo v-if="!isLoading && !isError" :disabled="isLoading" />
    </div>

    <div class="mb-4">
      <DnsLeakStatus v-if="connected" />
      <AdvancedDns v-if="!isLoading && !isError" :disabled="isLoading" class="mb-2" />
    </div>

    <ProxyDetails />
  </n-card>
</template>
