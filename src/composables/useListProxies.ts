import axios from 'axios';
import useStore from './useStore';

const { proxiesList } = useStore();

export type Location = {
  city: string;
  code: string;
  country: string;
  countryCode: string;
  longitude: number;
  latitude: number;
};

export type SocksProxy = {
  online: boolean;
  hostname: string;
  ipv4_address: string;
  ipv6_address: string;
  port: number;
  location: Location;
};

interface Servers {
  [country: string]: {
    [city: string]: SocksProxy[];
  };
}

type City = {
  city: string;
  proxyList: SocksProxy[];
};

export type Country = {
  country: string;
  cities: City[];
};

const addCountryCode = (data: SocksProxy[]) => {
  return data.map((proxy) => {
    const { location } = proxy;

    const countryCode = location.code.substring(0, 2);

    return {
      ...proxy,
      location: {
        ...location,
        countryCode,
      },
    };
  });
};

const groupByCountryAndCity = (data: SocksProxy[]) =>
  data
    .filter((proxy: SocksProxy) => proxy.online)
    .reduce((acc: Servers, proxy: SocksProxy) => {
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

const sortProxiesByCountryAndCity = (grouped: Servers) =>
  Object.entries(grouped)
    .map(([country, cityMap]) => {
      const cities = Object.entries(cityMap)
        .map(([city, proxyList]) => {
          return { city, proxyList } as City;
        })
        .sort(({ city: a }, { city: b }) => a.localeCompare(b));
      return { country, cities } as Country;
    })
    .sort(({ country: a }, { country: b }) => a.localeCompare(b));

const useListProxies = () => {
  const getSocksProxies = async () => {
    const { data } = await axios.get<SocksProxy[]>(
      'https://api.mullvad.net/network/v1-beta1/socks-proxies',
    );

    const dataWithCountryCode = addCountryCode(data);
    const grouped = groupByCountryAndCity(dataWithCountryCode);
    proxiesList.value = sortProxiesByCountryAndCity(grouped);
  };

  return { getSocksProxies, proxiesList };
};

export default useListProxies;
