import { Ref } from 'vue';
import useBrowserStorageLocal from '@/composables/useBrowserStorageLocal';
import { SocksDetails } from '@/helpers/socks';

export type Store = {
  socksDetails: Ref<SocksDetails>;
  mullvadAccount: Ref<string>;
  webRTCStatus: Ref<boolean>;
};

const useStore = (): Store => {
  const mullvadAccount = useBrowserStorageLocal('mullvadAccount', '');
  const socksDetails = useBrowserStorageLocal('socksDetails', { socksEnabled: false });
  const webRTCStatus = useBrowserStorageLocal('webRTCStatus', true);
  return { socksDetails, mullvadAccount, webRTCStatus };
};

export default useStore;
