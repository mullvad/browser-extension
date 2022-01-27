<script lang="ts" setup>
import { provide } from 'vue';

import RecommendationsCarousel from '@/components/RecommendationsCarousel.vue';
import ConnectionDetails from '@/components/ConnectionDetails/ConnectionDetails.vue';

import useRecommendations from '@/composables/useRecommendations/useRecommendations';
import useConnection, { ConnectionKey } from '@/composables/useConnection';

// Force update settings recommendations, because there are no listeners for those
const { updateSettings } = useRecommendations();
updateSettings();

const { isLoading, connection, isError } = useConnection();
provide(ConnectionKey, { connection, isLoading, isError });
</script>

<template>
  <RecommendationsCarousel />
  <ConnectionDetails />
</template>
