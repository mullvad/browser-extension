<script lang="ts" setup>
defineProps<{ connected: boolean; protocol?: string }>();
</script>
<template>
  <div
    v-if="connected"
    class="mt-8"
  >
    <p class="text-success">
      <FeCheckCircle class="mr-2" />Using Mullvad VPN <span
        v-if="protocol"
        class="ml-2"
      >({{ protocol }})</span>
    </p>
  </div>
</template>
<style scoped>
p {
  font-size: 1.25rem;
  display: flex;
  align-items: center;
}
</style>
