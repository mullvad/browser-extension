<script lang="ts" setup>
import { computed, inject } from 'vue';
import { NCard } from 'naive-ui';

import ConnectionLocation from '@/components/ConnectionLocation/ConnectionLocation.vue';
import ConnectionStatus from '@/components/ConnectionStatus/ConnectionStatus.vue';
import DetailsCollapse from '@/components/ConnectionDetails/DetailsCollapse.vue';
import ProxyCollapse from '@/components/ConnectionDetails/ProxyCollapse.vue';
import IconLabel from '@/components/IconLabel.vue';

import { ConnectionKey, defaultConnection } from '@/composables/useConnection';

const { isLoading, isError, connection } = inject(ConnectionKey, defaultConnection);
const connected = computed(() => connection.value.isMullvad);
</script>

<template>
  <h1 class="text-sm pb-1 pt-4">Connection status</h1>
  <n-card>
    <p v-if="isLoading" class="text-lg flex items-center">
      <IconLabel text="Loading connection details" type="spinner" />
    </p>
    <p v-else-if="isError" class="text-lg">
      <IconLabel text="Couldn't get connection details" type="warning" />
    </p>
    <ConnectionLocation v-else />
    <ConnectionStatus v-if="connected" />
    <DetailsCollapse v-if="!isLoading" />
    <ProxyCollapse v-if="!isLoading" />
  </n-card>
</template>
