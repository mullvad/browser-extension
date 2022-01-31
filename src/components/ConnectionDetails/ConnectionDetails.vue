<script lang="ts" setup>
import { computed, inject } from 'vue';
import { NCard } from 'naive-ui';

import ConnectionLocation from '@/components/ConnectionLocation/ConnectionLocation.vue';
import ConnectionStatus from '@/components/ConnectionStatus/ConnectionStatus.vue';
import DetailsCollapse from '@/components/ConnectionDetails/DetailsCollapse.vue';
import IconLabel from '@/components/IconLabel.vue';
import ProxyCollapse from '@/components/ConnectionDetails/ProxyCollapse.vue';
import ProxyDisconnectMessage from '@/components/ProxyDisconnectMessage.vue';

import { ConnectionKey, defaultConnection } from '@/composables/useConnection';
import useSocksProxy from '@/composables/useSocksProxy';

const { isLoading, isError, connection } = inject(ConnectionKey, defaultConnection);
const connected = computed(() => connection.value.isMullvad);
const { socksEnabled } = useSocksProxy();
</script>

<template>
  <h1 class="text-sm pb-1 pt-4">Connection status</h1>
  <n-card :bordered="false">
    <p class="text-xl mb-2">
      <IconLabel v-if="isLoading" text="Checking connection" type="spinner" />
      <IconLabel v-else-if="isError" text="Couldn't get connection details" type="warning" />
      <ConnectionLocation v-else class="mb-2" />
      <ConnectionStatus v-if="connected" />
    </p>
    <DetailsCollapse v-if="!isLoading && !isError" />

    <ProxyCollapse v-if="connected" />
    <ProxyDisconnectMessage v-else-if="socksEnabled && (isLoading || isError)" />
  </n-card>
</template>
