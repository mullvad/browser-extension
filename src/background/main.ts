import { onMessage } from 'webext-bridge/background';

import { addExtListeners } from '@/helpers/extensions';
import { DataAccount, initLeta, letaLogin, letaLogout } from '@/helpers/leta';
import { initPageAction, updateTabs } from '@/helpers/pageAction';

// only on dev mode
if (import.meta.hot) {
  // @ts-expect-error for background HMR
  import('/@vite/client');
}

// Add listeners on extension actions
addExtListeners();

// Autologin to Leta on startup and add listeners
initLeta();

// Update pageAction in tabs and add listeners
initPageAction();

// Add message listeners
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
