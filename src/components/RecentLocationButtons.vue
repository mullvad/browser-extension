<script lang="ts" setup>
import { computed } from 'vue';

import Button from '@/components/Buttons/Button.vue';
import FeTrash from '@/components/Icons/FeTrash.vue';
import useProxyHistory from '@/composables/useProxyHistory/useProxyHistory';
import type { HistoryEntry } from '@/composables/useProxyHistory/HistoryEntries.types';

defineProps<{ selectLocation: (connection: HistoryEntry) => void }>();

const { mostRecent, getLabel, removeEntry } = useProxyHistory();

const buttons = computed(() =>
  mostRecent.value.slice(0, 3).map((connection: HistoryEntry) => {
    const label = getLabel(connection);
    return {
      label,
      connection,
    };
  }),
);
</script>

<template>
  <div class="space-y-2">
    <div v-for="{ label, connection } in buttons" :key="label" class="flex gap-2">
      <Button class="flex-1 truncate" @click="selectLocation(connection)">
        {{ label }}
      </Button>
      <Button color="error" size="small" @click="removeEntry(connection)">
        <FeTrash />
      </Button>
    </div>
  </div>
</template>
