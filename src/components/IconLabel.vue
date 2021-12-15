<script lang="ts" setup>
defineProps<{ text: string; state: boolean }>();
</script>
<template>
  <p v-if="state" class="text-success"><FeCheckCircle class="mr-2" />{{ text }}</p>
  <p v-else class="text-warning"><FeWarning class="mr-2" />{{ text }}</p>
</template>
<style scoped>
p {
  font-size: 1.25rem;
  display: flex;
  align-items: center;
}
</style>
