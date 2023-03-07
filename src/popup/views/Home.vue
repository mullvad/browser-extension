<script lang="ts" setup>
import { provide } from 'vue';

import NotificationsCarousel from '@/components/NotificationsCarousel.vue';
import ConnectionDetails from '@/components/ConnectionDetails/ConnectionDetails.vue';

import useConnection, { ConnectionKey } from '@/composables/useConnection';

const { isLoading, connection, isError } = useConnection();
provide(ConnectionKey, { connection, isLoading, isError });
</script>

<template>
  <NotificationsCarousel />
  <ConnectionDetails />
</template>
