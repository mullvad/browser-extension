import { proxy } from 'webextension-polyfill';

export type ProxySettings = {
  autoConfigUrl: string;
  autoLogin: boolean;
  http: string;
  httpProxyAll: boolean;
  passthrough: string;
  proxyDNS: boolean;
  proxyType: string;
  socks: string;
  socksVersion: 4 | 5;
  ssl: string;
};

export type SocksEnabled = boolean;

export type SocksDetails = {
  socksEnabled: boolean;
  protocol?: string;
  server?: string; // TODO Should be socks server!
  proxyDNS?: boolean;
};

export const getProxySettings = async () => {
  const { value } = await proxy.settings.get({});
  return value as ProxySettings;
};

export const getSocksDetails = async (): Promise<SocksDetails> => {
  const response = await browser.storage.local.get('socksDetails');

  if ('socksDetails' in response) {
    return JSON.parse(response.socksDetails);
  }
  return { socksEnabled: false };
};
