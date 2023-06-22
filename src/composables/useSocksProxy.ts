import { proxy } from 'webextension-polyfill';

import useStore from './useStore';

import useConnection from '@/composables/useConnection';
import getSocksIpForProtocol from '@/composables/utils/getSocksIpForProtocol';
import { sendMessage } from 'webext-bridge/popup';

const { connection, updateConnection } = useConnection();

const DEFAULT_PORT = 1080;

const baseConfig = {
  // FIXME: Allow disabling Proxy DNS in the settings
  proxyDNS: true,
  proxyType: 'manual',
};

const { socksEnabled } = useStore();

const enableProxy = () => {
  const socksIp = getSocksIpForProtocol(connection.value.protocol);

  const socksValue = {
    ...baseConfig,
    socks: `${socksIp}:${DEFAULT_PORT}`,
  };

  proxy.settings.set({
    value: socksValue,
  });
  updateConnection();
  sendMessage('update-socks', {}, 'background');
  socksEnabled.value = true;
};

const disableProxy = () => {
  proxy.settings.set({
    value: {},
  });
  updateConnection();
  sendMessage('update-socks', {}, 'background');
  socksEnabled.value = false;
};

const toggleProxy = () => (socksEnabled.value ? disableProxy() : enableProxy());

const useSocksProxy = () => {
  try {
    proxy.settings.get({}).then(({ value }) => {
      socksEnabled.value = !!value.socks;
    });
  } catch (e) {
    // FIXME: Fix `proxy.settings.get` for Chromium
    console.log(e);
  }

  const connectToSocksProxy = (ipv4_address: string, port = DEFAULT_PORT) => {
    try {
      proxy.settings.set({
        value: {
          ...baseConfig,
          socks: `${ipv4_address}:${port}`,
        },
      });
      socksEnabled.value = true;
      updateConnection();
    } catch (e) {
      // FIXME: Fix `proxy.settings.set` for Chromium
      console.log(e);
    }
  };

  return { connectToSocksProxy, socksEnabled, toggleProxy, disableProxy };
};

export default useSocksProxy;
