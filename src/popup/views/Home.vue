<script lang="ts" setup>
import ConnectionDetails from '@/components/ConnectionDetails/ConnectionDetails.vue';
import ConnectionStatus from '@/components/ConnectionStatus/ConnectionStatus.vue';
import PrivacyRecommendations from '@/components/PrivacyRecommendations.vue';
import useConnection from '@/composables/useConnection';

const { isLoading, connection } = useConnection();
</script>
<template>
  <PrivacyRecommendations />
  <ConnectionDetails :connection="connection" :isLoading="isLoading" />
  <ConnectionStatus
    :connected="connection.isMullvad"
    :protocol="connection.protocol"
  />
</template>
