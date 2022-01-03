<script lang="ts" setup>
import { NConfigProvider, GlobalThemeOverrides, darkTheme } from 'naive-ui';
import Popup from '@/popup/Popup.vue';

const themeOverrides: GlobalThemeOverrides = {
  common: {
    cardColor: 'rgba(41, 77, 115, 0.5)',
  },
  Avatar: {
    color: 'transparent',
  },
  Card: {
    actionColor: 'transparent',
    paddingMedium: '1.25rem 3rem',
  },
};
</script>
<template>
  <n-config-provider :theme-overrides="themeOverrides" :theme="darkTheme">
    <Popup />
  </n-config-provider>
</template>
