import { Ref } from 'vue';

import type { HistoryEntriesMap } from '@/composables/useProxyHistory/HistoryEntries.types';
import type {
  ProxyDetails,
  ProxyInfoMap,
  ProxyInfo,
  ProxyDetailsMap,
} from '@/helpers/socksProxy/socksProxy.types';
import { Tab } from '@/helpers/browserExtension';

import useBrowserStorageLocal from '@/composables/useBrowserStorageLocal';
import { SocksProxy } from '@/helpers/socksProxy/socksProxies.types';

export type Store = {
  excludedHosts: Ref<string[]>;
  flatProxiesList: Ref<SocksProxy[]>;
  globalProxy: Ref<ProxyInfo>;
  globalProxyDetails: Ref<ProxyDetails>;
  historyEntries: Ref<HistoryEntriesMap>;
  hostProxies: Ref<ProxyInfoMap>;
  hostProxiesDetails: Ref<ProxyDetailsMap>;
  optionsActiveTab: Ref<Tab>;
  proxyAutoReload: Ref<boolean>;
  randomProxyMode: Ref<boolean>;
  webRTCStatus: Ref<boolean>;
};

const useStore = (): Store => {
  const excludedHosts = useBrowserStorageLocal('excludedHosts', []);
  const flatProxiesList = useBrowserStorageLocal('flatProxiesList', [] as SocksProxy[]);
  const globalProxy = useBrowserStorageLocal('globalProxy', {} as ProxyInfo);
  const globalProxyDetails = useBrowserStorageLocal('globalProxyDetails', {} as ProxyDetails);
  const historyEntries = useBrowserStorageLocal('historyEntries', {});
  const hostProxies = useBrowserStorageLocal('hostProxies', {});
  const hostProxiesDetails = useBrowserStorageLocal('hostProxiesDetails', {});
  const optionsActiveTab = useBrowserStorageLocal('optionsActiveTab', Tab.SETTINGS);
  const proxyAutoReload = useBrowserStorageLocal('proxyAutoReload', false);
  const randomProxyMode = useBrowserStorageLocal('randomProxyMode', false);
  const webRTCStatus = useBrowserStorageLocal('webRTCStatus', true);

  return {
    excludedHosts,
    flatProxiesList,
    globalProxy,
    globalProxyDetails,
    historyEntries,
    hostProxies,
    hostProxiesDetails,
    optionsActiveTab,
    proxyAutoReload,
    randomProxyMode,
    webRTCStatus,
  };
};

export default useStore;
