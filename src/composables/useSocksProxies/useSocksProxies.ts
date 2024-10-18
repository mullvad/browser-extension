import { computed, ref } from 'vue';

import { addCountryCode } from '@/composables/useSocksProxies/addCountryCode';
import { groupByCountryAndCity } from '@/composables/useSocksProxies/groupByCountryAndCity';
import { sortProxiesByCountryAndCity } from '@/composables/useSocksProxies/sortProxiesByCountryAndCity';

import { SocksProxy } from '@/composables/useSocksProxies/socksProxies.types';
import useStore from '@/composables/useStore';

const { flatProxiesList } = useStore();

const query = ref('');

const clearFilter = () => {
  query.value = '';
};

const useSocksProxies = () => {
  const getSocksProxies = async () => {
    const response = await fetch('https://api.mullvad.net/network/v1-beta1/socks-proxies');
    const data: SocksProxy[] = await response.json();

    flatProxiesList.value = data.filter((proxy: SocksProxy) => proxy.online);
  };

  const filteredData = computed(() =>
    flatProxiesList.value.filter(
      (socksProxy) =>
        !query.value ||
        socksProxy.location.country.toLowerCase().includes(query.value.toLowerCase()) ||
        socksProxy.location.city.toLowerCase().includes(query.value.toLowerCase()) ||
        socksProxy.hostname.toLowerCase().includes(query.value.toLowerCase()),
    ),
  );

  const filteredProxies = computed(() =>
    sortProxiesByCountryAndCity(groupByCountryAndCity(addCountryCode(filteredData.value))),
  );

  return { clearFilter, filteredProxies, getSocksProxies, query };
};

export default useSocksProxies;
