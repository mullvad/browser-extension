<script lang="ts" setup>
import { NIcon } from 'naive-ui';

import FeCog from '@/components/Icons/FeCog.vue';
import FeGlobe from '@/components/Icons/FeGlobe.vue';
import TaRoute from '@/components/Icons/TaRoute.vue';
</script>

<template>
  <div class="flex">
    <div class="grid grid-cols-2 flex-1">
      <router-link
        to="/"
        class="flex flex-row items-center justify-center p-2 hover:text-white bg-[var(--blue)]"
      >
        <n-icon size="20">
          <FeGlobe />
        </n-icon>
        <h1 class="text-xl font-semibold pl-2">Status</h1>
      </router-link>

      <div class="flex flex-row items-center justify-center p-2 text-white">
        <n-icon size="20">
          <TaRoute />
        </n-icon>
        <h1 class="text-xl font-semibold pl-2">Proxy</h1>
      </div>
    </div>

    <router-link
      to="/settings"
      class="flex flex-row items-center justify-center px-4 hover:text-white bg-[var(--blue)]"
    >
      <n-icon size="20">
        <FeCog />
      </n-icon>
    </router-link>
  </div>
</template>
