<script lang="ts" setup>
import { useQueryProvider } from 'vue-query';
import { NConfigProvider, GlobalThemeOverrides, darkTheme } from 'naive-ui';
import Popup from '@/popup/Popup.vue';

useQueryProvider();

const themeOverrides: GlobalThemeOverrides = {
  common: {
    cardColor: 'rgba(41, 77, 115, 0.5)',
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
