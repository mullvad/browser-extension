<script lang="ts" setup>
import UsingMullvadConnectionStatus from '@/components/ConnectionStatus/UsingMullvadConnectionStatus.vue';
import UsingProxyConnectionStatus from '@/components/ConnectionStatus/UsingProxyConnectionStatus.vue';
import DnsLeakStatus from '@/components/ConnectionStatus/DnsLeakStatus.vue';

defineProps<{ connected: boolean; protocol?: string }>();
</script>
<template>
  <div v-if="connected" class="mt-8">
    <UsingMullvadConnectionStatus :connected="connected" />
    <UsingProxyConnectionStatus :protocol="protocol" />
    <DnsLeakStatus />
  </div>
</template>
