<script lang="ts" setup>
import { computed, toRefs } from 'vue';

type Props = {
  color?: string;
  textColor?: string;
  href?: string;
  size?: 'small' | 'medium' | 'large';
};

const props = defineProps<Props>();
const type = computed(() => {
  if (props.href) {
    return 'a';
  }
  return 'button';
});

const { color, textColor } = toRefs(props);
const classes = computed(() => {
  let colors = '';
  let sizeClass = '';

  if (color?.value) {
    colors = `bg-${color.value} text-${textColor?.value || 'white'}`;
  }

  if (props.size) {
    sizeClass = `btn-${props.size}`;
  }

  return `${colors} ${sizeClass}`;
});
</script>

<template>
  <component :is="type" :href="href" class="btn" :class="classes">
    <slot></slot>
  </component>
</template>

<style scoped>
.btn {
  --green: #44ad4de6;
  --green-hover: #44ad4dff;
  --red: #e34039e6;
  --red-hover: #e34039ff;
  --blue: rgb(41 77 115 / 90%);
  --blue-hover: rgb(41 77 115 / 100%);

  background-color: var(--blue);
  padding: 0.5rem 1rem;
  color: #fff;
  border-radius: 0.25rem;
}

.btn:focus,
.btn:active {
  outline: none;
}

.btn:not(:disabled):focus,
.btn:not(:disabled):hover {
  background-color: var(--blue-hover);
}

.n-button-group .btn:not(:first-child) {
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}

.n-button-group .btn:not(:last-child) {
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}

.n-button-group .btn:not(:first-child, :last-child) {
  border-radius: 0;
}

.bg-success {
  background-color: var(--green);
}

.bg-error {
  background-color: var(--red);
}

.bg-success:not(:disabled):focus,
.bg-success:not(:disabled):hover {
  background-color: var(--green-hover);
}

.bg-error:not(:disabled):focus,
.bg-error:not(:disabled):hover {
  background-color: var(--red-hover);
}

.btn-small {
  padding: 0.25rem 0.5rem;
  font-size: 0.875rem;
}

.btn-medium {
  padding: 0.5rem 1rem;
  font-size: 1rem;
}

.btn-large {
  padding: 0.75rem 1.5rem;
  font-size: 1.125rem;
}
</style>
