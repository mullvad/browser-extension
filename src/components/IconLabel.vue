<script lang="ts" setup>
import { NIcon } from 'naive-ui';

import FeCheckCircle from '@/components/Icons/FeCheckCircle.vue';
import FeCheck from '@/components/Icons/FeCheck.vue';
import FeInfo from '@/components/Icons/FeInfo.vue';
import FeWarning from '@/components/Icons/FeWarning.vue';
import MuSpinner from '@/components/Icons/MuSpinner.vue';
import FeDrop from '@/components/Icons/FeDrop.vue';

export type IconType = 'warning' | 'success' | 'info' | 'spinner' | 'leak' | 'check';

defineProps<{ text?: string; type: IconType }>();
</script>

<template>
  <div class="flex items-center">
    <n-icon class="mr-2" size="25">
      <FeCheckCircle v-if="type === 'success'" class="text-success" />
      <FeCheck v-if="type === 'check'" class="text-success" />
      <FeWarning v-if="type === 'warning'" class="text-warning" />
      <FeInfo v-if="type === 'info'" class="text-info" />
      <MuSpinner v-if="type === 'spinner'" class="text-info" />
      <FeDrop v-if="type === 'leak'" class="text-error" />
    </n-icon>

    <span v-if="text">{{ text }}</span>
    <span v-else>
      <slot></slot>
    </span>
  </div>
</template>
