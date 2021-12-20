<script lang="ts" setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import FeArrowLeft from '~icons/fe/arrow-left';

const path = computed(() => {
  return useRoute().path;
});
const logoUrl = '/assets/icon.svg';
</script>
<template>
  <main class="w-[500px]">
    <header class="px-4 py-2 min-h-14 flex justify-between items-center sticky top-0 z-1">
      <div class="flex items-center">
        <img v-if="path === '/'" :src="logoUrl" class="w-8 h-8" alt="Mullvad Logo" />
        <router-link v-else to="/" class="flex w-[32px]">
          <FeArrowLeft />
        </router-link>
        <div class="mx-4">
          <h1 class="uppercase text-2xl font-bold">Mullvad Privacy Companion</h1>
        </div>
      </div>
    </header>
    <div class="px-4 py-1.5rem">
      <router-view />
    </div>
  </main>
</template>
<style scoped>
header {
  box-shadow: rgb(0 0 0 / 5%) 0 1px 2px 0, rgb(0 0 0 / 5%) 0 1px 4px 0, rgb(0 0 0 / 5%) 0 2px 8px 0;
}
</style>
