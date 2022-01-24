<script lang="ts" setup>
import { NTabPane, NTabs, TabsProps } from 'naive-ui';

import RecentLocationButtons from '@/components/RecentLocationButtons.vue';
import MostUsedLocationButtons from '@/components/MostUsedLocationButtons.vue';
import SearchLocation from '@/components/SearchLocation.vue';

import useHistoricConnections from '@/composables/useHistoricConnections/useHistoricConnections';
import type { HistoricConnection } from '@/composables/useHistoricConnections/HistoricConnections.types';

type TabsThemeOverrides = NonNullable<TabsProps['themeOverrides']>;
const tabsThemeOverrides: TabsThemeOverrides = {
  barColor: '#fff',
  tabTextColorActiveLine: '#fff',
  tabTextColorHoverLine: '#fff',
  tabTextColorLine: 'var(--light-grey)',
};

defineProps<{ selectLocation: (connection: HistoricConnection) => void }>();

const { mostRecent } = useHistoricConnections();
</script>

<template>
  <div v-if="mostRecent" class="mb-8 tabs-card">
    <n-tabs
      size="large"
      justify-content="space-evenly"
      type="line"
      :theme-overrides="tabsThemeOverrides"
    >
      <n-tab-pane name="mostUsed" tab="Frequent">
        <MostUsedLocationButtons :selectLocation="selectLocation" />
      </n-tab-pane>
      <n-tab-pane name="recent" tab="Recent">
        <RecentLocationButtons :selectLocation="selectLocation" />
      </n-tab-pane>
      <n-tab-pane name="search" tab="Search">
        <SearchLocation />
      </n-tab-pane>
    </n-tabs>
  </div>
</template>

<style scoped>
.tabs-card {
  background: rgb(41 77 115 / 50%);
  padding: 0 24px 20px;
  border-radius: 3px;
}
</style>
