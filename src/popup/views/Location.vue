<script lang="ts" setup>
import { NCollapseItem, NCollapse, NButton, NSpace } from 'naive-ui';
import useServers from '@/composables/useServers';
import { asyncComputed } from '@vueuse/core';
import pluralize from '@/helpers/pluralize';

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
      <template #header-extra
        >{{ pluralize('city', cities.length, 'cities') }} /
        {{
          pluralize(
            'proxy',
            cities.reduce((acc, { proxyList }) => acc + proxyList.length, 0),
            'proxies',
          )
        }}</template
      >
      <n-collapse arrow-placement="right">
        <n-collapse-item
          v-for="{ city, proxyList } in cities"
          :key="city"
          :name="city"
          :title="city"
        >
          <template #header-extra>{{ pluralize('proxy', proxyList.length, 'proxies') }}</template>
          <n-space vertical>
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
