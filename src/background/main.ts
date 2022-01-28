import { addExtListeners } from '@/helpers/extensions';

import useRecommendations from '@/composables/useRecommendations/useRecommendations';
import useSocksProxy from '@/composables/useSocksProxy';
import useWebRtc from '@/composables/useWebRtc';

// only on dev mode
if (import.meta.hot) {
  // @ts-expect-error for background HMR
  import('/@vite/client');
  // load latest content script
}

const { loadRecConfigs } = useRecommendations();
const { socksEnabled } = useSocksProxy();
const { initWebRTC } = useWebRtc();

// Add listeners on extension actions
addExtListeners();

// Load recommendations settings
loadRecConfigs();

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

// Uncomment to open the popup in a tab on extension start
// browser.runtime.openOptionsPage();
