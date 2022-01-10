import { ref } from 'vue';

const showLocations = ref(false);
const useLocations = () => {
  const toggleLocations = () => {
    showLocations.value = !showLocations.value;
  };
  return { showLocations, toggleLocations };
};

export default useLocations;
