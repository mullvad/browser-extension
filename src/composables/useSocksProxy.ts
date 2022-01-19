import { proxy } from 'webextension-polyfill';
import useConnection from '@/composables/useConnection';
import getSocksIpForProtocol from '@/composables/utils/getSocksIpForProtocol';
import { ref } from 'vue';
import useBrowserStorageLocal from '@/composables/useBrowserStorageLocal';

const { connection, updateConnection } = useConnection();

const DEFAULT_PORT = 1080;

const baseConfig = {
  // FIXME: Allow disabling Proxy DNS in the settings
  proxyDNS: true,
  proxyType: 'manual',
};

type Props = { country: string; city?: string; hostname: string; port: number };
const historicConnections = useBrowserStorageLocal('connections', new Map<string, number>());
const storeSocksProxyUsage = ({ country, city, hostname, port }: Props) => {
  const key = `${country},${city},${hostname},${port}`;
  const count = historicConnections.value.get(key) ?? 0;
  historicConnections.value.set(key, count + 1);
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

  return { connectToSocksProxy, socksEnabled, toggleProxy, disableProxy, storeSocksProxyUsage, historicConnections };
};

export default useSocksProxy;
