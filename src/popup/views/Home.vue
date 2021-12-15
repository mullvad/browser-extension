<script lang="ts" setup>
import ConnectionDetails from '@/components/ConnectionDetails.vue';
import ConnectionStatus from '@/components/ConnectionStatus.vue';
import PrivacyRecommendations from '@/components/PrivacyRecommendations.vue';
import useRecommendedExtensions from '@/helpers/useRecommendedExtensions';
import useConnection from '@/popup/useConnection';

const { connection } = useConnection();
const recommendedExtensions = useRecommendedExtensions();
</script>
<template>
  <PrivacyRecommendations :recommendedExtensions="recommendedExtensions" />
  <ConnectionDetails :connection="connection" />
  <ConnectionStatus :connected="connection.isMullvad" :protocol="connection.protocol" />
</template>
