import { Ref } from 'vue';
import useBrowserStorageLocal from '@/composables/useBrowserStorageLocal';

export type Store = {
  webRTCStatus: Ref<boolean>;
  accountNumber: Ref<string>;
};

const useStore = (): Store => {
  const webRTCStatus = useBrowserStorageLocal('webrtc-status', true);
  const accountNumber = useBrowserStorageLocal('mullvad-account', '');
  return { accountNumber, webRTCStatus };
};

export default useStore;
