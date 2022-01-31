<script lang="ts" setup>
defineProps<{ isOpen?: boolean; disabled?: boolean; title: string }>();

const emit = defineEmits<{ (e: 'toggle', open: boolean): void }>();
const toggleCollapse = (open: boolean) => {
  emit('toggle', open);
};
</script>
<template>
  <details
    :class="{ disabled }"
    class="collapse"
    :open="isOpen"
    @toggle="toggleCollapse($event.target.open)"
  >
    <summary>{{ title }}</summary>
    <div class="mt-4 mb-4">
      <slot></slot>
    </div>
  </details>
</template>
<style scoped>
.collapse {
  --indent: 1rem;
}

details {
  padding-left: var(--indent);
}

summary {
  cursor: pointer;
  margin-left: calc(-1 * var(--indent));
}

details.disabled {
  cursor: not-allowed;
}

details.disabled summary {
  pointer-events: none;
}
</style>
