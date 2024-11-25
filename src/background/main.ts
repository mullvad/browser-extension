import { addExtensionsListeners } from '@/helpers/extensions';
import { initProxyListeners } from '@/helpers/proxyListeners';
import { resetRecommendations } from '@/helpers/recommendations';

// only on dev mode
if (import.meta.hot) {
  // @ts-expect-error for background HMR
  import('/@vite/client');
}

// Add listeners to execute on subsequent updates
resetRecommendations();

// Add listeners on extension actions
addExtensionsListeners();

// Add listeners for proxy actions
initProxyListeners();
