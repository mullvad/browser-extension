import { Ref } from 'vue';
import useBrowserStorageLocal from '@/composables/useBrowserStorageLocal';

export type Store = {
  webRTCStatus: Ref<boolean>;
};

const useStore = (): Store => {
  const webRTCStatus = useBrowserStorageLocal('webrtc-status', true);
  return { webRTCStatus };
};

export default useStore;
