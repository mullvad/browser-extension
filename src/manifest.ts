import fs from 'fs-extra';
import type { Manifest } from 'webextension-polyfill';
import type PkgType from '../package.json';
import { isDev, port, r } from '../scripts/utils';

export async function getManifest() {
  const pkg = (await fs.readJSON(r('package.json'))) as typeof PkgType;

  // update this file to update this manifest.json
  // can also be conditional based on your need
  const manifest: Manifest.WebExtensionManifest = {
    manifest_version: 2,
    name: pkg.displayName || pkg.name,
    version: pkg.version,
    description: pkg.description,
    browser_action: {
      default_icon: './assets/mullvad-logo.svg',
      default_popup: './dist/popup/index.html',
      default_area: 'navbar',
    },
    background: {
      page: './dist/background/index.html',
      persistent: false,
    },
    page_action: {
      default_icon: {
        '16': './assets/route.svg',
        '48': './assets/route.svg',
        '96': './assets/route.svg',
      },
      default_title: 'Proxy details',
    },
    icons: {
      '16': './assets/mullvad-logo.svg',
      '48': './assets/mullvad-logo.svg',
      '96': './assets/mullvad-logo.svg',
    },
    permissions: ['management', 'privacy', 'proxy', 'search', 'storage', '*://*.mullvad.net/*'],
    browser_specific_settings: {
      gecko: {
        strict_min_version: '91.1.0',
        update_url: 'https://cdn.mullvad.net/browser-extension/updates.json',
        id: '{d19a89b9-76c1-4a61-bcd4-49e8de916403}',
      },
    },
    chrome_settings_overrides: {
      search_provider: {
        name: 'Mullvad Leta',
        search_url: 'https://leta.mullvad.net/?q={searchTerms}',
        keyword: 'leta',
        favicon_url: './assets/mullvad-logo.svg',
      },
    },
  };

  if (isDev) {
    // this is required on dev for Vite script to load
    // eslint-disable-next-line no-useless-escape
    manifest.content_security_policy = `script-src \'self\' http://localhost:${port}; object-src \'self\'`;
  }

  return manifest;
}
