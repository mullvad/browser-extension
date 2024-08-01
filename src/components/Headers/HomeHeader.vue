<script lang="ts" setup>
import { NIcon } from 'naive-ui';

import FeCog from '@/components/Icons/FeCog.vue';
import FeGlobe from '@/components/Icons/FeGlobe.vue';
import TaRoute from '@/components/Icons/TaRoute.vue';

import { openOptions } from '@/helpers/browserExtension';
</script>

<template>
  <div class="flex">
    <div class="grid grid-cols-2 flex-1">
      <div class="flex flex-row items-center justify-center p-2 text-white">
        <n-icon size="20">
          <FeGlobe />
        </n-icon>
        <h1 class="text-xl font-semibold pl-2">Status</h1>
      </div>

      <router-link
        to="/proxy"
        class="flex flex-row items-center justify-center p-2 hover:text-white bg-[var(--blue)]"
      >
        <n-icon size="20">
          <TaRoute />
        </n-icon>
        <h1 class="text-xl font-semibold pl-2">Proxy</h1>
      </router-link>
    </div>

    <div
      class="flex flex-row items-center justify-center px-4 hover:text-white bg-[var(--blue)] cursor-pointer"
      @click="openOptions()"
    >
      <n-icon size="20">
        <FeCog />
      </n-icon>
    </div>
  </div>
</template>
