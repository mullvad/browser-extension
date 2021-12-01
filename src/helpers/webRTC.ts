import { storageLocal } from './storageLocal';

const setWebRTC = (isDisabled: boolean) => {
  // Disable WebRTC in Firefox
  browser.privacy.network.peerConnectionEnabled.set({ value: !isDisabled });
  browser.privacy.network.webRTCIPHandlingPolicy.set({
    value: !isDisabled ? 'default' : 'disable_non_proxied_udp',
  });

  // Save webRTC config to storage
  return storageLocal.webrtcDisabled.set(isDisabled);
};

export const initWebRTC = async () => {
  try {
    const webrtcDisabled = await storageLocal.webrtcDisabled.get();

    let isDisabled = webrtcDisabled;
    if (typeof webrtcDisabled === 'undefined') {
      isDisabled = true;
    }

    setWebRTC(isDisabled);
  } catch (error) {
    console.log('Error fetching webRTC config: ', error);
  }
};
