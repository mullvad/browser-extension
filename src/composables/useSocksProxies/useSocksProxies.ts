import { addCountryCode } from '@/composables/useSocksProxies/addCountryCode';
import { groupByCountryAndCity } from '@/composables/useSocksProxies/groupByCountryAndCity';
import { SocksProxy } from '@/composables/useSocksProxies/socksProxies.types';
import { sortProxiesByCountryAndCity } from '@/composables/useSocksProxies/sortProxiesByCountryAndCity';

import useStore from '@/composables/useStore';

const { proxiesList } = useStore();
const useSocksProxies = () => {
  const getSocksProxies = async () => {
    const response = await fetch('https://api.mullvad.net/network/v1-beta1/socks-proxies');
    const data: SocksProxy[] = await response.json();

    const onlineProxies = data.filter((proxy: SocksProxy) => proxy.online);
    const proxiesWithCountryCode = addCountryCode(onlineProxies);
    const groupedProxies = groupByCountryAndCity(proxiesWithCountryCode);
    proxiesList.value = sortProxiesByCountryAndCity(groupedProxies);
  };

  return { getSocksProxies, proxiesList };
};

export default useSocksProxies;
