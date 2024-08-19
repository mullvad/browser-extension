<script lang="ts" setup>
import { computed, inject } from 'vue';
import { NIcon } from 'naive-ui';

import FeGlobe from '@/components/Icons/FeGlobe.vue';
import { ConnectionKey, defaultConnection } from '@/composables/useConnection';
import useConnectionLocation from '@/composables/useConnectionLocation';

const { connection } = inject(ConnectionKey, defaultConnection);
const locationString = computed(() => useConnectionLocation(connection.value));
</script>
<template>
  <p class="text-white inline-flex items-center">
    <n-icon size="20">
      <FeGlobe />
    </n-icon>
    <span class="ml-2">{{ locationString }}</span>
  </p>
</template>
