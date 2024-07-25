import { getActiveTabDetails } from '@/helpers/socksProxy';
import { ref } from 'vue';

const activeTabHost = ref('');
const isAboutPage = ref(false);

const getActiveTab = async () => {
  const activeTabDetails = await getActiveTabDetails();

  activeTabHost.value = activeTabDetails.host;
  isAboutPage.value = activeTabDetails.protocol === 'about:';
};

const useActiveTab = () => {
  getActiveTab();

  return { activeTabHost, isAboutPage };
};

export default useActiveTab;
