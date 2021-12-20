import axios from 'axios';
import { useBrowserStorage } from '@/composables/useBrowserStorage';

export interface Server {
  active: boolean;
  city_code: string;
  city_name: string;
  country_code: string;
  country_name: string;
  hostname: string;
  ipv4_addr_in: string;
  ipv6_addr_in: string;
  multihop_port: number;
  network_port_speed: number;
  owned: boolean;
  provider: string;
  pubkey: string;
  socks_name: string;
}

export interface Country {
  [city: string]: Server[];
}

export interface Servers {
  [country: string]: Country;
}

export const servers = useBrowserStorage('servers', {});

/**
 * Fetch servers list and save it to storage
 */
export const serversToStorage = async () => {
  try {
    const { data } = await axios.get('https://api.mullvad.net/www/relays/wireguard/');
  
    servers.value = data
      .filter((server: Server) => server.active)
      .reduce((acc: Servers, server: Server) => {
        const countryName: string = server.country_name;
        const cityName: string = server.city_name;

        // Create country object if not present
        if (!(countryName in acc)) {
          acc[countryName] = {};
        }
        // Create a city array if not present
        if (!(cityName in acc[countryName])) {
          acc[countryName][cityName] = [];
        }
        // Add server to servers
        acc[countryName][cityName].push(server);
        return acc;
      }, {});
  } catch (error) {
    console.log(`Couldn't get the servers list`, error);
  }
};
