import axios from 'axios';
import { setStorage, StorageKeys } from './localStorage';

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

/**
 * Fetch servers list and save it to storage
 */
export const serversToStorage = function () {
  axios
    .get('https://api.mullvad.net/www/relays/wireguard/')
    .then(({ data }) => {
      const servers: Servers = {};

      data
        .filter((server: Server) => server.active == true)
        .forEach((server: Server) => {
          const countryName: string = server.country_name;
          const cityName: string = server.city_name;

          // Create country object if not present
          if (!(countryName in servers)) {
            servers[countryName] = {};
          }
          // Create a city array if not present
          if (!(cityName in servers[countryName])) {
            servers[countryName][cityName] = [];
          }
          // If active, add server to servers
          if (server.active) {
            servers[countryName][cityName].push(server);
          }
        });

      setStorage(StorageKeys.servers, servers);
    })
    .catch((error) => {
      console.log(`Couldn't get the servers list`, error);
    });
};
