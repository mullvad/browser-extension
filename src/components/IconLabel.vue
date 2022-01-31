<script lang="ts" setup>
import { NIcon } from 'naive-ui';

import FeCheckCircle from '@/components/Icons/FeCheckCircle.vue';
import FeInfo from '@/components/Icons/FeInfo.vue';
import FeLinkExternal from '@/components/Icons/FeLinkExternal.vue';
import FeWarning from '@/components/Icons/FeWarning.vue';
import LaSpinner from '@/components/Icons/LaSpinner.vue';

type IconType = 'warning' | 'success' | 'info' | 'spinner' | 'external';

defineProps<{ text: string; type: IconType }>();
</script>

<template>
  <span>
    <n-icon v-if="type === 'success'" class="text-success mr2" size="25">
      <FeCheckCircle />
    </n-icon>

    <n-icon v-if="type === 'warning'" class="text-warning mr-2" size="25">
      <FeWarning />
    </n-icon>

    <n-icon v-if="type === 'info'" class="text-info mr-2" size="25">
      <FeInfo />
    </n-icon>

    <n-icon v-if="type === 'spinner'" class="text-info mr-2 animate-spin" size="25">
      <LaSpinner />
    </n-icon>

    <n-icon v-if="type === 'external'" class="text-info mr-2" size="25">
      <FeLinkExternal />
    </n-icon>

    {{ text }}
  </span>
</template>

<style scoped>
span {
  display: flex;
  align-items: center;
}
</style>
