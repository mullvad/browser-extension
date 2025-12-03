import { ref } from 'vue';
import { getActiveTabDetails } from '@/helpers/tabs';

const activeTabHost = ref('');
const isAboutPage = ref(false);

const getActiveTab = async () => {
  const { host, isAboutPage: isAboutPageValue } = await getActiveTabDetails();
  activeTabHost.value = host;
  isAboutPage.value = isAboutPageValue;
};

const useActiveTab = () => {
  getActiveTab();

  return { activeTabHost, isAboutPage };
};

export default useActiveTab;
