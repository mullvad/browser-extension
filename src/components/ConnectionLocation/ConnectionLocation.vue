<script lang="ts" setup>
import { computed, inject, ref } from 'vue';
import type { Connection } from '@/helpers/connCheck.types';
import { ConnectionKey } from '@/composables/useConnection';
import useConnectionLocation from '@/composables/useConnectionLocation';

const connection = inject(ConnectionKey, ref({} as Connection));
const locationString = computed(() => useConnectionLocation(connection.value));
</script>
<template>
  <p class="text-white text-lg">{{ locationString }}</p>
</template>
