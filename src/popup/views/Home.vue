<script lang="ts" setup>
import ConnectionDetails from '@/components/ConnectionDetails/ConnectionDetails.vue';
import ConnectionStatus from '@/components/ConnectionStatus/ConnectionStatus.vue';
import PrivacyRecommendations from '@/components/PrivacyRecommendations.vue';
import useRecommendedExtensions from '@/composables/useRecommendedExtensions';
import useConnection from '@/composables/useConnection';

const { isLoading, connection } = useConnection();
const recommendedExtensions = useRecommendedExtensions();
</script>
<template>
  <PrivacyRecommendations :recommendedExtensions="recommendedExtensions" />
  <ConnectionDetails :connection="connection" :isLoading="isLoading" />
  <ConnectionStatus
    :connected="connection.isMullvad"
    :protocol="connection.protocol"
    :extensions="recommendedExtensions"
  />
  <router-link to="location">Location</router-link>
</template>
