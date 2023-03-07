<script lang="ts" setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { NAvatar, NIcon } from 'naive-ui';

import FeCog from '@/components/Icons/FeCog.vue';

const logoUrl = '/assets/icon.svg';

const { currentRoute } = useRouter();

const pageTitle = computed(() => currentRoute.value.meta.title);
</script>

<template>
  <div class="flex flex-grow items-center justify-between">
    <div class="flex items-center">
      <n-avatar :src="logoUrl" alt="Mullvad Logo" />
    </div>
    <div class="mx-4">
      <h1 class="text-2xl font-semibold">{{ pageTitle }}</h1>
    </div>
    <router-link to="/settings" class="flex">
      <n-icon size="24">
        <FeCog />
      </n-icon>
    </router-link>
  </div>
</template>
