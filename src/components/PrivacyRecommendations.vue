<script lang="ts" setup>
import { NCarousel, NCard } from 'naive-ui';
import { Extension } from '@/helpers/extensions';

defineProps<{ recommendedExtensions: Extension[] }>();
</script>
<template>
  <h1 class="text-sm pb-1">Privacy Recommendations</h1>

  <n-carousel show-arrow>
    <n-card
      v-for="(extension, index) in recommendedExtensions"
      :key="extension.id"
      :title="extension.name"
      embedded
      :bordered="false"
    >
      <template #header-extra>
        <p class="text-right pt-4">{{ index + 1 }}/{{ recommendedExtensions.length }}</p>
      </template>

      <p>{{ extension.description }}</p>

      <template #action>
        <p class="text-center pt-2 text-sm">
          <router-link to="privacy-extensions" class="hover:text-white"> Read More </router-link>
        </p>
      </template>
    </n-card>
  </n-carousel>

  <div class="text-right pt-2">
    <router-link class="hover:text-white" to="privacy-extensions"> Show all </router-link>
  </div>
</template>
<style scoped>
.n-carousel .n-carousel__arrow svg {
  cursor: pointer;
  color: red;
}
</style>
