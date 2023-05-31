import { sendMessage } from 'webext-bridge/background';

import { removeLetaCookies, setLetaCookies } from './cookies';
import { checkFPI } from './fpi';

export type MullvadAccount = string;
export type DataAccount = {
  account: MullvadAccount;
};

export const getMullvadAccount = async (): Promise<MullvadAccount> => {
  const { mullvadAccount } = await browser.storage.local.get('mullvadAccount');
  return mullvadAccount;
};

export const letaLogin = async (account: string) => {
  try {
    const requestData = {
      method: 'POST',
      body: JSON.stringify({
        account_number: account,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const response = await fetch('https://api.mullvad.net/auth/v1/webtoken', requestData);
    const data = await response.json();

    if (data.code === 'INVALID_ACCOUNT') {
      sendMessage('invalid-account', {}, 'popup');
      throw new Error(`Account provided is invalid.`);
    }

    sendMessage('login-success', { account }, 'popup');

    const { expiry, access_token: accessToken } = data;
    const isFPI = await checkFPI();

    setLetaCookies({
      expiry,
      accessToken,
      isFPI,
    });
  } catch (error) {
    console.error(error);
  }
};

export const letaLogout = async () => {
  const isFPI = await checkFPI();
  removeLetaCookies(isFPI);
};

export const initLetaLogin = async () => {
  const mullvadAccount = await getMullvadAccount();
  if (!mullvadAccount) {
    throw new Error('No Mullvad VPN account found in extension storage.');
  } else {
    letaLogin(mullvadAccount);
  }
};
