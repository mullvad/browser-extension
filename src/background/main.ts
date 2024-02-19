import { addExtListeners } from '@/helpers/extensions';
import { initBrowserAction } from '@/helpers/browserAction';
import { initProxyRequests } from '@/helpers/socksProxy';

// only on dev mode
if (import.meta.hot) {
  // @ts-expect-error for background HMR
  import('/@vite/client');
}

// Add listeners on extension actions
addExtListeners();

// Update browserAction for tabs and add listeners
initBrowserAction();

// Add listener for proxy requests
initProxyRequests();
