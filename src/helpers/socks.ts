export interface SocksConfig {
  proxyType?: string;
  socks?: string;
  proxyDNS?: boolean;
}

export function setSocks(socksEnabled: boolean, socksConfig?: SocksConfig) {
  console.log('setSocks socksConfig: ', socksConfig);

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
        socks = '10.64.0.1';
        break;
      case 'OpenVPN' || 'SOCKS through OpenVPN':
        socks = '10.8.0.1';
        break;
    }
  } else {
    // Use server hostname
    socks = socks + '.mullvad.net';
  }

  return {
    proxyDNS: true,
    proxyType: 'manual',
    socks: socks + ':1080',
  };
}
