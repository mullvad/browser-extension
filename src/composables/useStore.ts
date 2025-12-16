import { Ref } from 'vue';

import type { HistoryEntriesMap } from '@/composables/useProxyHistory/HistoryEntries.types';
import type {
  ProxyDetails,
  ProxyDetailsMap,
  ProxyInfo,
  ProxyInfoMap,
} from '@/helpers/socksProxy.types';
import { Tab } from '@/helpers/browserExtension';

import useBrowserStorageLocal from '@/composables/useBrowserStorageLocal';

export type Store = {
  excludedHosts: Ref<string[]>;
  globalProxy: Ref<ProxyInfo>;
  globalProxyDetails: Ref<ProxyDetails>;
  historyEntries: Ref<HistoryEntriesMap>;
  hostProxies: Ref<ProxyInfoMap>;
  hostProxiesDetails: Ref<ProxyDetailsMap>;
  optionsActiveTab: Ref<Tab>;
  proxyAutoReload: Ref<boolean>;
  webRTCStatus: Ref<boolean>;
};

const useStore = (): Store => {
  const excludedHosts = useBrowserStorageLocal('excludedHosts', []);
  const globalProxy = useBrowserStorageLocal('globalProxy', {} as ProxyInfo);
  const globalProxyDetails = useBrowserStorageLocal('globalProxyDetails', {} as ProxyDetails);
  const historyEntries = useBrowserStorageLocal('historyEntries', {});
  const hostProxies = useBrowserStorageLocal('hostProxies', {});
  const hostProxiesDetails = useBrowserStorageLocal('hostProxiesDetails', {});
  const optionsActiveTab = useBrowserStorageLocal('optionsActiveTab', Tab.SETTINGS);
  const proxyAutoReload = useBrowserStorageLocal('proxyAutoReload', false);
  const webRTCStatus = useBrowserStorageLocal('webRTCStatus', true);

  return {
    excludedHosts,
    globalProxy,
    globalProxyDetails,
    historyEntries,
    hostProxies,
    hostProxiesDetails,
    optionsActiveTab,
    proxyAutoReload,
    webRTCStatus,
  };
};

export default useStore;
