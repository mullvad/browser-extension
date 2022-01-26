<script lang="ts" setup>
import { toRefs } from 'vue';
import { NSwitch } from 'naive-ui';

// FIXME: there's the error below in the console when toggling
// `Set operation on key "toggled" failed: target is readonly.`

type Props = {
  toggled: boolean;
};

const props = defineProps<Props>();
const toggled = toRefs(props).toggled;

const emit = defineEmits(['onUpdate']);
const onUpdate = () => {
  emit('onUpdate');
};

interface RailStyle {
  background: string;
}

const railStyle = ({ checked }: any) => {
  const style = {} as RailStyle;
  if (checked) {
    style.background = 'var(--success)';
  } else {
    style.background = 'var(--error)';
  }
  return style;
};
</script>

<template>
  <n-switch v-model:value="toggled" :rail-style="railStyle" size="large" @update:value="onUpdate" />
</template>
