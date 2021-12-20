import { isProxy, toRaw } from 'vue';
import useStore from '@/composables/useStore';
import useConnection from '@/composables/useConnection';

export interface SocksConfig {
  proxyType?: string;
  socks?: string;
  proxyDNS?: boolean;
}

const defaultWgSocksIP = '10.64.0.1';
const defaulOvpnSocksIP = '10.8.0.1';
const defaultSocksPort = '1080';

export const toggleProxy = () => {
  socksEnabled.value ? disableProxy() : enableProxy();
  socksEnabled.value = !socksEnabled.value;
};

export const enableProxy = async () => {
  let configValue = socksConfig.value;
  if (!configValue) {
    // TODO: How can we guarantee that we do have a protocol value here...?
    configValue = createSocksConfig(connection.value.protocol!);
  }
  if (isProxy(configValue)) {
    configValue = toRaw(configValue);
  }
  browser.proxy.settings.set({
    value: configValue,
  });
  updateConnection();
  socksConfig.value = configValue;
};

export const disableProxy = () => {
  browser.proxy.settings.set({
    value: {},
  });
  updateConnection();
};

// TODO: No-one is calling this method with `socks` at the moment, it got lost somewhere...
export const createSocksConfig = (protocol: string, socks?: string) => {
  if (!socks) {
    // Use default socks
    switch (protocol) {
      case 'WireGuard' || 'SOCKS through WireGuard':
        socks = defaultWgSocksIP;
        break;
      case 'OpenVPN' || 'SOCKS through OpenVPN':
        socks = defaulOvpnSocksIP;
        break;
    }
  } else {
    // Use server hostname
    socks = socks + '.mullvad.net';
  }

  socksConfig.value = {
    // FIXME: Allow disabling Proxy DNS in the settings
    proxyDNS: true,
    proxyType: 'manual',
    socks: socks + ':' + defaultSocksPort,
  };

  return socksConfig.value;
};

const { socksEnabled, socksConfig } = useStore();
const { connection, updateConnection } = useConnection();
