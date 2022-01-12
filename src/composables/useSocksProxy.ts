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
  proxy.settings.set({
    value: {
      ...baseConfig,
      socks: `${socksIp}:${DEFAULT_PORT}`,
    },
  });
  updateConnection();
  socksEnabled.value = true;
};

const disableProxy = () => {
  proxy.settings.set({
    value: {},
  });
  updateConnection();
  socksEnabled.value = false;
};

const socksEnabled = ref(false);

const toggleProxy = () => (socksEnabled.value ? disableProxy() : enableProxy());

const useSocksProxy = () => {
  try {
    proxy.settings.get({}).then(({ value }) => {
      socksEnabled.value = !!value.socks;
    });
  } catch (e) {
    // TODO: Fix `proxy.settings.get` for Chrome
    console.log(e);
  }

  const connectToSocksProxy = (hostname: string, port = DEFAULT_PORT) => {
    try {
      proxy.settings.set({
        value: {
          ...baseConfig,
          socks: `${hostname}:${port}`,
        },
      });
      socksEnabled.value = true;
      updateConnection();
    } catch (e) {
      // TODO: Fix `proxy.settings.set` for Chrome
      console.log(e);
    }
  };

  return { connectToSocksProxy, socksEnabled, toggleProxy, disableProxy };
};

export default useSocksProxy;
