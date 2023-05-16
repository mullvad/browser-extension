import { addExtListeners } from '@/helpers/extensions';
import useWebRtc from '@/composables/useWebRtc';

// only on dev mode
if (import.meta.hot) {
  // @ts-expect-error for background HMR
  import('/@vite/client');
}

const { toggleWebRTC, webRTCStatus } = useWebRtc();

// Add listeners on extension actions
addExtListeners();

// Load webRTC settings from storage
toggleWebRTC(webRTCStatus.value);
