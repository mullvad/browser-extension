import { localStorage } from './localStorage';

export function setWebRTC(isDisabled: boolean) {
  // Disable WebRTC in Firefox
  browser.privacy.network.peerConnectionEnabled.set({ value: !isDisabled });
  browser.privacy.network.webRTCIPHandlingPolicy.set({
    value: !isDisabled ? 'default' : 'disable_non_proxied_udp',
  });

  // Save webRTC config to storage
  return localStorage.webrtcDisabled.set(isDisabled);
}
