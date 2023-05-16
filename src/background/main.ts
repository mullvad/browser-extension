import { runtime, storage } from 'webextension-polyfill';
import { addExtListeners } from '@/helpers/extensions';

import useRecommendations from '@/composables/useRecommendations/useRecommendations';

// only on dev mode
if (import.meta.hot) {
  // @ts-expect-error for background HMR
  import('/@vite/client');
}

const { cleanOutdated } = useRecommendations();

// Add listeners on extension actions
addExtListeners();

// Cleanup outdated settings from storage from the 0.6.x series
// TO REMOVE IN THE 0.8.x versions
runtime.onInstalled.addListener(async ({ reason, temporary }) => {
  if (temporary) return; // skip during development
  switch (reason) {
    // see above
    case 'update':
      {
        await storage.local.remove(['detailsExpanded', 'proxyExpanded']);
        cleanOutdated();
      }
      break;
  }
});
