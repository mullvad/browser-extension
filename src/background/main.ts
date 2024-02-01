import { onMessage } from 'webext-bridge/background';

import { addExtListeners } from '@/helpers/extensions';
import { initPageAction, updateTabs } from '@/helpers/pageAction';

// only on dev mode
if (import.meta.hot) {
  // @ts-expect-error for background HMR
  import('/@vite/client');
}

// Add listeners on extension actions
addExtListeners();

// Update pageAction in tabs and add listeners
initPageAction();

// Add message listeners
onMessage('update-socks', () => {
  updateTabs();
});
