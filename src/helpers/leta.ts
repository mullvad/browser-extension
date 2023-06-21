import { sendMessage } from 'webext-bridge/background';

import { removeAuthCookie, setAuthCookie } from './cookies';
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

    if (!response.ok) {
      const error =
        data.code === 'INVALID_ACCOUNT'
          ? `Invalid account number`
          : `Server error, please try again later.`;

      sendMessage('login-error', { message: error }, 'popup');
      throw new Error(error);
    }

    sendMessage('login-success', { account }, 'popup');

    const { expiry, access_token: accessToken } = data;
    const isFPI = await checkFPI();

    setAuthCookie({
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
  removeAuthCookie(isFPI);
};

export const backgroundLetaLogin = async () => {
  const mullvadAccount = await getMullvadAccount();
  if (!mullvadAccount) {
    throw new Error('No Mullvad VPN account found in extension storage.');
  } else {
    letaLogin(mullvadAccount);
  }
};

const dailyLogin = async (alarm: browser.alarms.Alarm) => {
  if (alarm.name === 'daily-login') {
    await backgroundLetaLogin();
  }
};

export const refreshLetaDaily = () => {
  // The cookie expires after 24h, so we use an alarm to relogin
  // in case a user keeps the browser open for more than a day
  browser.alarms.create('daily-login', {
    delayInMinutes: 0.5, // 1380
    periodInMinutes: 0.5, // 1380
  });

  browser.alarms.onAlarm.addListener(dailyLogin);
};
