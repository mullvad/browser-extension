import { removeCookie, setCookie } from '@/background/main';

export type CookieData = {
  expiry: string;
  accessToken: string;
};

export const setLetaCookies = (data: CookieData) => {
  const { expiry, accessToken } = data;
  const expirationDate = new Date(expiry).getTime() / 1000; // Convert to UNIX epoch in seconds

  const accessCookie = {
    expirationDate,
    // firstPartyDomain: 'leta.mullvad.net',
    httpOnly: true,
    name: `accessToken`,
    sameSite: 'strict',
    secure: true,
    url: 'https://leta.mullvad.net',
    value: accessToken,
  } as browser.cookies._SetDetails;

  const expiryCookie = {
    expirationDate,
    // firstPartyDomain: 'leta.mullvad.net',
    name: `letaCookieExpiry`,
    url: 'https://leta.mullvad.net',
    value: expiry,
  };

  setCookie(expiryCookie);
  setCookie(accessCookie);
};

export const removeLetaCookies = () => {
  removeCookie({
    name: 'accessToken',
    url: 'https://leta.mullvad.net',
    // firstPartyDomain: 'leta.mullvad.net',
  });
  removeCookie({
    name: 'letaCookieExpiry',
    url: 'https://leta.mullvad.net',
    // firstPartyDomain: 'leta.mullvad.net',
  });
};
