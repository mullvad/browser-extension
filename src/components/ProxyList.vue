<script lang="ts" setup>
import { NButton, NSpace } from 'naive-ui';
import type { City, SocksProxy } from '@/helpers/socksProxy/socksProxies.types';

defineProps<{
  cities: City[];
  onClickProxy: (proxy: SocksProxy) => void;
}>();
</script>

<template>
  <n-space vertical class="ml-8">
    <n-button
      v-for="proxy in cities[0].proxyList"
      :key="proxy.hostname"
      secondary
      medium
      @click="onClickProxy(proxy)"
    >
      {{ proxy.hostname }}
    </n-button>
  </n-space>
</template>
