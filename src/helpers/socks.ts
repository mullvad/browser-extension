export interface SocksConfig {
  proxyType?: string;
  socks?: string;
  proxyDNS?: boolean;
}

const setSocks = (socksEnabled: boolean, socksConfig?: SocksConfig) => {
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
};

export const initSocks = async () => {
  try {
    const socksConfig = await localStorage.socksConfig.get();
    const socksEnabled = await localStorage.socksEnabled.get();

    setSocks(socksEnabled, socksConfig);
  } catch (error) {
    console.log('Error fetching socks config: ', error);
  }
};
