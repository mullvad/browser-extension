<script lang="ts" setup>
import { computed, inject } from 'vue';

import IconLabel from '@/components/IconLabel.vue';

import useCheckDnsLeaks from '@/composables/useCheckDnsLeaks';
import { ConnectionKey, defaultConnection } from '@/composables/useConnection';

const { isLeaking, isLoading, isError, isMullvadDoh } = useCheckDnsLeaks();
const { connection } = inject(ConnectionKey, defaultConnection);

const labelText = computed(() => {
  if (isLeaking.value) {
    return connection.value.isMullvad ? 'Leaking DNS servers' : 'Not using Mullvad Encrypted DNS';
  }
  return isMullvadDoh.value ? 'Using Mullvad Encrypted DNS' : 'Using Mullvad DNS';
});

const iconType = computed(() => {
  if (isLeaking.value) {
    return connection.value.isMullvad ? 'leak' : 'warning';
  }
  return 'success';
});
</script>

<template>
  <IconLabel v-if="isLoading" text="Checking for DNS Leaks" type="spinner" />
  <IconLabel v-else-if="isError" text="Could not determine DNS servers" type="info" />
  <IconLabel v-else :text="labelText" :type="iconType" />
</template>
