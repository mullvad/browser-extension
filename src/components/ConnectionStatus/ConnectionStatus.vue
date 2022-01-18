<script lang="ts" setup>
import UsingMullvadConnectionStatus from '@/components/ConnectionStatus/UsingMullvadConnectionStatus.vue';
import DnsLeakStatus from '@/components/ConnectionStatus/DnsLeakStatus.vue';
</script>

<template>
  <UsingMullvadConnectionStatus />
  <DnsLeakStatus />
</template>
