<script lang="ts" setup>
import { inject } from 'vue';

import { ConnectionKey, defaultConnection } from '@/composables/useConnection';

const { connection } = inject(ConnectionKey, defaultConnection);
</script>

<template>
  <div class="mb-2 ml-35px">
    <div>
      <h4 class="font-semibold inline-block">IP</h4>
      <span class="ml-2"
        >{{ connection.ip }} <span v-if="connection.ipv6"> / {{ connection.ipv6 }}</span></span
      >
    </div>
    <div>
      <h4 class="font-semibold inline-block">Provider</h4>
      <span class="ml-2">{{ connection.provider }}</span>
    </div>
    <div v-if="connection.isMullvad">
      <h4 class="font-semibold inline-block">Server</h4>
      <span class="ml-2">{{ connection.server }}</span>
    </div>
  </div>
</template>
