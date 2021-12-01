import { localStorage } from './localStorage';

export interface Extension {
  id: string;
  name: string;
  author: string;
  description: string;
  longDescription: string;
  homeUrl: string;
  addonUrl: string;
  icon: string;
  installed: boolean;
  enabled: boolean;
  ignored: boolean;
}

type ExtensionInfo = browser.management.ExtensionInfo | Extension;

const defaultExtsConfig: Extension[] = [
  {
    id: 'uBlock0@raymondhill.net',
    name: 'uBlock Origin',
    author: 'Raymond Hill',
    description: 'block ad content and trackers',
    longDescription:
      "uBlock Origin is not just a free and open-source “ad blocker“, it's a very efficient content blocker consuming minimal resources.",
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
    description: 'manage cookies and site browsing data',
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
    description: 'automatically block invisible trackers',
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

const defaultExtsConfigID = defaultExtsConfig.map((ext) => ext.id);

const loadExtConfigs = async (): Promise<void> => {
  // Get extensions config from storage
  let extensionsConfig = await localStorage.extensions.get();

  if (extensionsConfig.length === 0) {
    extensionsConfig = defaultExtsConfig;
  }

  // Get installed addons
  const installedAddons = await browser.management.getAll();

  // Create a disabled extensions ID list
  const disabledIDs = installedAddons
    .filter((addon) => addon.enabled === false)
    .map((addons) => addons.id);

  const enabledIDs = installedAddons
    .filter((addon) => addon.enabled === true)
    .map((addons) => addons.id);

  const updatedConfig = extensionsConfig.map((ext) => {
    // ext disabled
    if (disabledIDs.includes(ext.id)) {
      return { ...ext, installed: true, enabled: false };
      // ext enabled
    } else if (enabledIDs.includes(ext.id)) {
      return { ...ext, installed: true, enabled: true };
      // ext to install
    } else return ext;
  });

  localStorage.extensions.set(updatedConfig);
};

const addExtListeners = () => {
  browser.management.onInstalled.addListener(onInstall);
  browser.management.onUninstalled.addListener(onUninstall);
  browser.management.onEnabled.addListener(onEnable);
  browser.management.onDisabled.addListener(onDisable);
};

// Listeners
async function onInstall(extensionInfo: ExtensionInfo) {
  await updateExtConfig(extensionInfo, { installed: true, enabled: true, ignored: false });
}

async function onUninstall(extensionInfo: ExtensionInfo) {
  await updateExtConfig(extensionInfo, { installed: false, enabled: false });
}

async function onEnable(extensionInfo: ExtensionInfo) {
  await updateExtConfig(extensionInfo, { enabled: true, ignored: false });
}

async function onDisable(extensionInfo: ExtensionInfo) {
  await updateExtConfig(extensionInfo, { enabled: false });
}

export async function onIgnore(extensionInfo: ExtensionInfo, status: boolean) {
  await updateExtConfig(extensionInfo, { ignored: status });
}

async function updateExtConfig(extensionInfo: ExtensionInfo, modification: Partial<Extension>) {
  if (defaultExtsConfigID.includes(extensionInfo.id)) {
    const extensionsConfig = await localStorage.extensions.get();
    const updatedConfig = extensionsConfig.map((extension) => {
      return extension.id === extensionInfo.id ? { ...extension, ...modification } : extension;
    });

    localStorage.extensions.set(updatedConfig);
  }
}

export const initExtensions = () => {
  // Add listener on extension action
  addExtListeners();

  // Load extensions settings
  loadExtConfigs();
};

export const sortExtensions = (extensions: Extension[]): Extension[] => {
  // Sort in the following order:
  // to install + disabled / installed / ignored
  extensions.sort((a, b) => {
    if (a.ignored !== b.ignored) {
      return a.ignored ? 1 : -1;
    } else if (a.installed !== b.installed) {
      return a.installed ? 1 : -1;
    } else return 0;
  });

  return extensions;
};
