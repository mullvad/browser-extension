import useStore from '@/composables/useStore';

export const setWebRTC = (isDisabled: boolean) => {
  // Disable WebRTC in Firefox
  browser.privacy.network.peerConnectionEnabled.set({ value: !isDisabled });
  browser.privacy.network.webRTCIPHandlingPolicy.set({
    value: !isDisabled ? 'default' : 'disable_non_proxied_udp',
  });

  // Save webRTC config to storage
  webrtcDisabled.value = isDisabled;
};

const { webrtcDisabled } = useStore();

export const initWebRTC = () => {
  setWebRTC(webrtcDisabled.value ?? true);
};