export interface SocksConfig {
  proxyType?: string;
  socks?: string;
  proxyDNS?: boolean;
}

const defaultWgSocksIP = '10.64.0.1';
const defaulOvpnSocksIP = '10.8.0.1';
const defaultSocksPort = '1080';

export function setSocks(socksEnabled: boolean, socksConfig?: SocksConfig) {
  // If socks should be set
  if (socksEnabled) {
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
}

export function getSocksConfig(protocol: string, socks?: string): SocksConfig {
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
}
