<script lang="ts" setup>
defineProps<{ content: string }>();
</script>
<template>
  <span>{{ content }}</span>
</template>
<style scoped>
span {
  padding: 0.1rem 0.5rem;
  border-radius: 3px;
  background-color: var(--yellow);
  color: var(--dark-blue);
  font-size: 0.85rem;
}
</style>
