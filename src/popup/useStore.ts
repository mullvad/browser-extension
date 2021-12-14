import { Ref } from 'vue-demi';
import { useBrowserStorage } from '@/lib/useBrowserStorage';
import { SocksConfig } from '@/helpers/socks';

export type Store = {
  socksConfig: Ref<SocksConfig | undefined>;
  socksEnabled: Ref<boolean>;
};

const useStore = (): Store => {
  const socksConfig = useBrowserStorage<SocksConfig | undefined>('socksConfig', undefined);
  const socksEnabled = useBrowserStorage('socksEnabled', false);
  
  return { socksEnabled, socksConfig };
};

export default useStore;
