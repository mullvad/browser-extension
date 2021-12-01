import { initExtensions } from '@/helpers/extensions';
import { serversToStorage } from '@/helpers/servers';
import { initSocks } from '@/helpers/socks';
import { initWebRTC } from '@/helpers/webRTC';

// only on dev mode
if (import.meta.hot) {
  // @ts-expect-error for background HMR
  import('/@vite/client');
  // load latest content script
  import('./contentScriptHMR');
}

// Add listener on extension action & load extensions settings
initExtensions();

// Fetch servers list and save it to storage
serversToStorage();

// Load socks settings
initSocks();

// Load webRTC settings
initWebRTC();
