import type { Country } from '@/composables/useSocksProxies';
import { isProxy, toRaw } from 'vue-demi';

type Props = {
  socksProxies: Country[] | undefined
  country: string;
  city?: string;
}

const getRandomSocksProxy = ({ socksProxies, country, city }: Props) => {
  if (!socksProxies) {
    throw new Error('No proxy list to choose from');
  }
  let proxyList = socksProxies;
  if (isProxy(socksProxies)) {
    proxyList = toRaw(socksProxies);
  }
  const theCountry = proxyList.filter((c) => c.country === country)[0];
  let proxies;
  if (!city) {
    const { cities } = theCountry;
    proxies = cities.flatMap((c) => c.proxyList);
  } else {
    const theCity = theCountry.cities.find((c) => c.city === city);
    const { proxyList } = theCity!;
    proxies = proxyList;
  }
  const index = Math.floor(Math.random() * proxies.length);
  const { hostname, port } = proxies[index];
  
  return { hostname, port };
};

export default getRandomSocksProxy;
