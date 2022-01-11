<script lang="ts" setup>
import { computed } from 'vue';
import LaSpinner from '~icons/la/spinner';
import IconLabel from '@/components/IconLabel.vue';
import useCheckDnsLeaks from '@/composables/useCheckDnsLeaks';

const { isLeaking, isLoading, isError } = useCheckDnsLeaks();
const labelText = computed(() => (isLeaking.value ? 'Leaking DNS servers' : 'No DNS Leaks'));
</script>
<template>
  <p v-if="isLoading" class="text-lg flex items-center">
    Checking for DNS Leaks<LaSpinner class="ml-2 animate-spin" />
  </p>
  <p v-else-if="isError" class="text-lg">Could not determine DNS servers</p>
  <IconLabel v-else :state="!isLeaking" :text="labelText" />
</template>
