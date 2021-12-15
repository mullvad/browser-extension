<script lang="ts" setup>
import { toRefs, computed } from 'vue';
import IconLabel from '@/components/IconLabel.vue';

const props = defineProps<{ connected: boolean; protocol?: string }>();
const { protocol } = toRefs(props);
const isUsingProxy = computed(() => protocol?.value?.startsWith('SOCKS'));
</script>
<template>
  <div v-if="connected" class="mt-8">
    <IconLabel :state="connected" text="Using Mullvad VPN" />
    <IconLabel :state="isUsingProxy" text="Using Proxy" />
  </div>
</template>
<style scoped>
p {
  font-size: 1.25rem;
  display: flex;
  align-items: center;
}
</style>
