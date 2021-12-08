import { storageLocal } from './storageLocal';

export interface SocksConfig {
  proxyType?: string;
  socks?: string;
  proxyDNS?: boolean;
}

const defaultWgSocksIP = '10.64.0.1';
const defaulOvpnSocksIP = '10.8.0.1';
const defaultSocksPort = '1080';

export const setSocks = (socksEnabled: boolean, socksConfig?: SocksConfig) => {
  // If socks should be set
  if (socksEnabled) {
    if (!socksConfig) {
      throw new Error('No socksConfig given when trying to set proxy settings');
    }
    // Update browser socks settings with provided settings
    browser.proxy.settings.set({
      value: socksConfig,
    });
  } else {
    // If socks should be unset
    // Reset to default proxy config
    browser.proxy.settings.set({
      value: {},
    });
  }
};

export const createSocksConfig = (protocol: string, socks?: string): SocksConfig => {
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

  return {
    // FIXME: Allow disabling Proxy DNS in the settings
    proxyDNS: true,
    proxyType: 'manual',
    socks: socks + ':' + defaultSocksPort,
  };
};

export const initSocks = async () => {
  try {
    const socksConfig = await storageLocal.socksConfig.get();
    const socksEnabled = await storageLocal.socksEnabled.get();

    setSocks(socksEnabled, socksConfig);
  } catch (error) {
    console.log('Error fetching socks config: ', error);
  }
};
