import { storage } from 'webextension-polyfill';
import { initExtensions } from '@/helpers/extensions';
import { serversToStorage } from '@/helpers/servers';
import { initWebRTC } from '@/helpers/webRTC';
import { enableProxy } from '@/helpers/socks';

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
const initSocks = async () => {
  const socksEnabled = JSON.parse((await storage.local.get('socksEnabled')).socksEnabled ?? 'false');
  if (socksEnabled) {
    enableProxy();
  }
};
initSocks();

// Load webRTC settings
initWebRTC();
