<script lang="ts" setup>
import { computed } from 'vue';
import { NCard, NSwitch, NTooltip } from 'naive-ui';

import IconLabel from '@/components/IconLabel.vue';
import useStore from '@/composables/useStore';

const { randomProxyMode } = useStore();

const randomProxyLabel = computed(() =>
  randomProxyMode.value ? 'Random proxy mode enabled' : 'Random proxy mode disabled',
);
const randomProxyDescription = computed(() =>
  randomProxyMode.value
    ? 'Each website will use a different proxy server. This proxy used will stay the same for the current session.'
    : 'When enabled, each website will use a different proxy server. This proxy used will stay the same for the current session.',
);
</script>

<template>
  <n-card id="proxy-auto-reload" :bordered="false">
    <div class="flex justify-between">
      <h2 class="text-lg">Random proxy mode</h2>
      <n-tooltip>
        <template #trigger>
          <n-switch v-model:value="randomProxyMode" />
        </template>
        <span>{{ randomProxyLabel }}</span>
      </n-tooltip>
    </div>

    <div class="py-4 flex items-center">
      <IconLabel :text="randomProxyDescription" type="info" />
    </div>
  </n-card>
</template>
