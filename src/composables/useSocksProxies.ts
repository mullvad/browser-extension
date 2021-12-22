import axios from 'axios';
import { ref } from 'vue';

export type Location = {
  city: string;
  code: string;
  country: string;
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

type Country = {
  country: string;
  cities: City[];
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

const socksProxies = ref([] as Country[]);
const isLoading = ref(false);
const isError = ref(false);
const error = ref<Error | undefined>(undefined);

const useSocksProxies = () => {
  const getSocksProxies = async () => {
    isLoading.value = true;
    isError.value = false;
    error.value = undefined;
    try {
      const { data } = await axios.get<SocksProxy[]>(
        'https://api.mullvad.net/network/v1-beta1/socks-proxies',
      );

      const grouped = groupByCountryAndCity(data);
      socksProxies.value = sortProxiesByCountryAndCity(grouped);
    } catch (e) {
      console.log(`Couldn't get the servers list`, e);
      isError.value = true;
      error.value = e as Error;
    } finally {
      isLoading.value = false;
    }
  };
  
  getSocksProxies();
  
  return { isLoading, isError, error, socksProxies };
};

export default useSocksProxies;
