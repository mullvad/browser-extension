<script lang="ts" setup>
import Button from '@/components/Button/Button.vue';
import useHistoricConnections from '@/composables/useHistoricConnections';

const { mostRecent, getLabel, selectLocation } = useHistoricConnections();
const buttons = mostRecent.slice(0, 3).map((connection) => {
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
      >{{ label }}</Button
    >
  </div>
</template>
