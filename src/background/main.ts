import { initExtensions } from '@/helpers/extensions';
import { serversToStorage } from '@/helpers/servers';
import { initWebRTC } from '@/helpers/webRTC';
import useSocksProxy from '@/composables/useSocksProxy';

// only on dev mode
if (import.meta.hot) {
  // @ts-expect-error for background HMR
  import('/@vite/client');
  // load latest content script
  import('./contentScriptHMR');
}

const { socksEnabled } = useSocksProxy();

// Add listener on extension action & load extensions settings
initExtensions();

// Fetch servers list and save it to storage
serversToStorage();

// Load socks settings
const initSocks = async () => {
  if (socksEnabled) {
    // TODO: Fix initial enable proxy again
    // enableProxy();
  }
};
initSocks();

// Load webRTC settings
initWebRTC();
