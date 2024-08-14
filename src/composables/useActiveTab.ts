import { getActiveTabDetails } from '@/helpers/socksProxy';
import { ref } from 'vue';

const activeTabHost = ref('');
const isBrowserPage = ref(false);

const getActiveTab = async () => {
  const activeTabDetails = await getActiveTabDetails();

  activeTabHost.value = activeTabDetails.host;
  isBrowserPage.value =
    activeTabDetails.protocol === 'about:' || activeTabDetails.protocol === 'moz-extension:';
};

const useActiveTab = () => {
  getActiveTab();

  return { activeTabHost, isBrowserPage };
};

export default useActiveTab;
