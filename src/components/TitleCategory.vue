<script lang="ts" setup>
import { computed } from 'vue';

const props = defineProps<{ title: string; level?: number }>();

const headingTag = computed(() => {
  switch (props.level) {
    case 2:
      return 'h2';
    case 3:
      return 'h3';
    default:
      return 'h1';
  }
});

const headingClass = computed(() => {
  switch (props.level) {
    case 2:
      return 'text-lg'; // size for h2
    case 3:
      return 'text-base'; // size for h3
    default:
      return 'text-xl'; // Default size for h1, the biggest
  }
});
</script>

<template>
  <component :is="headingTag" :class="`font-semibold ${headingClass} text-gray-200`">
    {{ title }}
  </component>
</template>
