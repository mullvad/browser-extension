<script lang="ts" setup>
import FeLinkExternal from '@/components/Icons/FeLinkExternal.vue';

defineProps<{ text: string }>();
</script>

<template>
  <span> {{ text }} <FeLinkExternal class="text-info ml-2" /> </span>
</template>

<style scoped>
span {
  display: flex;
  align-items: center;
}
</style>
