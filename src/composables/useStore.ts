import { Ref } from 'vue';
import useBrowserStorageLocal from '@/composables/useBrowserStorageLocal';

export type Store = {
  webRTCStatus: Ref<boolean>;
  mullvadAccount: Ref<string>;
};

const useStore = (): Store => {
  const webRTCStatus = useBrowserStorageLocal('webrtc-status', true);
  const mullvadAccount = useBrowserStorageLocal('mullvad-account', '');
  return { mullvadAccount, webRTCStatus };
};

export default useStore;
