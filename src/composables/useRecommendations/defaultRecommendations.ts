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
  {
    type: 'extension',
    id: 'CookieAutoDelete@kennydo.com',
    name: 'Cookie AutoDelete',
    description:
      'This extension allows you to granularly delete cookies and other browsing site data as soon as the tab closes, domain changes or browser restarts.',
    homeUrl: 'https://github.com/Cookie-AutoDelete/Cookie-AutoDelete',
    icon: 'cad128.png',
    enabled: false,
    installed: false,
    activated: false,
    ignored: false,
    ctaLabel: 'install',
    ctaUrl: 'https://addons.mozilla.org/firefox/addon/cookie-autodelete/',
  },
  {
    type: 'extension',
    id: 'jid1-MnnxcxisBPnSXQ@jetpack',
    name: 'Privacy Badger',
    description:
      'Privacy Badger stops advertisers and other third-party trackers from secretly tracking where you go and what pages you look at on the web.',
    homeUrl: 'https://privacybadger.org/',
    icon: 'pb64.png',
    enabled: false,
    installed: false,
    activated: false,
    ignored: false,
    ctaLabel: 'install',
    ctaUrl: 'https://addons.mozilla.org/firefox/addon/privacy-badger17/',
  },
];

export const settings: Recommendation[] = [
  {
    type: 'setting',
    id: 'disable-webrtc',
    name: 'Disable webRTC',
    description: `Disable WebRTC to stop websites using that technology from leaking you IP address, even when you're behind a VPN or TOR.`,
    warning:
      'WebRTC is needed by some websites, for example some browser based videoconference tools.',
    homeUrl: 'https://mullvad.net/en/help/webrtc/',
    activated: false,
    ignored: false,
    ctaLabel: 'disable',
  },
  {
    type: 'setting',
    id: 'https-only-mode',
    name: 'Use HTTPS-only mode',
    description:
      'Enabling this security enhancing mode provides a guarantee that all of your connections to websites are upgraded to use HTTPS, and warn you if only HTTP unsafe mode is available.',
    instructions: 'To set HTTPS-Only mode, do this and that.',
    homeUrl:
      'https://support.mozilla.org/en-US/kb/https-only-prefs#w_enabledisable-https-only-mode',
    activated: false,
    ignored: false,
    ctaLabel: undefined,
  },
];

export const defaultRecommendations = [...settings, ...extensions];

export const defaultRecommendationsIds = defaultRecommendations.map((rec) => rec.id);
