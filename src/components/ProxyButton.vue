<script lang="ts" setup>
import { toggleProxy } from '@/helpers/socks';
import useStore from '@/popup/useStore';

const { socksEnabled } = useStore();
</script>
<template>
  <button @click="toggleProxy">
    <span v-if="socksEnabled">Disconnect</span><span v-else>Connect</span> Proxy
  </button>
</template>
