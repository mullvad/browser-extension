import { ref } from 'vue';

export function useOptionsTab() {
  const currentTab = ref('');

  const changeTab = (tab: string) => {
    currentTab.value = tab;
  };

  return {
    currentTab,
    changeTab,
  };
}
