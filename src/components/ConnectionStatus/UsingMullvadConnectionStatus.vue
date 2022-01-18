<script lang="ts" setup>
import { computed, inject } from 'vue';

import IconLabel from '@/components/IconLabel.vue';

import { ConnectionKey, defaultConnection } from '@/composables/useConnection';

const { connection } = inject(ConnectionKey, defaultConnection);

const protocol = computed(() => connection.value.protocol);
const isUsingProxy = computed(() => protocol?.value?.startsWith('SOCKS') ?? false);

const connectionStatus = computed(() =>
  isUsingProxy.value ? 'Using Mullvad VPN (via proxy)' : 'Using Mullvad VPN',
);
</script>

<template>
  <IconLabel :text="connectionStatus" type="success" />
</template>
