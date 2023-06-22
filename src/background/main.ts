import { onMessage } from 'webext-bridge/background';

import { addExtListeners } from '@/helpers/extensions';
import {
  DataAccount,
  backgroundLetaLogin,
  letaLogin,
  letaLogout,
  refreshLetaDaily,
} from '@/helpers/leta';
import { addTabsListener, updateTabs } from '@/helpers/pageAction';

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

// Update pageAction in tabs
updateTabs();

// Add listener to refresh Leta cookie daily
refreshLetaDaily();

// "New Identity" doesn't restart the extensions, so we need a workaround.
// When a new window is created, we will automatically login again.
// See: https://gitlab.torproject.org/tpo/applications/tor-browser/-/issues/41833
browser.windows.onCreated.addListener(() => backgroundLetaLogin());

// Add messages listeners
onMessage<DataAccount>('leta-login', async ({ data }) => {
  const { account } = data;
  letaLogin(account);
});

onMessage('leta-logout', () => {
  letaLogout();
});

onMessage('update-socks', () => {
  updateTabs();
});
