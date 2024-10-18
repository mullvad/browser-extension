<script lang="ts" setup>
import { NTabPane, NTabs, TabsProps } from 'naive-ui';

import RecentLocationButtons from '@/components/RecentLocationButtons.vue';
import MostUsedLocationButtons from '@/components/MostUsedLocationButtons.vue';
import useProxyHistory from '@/composables/useProxyHistory/useProxyHistory';
import type { HistoryEntry } from '@/composables/useProxyHistory/HistoryEntries.types';

type TabsThemeOverrides = NonNullable<TabsProps['themeOverrides']>;
const tabsThemeOverrides: TabsThemeOverrides = {
  barColor: '#fff',
  tabTextColorActiveLine: '#fff',
  tabTextColorHoverLine: '#fff',
  tabTextColorLine: 'var(--light-grey)',
};

defineProps<{ selectLocation: (connection: HistoryEntry) => void }>();

const { mostRecent } = useProxyHistory();
</script>

<template>
  <div v-if="mostRecent.length > 0" class="mb-3 tabs-card">
    <n-tabs
      size="large"
      justify-content="space-evenly"
      type="line"
      :theme-overrides="tabsThemeOverrides"
    >
      <n-tab-pane name="mostUsed" tab="Frequent Locations">
        <MostUsedLocationButtons :selectLocation="selectLocation" />
      </n-tab-pane>
      <n-tab-pane name="recent" tab="Recent Locations">
        <RecentLocationButtons :selectLocation="selectLocation" />
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
