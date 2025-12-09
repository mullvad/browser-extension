<script lang="ts" setup>
import { NIcon, NTag } from 'naive-ui';

import FeCheck from '@/components/Icons/FeCheckCircle.vue';
</script>

<template>
  <n-tag round type="info" class="ml-2" cursor="pointer">
    <span> in use </span>
    <template #icon>
      <n-icon size="20">
        <FeCheck class="text-success" />
      </n-icon>
    </template>
  </n-tag>
</template>
