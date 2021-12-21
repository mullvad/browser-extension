import axios from 'axios';

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

export interface Country {
  [city: string]: SocksProxy[];
}

export interface Servers {
  [country: string]: Country;
}

const useServers = async () => {
  try {
    const { data } = await axios.get<SocksProxy[]>(
      'https://api.mullvad.net/network/v1-beta1/socks-proxies',
    );

    const grouped = data
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

    return Object.entries(grouped)
      .map(([country, cityMap]) => {
        const cities = Object.entries(cityMap)
          .map(([city, proxyList]) => {
            return { city, proxyList };
          })
          .sort(({ city: a }, { city: b }) => a.localeCompare(b));
        return { country, cities };
      })
      .sort(({ country: a }, { country: b }) => a.localeCompare(b));
  } catch (error) {
    console.log(`Couldn't get the servers list`, error);
  }
};

export default useServers;
