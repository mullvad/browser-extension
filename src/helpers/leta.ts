import { removeLetaCookies, setLetaCookies } from './cookies';
import { checkFPI } from './fpi';

export type MullvadAccount = string;

export const getMullvadAccount = async (): Promise<MullvadAccount> => {
  const { mullvadAccount } = await browser.storage.local.get('mullvadAccount');
  console.log(mullvadAccount);
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
    const { expiry, access_token: accessToken } = await response.json();

    const isFPI = await checkFPI();

    setLetaCookies({
      expiry,
      accessToken,
      isFPI,
    });
  } catch (error) {
    // TODO Handle server error codes
    // For example when accoutn submitted is incorrect
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
    console.log('initLetaLogin');
    letaLogin(mullvadAccount);
  }
};
