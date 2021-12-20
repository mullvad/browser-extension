<script lang="ts" setup>
import { computed, toRefs } from 'vue';
import { Connection } from '@/helpers/connCheck';
import useConnectionLocation from '@/composables/useConnectionLocation';

const props = defineProps<{ connection: Connection }>();
const { connection } = toRefs(props);
const locationString = computed(() => useConnectionLocation(connection.value));
</script>
<template>
  <p class="text-white text-lg">{{ locationString }}</p>
</template>
