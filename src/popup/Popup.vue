<script lang="ts" setup>
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { NAvatar, NIcon, NScrollbar } from 'naive-ui';

import FeArrowLeft from '@/components/Icons/FeArrowLeft.vue';
import FeQuestion from '@/components/Icons/FeQuestion.vue';

const logoUrl = '/assets/icon.svg';

const path = computed(() => {
  return useRoute().path;
});
const { currentRoute } = useRouter();

const pageTitle = computed(() => currentRoute.value.meta.title ?? 'Mullvad Privacy Companion');
</script>

<template>
  <main class="w-[500px] h-[600px]">
    <header class="px-4 py-2 min-h-14 flex items-center sticky top-0 z-1">
      <div class="flex flex-grow items-center justify-between">
        <div class="flex items-center">
          <n-avatar v-if="path === '/'" :src="logoUrl" alt="Mullvad Logo" />
          <n-avatar v-else>
            <router-link to="/">
              <n-icon>
                <FeArrowLeft />
              </n-icon>
            </router-link>
          </n-avatar>
          <div class="mx-4">
            <h1 class="text-2xl font-semibold">{{ pageTitle }}</h1>
          </div>
        </div>
        <router-link to="/about" class="flex">
          <n-icon size="24">
            <FeQuestion />
          </n-icon>
        </router-link>
      </div>
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
  box-shadow: rgb(0 0 0 / 5%) 0 1px 2px 0, rgb(0 0 0 / 5%) 0 1px 4px 0, rgb(0 0 0 / 5%) 0 2px 8px 0;
}
</style>
