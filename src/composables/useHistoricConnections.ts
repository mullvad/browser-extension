import useBrowserStorageLocal from '@/composables/useBrowserStorageLocal';
import { watchEffect } from 'vue';

type Props = { country?: string; city?: string; hostname?: string };
type HistoricConnections = { [key: string]: { count: number; timestamp: number } };

const historicConnections = useBrowserStorageLocal<HistoricConnections>('connections', {});

const storeSocksProxyUsage = ({ country, city, hostname }: Props) => {
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
  const key = keys.join(',');
  const data = historicConnections.value[key] ?? {};
  data.timestamp = Date.now();
  data.count = (data.count ?? 0) + 1;
  historicConnections.value[key] = data;
};

let sortedConnections: { country: string; city: string; hostname: string; count: number, timestamp: number }[] = [];
let mostRecent: { country: string; city: string; hostname: string; count: number, timestamp: number };

watchEffect(() => {
  sortedConnections = Object.entries(historicConnections.value)
    .map(([key, { count, timestamp }]) => {
      const [country, city, hostname] = key.split(',');
      return { country, city, hostname, count, timestamp };
    })
    .sort((a, b) => b.count - a.count);
  
  mostRecent = [...sortedConnections].sort((a, b) => b.timestamp - a.timestamp)[0];
});

const useHistoricConnections = () => {
  return { storeSocksProxyUsage, sortedConnections, mostRecent };
};

export default useHistoricConnections;
