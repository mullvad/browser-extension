import { ref } from 'vue';

const showLocations = ref(false);
const customProxySelect = ref(false);
const customProxyHost = ref('');

const useLocations = () => {
  const toggleLocations = () => {
    showLocations.value = !showLocations.value;
  };

  const proxySelect = (host?: string) => {
    // when host is not provided, it means the user is selecting a proxy for all websites
    customProxyHost.value = host ? host : '';
    customProxySelect.value = !!host;
    toggleLocations();
  };

  return { customProxyHost, customProxySelect, proxySelect, showLocations, toggleLocations };
};

export default useLocations;
