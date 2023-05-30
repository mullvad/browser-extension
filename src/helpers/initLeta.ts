import { setLetaCookies } from './cookies';

export const initLetaLogin = async () => {
  const { mullvadAccount } = await browser.storage.local.get('mullvadAccount');

  if (!mullvadAccount) {
    throw new Error('No Mullvad VPN account found in extension storage.');
  }

  const { value: isFPI } = await browser.privacy.websites.firstPartyIsolate.get({});

  const requestData = {
    method: 'POST',
    body: JSON.stringify({
      account_number: mullvadAccount,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const response = await fetch('https://api.mullvad.net/auth/v1/webtoken', requestData);
  const { expiry, access_token: accessToken } = await response.json();

  setLetaCookies({
    expiry,
    accessToken,
    isFPI: isFPI.value,
  });
};
