import { Extension } from '@/composables/useExtensions/Extension.types';

export const defaultExtensions: Extension[] = [
  {
    id: 'uBlock0@raymondhill.net',
    name: 'uBlock Origin',
    author: 'Raymond Hill',
    description: 'Block ad content and trackers.',
    longDescription: `uBlock Origin is not just a free and open-source “ad blocker“, it's a very efficient content blocker consuming minimal resources.`,
    homeUrl: 'https://ublockorigin.com/',
    addonUrl: 'https://addons.mozilla.org/firefox/addon/ublock-origin/',
    icon: 'ubo64.png',
    installed: false,
    enabled: false,
    ignored: false,
  },
  {
    id: 'CookieAutoDelete@kennydo.com',
    name: 'Cookie AutoDelete',
    author: 'CAD Team',
    description: 'Manage cookies and site browsing data.',
    longDescription:
      'This extension allows you to granularly delete cookies and other browsing site data as soon as the tab closes, domain changes or browser restarts.',
    homeUrl: 'https://github.com/Cookie-AutoDelete/Cookie-AutoDelete',
    addonUrl: 'https://addons.mozilla.org/firefox/addon/cookie-autodelete/',
    icon: 'cad128.png',
    installed: false,
    enabled: false,
    ignored: false,
  },
  {
    id: 'jid1-MnnxcxisBPnSXQ@jetpack',
    name: 'Privacy Badger',
    author: 'EFF Technologists',
    description: 'Automatically block invisible trackers.',
    longDescription:
      'Privacy Badger stops advertisers and other third-party trackers from secretly tracking where you go and what pages you look at on the web.',
    homeUrl: 'https://privacybadger.org/',
    addonUrl: 'https://addons.mozilla.org/firefox/addon/privacy-badger17/',
    icon: 'pb64.png',
    installed: false,
    enabled: false,
    ignored: false,
  },
];

export const defaultExtensionIds = defaultExtensions.map((ext) => ext.id);
