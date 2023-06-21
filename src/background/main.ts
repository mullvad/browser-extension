import { onMessage } from 'webext-bridge/background';

import { addExtListeners } from '@/helpers/extensions';
import {
  DataAccount,
  backgroundLetaLogin,
  letaLogin,
  letaLogout,
  refreshLetaDaily,
} from '@/helpers/leta';
import { addTabsListener, updateTabsIcons } from '@/helpers/tabs';

// only on dev mode
if (import.meta.hot) {
  // @ts-expect-error for background HMR
  import('/@vite/client');
}

// Add listeners on extension actions
addExtListeners();

// Autologin to Leta on startup
backgroundLetaLogin();

// Add listener for tab updates
addTabsListener();

// Update socks icon in tabs
updateTabsIcons();

// Add listener to refresh Leta cookie daily
refreshLetaDaily();

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

// On socks connect/disconnect update all tabs pageAction icons
onMessage('update-socks', () => {
  updateTabsIcons();
});

// `browser.cookies` operations are only available in the background context
export const setCookie = async (cookie: browser.cookies._SetDetails) => {
  try {
    console.log('cookieSet: ', cookie);
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
