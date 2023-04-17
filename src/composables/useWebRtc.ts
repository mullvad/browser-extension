import { computed, ref } from 'vue';

import useStore from './useStore';

const { webRTCStatus } = useStore();

const webRTCSupported = ref(true);
const webRTCLeakedIPs = ref([] as string[]);
const webRTCLeaking = computed(() => (webRTCLeakedIPs.value.length > 0 ? true : false));

const checkWebRTC = async () => {
  try {
    const { value } = await browser.privacy.network.peerConnectionEnabled.get({});
    webRTCSupported.value = value as boolean;
  } catch (e) {
    console.log(e);
  }
};

const checkRTCLeaks = async () => {
  await checkWebRTC();
  // Clear the previous results
  webRTCLeakedIPs.value = [];

  if (webRTCSupported.value) {
    // Start the leak check
    const pc = new RTCPeerConnection();
    const leakedHosts = new Set<string>();
    pc.onicecandidate = (e) => {
      if (e.candidate) {
        const host = e.candidate.candidate.split(' ')[4];
        const isObfuscated = !host || host.endsWith('.local');
        if (!isObfuscated) {
          leakedHosts.add(host);
        }
      }
      if (pc.iceGatheringState === 'complete') {
        // end of gathering
        webRTCLeakedIPs.value = [...leakedHosts];
      }
    };

    pc.createOffer({ offerToReceiveAudio: true }).then((offer) => pc.setLocalDescription(offer));
  }
};

const setWebRTC = (value: boolean) => {
  browser.privacy.network.peerConnectionEnabled.set({ value: value });
};

const useWebRtc = () => {
  checkRTCLeaks();

  return {
    setWebRTC,
    webRTCLeaking,
    webRTCLeakedIPs,
    webRTCStatus,
  };
};

export default useWebRtc;
