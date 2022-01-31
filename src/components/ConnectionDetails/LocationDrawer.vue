<script lang="ts" setup>
import { NDrawer, NDrawerContent } from 'naive-ui';

import Location from '@/components/Location.vue';

import useLocations from '@/composables/useLocations';

const { showLocations } = useLocations();
</script>

<template>
  <n-drawer v-model:show="showLocations" :width="400">
    <n-drawer-content title="Select proxy server location" closable>
      <Location />
    </n-drawer-content>
  </n-drawer>
</template>
