import { serversToStorage } from '~/helpers/servers';

// only on dev mode
if (import.meta.hot) {
  // @ts-expect-error for background HMR
  import('/@vite/client');
  // load latest content script
  import('./contentScriptHMR');
}

// Fetch servers list and save it to storage
serversToStorage();
