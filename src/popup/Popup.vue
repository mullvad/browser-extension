<script lang="ts" setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { NScrollbar } from 'naive-ui';

import HomeHeader from '@/popup/headers/HomeHeader.vue';
import LicenseHeader from '@/popup/headers/LicenseHeader.vue';
import SettingsHeader from '@/popup/headers/SettingsHeader.vue';

const route = useRoute();
const path = computed(() => route && route.path);
</script>

<template>
  <main class="w-[450px]">
    <header class="px-4 py-2 min-h-14 flex items-center sticky top-0 z-1">
      <HomeHeader v-if="path === '/'" />
      <LicenseHeader v-if="path === '/license'" />
      <SettingsHeader v-if="path === '/settings'" />
    </header>

    <n-scrollbar :x-scrollable="false" class="max-h-543px px-4">
      <div class="py-1rem">
        <router-view />
      </div>
    </n-scrollbar>
  </main>
</template>

<style scoped>
header {
  box-shadow:
    rgb(0 0 0 / 5%) 0 1px 2px 0,
    rgb(0 0 0 / 5%) 0 1px 4px 0,
    rgb(0 0 0 / 5%) 0 2px 8px 0;
}
</style>
