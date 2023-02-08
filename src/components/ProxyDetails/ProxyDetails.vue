<script lang="ts" setup>
import { computed, inject } from 'vue';
import { NCard } from 'naive-ui';

import ProxyConnect from '@/components/ProxyDetails/ProxyConnect.vue';
import ProxyDisconnectMessage from '@/components/ProxyDetails/ProxyDisconnectMessage.vue';
import TitleCategory from '@/components/TitleCategory.vue';

import { ConnectionKey, defaultConnection } from '@/composables/useConnection';
import useSocksProxy from '@/composables/useSocksProxy';

const { isLoading, isError, connection } = inject(ConnectionKey, defaultConnection);
const connected = computed(() => connection.value.isMullvad);
const { socksEnabled } = useSocksProxy();
</script>

<template>
  <TitleCategory title="Proxy" />
  <n-card :bordered="false" class="mb-4">
    <ProxyConnect v-if="connected" />
    <ProxyDisconnectMessage v-else-if="socksEnabled && (isLoading || isError)" />
    <div v-else>You need to be connected to Mullvad to be able to use the proxy.</div>
  </n-card>
</template>
