import { ref } from 'vue';

const activeTabHost = ref('');
const isAboutPage = ref(false);

const getActiveTab = async () => {
  const activeWindow = await browser.windows.getCurrent({ populate: true });
  const activeTab = activeWindow.tabs!.find((tab) => tab.active);

  const activeTabURL = new URL(activeTab!.url!);
  activeTabHost.value = activeTabURL.hostname;
  isAboutPage.value = activeTabURL.protocol === 'about:';
};

const useActiveTab = () => {
  getActiveTab();
  return { activeTabHost, isAboutPage };
};

export default useActiveTab;
