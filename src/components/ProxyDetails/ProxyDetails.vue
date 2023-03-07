<script lang="ts" setup>
import { computed, inject } from 'vue';

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
  <ProxyConnect v-if="connected" />
  <ProxyDisconnectMessage v-else-if="socksEnabled && (isLoading || isError)" />
  <div v-else>Connect first to Mullvad VPN to use the proxy.</div>
</template>
