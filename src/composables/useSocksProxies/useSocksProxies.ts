import { computed, ref } from 'vue';
import { addCountryCode } from '@/composables/useSocksProxies/addCountryCode';
import { groupByCountryAndCity } from '@/composables/useSocksProxies/groupByCountryAndCity';
import { sortProxiesByCountryAndCity } from '@/composables/useSocksProxies/sortProxiesByCountryAndCity';
import { SocksProxy } from '@/composables/useSocksProxies/socksProxies.types';

const SOCKS_API_URL = 'https://api.mullvad.net/network/v1-beta1/socks-proxies';
const NETWORK_ERROR = `The proxy list couldn't be loaded. Please try again later.`;

const query = ref('');
const isLoading = ref(false);
const isError = ref(false);
const error = ref('');
const flatProxiesList = ref<SocksProxy[]>([]);

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

  const filteredData = computed(() =>
    flatProxiesList.value.filter(
      (socksProxy) =>
        !query.value ||
        socksProxy.location.country?.toLowerCase().includes(query.value.toLowerCase()) ||
        socksProxy.location.city?.toLowerCase().includes(query.value.toLowerCase()) ||
        socksProxy.hostname?.toLowerCase().includes(query.value.toLowerCase()),
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
