import { onMessage } from 'webext-bridge/background';

import { addExtListeners } from '@/helpers/extensions';
import {
  DataAccount,
  getMullvadAccount,
  initLetaLogin,
  letaLogin,
  letaLogout,
} from '@/helpers/leta';

// only on dev mode
if (import.meta.hot) {
  // @ts-expect-error for background HMR
  import('/@vite/client');
}

// Add listeners on extension actions
addExtListeners();

// Mullvad Leta Auto Login on extension start
initLetaLogin();

// Add cookie messaging listeners
onMessage<DataAccount>('leta-login', async ({ data }) => {
  const { account } = data;
  letaLogin(account);
});

onMessage('leta-logout', () => {
  letaLogout();
});

// Alarm to refresh Mullvad Leta auth cookie
// The cookie expires after 24h, so renewal is set for every 23h
browser.alarms.create('leta-cookie-refresh', {
  delayInMinutes: 1380,
  periodInMinutes: 1380,
});

const refreshCookie = async (alarm: browser.alarms.Alarm) => {
  if (alarm.name === 'leta-cookie-refresh') {
    const account = await getMullvadAccount();
    await letaLogin(account);
  }
};

browser.alarms.onAlarm.addListener(refreshCookie);

// `browser.cookies` operations are only available in the background context
export const setCookie = async (cookie: browser.cookies._SetDetails) => {
  try {
    await browser.cookies.set(cookie);
  } catch (error) {
    console.error(error);
  }
};

export const removeCookie = async (cookieDetails: browser.cookies._RemoveDetails) => {
  try {
    await browser.cookies.remove(cookieDetails);
  } catch (error) {
    console.error(error);
  }
};
