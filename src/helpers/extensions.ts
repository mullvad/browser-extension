import { localStorage } from './localStorage';

export interface Extension {
  id: string;
  name: string;
  description: string;
  url: string;
  installed: boolean;
  enabled: boolean;
  ignored: boolean;
}

export const defaultExtsConfig: Extension[] = [
  {
    id: 'uBlock0@raymondhill.net',
    name: 'uBlock Origin',
    description: 'Ublock description',
    url: 'https://addons.mozilla.org/en-US/firefox/addon/ublock-origin/',
    installed: false,
    enabled: false,
    ignored: false,
  },
  {
    id: 'https-everywhere@eff.org',
    name: 'HTTPS Everywhere',
    description: 'HTTPS Everywhere description',
    url: 'https://addons.mozilla.org/firefox/addon/https-everywhere/',
    installed: false,
    enabled: false,
    ignored: false,
  },
  {
    id: 'CookieAutoDelete@kennydo.com',
    name: 'Cookie AutoDelete',
    description: 'Cookie Auto Delete description',
    url: 'https://addons.mozilla.org/en-US/firefox/addon/cookie-autodelete/',
    installed: false,
    enabled: false,
    ignored: false,
  },
  {
    id: 'jid1-MnnxcxisBPnSXQ@jetpack',
    name: 'Privacy Badger',
    description: 'Privacy Badger description',
    url: 'https://addons.mozilla.org/en-US/firefox/addon/privacy-badger17/',
    installed: false,
    enabled: false,
    ignored: false,
  },
];

const defaultExtsConfigID = defaultExtsConfig.map((ext) => ext.id);

export async function getRecommended(): Promise<Extension[]> {
  // Get extensions config from storage
  const extensionsConfig = await localStorage.extensions.get();

  // Get installed addons & ID lists
  const installedAddons = await browser.management.getAll();
  const installedIDs = installedAddons.map((addon) => addon.id);

  // Filter ignored extensions ID
  const toRecommend = extensionsConfig.filter((ext) => ext.ignored === false);

  // Create a disabled extensions ID list
  const disabledIDs = installedAddons
    .filter((addon) => addon.enabled === false)
    .map((addons) => addons.id);

  // Create a list of extensions to install
  const toInstall = toRecommend.filter((ext) => !installedIDs.includes(ext.id));
  // Create a list of extensions to enable
  const toEnable = toRecommend.filter((ext) => disabledIDs.includes(ext.id));

  return [...toInstall, ...toEnable];
}

// Listeners
export async function onInstall(extensionInfo: browser.management.ExtensionInfo) {
  await updateExtConfig(extensionInfo, { installed: true, enabled: true });
}

export async function onUninstall(extensionInfo: browser.management.ExtensionInfo) {
  await updateExtConfig(extensionInfo, { installed: false, enabled: false });
}

export async function onEnable(extensionInfo: browser.management.ExtensionInfo) {
  await updateExtConfig(extensionInfo, { enabled: true });
}

export async function onDisable(extensionInfo: browser.management.ExtensionInfo) {
  await updateExtConfig(extensionInfo, { enabled: false });
}

async function updateExtConfig(
  extensionInfo: browser.management.ExtensionInfo,
  modification: Partial<Extension>,
) {
  if (defaultExtsConfigID.includes(extensionInfo.id)) {
    const extensionsConfig = await localStorage.extensions.get();
    const updatedConfig = extensionsConfig.map((extension) => {
      return extension.id === extensionInfo.id ? { ...extension, ...modification } : extension;
    });

    localStorage.extensions.set(updatedConfig);
  }
}
