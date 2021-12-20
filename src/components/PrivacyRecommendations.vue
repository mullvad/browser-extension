<script lang="ts" setup>
import { NCarousel, NCard, NAvatar } from 'naive-ui';
import { Extension } from '@/helpers/extensions';

defineProps<{ recommendedExtensions: Extension[] }>();
</script>
<template>
  <h1 class="text-sm pb-1">Privacy Recommendations</h1>

  <n-carousel show-arrow>
    <n-card
      v-for="(extension) in recommendedExtensions"
      :key="extension.id"
      :bordered="false"
    >
      <template #header>
        <div class="flex">
          <n-avatar size="small" :src="`/assets/icons/${extension.icon}`" class="mr-2"></n-avatar>
          <p>{{ extension.name }}</p>
        </div>
      </template>

      <p class="mb-8">
        <span>{{ extension.description }}</span>&nbsp;
        <router-link to="privacy-extensions" class="hover:text-white underline">Read more&hellip;</router-link>
      </p>
    </n-card>
  </n-carousel>

  <div class="text-right pt-2">
    <router-link class="hover:text-white" to="privacy-extensions">Show all</router-link>
  </div>
</template>
