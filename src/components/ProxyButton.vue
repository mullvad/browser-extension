<script lang="ts" setup>
import { isProxy, toRaw, toRefs } from 'vue';
import { asyncComputed } from '@vueuse/core';
import { setSocks } from '@/helpers/socks';
import { Connection } from '@/helpers/connCheck';
import { storageLocal } from '@/helpers/storageLocal';
import useSocksConfig from '@/helpers/useSocksConfig';

const props = defineProps<{ connection: Connection }>();
const connection = toRefs(props).connection;

const socksConfig = useSocksConfig(connection);

const socksEnabled = asyncComputed<boolean>(
  async () => await storageLocal.socksEnabled.get(),
  false,
);

const clickSocksProxy = () => {
  // TODO: Why is `socksConfig.value` a Proxy object here?!
  let socksConfigValueToSet = socksConfig.value;
  if (isProxy(socksConfigValueToSet)) {
    socksConfigValueToSet = toRaw(socksConfigValueToSet);
  }
  setSocks(!socksEnabled.value, socksConfigValueToSet);
  // TODO: We need a better way than having to manually update a value in mutliple places
  socksEnabled.value = !socksEnabled.value;
  storageLocal.socksEnabled.set(socksEnabled.value);
};
</script>
<template>
  <button @click="clickSocksProxy">
    <span v-if="socksEnabled">Disconnect</span><span v-else>Connect</span> Proxy
  </button>
</template>
