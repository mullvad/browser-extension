import { computed } from 'vue';
import { proxy } from 'webextension-polyfill';
import { sendMessage } from 'webext-bridge/popup';

import useStore from './useStore';

import useConnection from '@/composables/useConnection';
import getSocksIpForProtocol from '@/composables/utils/getSocksIpForProtocol';

const { connection, updateConnection } = useConnection();

const DEFAULT_PORT = 1080;

const baseConfig = {
  // FIXME: Allow disabling Proxy DNS in the settings
  proxyDNS: true,
  proxyType: 'manual',
};

const { socksDetails } = useStore();

const enableProxy = async () => {
  const socksIp = getSocksIpForProtocol(connection.value.protocol);

  await proxy.settings.set({
    value: {
      ...baseConfig,
      socks: `${socksIp}:${DEFAULT_PORT}`,
    },
  });

  await updateConnection();

  socksDetails.value = {
    socksEnabled: true,
    protocol: connection.value.protocol,
    server: connection.value.server,
    proxyDNS: baseConfig.proxyDNS,
  };

  sendMessage('update-socks', {}, 'background');
};

const disableProxy = async () => {
  await proxy.settings.set({
    value: {},
  });

  await updateConnection();

  socksDetails.value = {
    socksEnabled: false,
  };

  sendMessage('update-socks', {}, 'background');
};

const toggleProxy = () => (socksEnabled.value ? disableProxy() : enableProxy());

const socksEnabled = computed(() => socksDetails.value.socksEnabled);

const connectToSocksProxy = async (ipv4_address: string, port = DEFAULT_PORT) => {
  try {
    await proxy.settings.set({
      value: {
        ...baseConfig,
        socks: `${ipv4_address}:${port}`,
      },
    });

    await updateConnection();

    socksDetails.value = {
      socksEnabled: true,
      protocol: connection.value.protocol,
      server: connection.value.server,
      proxyDNS: baseConfig.proxyDNS,
    };

    sendMessage('update-socks', {}, 'background');
  } catch (e) {
    console.log(e);
  }
};

const useSocksProxy = () => {
  // TODO Check if that part of the code is really needed
  try {
    proxy.settings.get({}).then(({ value }) => {
      socksDetails.value = { ...socksDetails.value, socksEnabled: !!value.socks };
    });
  } catch (e) {
    console.log(e);
  }

  return { connectToSocksProxy, socksEnabled, toggleProxy, disableProxy };
};

export default useSocksProxy;
