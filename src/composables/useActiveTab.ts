import { ref } from 'vue';
import useProxyPermissions from '@/composables/useProxyPermissions';

const { proxyPermissionsGranted } = useProxyPermissions();
const activeTabHost = ref('');
const isAboutPage = ref(false);

const getActiveTab = async () => {
  if (proxyPermissionsGranted.value) {
    const activeWindow = await browser.windows.getCurrent({ populate: true });
    const activeTab = activeWindow.tabs!.find((tab) => tab.active);

    const activeTabURL = new URL(activeTab!.url!);
    activeTabHost.value = activeTabURL.hostname;
    isAboutPage.value = activeTabURL.protocol === 'about:';
  }
};

const useActiveTab = () => {
  getActiveTab();
  return { activeTabHost, isAboutPage };
};

export default useActiveTab;
