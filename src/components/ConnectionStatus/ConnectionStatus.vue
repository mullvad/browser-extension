<script lang="ts" setup>
import { computed, inject } from 'vue';
import { NCard } from 'naive-ui';
import { ConnectionKey, defaultConnection } from '@/composables/useConnection';
import UsingMullvadConnectionStatus from '@/components/ConnectionStatus/UsingMullvadConnectionStatus.vue';
import UsingProxyConnectionStatus from '@/components/ConnectionStatus/UsingProxyConnectionStatus.vue';
import DnsLeakStatus from '@/components/ConnectionStatus/DnsLeakStatus.vue';

const { connection } = inject(ConnectionKey, defaultConnection);
const connected = computed(() => connection.value.isMullvad);
</script>
<template>
  <div v-if="connected" class="mt-8">
    <h1 class="text-sm mb-1">Status</h1>
    <n-card>
      <UsingMullvadConnectionStatus />
      <UsingProxyConnectionStatus />
      <DnsLeakStatus />
    </n-card>
  </div>
</template>
