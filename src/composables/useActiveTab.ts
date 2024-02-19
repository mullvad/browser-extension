import { ref } from 'vue';

const activeTabHost = ref('');
const isAboutPage = ref(false);

const getActiveTab = async () => {
  try {
    const activeTab = await browser.tabs.query({ active: true });
    const activeTabURL = new URL(activeTab[0].url!);

    activeTabHost.value = activeTabURL.host;
    isAboutPage.value = activeTabURL.protocol === 'about:';
  } catch (error) {
    console.log('No active tab found');
  }
};

const useActiveTab = () => {
  getActiveTab();
  return { activeTabHost, isAboutPage };
};

export default useActiveTab;
