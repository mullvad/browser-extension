<script lang="ts" setup>
import { NIcon } from 'naive-ui';

import FeCheckCircle from '@/components/Icons/FeCheckCircle.vue';
import FeInfo from '@/components/Icons/FeInfo.vue';
import FeLinkExternal from '@/components/Icons/FeLinkExternal.vue';
import FeWarning from '@/components/Icons/FeWarning.vue';
import LaSpinner from '@/components/Icons/LaSpinner.vue';

type IconType = 'warning' | 'success' | 'info' | 'spinner' | 'external';

defineProps<{ text: string; type: IconType }>();
</script>

<template>
  <span v-if="type === 'success'" class="text-success">
    <n-icon size="25" class="mr-2">
      <FeCheckCircle />
    </n-icon>
    {{ text }}
  </span>

  <span v-if="type === 'warning'" class="text-warning">
    <n-icon size="25" class="mr-2">
      <FeWarning />
    </n-icon>
    {{ text }}
  </span>

  <span v-if="type === 'info'" class="text-info">
    <n-icon size="25" class="mr-2">
      <FeInfo />
    </n-icon>
    {{ text }}
  </span>

  <span v-if="type === 'spinner'" class="text-info">
    <n-icon size="25" class="mr-2 animate-spin">
      <LaSpinner />
    </n-icon>
    {{ text }}
  </span>

  <span v-if="type === 'external'" class="text-info">
    <n-icon size="25" class="mr-2">
      <FeLinkExternal />
    </n-icon>
    {{ text }}
  </span>
</template>

<style scoped>
span {
  display: flex;
  align-items: center;
}
</style>
