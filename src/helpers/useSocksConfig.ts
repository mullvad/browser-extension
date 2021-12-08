import { Connection } from '@/helpers/connCheck';
import { asyncComputed } from '@vueuse/core';
import { createSocksConfig, SocksConfig } from '@/helpers/socks';
import { storageLocal } from '@/helpers/storageLocal';
import { Ref } from 'vue-demi';

const useSocksConfig = (connection: Ref<Connection | undefined>) =>
  asyncComputed<SocksConfig | undefined>(async () => {
    let config: SocksConfig | undefined;
    if (connection.value?.protocol) {
      config = await storageLocal.socksConfig.get();
      if (!config) {
        config = createSocksConfig(connection.value.protocol);
        // TODO: Should this component really be responsible for storing the value?
        await storageLocal.socksConfig.set(config);
      }
    }
    return config;
  });

export default useSocksConfig;
