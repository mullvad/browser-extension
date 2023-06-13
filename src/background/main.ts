import { onMessage } from 'webext-bridge/background';

import { addExtListeners } from '@/helpers/extensions';
import {
  DataAccount,
  backgroundLetaLogin,
  letaLogin,
  letaLogout,
  dailyLogin,
} from '@/helpers/leta';

// only on dev mode
if (import.meta.hot) {
  // @ts-expect-error for background HMR
  import('/@vite/client');
}

// Add listeners on extension actions
addExtListeners();

// Autologin to Leta on startup
backgroundLetaLogin();

// "New Identity" doesn't restart the extensions, so we need a workaround.
// When a new window is created, we will automatically login again.
// See: https://gitlab.torproject.org/tpo/applications/tor-browser/-/issues/41833
browser.windows.onCreated.addListener(() => backgroundLetaLogin());

// Add cookie messaging listeners
onMessage<DataAccount>('leta-login', async ({ data }) => {
  const { account } = data;
  letaLogin(account);
});

onMessage('leta-logout', () => {
  letaLogout();
});

// The cookie expires after 24h, so we use an alarm to relogin
// in case a user keeps the browser open for more than a day
browser.alarms.create('daily-login', {
  delayInMinutes: 1380,
  periodInMinutes: 1380,
});

browser.alarms.onAlarm.addListener(dailyLogin);

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
