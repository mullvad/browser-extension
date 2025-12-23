<script lang="ts" setup>
import { computed } from 'vue';
import { NAvatar, NTabPane, NTabs } from 'naive-ui';

import AboutTab from '@/components/OptionsTabs/AboutTab.vue';
import ImportExportTab from '@/components/OptionsTabs/ImportExportTab.vue';
import ProxyTab from '@/components/OptionsTabs/ProxyTab.vue';
import SettingsTab from '@/components/OptionsTabs/SettingsTab.vue';

import useStore from '@/composables/useStore';

const { optionsActiveTab } = useStore();
const defaultTab = computed(() => optionsActiveTab.value);
</script>

<template>
  <main class="w-[800px] mx-auto px-4 pb-4">
    <n-tabs
      v-model:value="optionsActiveTab"
      type="line"
      animated
      :default-value="defaultTab"
      size="large"
    >
      <template #prefix>
        <n-avatar size="small" src="/assets/mullvad-logo.svg" />
      </template>

      <n-tab-pane name="settings" tab="Settings">
        <SettingsTab />
      </n-tab-pane>

      <n-tab-pane name="proxy" tab="Proxy">
        <ProxyTab />
      </n-tab-pane>

      <n-tab-pane name="import-export" tab="Import/Export">
        <ImportExportTab />
      </n-tab-pane>

      <n-tab-pane name="about" tab="About">
        <AboutTab />
      </n-tab-pane>
    </n-tabs>
  </main>
</template>

<style scoped>
.n-tabs-nav {
  position: sticky !important;
  top: 0;
  z-index: 1;
  background-color: var(--dark-blue);
}
</style>
