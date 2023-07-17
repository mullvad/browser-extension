import { Ref } from 'vue';

import { SocksDetails, ProxySettings } from '@/helpers/socksProxy';
import useBrowserStorageLocal from '@/composables/useBrowserStorageLocal';

export type Store = {
  mullvadAccount: Ref<string>;
  passthrough: Ref<string>;
  proxySettings: Ref<Partial<ProxySettings>>;
  socksDetails: Ref<SocksDetails>;
  webRTCStatus: Ref<boolean>;
};

const useStore = (): Store => {
  const mullvadAccount = useBrowserStorageLocal('mullvadAccount', '');
  const passthrough = useBrowserStorageLocal('passthrough', '');
  const proxySettings = useBrowserStorageLocal('proxySettings', {});
  const socksDetails = useBrowserStorageLocal('socksDetails', { socksEnabled: false });
  const webRTCStatus = useBrowserStorageLocal('webRTCStatus', true);
  return { mullvadAccount, passthrough, proxySettings, socksDetails, webRTCStatus };
};

export default useStore;
