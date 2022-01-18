<script lang="ts" setup>
import { computed } from 'vue';

import IconLabel from '@/components/IconLabel.vue';

import useCheckDnsLeaks from '@/composables/useCheckDnsLeaks';

const { isLeaking, isLoading, isError } = useCheckDnsLeaks();
const labelText = computed(() => (isLeaking.value ? 'Leaking DNS servers' : 'No DNS Leaks'));
const iconType = computed(() => (isLeaking.value ? 'warning' : 'success'));
</script>

<template>
  <p v-if="isLoading" class="text-lg flex items-center">
    <IconLabel text="Checking for DNS Leaks" type="spinner" />
  </p>
  <IconLabel v-else-if="isError" text="Could not determine DNS servers" type="info" />
  <IconLabel v-else :text="labelText" :type="iconType" />
</template>
