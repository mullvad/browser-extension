<script lang="ts" setup>
import { computed, inject } from 'vue';
import { NCard } from 'naive-ui';

import ConnectionLocation from '@/components/ConnectionLocation/ConnectionLocation.vue';
import ConnectionStatus from '@/components/ConnectionStatus/ConnectionStatus.vue';
import AdvancedDetails from '@/components/ConnectionDetails/AdvancedDetails.vue';
import IconLabel from '@/components/IconLabel.vue';
import TitleCategory from '@/components/TitleCategory.vue';
import ProxyDetails from '@/components/ProxyDetails/ProxyDetails.vue';

import { ConnectionKey, defaultConnection } from '@/composables/useConnection';

const { isLoading, isError, connection } = inject(ConnectionKey, defaultConnection);
const connected = computed(() => connection.value.isMullvad);
</script>

<template>
  <TitleCategory title="Connection" />

  <n-card :bordered="false">
    <p class="text-xl mb-2">
      <IconLabel v-if="isLoading" text="Checking connection" type="spinner" />
      <IconLabel v-else-if="isError" text="Couldn't get connection details" type="warning" />
      <ConnectionLocation v-else class="mb-2" />
    </p>

    <AdvancedDetails v-if="!isLoading && !isError" />
    <ConnectionStatus v-if="connected" />

    <ProxyDetails />
  </n-card>
</template>
