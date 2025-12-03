import { computed, ref } from 'vue';
import { getActiveTabDetails } from '@/helpers/tabs';
import { checkDomain } from '@/helpers/domain';

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
const activeTabDomain = computed(() => {
  const { domain, hasSubdomain, subDomain } = checkDomain(activeTabHost.value);
  return hasSubdomain ? subDomain : domain;
});

const useActiveTab = () => {
  getActiveTab();

  return { activeTabDomain, activeTabHost, isAboutPage, isExtensionPage };
};

export default useActiveTab;
