<script lang="ts" setup>
import ConnectionDetails from '@/components/ConnectionDetails/ConnectionDetails.vue';
import ConnectionStatus from '@/components/ConnectionStatus/ConnectionStatus.vue';
import PrivacyRecommendations from '@/components/PrivacyRecommendations.vue';
import useConnection from '@/composables/useConnection';
import useExtensions from '@/composables/useExtensions/useExtensions';

const { isLoading, connection } = useConnection();
const { recommendedExtensions } = useExtensions();
</script>
<template>
  <PrivacyRecommendations :recommendedExtensions="recommendedExtensions" />
  <ConnectionDetails :connection="connection" :isLoading="isLoading" />
  <ConnectionStatus
    :connected="connection.isMullvad"
    :protocol="connection.protocol"
    :extensions="recommendedExtensions"
  />
</template>
