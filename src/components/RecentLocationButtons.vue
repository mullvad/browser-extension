<script lang="ts" setup>
import Button from '@/components/Button/Button.vue';
import useHistoricConnections from '@/composables/useHistoricConnections';

const { mostRecent, selectLocation } = useHistoricConnections();
</script>
<template>
  <Button @click="selectLocation(mostRecent)">{{ mostRecent.label }}</Button>
</template>
