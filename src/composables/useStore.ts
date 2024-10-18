import { Ref } from 'vue';

import type { HistoryEntriesMap } from '@/composables/useProxyHistory/HistoryEntries.types';
import type {
  ProxyDetails,
  ProxyInfoMap,
  ProxyInfo,
  ProxyDetailsMap,
} from '@/helpers/socksProxy.types';
import { Tab } from '@/helpers/browserExtension';

import useBrowserStorageLocal from '@/composables/useBrowserStorageLocal';
import { Country } from '@/composables/useSocksProxies/socksProxies.types';

export type Store = {
  excludedHosts: Ref<string[]>;
  hostProxies: Ref<ProxyInfoMap>;
  hostProxiesDetails: Ref<ProxyDetailsMap>;
  globalProxy: Ref<ProxyInfo>;
  globalProxyDetails: Ref<ProxyDetails>;
  historyEntries: Ref<HistoryEntriesMap>;
  proxiesList: Ref<Country[]>;
  webRTCStatus: Ref<boolean>;
  optionsActiveTab: Ref<Tab>;
};

const useStore = (): Store => {
  const excludedHosts = useBrowserStorageLocal('excludedHosts', []);
  const globalProxy = useBrowserStorageLocal('globalProxy', {} as ProxyInfo);
  const globalProxyDetails = useBrowserStorageLocal('globalProxyDetails', {} as ProxyDetails);
  const hostProxies = useBrowserStorageLocal('hostProxies', {});
  const hostProxiesDetails = useBrowserStorageLocal('hostProxiesDetails', {});
  const historyEntries = useBrowserStorageLocal('historyEntries', {});
  const proxiesList = useBrowserStorageLocal('proxiesList', [] as Country[]);
  const webRTCStatus = useBrowserStorageLocal('webRTCStatus', true);
  const optionsActiveTab = useBrowserStorageLocal('optionsActiveTab', Tab.SETTINGS);

  return {
    excludedHosts,
    globalProxy,
    globalProxyDetails,
    hostProxies,
    hostProxiesDetails,
    historyEntries,
    optionsActiveTab,
    proxiesList,
    webRTCStatus,
  };
};

export default useStore;
