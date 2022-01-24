import { computed, ref } from 'vue';

import useSocksProxies from '@/composables/useSocksProxies';

const query = ref('');

const clearFilter = () => query.value = '';

const useFilteredSocksProxies = () => {
  const { data: socksProxies } = useSocksProxies();

  const filteredSocksProxies = computed(() =>
    socksProxies.value?.filter(
      (country) =>
        !query.value ||
        country.country.toLowerCase().includes(query.value.toLowerCase()) ||
        country.cities.some((city) =>
          city.city.toLowerCase().includes(query.value.toLowerCase()),
        ),
    ),
  );
  
  return {
    query,
    socksProxies: filteredSocksProxies,
    clearFilter,
  };
};

export default useFilteredSocksProxies;
