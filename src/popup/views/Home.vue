<script lang="ts" setup>
import { connCheck, Connection } from '@/helpers/connCheck';
import ConnectionDetails from '@/components/ConnectionDetails.vue';
import ConnectionStatus from '@/components/ConnectionStatus.vue';
import PrivacyRecommendations from '@/components/PrivacyRecommendations.vue';
import useRecommendedExtensions from '@/helpers/useRecommendedExtensions';

const connection = ref<Connection>({} as Connection);
const recommendedExtensions = useRecommendedExtensions();

connCheck().then((conn) => {
  connection.value = conn;
  /*if (connection.protocol) {
    storageLocal.socksConfig.get().then((socksConfig) => {
      if (!socksConfig) {
        createSocksConfig(connection.protocol);
      }
    })
  }*/
});
</script>
<template>
  <PrivacyRecommendations :recommendedExtensions="recommendedExtensions" />
  <ConnectionDetails :connection="connection" />
  <ConnectionStatus :connected="connection.isMullvad" :protocol="connection.protocol" />
</template>
