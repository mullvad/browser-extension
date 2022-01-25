import { computed, ref } from 'vue';

import useSocksProxies from '@/composables/useSocksProxies';
import groupByCountryAndCity from '@/composables/useFilteredSocksProxies/groupByCountryAndCity';
import sortProxiesByCountryAndCity from '@/composables/useFilteredSocksProxies/sortProxiesByCountryAndCity';
import type { SocksProxy } from '@/composables/useFilteredSocksProxies/SocksProxies.types';

const query = ref('');

const clearFilter = () => (query.value = '');

const useFilteredSocksProxies = () => {
  const { data, isError, isLoading, error } = useSocksProxies();

  const onlineProxies = computed(() =>
    (data.value ?? []).filter((proxy: SocksProxy) => proxy.online),
  );

  const groupedSocksProxies = computed(() =>
    sortProxiesByCountryAndCity(groupByCountryAndCity(onlineProxies.value)),
  );

  const filteredData = computed(() =>
    onlineProxies.value.filter(
      (socksProxy) =>
        !query.value ||
        socksProxy.location.country.toLowerCase().includes(query.value.toLowerCase()) ||
        socksProxy.location.city.toLowerCase().includes(query.value.toLowerCase()) ||
        socksProxy.hostname.toLowerCase().includes(query.value.toLowerCase()),
    ),
  );

  const filteredSocksProxies = computed(() =>
    sortProxiesByCountryAndCity(groupByCountryAndCity(filteredData.value)),
  );

  return {
    query,
    filteredSocksProxies,
    groupedSocksProxies,
    clearFilter,
    isError,
    isLoading,
    error,
  };
};

export default useFilteredSocksProxies;
