<script lang="ts" setup>
import { useQueryProvider } from 'vue-query';
import { NConfigProvider, GlobalThemeOverrides, darkTheme } from 'naive-ui';

import { NScrollbar } from 'naive-ui';
import ProxiesHeader from '@/components/Headers/ProxiesHeader.vue';

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
    <main>
      <header class="sticky top-0 z-1">
        <ProxiesHeader />
      </header>

      <n-scrollbar :x-scrollable="false" class="max-h-543px px-4">
        <div class="py-1rem">
          <p>Custom proxies list here</p>
        </div>
      </n-scrollbar>
    </main>
  </n-config-provider>
</template>

<style scoped>
header {
  box-shadow:
    rgb(0 0 0 / 5%) 0 1px 2px 0,
    rgb(0 0 0 / 5%) 0 1px 4px 0,
    rgb(0 0 0 / 5%) 0 2px 8px 0;
}
</style>
