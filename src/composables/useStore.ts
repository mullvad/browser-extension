import { Ref } from 'vue';
import useBrowserStorageLocal from '@/composables/useBrowserStorageLocal';

export type Store = {
  detailsExpanded: Ref<boolean>;
  proxyExpanded: Ref<boolean>;
};

const useStore = (): Store => {
  const detailsExpanded = useBrowserStorageLocal('detailsExpanded', false);
  const proxyExpanded = useBrowserStorageLocal('proxyExpanded', false);

  return { detailsExpanded, proxyExpanded };
};

export default useStore;
