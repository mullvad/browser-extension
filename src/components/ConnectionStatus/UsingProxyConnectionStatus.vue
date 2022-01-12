<script lang="ts" setup>
import { computed, inject } from 'vue';
import { ConnectionKey, defaultConnection } from '@/composables/useConnection';
import IconLabel from '@/components/IconLabel.vue';

const { connection } = inject(ConnectionKey, defaultConnection);
const protocol = computed(() => connection.value.protocol);
const isUsingProxy = computed(() => protocol?.value?.startsWith('SOCKS') ?? false);
const labelText = computed(() => (isUsingProxy.value ? 'Using Proxy' : 'Not Using Proxy'));
</script>
<template>
  <IconLabel :state="isUsingProxy" :text="labelText" />
</template>
