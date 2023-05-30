import { removeCookie, setCookie } from '@/background/main';

export type CookieData = {
  expiry: string;
  accessToken: string;
  isFPI: boolean;
};

export type FPIStatus = {
  isFPI: boolean;
};
export const setLetaCookies = (data: CookieData) => {
  const { expiry, accessToken, isFPI } = data;

  // Convert to required format:  UNIX epoch in seconds
  const expirationDate = new Date(expiry).getTime() / 1000;

  // if FPI is set, it is required to add the firstPartyDomain ('eTLD+1')
  // If it's not set, an empty string is an accepted value
  // Reference: https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/cookies/set#firstpartydomain
  // See also: https://bugzilla.mozilla.org/show_bug.cgi?id=1669716#c10
  const firstPartyDomain = isFPI ? 'mullvad.net' : '';

  const accessCookie = {
    firstPartyDomain,
    expirationDate,
    httpOnly: true,
    name: `accessToken`,
    sameSite: 'strict',
    secure: true,
    url: 'https://leta.mullvad.net',
    value: accessToken,
  } as browser.cookies._SetDetails;

  const expiryCookie = {
    expirationDate,
    firstPartyDomain,
    name: `letaCookieExpiry`,
    url: 'https://leta.mullvad.net',
    value: expiry,
  };

  setCookie(accessCookie);
  setCookie(expiryCookie);
};

export const removeLetaCookies = (data: FPIStatus) => {
  const { isFPI } = data;

  const firstPartyDomain = isFPI ? 'mullvad.net' : '';

  removeCookie({
    firstPartyDomain,
    name: 'accessToken',
    url: 'https://leta.mullvad.net',
  });

  removeCookie({
    firstPartyDomain,
    name: 'letaCookieExpiry',
    url: 'https://leta.mullvad.net',
  });
};
