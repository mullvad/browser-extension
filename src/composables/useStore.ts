import { Ref } from 'vue';
import useBrowserStorageLocal from '@/composables/useBrowserStorageLocal';

export type Store = {
  webRTCStatus: Ref<boolean>;
  mullvadAccount: Ref<string>;
};

const useStore = (): Store => {
  const webRTCStatus = useBrowserStorageLocal('webRTCStatus', true);
  const mullvadAccount = useBrowserStorageLocal('mullvadAccount', '');
  return { mullvadAccount, webRTCStatus };
};

export default useStore;
