import { computed, ref } from 'vue';

import { addCountryCode } from '@/helpers/socksProxy/addCountryCode';
import { groupByCountryAndCity } from '@/helpers/socksProxy/groupByCountryAndCity';
import { sortProxiesByCountryAndCity } from '@/helpers/socksProxy/sortProxiesByCountryAndCity';
import { SocksProxy } from '@/helpers/socksProxy/socksProxies.types';

import useStore from '@/composables/useStore';

const SOCKS_API_URL = 'https://api.mullvad.net/network/v1-beta1/socks-proxies';
const NETWORK_ERROR = `The proxy list couldn't be loaded. Please try again later.`;

const { flatProxiesList } = useStore();
const query = ref('');
const isLoading = ref(false);
const isError = ref(false);
const error = ref('');

const clearFilter = () => {
  query.value = '';
};

const useSocksProxies = () => {
  const getSocksProxies = async () => {
    isLoading.value = true;
    isError.value = false;
    error.value = '';

    try {
      const response = await fetch(SOCKS_API_URL);
      const data: SocksProxy[] = await response.json();
      flatProxiesList.value = data.filter((proxy: SocksProxy) => proxy.online);
    } catch (e: unknown) {
      isError.value = true;

      if (e instanceof Error) {
        if (e.message.includes('NetworkError')) {
          error.value = NETWORK_ERROR;
        } else {
          error.value = e.message;
        }
      } else {
        error.value = `An unknown error occurred: ${e}`;
      }
      console.log(e);
    } finally {
      isLoading.value = false;
    }
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

  if (!isLoading.value) {
    getSocksProxies();
  }

  return { clearFilter, filteredProxies, getSocksProxies, query, isLoading, isError, error };
};

export default useSocksProxies;
