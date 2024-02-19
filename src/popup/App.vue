<script lang="ts" setup>
import { provide, onMounted } from 'vue';
import { useQueryProvider } from 'vue-query';
import { NConfigProvider, GlobalThemeOverrides, darkTheme } from 'naive-ui';

import Popup from '@/popup/Popup.vue';

import useConnection, { ConnectionKey } from '@/composables/useConnection';
import useListProxies from '@/composables/useListProxies';

const { isLoading, connection, isError } = useConnection();
const { getSocksProxies } = useListProxies();

provide(ConnectionKey, { connection, isLoading, isError });

const loadProxies = async () => {
  await getSocksProxies();
};

onMounted(loadProxies);

useQueryProvider();
const themeOverrides: GlobalThemeOverrides = {
  common: {
    cardColor: 'rgba(41, 77, 115, 0.5)',
    fontSize: '1rem',
    lineHeight: '1.4',
  },
  Avatar: {
    color: 'transparent',
  },
  Card: {
    actionColor: 'transparent',
    borderRadius: '8px',
  },
  Drawer: {
    color: 'var(--dark-blue)',
  },
  Switch: {
    railColorActive: 'var(--success)',
  },
};
</script>

<template>
  <n-config-provider :theme-overrides="themeOverrides" :theme="darkTheme">
    <Popup />
  </n-config-provider>
</template>
