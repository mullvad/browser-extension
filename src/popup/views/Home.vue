<script lang="ts" setup>
import { provide } from 'vue';

import NotificationsCarousel from '@/components/NotificationsCarousel.vue';
import ConnectionDetails from '@/components/ConnectionDetails/ConnectionDetails.vue';

import useConnection, { ConnectionKey } from '@/composables/useConnection';
import useWebRtc from '@/composables/useWebRtc';

const { isLoading, connection, isError } = useConnection();
const { isLeaking, leakedInternalIPs } = useWebRtc();
provide(ConnectionKey, { connection, isLoading, isError });
</script>

<template>
  <div v-if="isLeaking()">
    <p v-for="ip in leakedInternalIPs" :key="ip">
      {{ ip }}
    </p>
  </div>

  <NotificationsCarousel />
  <ConnectionDetails />
</template>
