import { ref } from 'vue';
import { getActiveTabDetails } from '@/helpers/tabs';

const activeTabHost = ref('');
const isAboutPage = ref(false);
const isExtensionPage = ref(false);

const getActiveTab = async () => {
  const {
    host,
    isAboutPage: isAboutPageValue,
    isExtensionPage: isExtensionPageValue,
  } = await getActiveTabDetails();

  activeTabHost.value = host;
  isAboutPage.value = isAboutPageValue;
  isExtensionPage.value = isExtensionPageValue; // TODO is this value used anywhere?
};
const useActiveTab = () => {
  getActiveTab();

  return { activeTabHost, isAboutPage, isExtensionPage };
};

export default useActiveTab;
