<script lang="ts" setup>
import { ref } from 'vue';
import { NButtonGroup, NPopover } from 'naive-ui';

import Button from '@/components/Buttons/Button.vue';
import FeDropDown from '@/components/Icons/FeDropDown.vue';

const popoverRef = ref<typeof NPopover>();
const rotateDropDown = ref(false);
const onUpdateShow = (show: boolean) => {
  rotateDropDown.value = show;
};

type Props = {
  mainColor?: string;
  mainText?: string;
  subColor: string;
  subText: string;
  href?: string;
  to?: string;
};

const props = defineProps<Props>();
const emit = defineEmits(['mainClick', 'subClick']);

const handleMainClick = () => {
  emit('mainClick');
};
const handleSubClick = () => {
  popoverRef?.value?.setShow(false);
  rotateDropDown.value = false;
  emit('subClick');
};
</script>

<template>
  <n-button-group>
    <Button
      v-if="mainText"
      :href="props.href"
      :to="props.to"
      :color="props.mainColor"
      @click="handleMainClick"
    >
      {{ props.mainText }}
    </Button>

    <n-popover ref="popoverRef" trigger="click" raw placement="bottom" @update:show="onUpdateShow">
      <template #trigger>
        <Button class="h-10 flex items-center">
          <FeDropDown
            class="transform transition-transform duration-400 text-lg"
            :class="{ 'rotate-180': rotateDropDown }"
          />
        </Button>
      </template>

      <Button :color="props.subColor" @click="handleSubClick">
        {{ props.subText }}
      </Button>
    </n-popover>
  </n-button-group>
</template>
