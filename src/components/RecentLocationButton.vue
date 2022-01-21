<script lang="ts" setup>
import { computed } from 'vue';

import Button from '@/components/Button/Button.vue';

import useHistoricConnections from '@/composables/useHistoricConnections';
import useSocksProxy from '@/composables/useSocksProxy';
import useSocksProxies from '@/composables/useSocksProxies';
import getRandomSocksProxy from '@/helpers/getRandomSocksProxy';

const { data: socksProxies } = useSocksProxies();
const { mostRecent, storeSocksProxyUsage } = useHistoricConnections();
const { connectToSocksProxy } = useSocksProxy();

const buttonLabel = computed(() => {
  const { country, city, hostname } = mostRecent;
  if (hostname) {
    const [servername] = hostname.split('.mullvad.net');
    return `${city} (${servername})`;
  }
  if (city) {
    return city;
  }
  return country;
});

const clickHandler = () => {
  const { country, city, hostname } = mostRecent;
  if (hostname) {
    storeSocksProxyUsage({ country, city, hostname });
    connectToSocksProxy(hostname);
  } else {
    const { hostname, port } = getRandomSocksProxy({
      socksProxies: socksProxies.value,
      country,
      city,
    });
    storeSocksProxyUsage({ country, city });
    connectToSocksProxy(hostname, port);
  }
};
</script>
<template>
  <Button v-if="mostRecent" @click="clickHandler">{{ buttonLabel }}</Button>
</template>
