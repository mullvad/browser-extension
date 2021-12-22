import { Ref } from 'vue';
import { useBrowserStorage } from '@/composables/useBrowserStorage';

export type Store = {
  webrtcDisabled: Ref<boolean>;
};

const useStore = (): Store => {
  const webrtcDisabled = useBrowserStorage('webrtcDisabled', true);
  
  return { webrtcDisabled };
};

export default useStore;
