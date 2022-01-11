<script lang="ts" setup>
import { computed, inject, ref } from 'vue';
import type { Connection } from '@/helpers/connCheck.types';
import { ConnectionKey } from '@/composables/useConnection';
import IconLabel from '@/components/IconLabel.vue';

const connection = inject(ConnectionKey, ref({} as Connection));
const protocol = computed(() => connection.value.protocol);
const isUsingProxy = computed(() => protocol?.value?.startsWith('SOCKS') ?? false);
const labelText = computed(() => (isUsingProxy.value ? 'Using Proxy' : 'Not Using Proxy'));
</script>
<template>
  <IconLabel :state="isUsingProxy" :text="labelText" />
</template>
