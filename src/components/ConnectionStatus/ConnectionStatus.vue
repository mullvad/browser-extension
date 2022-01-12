<script lang="ts" setup>
import { computed, inject, ref } from 'vue';
import type { Connection } from '@/helpers/connCheck.types';
import { ConnectionKey } from '@/composables/useConnection';
import UsingMullvadConnectionStatus from '@/components/ConnectionStatus/UsingMullvadConnectionStatus.vue';
import UsingProxyConnectionStatus from '@/components/ConnectionStatus/UsingProxyConnectionStatus.vue';
import DnsLeakStatus from '@/components/ConnectionStatus/DnsLeakStatus.vue';

const connection = inject(ConnectionKey, ref({} as Connection));
const connected = computed(() => connection.value.isMullvad);
</script>
<template>
  <div v-if="connected" class="mt-8">
    <UsingMullvadConnectionStatus />
    <UsingProxyConnectionStatus />
    <DnsLeakStatus />
  </div>
</template>
