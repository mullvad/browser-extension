<script lang="ts" setup>
import Button from '@/components/Buttons/Button.vue';
import useProxyHistory from '@/composables/useProxyHistory/useProxyHistory';
import type { HistoryEntry } from '@/composables/useProxyHistory/HistoryEntries.types';

defineProps<{ selectLocation: (connection: HistoryEntry) => void }>();

const { mostUsed, getLabel } = useProxyHistory();

const buttons = mostUsed.value.slice(0, 3).map((connection: HistoryEntry) => {
  const label = getLabel(connection);
  return {
    label,
    connection,
  };
});
</script>

<template>
  <div class="space-y-2">
    <Button
      v-for="{ label, connection } in buttons"
      :key="label"
      class="block"
      @click="selectLocation(connection)"
    >
      {{ label }}
    </Button>
  </div>
</template>
