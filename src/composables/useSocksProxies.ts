import { computed, ref } from 'vue';

import useStore from '@/composables/useStore';

import { addCountryCode } from '@/helpers/socksProxy/addCountryCode';
import { groupByCountryAndCity } from '@/helpers/socksProxy/groupByCountryAndCity';
import { sortProxiesByCountryAndCity } from '@/helpers/socksProxy/sortProxiesByCountryAndCity';
import { SocksProxy } from '@/helpers/socksProxy/socksProxies.types';

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
      flatProxiesList.value = data.filter((proxy: SocksProxy) => {
        return proxy.online && proxy.ipv4_address && proxy.hostname;
      });
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

  const queryLower = computed(() => query.value?.toLowerCase() ?? '');
  const filteredData = computed(() =>
    flatProxiesList.value.filter((socksProxy) => {
      const q = queryLower.value;
      if (!q) return true;

      const country = socksProxy.location.country?.toLowerCase();
      const city = socksProxy.location.city?.toLowerCase();
      const hostname = socksProxy.hostname?.toLowerCase();

      return country?.includes(q) || city?.includes(q) || hostname?.includes(q);
    }),
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
