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
import { SocksProxy } from '@/composables/useSocksProxies/socksProxies.types';

export type Store = {
  excludedHosts: Ref<string[]>;
  flatProxiesList: Ref<SocksProxy[]>;
  hostProxies: Ref<ProxyInfoMap>;
  hostProxiesDetails: Ref<ProxyDetailsMap>;
  globalProxy: Ref<ProxyInfo>;
  globalProxyDetails: Ref<ProxyDetails>;
  historyEntries: Ref<HistoryEntriesMap>;
  webRTCStatus: Ref<boolean>;
  optionsActiveTab: Ref<Tab>;
};

const useStore = (): Store => {
  const excludedHosts = useBrowserStorageLocal('excludedHosts', []);
  const flatProxiesList = useBrowserStorageLocal('flatProxiesList', [] as SocksProxy[]);
  const globalProxy = useBrowserStorageLocal('globalProxy', {} as ProxyInfo);
  const globalProxyDetails = useBrowserStorageLocal('globalProxyDetails', {} as ProxyDetails);
  const hostProxies = useBrowserStorageLocal('hostProxies', {});
  const hostProxiesDetails = useBrowserStorageLocal('hostProxiesDetails', {});
  const historyEntries = useBrowserStorageLocal('historyEntries', {});
  const webRTCStatus = useBrowserStorageLocal('webRTCStatus', true);
  const optionsActiveTab = useBrowserStorageLocal('optionsActiveTab', Tab.SETTINGS);

  return {
    excludedHosts,
    flatProxiesList,
    globalProxy,
    globalProxyDetails,
    hostProxies,
    hostProxiesDetails,
    historyEntries,
    optionsActiveTab,
    webRTCStatus,
  };
};

export default useStore;
