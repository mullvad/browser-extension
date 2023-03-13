<script lang="ts" setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { NAvatar, NIcon } from 'naive-ui';

import FeArrowLeft from '@/components/Icons/FeArrowLeft.vue';

const { currentRoute } = useRouter();

const pageTitle = computed(() => currentRoute.value.meta.title);
</script>

<template>
  <div class="flex flex-grow items-center justify-between">
    <div class="flex items-center">
      <n-avatar>
        <router-link to="/">
          <n-icon>
            <FeArrowLeft />
          </n-icon>
        </router-link>
      </n-avatar>
    </div>
    <div class="mx-4">
      <h1 class="text-2xl font-semibold">{{ pageTitle }}</h1>
    </div>
    <div></div>
  </div>
</template>
