import { Ref, computed } from 'vue';
import { proxy } from 'webextension-polyfill';
import { sendMessage } from 'webext-bridge/popup';

import useStore from './useStore';
import { ProxySettings, getProxySettings } from '@/helpers/socksProxy';

import useConnection from '@/composables/useConnection';
import getSocksIpForProtocol from '@/composables/utils/getSocksIpForProtocol';

const { connection, updateConnection } = useConnection();
const { passthrough, proxySettings, socksDetails } = useStore();

const DEFAULT_PORT = 1080;

const toggleProxy = () => (socksEnabled.value ? disableProxy() : enableProxy());

const socksEnabled = computed(() => socksDetails.value.socksEnabled);
const baseConfig: Ref<Partial<ProxySettings>> = computed(() => {
  return {
    // FIXME: Allow disabling Proxy DNS in the settings
    proxyDNS: true,
    proxyType: 'manual',
    passthrough: passthrough.value,
  };
});

const updatePassthrough = async () => {
  const currentProxySettings = await getProxySettings();

  const currentPassthrough = currentProxySettings.passthrough;

  if (passthrough.value !== currentPassthrough) {
    passthrough.value = currentPassthrough!;
    proxySettings.value = { ...proxySettings.value, passthrough: currentPassthrough };
  }
};

const enableProxy = async () => {
  const socksIp = getSocksIpForProtocol(connection.value.protocol);

  const updatedProxySettings: Partial<ProxySettings> = {
    ...baseConfig.value,
    socks: `${socksIp}:${DEFAULT_PORT}`,
  };

  await proxy.settings.set({
    value: updatedProxySettings,
  });

  await updateConnection();
  proxySettings.value = updatedProxySettings;
  socksDetails.value = {
    socksEnabled: true,
    protocol: connection.value.protocol,
    server: connection.value.server,
    proxyDNS: updatedProxySettings.proxyDNS,
  };

  sendMessage('update-socks', {}, 'background');
};

const disableProxy = async () => {
  const updatedProxySettings: Partial<ProxySettings> = { passthrough: passthrough.value };

  await proxy.settings.set({
    value: updatedProxySettings,
  });

  await updateConnection();
  proxySettings.value = updatedProxySettings;
  socksDetails.value = {
    socksEnabled: false,
  };

  sendMessage('update-socks', {}, 'background');
};

const connectToSocksProxy = async (ipv4_address: string, port = DEFAULT_PORT) => {
  const updatedProxySettings: Partial<ProxySettings> = {
    ...baseConfig.value,
    socks: `${ipv4_address}:${port}`,
  };

  try {
    await proxy.settings.set({
      value: updatedProxySettings,
    });

    await updateConnection();
    proxySettings.value = updatedProxySettings;
    socksDetails.value = {
      socksEnabled: true,
      protocol: connection.value.protocol,
      server: connection.value.server,
      proxyDNS: baseConfig.value.proxyDNS,
    };

    sendMessage('update-socks', {}, 'background');
  } catch (e) {
    console.log(e);
  }
};

const useSocksProxy = () => {
  updatePassthrough();

  return { connectToSocksProxy, socksEnabled, toggleProxy, disableProxy };
};

export default useSocksProxy;
