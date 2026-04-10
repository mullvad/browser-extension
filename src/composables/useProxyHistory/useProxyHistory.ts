import { ref, watchEffect } from 'vue';
import useStore from '../useStore';
import type {
  HistoryEntry,
  HistoryEntryDetails,
} from '@/composables/useProxyHistory/HistoryEntries.types';

const { historyEntries } = useStore();

const mostUsed = ref<HistoryEntry[]>([]);
const mostRecent = ref<HistoryEntry[]>([]);

const getKey = ({ country, city, hostname, ipv4_address }: HistoryEntryDetails) => {
  return [country, city, hostname, ipv4_address].filter(Boolean).join(',');
};

const storeSocksProxyUsage = (entry: HistoryEntryDetails) => {
  const key = getKey(entry);
  const data = historyEntries.value[key] ?? { count: 0 };

  data.timestamp = Date.now();
  data.count += 1;
  Object.assign(data, entry);
  historyEntries.value[key] = data;
};

const getLabel = (historyEntry: HistoryEntry) => {
  const { country, countryCode, city, hostname } = historyEntry;
  const servername = hostname.split('.relays.mullvad.net')[0];

  return `${city ? city + `, ${countryCode.toUpperCase()}` : country} (${servername})`;
};

const removeEntry = (entry: HistoryEntry) => {
  const key = getKey(entry);
  historyEntries.value = Object.fromEntries(
    Object.entries(historyEntries.value).filter(([k]) => k !== key),
  );
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
    removeEntry,
    clearHistory,
  };
};

export default useProxyHistory;
