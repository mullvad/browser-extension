import axios, { AxiosError } from 'axios';
import { useQuery } from 'vue-query';

import type { SocksProxy } from '@/composables/useFilteredSocksProxies/SocksProxies.types';

const useSocksProxies = () => {
  const getSocksProxies = async () => {
    const { data } = await axios.get<SocksProxy[]>(
      'https://api.mullvad.net/network/v1-beta1/socks-proxies',
    );
    return data;
  };

  return useQuery<SocksProxy[], AxiosError>('socksProxies', getSocksProxies);
};

export default useSocksProxies;
