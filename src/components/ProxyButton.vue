<script lang="ts" setup>
import { toggleProxy } from '@/helpers/socks';
import useStore from '@/popup/useStore';

const { socksEnabled } = useStore();
</script>
<template>
  <button :class="{connected: socksEnabled}" @click="toggleProxy">
    <span v-if="socksEnabled">Disconnect</span><span v-else>Connect</span> Proxy
  </button>
</template>
<style scoped>
button {
  --green: #44AD4DE6;
  --green-hover: #44AD4DFF;
  --red: #E34039E6;
  --red-hover: #E34039FF;
  padding: 0.5rem 1rem;
  background-color: var(--green);
  color: #fff;
  border-radius: 0.25rem;
}
button.connected {
  background-color: var(--red);
}

button:focus,
button:active {
  outline: none;
}

button:focus,
button:hover {
  background-color: var(--green-hover);
}
button.connected:focus,
button.connected:hover {
  background-color: var(--red-hover);
}
</style>