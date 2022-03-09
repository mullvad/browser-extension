<script lang="ts" setup>
import { provide } from 'vue';

import RecommendationsCarousel from '@/components/RecommendationsCarousel.vue';
import ConnectionDetails from '@/components/ConnectionDetails/ConnectionDetails.vue';

import useConnection, { ConnectionKey } from '@/composables/useConnection';

const { isLoading, connection, isError } = useConnection();
provide(ConnectionKey, { connection, isLoading, isError });
</script>

<template>
  <RecommendationsCarousel />
  <ConnectionDetails />
</template>
