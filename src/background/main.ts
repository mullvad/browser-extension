import { addExtensionsListeners } from '@/helpers/extensions';
import { cleanProxyListeners, initProxyListeners } from '@/helpers/socksProxy';

// only on dev mode
if (import.meta.hot) {
  // @ts-expect-error for background HMR
  import('/@vite/client');
}

// Add listeners on extension actions
addExtensionsListeners();

// Init proxy listeners
initProxyListeners();

// Listeners for permissions changes
browser.permissions.onAdded.addListener(initProxyListeners);
browser.permissions.onRemoved.addListener(cleanProxyListeners);
