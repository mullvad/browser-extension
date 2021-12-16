<script lang="ts" setup>
import { Carousel, Slide } from 'vue-snap';
import 'vue-snap/dist/vue-snap.css';
import { Extension } from '@/helpers/extensions';

defineProps<{ recommendedExtensions: Extension[] }>();
</script>
<template>
  <h1 class="text-sm pb-1">
    Privacy Recommendations
  </h1>
  <Carousel>
    <Slide
      v-for="(extension, index) in recommendedExtensions"
      :key="extension.id"
    >
      <div class="wrapper">
        <h1 class="text-center text-2xl text-white font-bold">
          {{ extension.name }}
        </h1>
        <p class="text-center">
          {{ extension.description }}
        </p>
        <p class="text-center pt-2 text-sm">
          <router-link
            to="privacy-extensions"
            class="hover:text-white"
          >
            Read More&hellip;
          </router-link>
        </p>
        <p class="text-right pt-4">
          {{ index + 1 }}/{{ recommendedExtensions.length }}
        </p>
      </div>
    </Slide>
  </Carousel>
  <div class="text-right pt-2">
    <router-link
      class="hover:text-white"
      to="privacy-extensions"
    >
      Show all
    </router-link>
  </div>
</template>
<style scoped>
.wrapper {
  width: 100%;
  background-color: var(--blue);
  padding: 1rem 3rem;
}
</style>
