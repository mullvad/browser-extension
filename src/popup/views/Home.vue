<script lang="ts" setup>
import { connCheck, Connection } from '@/helpers/connCheck';
import ConnectionDetails from '@/components/ConnectionDetails.vue';
import ConnectionStatus from '@/components/ConnectionStatus.vue';
import PrivacyRecommendations from '@/components/PrivacyRecommendations.vue';
import useRecommendedExtensions from '@/helpers/useRecommendedExtensions';
import { asyncComputed } from '@vueuse/core';

const connection = asyncComputed<Connection>(async () => {
  return await connCheck();
}, {} as Connection);

const recommendedExtensions = useRecommendedExtensions();

</script>
<template>
  <PrivacyRecommendations :recommendedExtensions="recommendedExtensions" />
  <ConnectionDetails :connection="connection" />
  <ConnectionStatus :connected="connection.isMullvad" :protocol="connection.protocol" />
</template>
