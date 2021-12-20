<script lang="ts" setup>
import { computed, toRefs } from 'vue';
import IconLabel from '@/components/IconLabel.vue';

const props = defineProps<{ protocol?: string }>();
const { protocol } = toRefs(props);
const isUsingProxy = computed(() => protocol?.value?.startsWith('SOCKS') ?? false);
const labelText = computed(() => (isUsingProxy.value ? 'Using Proxy' : 'Not Using Proxy'));
</script>
<template>
  <IconLabel :state="isUsingProxy" :text="labelText" />
</template>
