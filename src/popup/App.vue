<script lang="ts" setup>
import { useQueryProvider } from 'vue-query';
import { NConfigProvider, GlobalThemeOverrides, darkTheme } from 'naive-ui';
import Popup from '@/popup/Popup.vue';

useQueryProvider();

const themeOverrides: GlobalThemeOverrides = {
  common: {
    cardColor: 'rgb(41 77 115 / 50%)',
    fontSize: '1rem',
    lineHeight: '1.4',
  },
  Avatar: {
    color: 'transparent',
  },
  Card: {
    actionColor: 'transparent',
  },
  Drawer: {
    color: 'var(--dark-blue)',
  },
};
</script>
<template>
  <n-config-provider :theme-overrides="themeOverrides" :theme="darkTheme">
    <Popup />
  </n-config-provider>
</template>
