<script lang="ts" setup>
import { provide } from 'vue';
import ConnectionDetails from '@/components/ConnectionDetails/ConnectionDetails.vue';
import ConnectionStatus from '@/components/ConnectionStatus/ConnectionStatus.vue';
import PrivacyRecommendations from '@/components/PrivacyRecommendations.vue';
import useConnection, { ConnectionIsLoadingKey, ConnectionKey } from '@/composables/useConnection';

const { isLoading, connection } = useConnection();
provide(ConnectionKey, connection);
provide(ConnectionIsLoadingKey, isLoading);

</script>
<template>
  <PrivacyRecommendations />
  <ConnectionDetails />
  <ConnectionStatus />
</template>
