<script lang="ts" setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { NScrollbar } from 'naive-ui';

import HomeHeader from '@/components/Headers/HomeHeader.vue';
import ProxyHeader from '@/components/Headers/ProxyHeader.vue';

const route = useRoute();
const path = computed(() => route && route.path);
</script>

<template>
  <main class="w-[450px]">
    <header class="sticky top-0 z-1">
      <HomeHeader v-if="path === '/'" />
      <ProxyHeader v-if="path === '/proxy'" />
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
