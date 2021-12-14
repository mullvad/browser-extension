import { Ref } from 'vue-demi';
import { useBrowserStorage } from '@/lib/useBrowserStorage';
import { SocksConfig } from '@/helpers/socks';

export type Store = {
  socksConfig: Ref<SocksConfig | undefined>;
  socksEnabled: Ref<boolean>;
  webrtcDisabled: Ref<boolean>;
};

const useStore = (): Store => {
  const socksConfig = useBrowserStorage<SocksConfig | undefined>('socksConfig', undefined);
  const socksEnabled = useBrowserStorage('socksEnabled', false);
  const webrtcDisabled = useBrowserStorage('webrtcDisabled', true);
  
  return { socksEnabled, socksConfig, webrtcDisabled };
};

export default useStore;
