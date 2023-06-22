export type SocksEnabled = boolean;

export type SocksDetails = {
  socksEnabled: boolean;
  protocol?: string;
  server?: string;
  proxyDNS?: boolean;
};

export const getSocksDetails = async (): Promise<SocksDetails> => {
  const response = await browser.storage.local.get('socksDetails');

  // TODO Check if there's an existing user set socks in use

  if ('socksDetails' in response) {
    return JSON.parse(response.socksDetails);
  }
  return { socksEnabled: false };
};
