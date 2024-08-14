import { ref } from 'vue';

const showLocations = ref(false);
const hostProxySelect = ref(false);
const customProxy = ref('');

const useLocations = () => {
  const toggleLocations = () => {
    showLocations.value = !showLocations.value;
  };
  return { customProxy, hostProxySelect, showLocations, toggleLocations };
};

export default useLocations;
