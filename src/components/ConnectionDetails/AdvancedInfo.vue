<script lang="ts" setup>
import { inject } from 'vue';

import { ConnectionKey, defaultConnection } from '@/composables/useConnection';

const { connection } = inject(ConnectionKey, defaultConnection);
</script>

<template>
  <div>
    <h4 class="font-semibold inline-block">IP</h4>
    {{ connection.ip }}
  </div>
  <div v-if="connection.ipv6">
    <h4 class="font-semibold inline-block">IPv6</h4>
    {{ connection.ipv6 }}
  </div>
  <div>
    <h4 class="font-semibold inline-block">Provider</h4>
    {{ connection.provider }}
  </div>
  <div v-if="connection.isMullvad">
    <h4 class="font-semibold inline-block">Server</h4>
    {{ connection.server }}
  </div>
  <div>
    <h4 class="font-semibold inline-block">IP</h4>
    {{ connection.ip }}
  </div>
</template>
