<script lang="ts" setup>
import { connCheck, Connection } from '@/helpers/connCheck';
import ConnectionDetails from '@/components/ConnectionDetails.vue';
import ConnectionStatus from '@/components/ConnectionStatus.vue';
import PrivacyRecommendations from '@/components/PrivacyRecommendations.vue';
import { storageLocal } from '@/helpers/storageLocal';
import { createSocksConfig } from '@/helpers/socks';

const connection = ref<Connection>({} as Connection);
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
  <PrivacyRecommendations />
  <ConnectionDetails :connection="connection" />
  <ConnectionStatus :connected="connection.isMullvad" :protocol="connection.protocol" />
</template>
