import { Recommendation } from './Recommendation.types';

export const defaultExtensions: Recommendation[] = [
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

export const defaultSettings: Recommendation[] = [
  {
    type: 'setting',
    id: 'https-only-mode',
    name: 'Use HTTPS-only mode',
    description:
      'Enabling HTTPS-only mode makes sure all of your connections are encrypted with HTTPS, and warn you if only HTTP unsafe mode is available.',
    homeUrl:
      'https://support.mozilla.org/en-US/kb/https-only-prefs#w_enabledisable-https-only-mode',
    activated: false,
    ignored: false,
    ctaLabel: undefined,
  },
  {
    type: 'setting',
    id: 'default-search',
    name: 'Change your default search engine',
    description:
      'Your default search engine is not respectful of your privacy. We recommend you switch to a more private one.',
    activated: false,
    ignored: false,
    ctaLabel: undefined,
  },
];

export const defaultRecommendations = [...defaultExtensions, ...defaultSettings];

export const isRecommended = (id: string) => {
  return defaultRecommendationsIds.includes(id);
};

export const defaultRecommendationsIds = defaultRecommendations.map((rec) => rec.id);
