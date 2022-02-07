import useRecommendations from './useRecommendations/useRecommendations';

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
  return {
    setWebRTC,
    initWebRTC,
  };
};

export default useWebRtc;
