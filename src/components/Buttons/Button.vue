<script lang="ts" setup>
import { computed } from 'vue';

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

// Static class map so UnoCSS can detect the classes at build time.
// Building names dynamically (e.g. `bg-${color}`) would not be picked up by
// UnoCSS's static scanner, so the CSS for those classes would never be emitted.
const colorClasses: Record<string, string> = {
  error: 'bg-error',
  success: 'bg-success',
  white: 'bg-white',
  blue: 'bg-blue',
};

const textColorClasses: Record<string, string> = {
  white: 'text-white',
  error: 'text-error',
  success: 'text-success',
  blue: 'text-blue',
};

const classes = computed(() => {
  const parts: string[] = [];

  if (props.color && colorClasses[props.color]) {
    parts.push(colorClasses[props.color]);
    parts.push(textColorClasses[props.textColor || 'white'] || 'text-white');
  }

  if (props.size) {
    parts.push(`btn-${props.size}`);
  }

  return parts.join(' ');
});
</script>

<template>
  <component :is="type" :href="href" class="btn whitespace-nowrap" :class="classes">
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

  appearance: none;
  border: none;
  font-family: inherit;
  background-color: var(--blue);
  padding: 0.5rem 1rem;
  color: #fff;
  border-radius: 0.25rem;
  text-decoration: none;
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
