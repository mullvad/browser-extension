<script lang="ts" setup>
import { computed, inject } from 'vue';
import IconLabel from '@/components/IconLabel.vue';
import { ConnectionKey, defaultConnection } from '@/composables/useConnection';

const { connection } = inject(ConnectionKey, defaultConnection);

const isUsingProxy = computed(() => connection.value.protocol?.startsWith('SOCKS') ?? false);
const connectionStatus = computed(() =>
  isUsingProxy.value ? 'Using Mullvad VPN (via proxy)' : 'Using Mullvad VPN',
);
</script>

<template>
  <IconLabel :text="connectionStatus" type="success" />
</template>
