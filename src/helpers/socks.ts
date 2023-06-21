export type SocksEnabled = boolean;

export const getsocksEnabled = async (): Promise<SocksEnabled> => {
  const response = await browser.storage.local.get('socksEnabled');

  return JSON.parse(response.socksEnabled);
};
