<script lang="ts" setup>
import { computed } from 'vue';
import { NCard, NSwitch, NTooltip } from 'naive-ui';

import IconLabel from '@/components/IconLabel.vue';
import useStore from '@/composables/useStore';

const { proxyAutoReload } = useStore();

const autoReloadLabel = computed(() =>
  proxyAutoReload.value ? 'Auto reload enabled' : 'Auto reload disabled',
);
const autoReloadDescription = computed(() =>
  proxyAutoReload.value
    ? 'Opened tabs will automatically reload when associated proxy settings change.'
    : 'Opened tabs will not reload when associated proxy settings change.',
);
</script>

<template>
  <n-card id="proxy-auto-reload" :bordered="false">
    <div class="flex justify-between">
      <h2 class="text-lg">Auto reload</h2>
      <n-tooltip>
        <template #trigger>
          <n-switch v-model:value="proxyAutoReload" />
        </template>
        <span>{{ autoReloadLabel }}</span>
      </n-tooltip>
    </div>

    <div class="py-4 flex items-center">
      <IconLabel :text="autoReloadDescription" type="info" />
    </div>
  </n-card>
</template>
