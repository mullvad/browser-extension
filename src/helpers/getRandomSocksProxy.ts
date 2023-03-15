import type { Country } from '@/composables/useSocksProxies';

type Props = {
  socksProxies: Country[] | undefined;
  country: string;
  city?: string;
};

const getRandomSocksProxy = ({ socksProxies, country, city }: Props) => {
  if (!socksProxies || !socksProxies.length) {
    throw new Error('No proxies to choose from');
  }

  const theCountry = socksProxies.filter((c) => c.country === country)[0];
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
  const { hostname, ipv4_address, port } = proxies[index];

  return { hostname, ipv4_address, port };
};

export default getRandomSocksProxy;
