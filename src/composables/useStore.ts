import { Ref } from 'vue';
import useBrowserStorageLocal from '@/composables/useBrowserStorageLocal';

export type Store = {
  webRTCStatus: Ref<boolean>;
  socksEnabled: Ref<boolean>;
  mullvadAccount: Ref<string>;
};

const useStore = (): Store => {
  const webRTCStatus = useBrowserStorageLocal('webRTCStatus', true);
  const socksEnabled = useBrowserStorageLocal('socksEnabled', false);
  const mullvadAccount = useBrowserStorageLocal('mullvadAccount', '');
  return { mullvadAccount, socksEnabled, webRTCStatus };
};

export default useStore;
