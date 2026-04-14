<script lang="ts" setup>
import { NButton, NSpace } from 'naive-ui';
import type { SocksProxy } from '@/helpers/socksProxy/socksProxies.types';

defineProps<{
  proxyList: SocksProxy[];
  onClickProxy: (proxy: SocksProxy) => void;
}>();
</script>

<template>
  <n-space vertical class="ml-8">
    <n-button
      v-for="proxy in proxyList"
      :key="proxy.hostname"
      secondary
      medium
      @click="onClickProxy(proxy)"
    >
      {{ proxy.hostname }}
    </n-button>
  </n-space>
</template>
