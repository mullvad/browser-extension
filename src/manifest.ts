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
      default_icon: './assets/icon.svg',
      default_popup: './dist/popup/index.html',
    },
    background: {
      page: './dist/background/index.html',
      persistent: false,
    },
    icons: {
      '16': './assets/icon.svg',
      '48': './assets/icon.svg',
      '96': './assets/icon.svg',
      '128': './assets/icon.svg',
      '256': './assets/icon.svg',
    },
    permissions: ['*://*.mullvad.net/*', 'management', 'storage', 'privacy', 'proxy'],
  };

  if (isDev) {
    // this is required on dev for Vite script to load
    // eslint-disable-next-line no-useless-escape
    manifest.content_security_policy = `script-src \'self\' http://localhost:${port}; object-src \'self\'`;
  }

  return manifest;
}
