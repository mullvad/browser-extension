<script lang="ts" setup>
import { NIcon } from 'naive-ui';

import FeCheckCircle from '@/components/Icons/FeCheckCircle.vue';
import FeInfo from '@/components/Icons/FeInfo.vue';
import FeWarning from '@/components/Icons/FeWarning.vue';
import LaSpinner from '@/components/Icons/LaSpinner.vue';
import FeDrop from '@/components/Icons/FeDrop.vue';

type IconType = 'warning' | 'success' | 'info' | 'spinner' | 'leak';

defineProps<{ text: string; type: IconType }>();
</script>

<template>
  <span>
    <n-icon class="mr-2" size="25">
      <FeCheckCircle v-if="type === 'success'" class="text-success" />
      <FeWarning v-if="type === 'warning'" class="text-warning" />
      <FeInfo v-if="type === 'info'" class="text-info" />
      <LaSpinner v-if="type === 'spinner'" class="text-info" />
      <FeDrop v-if="type === 'leak'" class="text-error" />
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
