<script lang="ts" setup>
import { provide } from 'vue';

import ConnectionDetails from '@/components/ConnectionDetails/ConnectionDetails.vue';
import PrivacyRecommendations from '@/components/PrivacyRecommendations.vue';

import useConnection, { ConnectionKey } from '@/composables/useConnection';

const { isLoading, connection, isError } = useConnection();
provide(ConnectionKey, { connection, isLoading, isError });
</script>

<template>
  <RecommendationsCarousel />
  <ConnectionDetails />
</template>
