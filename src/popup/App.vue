<script lang="ts" setup>
import { provide } from 'vue';
import { useQueryProvider } from 'vue-query';
import { NConfigProvider, GlobalThemeOverrides, darkTheme } from 'naive-ui';

import Popup from '@/popup/Popup.vue';
import useConnection, { ConnectionKey } from '@/composables/useConnection';

const { isLoading, connection, isError } = useConnection();

provide(ConnectionKey, { connection, isLoading, isError });

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
  Checkbox: {
    colorChecked: 'var(--blue)',
    checkMarkColor: 'var(--success)',
    border: '1px solid var(--blue)',
    borderChecked: '1px solid var(--blue)',
  },
};
</script>

<template>
  <n-config-provider :theme-overrides="themeOverrides" :theme="darkTheme">
    <Popup />
  </n-config-provider>
</template>
