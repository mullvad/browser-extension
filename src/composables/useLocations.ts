import { ref } from 'vue';

const showLocations = ref(false);
const hostProxySelect = ref(false);

const useLocations = () => {
  const toggleLocations = () => {
    showLocations.value = !showLocations.value;
  };
  return { hostProxySelect, showLocations, toggleLocations };
};

export default useLocations;
