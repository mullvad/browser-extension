<script lang="ts" setup>
import { NConfigProvider, darkTheme } from 'naive-ui';
import { themeOverrides } from '@/styles/themeOverrides';

import Options from './Options.vue';
</script>

<template>
  <n-config-provider :theme-overrides="themeOverrides" :theme="darkTheme">
    <Options />
  </n-config-provider>
</template>
