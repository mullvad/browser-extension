import { Ref } from 'vue';
import useBrowserStorageLocal from '@/composables/useBrowserStorageLocal';

export type Store = {
  webrtcDisabled: Ref<boolean>;
};

const useStore = (): Store => {
  const webrtcDisabled = useBrowserStorageLocal('webrtcDisabled', true);
  
  return { webrtcDisabled };
};

export default useStore;
