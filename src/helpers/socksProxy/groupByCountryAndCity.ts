import { Servers, SocksProxy } from '@/helpers/socksProxy/socksProxies.types';

export const groupByCountryAndCity = (data: SocksProxy[]) =>
  data.reduce((acc: Servers, proxy: SocksProxy) => {
    const { country, city } = proxy.location;

    // Create country object if not present
    if (!(country in acc)) {
      acc[country] = {};
    }
    // Create a city array if not present
    if (!(city in acc[country])) {
      acc[country][city] = [];
    }
    // Add server to servers
    acc[country][city].push(proxy);
    return acc;
  }, {});
