<script lang="ts" setup>
import { NIcon } from 'naive-ui';

import FeLinkExternal from '@/components/Icons/FeLinkExternal.vue';

defineProps<{ text: string }>();
</script>

<template>
  <span>
    {{ text }}
    <n-icon class="ml-2" size="20">
      <FeLinkExternal class="text-info" />
    </n-icon>
  </span>
</template>

<style scoped>
span {
  display: flex;
  align-items: center;
}
</style>
