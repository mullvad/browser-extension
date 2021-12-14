import { storage } from 'webextension-polyfill';
import { initExtensions } from '@/helpers/extensions';
import { serversToStorage } from '@/helpers/servers';
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
const initSocks = async () => {
  const rawSocksEnabled = (await storage.local.get('socksEnabled')).socksEnabled;
  const rawSocksConfig = (await storage.local.get('socksConfig')).socksConfig;
  const socksEnabled = JSON.parse(rawSocksEnabled);
  const socksConfig = JSON.parse(rawSocksConfig);
  if (socksEnabled) {
    browser.proxy.settings.set({
      value: socksConfig,
    });
  }
};
initSocks();

// Load webRTC settings
initWebRTC();
