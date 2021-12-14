import { Ref } from 'vue-demi';
import { useBrowserStorage } from '@/lib/useBrowserStorage';
import { createSocksConfig, SocksConfig } from '@/helpers/socks';
import { connCheck } from '@/helpers/connCheck';

export type Store = {
  socksConfig: Ref<SocksConfig | undefined>;
  socksEnabled: Ref<boolean>;
};

const useStore = (): Store => {
  const socksConfig = useBrowserStorage<SocksConfig | undefined>('socksConfig', undefined);
  const socksEnabled = useBrowserStorage('socksEnabled', false);
  
  connCheck().then((connection) => {
    if (connection.protocol) {
      socksConfig.value = createSocksConfig(connection.protocol);
    }
  });
  return { socksEnabled, socksConfig };
};

export default useStore;
