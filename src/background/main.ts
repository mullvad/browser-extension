import { addExtListeners } from '@/helpers/extensions';

import useRecommendations from '@/composables/useRecommendations/useRecommendations';
import useSocksProxy from '@/composables/useSocksProxy';
import useWebRtc from '@/composables/useWebRtc';

// only on dev mode
if (import.meta.hot) {
  // @ts-expect-error for background HMR
  import('/@vite/client');
}

const { loadRecConfigs } = useRecommendations();
const { initWebRTC } = useWebRtc();

// Add listeners on extension actions
addExtListeners();

// Load recommendations settings
loadRecConfigs();

// Load socks settings
useSocksProxy();

// Load webRTC settings
initWebRTC();
