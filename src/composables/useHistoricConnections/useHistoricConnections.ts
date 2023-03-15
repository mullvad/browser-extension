import { watchEffect } from 'vue';
import useBrowserStorageLocal from '@/composables/useBrowserStorageLocal';
import type { HistoricConnection } from '@/composables/useHistoricConnections/HistoricConnections.types';

type StoreSocksProxyUsageProps = {
  country?: string;
  city?: string;
  hostname?: string;
  ipv4_address?: string;
};
type HistoricConnectionsMap = { [key: string]: { count: number; timestamp: number } };

const historicConnections = useBrowserStorageLocal<HistoricConnectionsMap>('connections', {});

const storeSocksProxyUsage = ({
  country,
  city,
  hostname,
  ipv4_address,
}: StoreSocksProxyUsageProps) => {
  const keys: string[] = [];
  if (country) {
    keys.push(country);
  }
  if (city) {
    keys.push(city);
  }
  if (hostname) {
    keys.push(hostname);
  }
  if (ipv4_address) {
    keys.push(ipv4_address);
  }
  const key = keys.join(',');
  const data = historicConnections.value[key] ?? { count: 0 };
  data.timestamp = Date.now();
  data.count += 1;
  historicConnections.value[key] = data;
};

const getLabel = (latest: HistoricConnection) => {
  const { country, city, hostname } = latest;
  if (hostname) {
    const [servername] = hostname.split('.socks5.mullvad.net');
    return `${city} (${servername})`;
  }
  if (city) {
    return city;
  }
  return country;
};

let sortedByUsageConnections: HistoricConnection[] = [];

let sortedByRecentConnections: HistoricConnection[];

watchEffect(() => {
  sortedByUsageConnections = Object.entries(historicConnections.value)
    .map(([key, { count, timestamp }]) => {
      const [country, city, hostname, ipv4_address] = key.split(',');
      return { country, city, hostname, ipv4_address, count, timestamp };
    })
    .sort((a, b) => b.count - a.count || b.timestamp - a.timestamp);

  if (sortedByUsageConnections.length) {
    sortedByRecentConnections = [...sortedByUsageConnections].sort(
      (a, b) => b.timestamp - a.timestamp,
    );
  }
});

const useHistoricConnections = () => {
  return {
    storeSocksProxyUsage,
    mostUsed: sortedByUsageConnections,
    mostRecent: sortedByRecentConnections,
    getLabel,
  };
};

export default useHistoricConnections;
