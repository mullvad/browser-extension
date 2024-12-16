import { ref } from 'vue';
import { getActiveTabDetails } from '@/helpers/tabs';

const activeTabHost = ref('');
const isBrowserPage = ref(false);

const getActiveTab = async () => {
  const { protocol, host } = await getActiveTabDetails();
  activeTabHost.value = host;
  isBrowserPage.value = protocol === 'about:' || protocol === 'moz-extension:';
};

const useActiveTab = () => {
  getActiveTab();

  return { activeTabHost, isBrowserPage };
};

export default useActiveTab;
