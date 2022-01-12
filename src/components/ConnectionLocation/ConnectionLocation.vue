<script lang="ts" setup>
import { computed, inject } from 'vue';
import { ConnectionKey, defaultConnection } from '@/composables/useConnection';
import useConnectionLocation from '@/composables/useConnectionLocation';

const { connection } = inject(ConnectionKey, defaultConnection);
const locationString = computed(() => useConnectionLocation(connection.value));
</script>
<template>
  <p class="text-white text-lg">{{ locationString }}</p>
</template>
