import { computed, ref } from 'vue';

import useRecommendations from './useRecommendations/useRecommendations';

const webRTCSupported = ref(true);
const webRTCLeakedIPs = ref([] as string[]);
const webRTCLeaking = computed(() => (webRTCLeakedIPs.value.length > 0 ? true : false));

const checkRTCLeaks = () => {
  if (!RTCPeerConnection) {
    // RTC not supported?
    webRTCSupported.value = false;
    return;
  }

  const pc = new RTCPeerConnection();
  const leakedHosts = new Set<string>();
  pc.onicecandidate = (e) => {
    console.log(e);
    if (e.candidate) {
      const host = e.candidate.candidate.split(' ')[4];
      const isObfuscated = !host || host.endsWith('.local');
      if (!isObfuscated) {
        leakedHosts.add(host);
      }
    }
    if (pc.iceGatheringState === 'complete') {
      console.log('leakedHosts', [...leakedHosts]);
      // end of gathering
      webRTCLeakedIPs.value = [...leakedHosts];
    }
  };

  pc.createOffer({ offerToReceiveAudio: true }).then((offer) => pc.setLocalDescription(offer));
};

const setWebRTC = (isDisabled: boolean) => {
  // Disable WebRTC in Firefox
  browser.privacy.network.peerConnectionEnabled.set({ value: !isDisabled });
  browser.privacy.network.webRTCIPHandlingPolicy.set({
    value: !isDisabled ? 'default' : 'disable_non_proxied_udp',
  });

  const { updateRecommendation } = useRecommendations();
  updateRecommendation('disable-webrtc', { activated: isDisabled });
};

const initWebRTC = () => {
  const { getRecommendationById } = useRecommendations();
  const webRtcRecommendation = getRecommendationById('disable-webrtc');
  setWebRTC(webRtcRecommendation?.activated ?? true);
};

const useWebRtc = () => {
  checkRTCLeaks();

  return {
    setWebRTC,
    initWebRTC,
    webRTCLeaking,
    webRTCLeakedIPs,
  };
};

export default useWebRtc;
