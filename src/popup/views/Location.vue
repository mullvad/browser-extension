<script lang="ts" setup>
import { NCollapseItem, NCollapse, NButton, NSpace } from 'naive-ui';
import useServers from '@/composables/useServers';
import { asyncComputed } from '@vueuse/core';

const servers = asyncComputed(() => useServers());
const connect = (hostname: string) => {
  console.log({ hostname });
};
</script>
<template>
  <h1>Location</h1>
  <n-collapse arrow-placement="right">
    <n-collapse-item
      v-for="{ country, cities } in servers"
      :key="country"
      :name="country"
      :title="country"
    >
      <template #header-extra>{{ cities.length }}</template>
      <n-collapse arrow-placement="right">
        <n-collapse-item
          v-for="{ city, proxyList } in cities"
          :key="city"
          :name="city"
          :title="city"
        >
          <template #header-extra>{{ proxyList.length }}</template>
          <n-space
            vertical
          >
            <n-button
              v-for="proxy in proxyList"
              :key="proxy.hostname"
              secondary
              medium
              @click="connect(proxy.hostname)"
            >
              {{ proxy.hostname }}
            </n-button>
          </n-space>
        </n-collapse-item>
      </n-collapse>
    </n-collapse-item>
  </n-collapse>
</template>
