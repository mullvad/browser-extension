import { defineConfig } from 'wxt';
import Vue from '@vitejs/plugin-vue';
import UnoCSS from 'unocss/vite';
import type { UserManifest } from 'wxt';

// Firefox MV2 manifest. The `optional_permissions` array includes Firefox-specific
// entries ('proxy', '<all_urls>') that are not present in the chrome-based
// ManifestOptionalPermission type, so the object is cast to UserManifest.
const manifest: UserManifest = {
  name: 'Mullvad Browser Extension',
  browser_action: {
    default_icon: '/assets/mullvad-logo.svg',
    default_area: 'navbar',
  },
  icons: {
    '16': '/assets/mullvad-logo.svg',
    '48': '/assets/mullvad-logo.svg',
    '96': '/assets/mullvad-logo.svg',
  },
  permissions: ['management', 'privacy', 'search', 'storage', '*://*.mullvad.net/*'],
  optional_permissions: ['proxy', 'tabs', '<all_urls>'],
  browser_specific_settings: {
    gecko: {
      strict_min_version: '91.1.0',
      update_url: 'https://cdn.mullvad.net/browser-extension/updates.json',
      id: '{d19a89b9-76c1-4a61-bcd4-49e8de916403}',
    },
  },
  incognito: 'spanning',
} as UserManifest;

// See https://wxt.dev/api/config.html
export default defineConfig({
  srcDir: 'src',
  // Target Firefox with Manifest V2
  manifestVersion: 2,
  manifest,
  // Suppress Firefox data collection permission warning
  // (existing extensions are exempt until November 2025)
  suppressWarnings: {
    firefoxDataCollection: true,
  },
  // Pages to open when starting the dev server.
  // When WXT_FIREFOX_PROFILE env var is set (e.g. via `npm run restart`),
  // a persistent Firefox profile is used with keep-profile-changes enabled.
  // Otherwise WXT creates a fresh temporary profile each time.
  webExt: {
    startUrls: ['about:debugging#/runtime/this-firefox', 'mullvad.net/check'],
    ...(process.env.WXT_FIREFOX_PROFILE
      ? {
          firefoxProfile: process.env.WXT_FIREFOX_PROFILE,
          keepProfileChanges: true,
        }
      : {}),
    ...(process.env.WXT_FIREFOX_BIN
      ? {
          binaries: { firefox: process.env.WXT_FIREFOX_BIN },
        }
      : {}),
  },
  vite: () => ({
    plugins: [
      Vue(),
      // https://unocss.dev/integrations/vite
      UnoCSS(),
    ],
    resolve: {
      alias: {
        '@/': new URL('./src/', import.meta.url).pathname,
      },
    },
  }),
});
