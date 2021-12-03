<script lang="ts" setup>
import { connCheck, Connection } from '@/helpers/connCheck';

const connection = ref<Connection>({} as Connection);
connCheck().then((conn) => {
  connection.value = conn;
});
</script>
<template>
  <p
    class="uppercase text-lg font-black pb-2"
    :class="connection.isMullvad ? 'text-success' : 'text-error'"
  >
    <span v-if="connection.isMullvad">Secure connection</span>
    <span v-else>Unsecured connection</span>
  </p>
  <h2 class="text-white text-4xl font-bold pb-2">{{ connection.city }}</h2>
  <h2 class="text-white text-4xl font-bold pb-2">{{ connection.country }}</h2>
  <p class="text-lg font-mono">{{ connection.ip }}</p>
</template>
