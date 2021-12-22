<script lang="ts" setup>
import IcLocation from '~icons/ic/baseline-location-on';
import useSocksProxy from '@/composables/useSocksProxy';

const { toggleProxy, socksEnabled } = useSocksProxy();
</script>
<template>
  <div class="flex">
    <button :class="{ connected: socksEnabled }" @click="toggleProxy">
      <span v-if="socksEnabled">Disconnect</span><span v-else>Connect</span> Proxy
    </button>
    <router-link to="/location" class="flex items-center justify-center">
      <IcLocation />
    </router-link>
  </div>
</template>
<style scoped>
button {
  --green: #44ad4de6;
  --green-hover: #44ad4dff;
  --red: #e34039e6;
  --red-hover: #e34039ff;

  padding: 0.5rem 1rem;
  background-color: var(--green);
  color: #fff;
  border-radius: 0.25rem 0 0 0.25rem;
  border: none;
}

a {
  --blue: rgb(41 77 115 / 90%);
  --blue-hover: rgb(41 77 115 / 100%);

  border-radius: 0 0.25rem 0.25rem 0;
  border: none;
  background-color: var(--blue);
  min-width: 40px;
  color: #fff;
  margin-left: 2px;
}

a:focus,
a:hover {
  background-color: var(--blue-hover);
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
