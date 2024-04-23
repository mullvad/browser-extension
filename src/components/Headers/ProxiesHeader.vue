<script lang="ts" setup>
import { NIcon } from 'naive-ui';

import FeCog from '@/components/Icons/FeCog.vue';
</script>

<template>
  <div class="grid flex-1 text-white bg-[var(--blue)]">
    <div class="flex flex-row items-center justify-center p-2">
      <n-icon size="20">
        <FeCog />
      </n-icon>
      <h1 class="text-xl font-semibold pl-2">Custom proxies list</h1>
    </div>
  </div>
</template>
