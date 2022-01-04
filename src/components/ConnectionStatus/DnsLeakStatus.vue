<script lang="ts" setup>
import { computed } from 'vue';
import LaSpinner from '~icons/la/spinner';
import IconLabel from '@/components/IconLabel.vue';
import useCheckDnsLeaks from '@/composables/useCheckDnsLeaks';

const { isLeaking, isLoading } = useCheckDnsLeaks();
const labelText = computed(() => (isLeaking.value ? 'Leaking DNS servers' : 'No DNS Leaks'));
</script>
<template>
  <p v-if="isLoading" class="text-lg flex items-center">
    Checking for DNS Leaks<LaSpinner class="ml-2 animate-spin" />
  </p>
  <IconLabel v-else :state="!isLeaking" :text="labelText" />
</template>
