<script lang="ts" setup>
import IconLabel from '@/components/IconLabel.vue';
defineProps<{ connected: boolean }>();
</script>
<template>
  <IconLabel :state="connected" text="Using Mullvad VPN" />
</template>