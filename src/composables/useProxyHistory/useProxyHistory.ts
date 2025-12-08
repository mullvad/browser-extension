import { ref, watchEffect } from 'vue';
import useStore from '../useStore';
import type {
  HistoryEntry,
  HistoryEntryDetails,
} from '@/composables/useProxyHistory/HistoryEntries.types';

const { historyEntries } = useStore();

const mostUsed = ref<HistoryEntry[]>([]);
const mostRecent = ref<HistoryEntry[]>([]);

const storeSocksProxyUsage = ({
  country,
  countryCode,
  city,
  hostname,
  ipv4_address,
}: HistoryEntryDetails) => {
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
  const data = historyEntries.value[key] ?? { count: 0 };

  data.timestamp = Date.now();
  data.count += 1;
  data.country = country;
  data.countryCode = countryCode;
  data.city = city;
  data.hostname = hostname;
  data.ipv4_address = ipv4_address;
  historyEntries.value[key] = data;
};

const getLabel = (historyEntry: HistoryEntry) => {
  const { country, countryCode, city, hostname } = historyEntry;
  const servername = hostname.split('.relays.mullvad.net')[0];

  return `${city ? city + `, ${countryCode.toUpperCase()}` : country} (${servername})`;
};

const clearHistory = () => {
  historyEntries.value = {};
};

watchEffect(() => {
  mostUsed.value = Object.values(historyEntries.value).sort((a, b) => b.count - a.count);

  if (mostUsed.value) {
    mostRecent.value = [...mostUsed.value].sort((a, b) => b.timestamp - a.timestamp);
  }
});

const useProxyHistory = () => {
  return {
    storeSocksProxyUsage,
    mostUsed,
    mostRecent,
    getLabel,
    clearHistory,
  };
};

export default useProxyHistory;
