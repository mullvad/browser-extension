import { initExtensions } from '@/helpers/extensions';
import { initWebRTC } from '@/helpers/webRTC';
import useSocksProxy from '@/composables/useSocksProxy';
import { isDev } from 'scripts/utils';

// only on dev mode
if (import.meta.hot) {
  // @ts-expect-error for background HMR
  import('/@vite/client');
  // load latest content script
  import('./contentScriptHMR');
}

// Open the popup in a tab on start in dev mode
if (isDev) {
  browser.runtime.openOptionsPage();
}

const { socksEnabled } = useSocksProxy();

// Add listener on extension action & load extensions settings
initExtensions();

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
