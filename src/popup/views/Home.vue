<script lang="ts" setup>
import { provide } from 'vue';

import NotificationsCarousel from '@/components/NotificationsCarousel.vue';
import ConnectionDetails from '@/components/ConnectionDetails/ConnectionDetails.vue';

import useConnection, { ConnectionKey } from '@/composables/useConnection';
import useWebRtc from '@/composables/useWebRtc';

const { isLoading, connection, isError } = useConnection();
const { webRTCLeaking, webRTCLeakedIPs } = useWebRtc();

provide(ConnectionKey, { connection, isLoading, isError });
</script>

<template>
  <div v-if="webRTCLeaking">
    <p v-for="ip in webRTCLeakedIPs" :key="ip">
      {{ ip }}
    </p>
  </div>

  <NotificationsCarousel />
  <ConnectionDetails />
</template>
