import type { Country } from '@/composables/useSocksProxies/socksProxies.types';

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
  const { hostname, ipv4_address, port, location } = proxies[index];

  const randomSocks = {
    country: location.country,
    city: location.city,
    countryCode: location.countryCode,
    hostname,
    ipv4_address,
    port,
  };

  return randomSocks;
};

export default getRandomSocksProxy;
