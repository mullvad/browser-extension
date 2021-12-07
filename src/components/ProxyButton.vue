<script lang="ts" setup>
import { setSocks } from '@/helpers/socks';

const socksEnabled = ref(false);
const clickSocksProxy = () => {
  setSocks(!socksEnabled.value);
};
</script>
<template>
  <button @click="clickSocksProxy"><span v-if="socksEnabled">Disconnect</span><span v-else>Connect</span> Proxy</button>
</template>
