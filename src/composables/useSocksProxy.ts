import { proxy } from 'webextension-polyfill';
import useConnection from '@/composables/useConnection';
import getSocksIpForProtocol from '@/composables/utils/getSocksIpForProtocol';
import { ref } from 'vue';

const { connection, updateConnection } = useConnection();

const DEFAULT_PORT = 1080;

const baseConfig = {
  // FIXME: Allow disabling Proxy DNS in the settings
  proxyDNS: true,
  proxyType: 'manual',
};

const enableProxy = () => {
  const socksIp = getSocksIpForProtocol(connection.value.protocol);
  browser.proxy.settings.set({
    value: {
      ...baseConfig,
      socks: `${socksIp}:${DEFAULT_PORT}`,
    },
  });
  updateConnection();
};

const disableProxy = () => {
  browser.proxy.settings.set({
    value: {},
  });
  updateConnection();
};

const socksEnabled = ref(false);

const toggleProxy = () => {
  socksEnabled.value ? disableProxy() : enableProxy();
  socksEnabled.value = !socksEnabled.value;
};

const useSocksProxy = () => {
  
  proxy.settings.get({}).then(({ value }) => {
    socksEnabled.value = !!value.socks;
  });

  const connectToSocksProxy = (hostname: string, port = DEFAULT_PORT) => {
    proxy.settings.set({
      value: {
        ...baseConfig,
        socks: `${hostname}:${port}`,
      },
    });
    socksEnabled.value = true;
    updateConnection();
  };
  
  return { connectToSocksProxy, socksEnabled, toggleProxy };
};

export default useSocksProxy;
