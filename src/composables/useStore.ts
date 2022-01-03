import { Ref } from 'vue';
import useBrowserStorageLocal from '@/composables/useBrowserStorageLocal';

export type Store = {
  webrtcDisabled: Ref<boolean>;
  detailsExpanded: Ref<boolean>;
  proxyExpanded: Ref<boolean>;
};

const useStore = (): Store => {
  const webrtcDisabled = useBrowserStorageLocal('webrtcDisabled', true);
  const detailsExpanded = useBrowserStorageLocal('detailsExpanded', false);
  const proxyExpanded = useBrowserStorageLocal('proxyExpanded', false);

  return { webrtcDisabled, detailsExpanded, proxyExpanded };
};

export default useStore;
