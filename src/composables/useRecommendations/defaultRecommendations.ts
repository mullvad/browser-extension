import { Recommendation } from './Recommendation.types';

export const extensions: Recommendation[] = [
  {
    type: 'extension',
    id: 'uBlock0@raymondhill.net',
    name: 'uBlock Origin',
    description: `uBlock Origin is not just a free and open-source “ad blocker“, it's a very efficient content blocker consuming minimal resources.`,
    homeUrl: 'https://ublockorigin.com/',
    icon: 'ubo64.png',
    enabled: false,
    installed: false,
    activated: false,
    ignored: false,
    ctaLabel: 'install',
    ctaUrl: 'https://addons.mozilla.org/firefox/addon/ublock-origin/',
  },
];

export const settings: Recommendation[] = [
  {
    type: 'setting',
    id: 'disable-webrtc',
    name: 'Disable webRTC',
    description: `Disable WebRTC to stop websites using that technology from leaking you IP address, even when you're behind a VPN or Tor.`,
    warning:
      'WebRTC is needed by some websites, for example some browser based videoconference tools.',
    homeUrl: 'https://mullvad.net/en/help/webrtc/',
    activated: true,
    ignored: false,
    ctaLabel: 'disable',
  },
  {
    type: 'setting',
    id: 'https-only-mode',
    name: 'Use HTTPS-only mode',
    description:
      'Enabling this security enhancing mode provides a guarantee that all of your connections to websites are upgraded to use HTTPS, and warn you if only HTTP unsafe mode is available.',
    homeUrl:
      'https://support.mozilla.org/en-US/kb/https-only-prefs#w_enabledisable-https-only-mode',
    activated: false,
    ignored: false,
    ctaLabel: undefined,
  },
  {
    type: 'setting',
    id: 'disable-doh',
    name: 'Disable Mullvad DoH (Encrypted DNS)',
    description: `When you're connected to Mullvad, it's better to use the DNS from the same exit server configured.`,
    homeUrl: 'https://mullvad.net/en/help/webrtc/',
    activated: false,
    ignored: false,
    ctaLabel: undefined,
  },
];

export const isRecommended = (id: string) => {
  return defaultRecommendationsIds.includes(id);
};

export const defaultRecommendations = [...settings, ...extensions];

export const defaultRecommendationsIds = defaultRecommendations.map((rec) => rec.id);
