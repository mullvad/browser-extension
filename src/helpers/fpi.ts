export type IsFPI = boolean;

export const checkFPI = async (): Promise<IsFPI> => {
  const { value } = await browser.privacy.websites.firstPartyIsolate.get({});
  return value as boolean;
};
