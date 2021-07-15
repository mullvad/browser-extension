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

export const defaultExtsConfig = [
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

export async function getInstalledAddons(): Promise<browser.management.ExtensionInfo[]> {
  const installedAddons = await browser.management.getAll();
  return installedAddons;
}

export async function getRecommended(): Promise<Extension[]> {
  // Get extensions config from storage
  const extensionsConfig = await localStorage.extensions.get();

  // Get installed addons & ID lists
  const installedAddons = await getInstalledAddons();
  const installedIDs = installedAddons.map((addon) => addon.id);

  // Filter ignored extensions ID
  const toRecommend = extensionsConfig!.filter(
    (ext: { ignored: boolean }) => ext.ignored === false,
  );

  // Create a disabled extensions ID list
  const disabledIDs = installedAddons
    .filter((addon) => addon.enabled === false)
    .map((addons) => addons.id);

  // Create a list of extensions to install
  const toInstall = toRecommend.filter((ext: { id: string }) => !installedIDs.includes(ext.id));
  // Create a list of extensions to enable
  const toEnable = toRecommend.filter((ext: { id: string }) => disabledIDs.includes(ext.id));

  return [...toInstall, ...toEnable];
}

export async function onInstall(info: browser.management.ExtensionInfo) {
  const extensionsConfig = await localStorage.extensions.get();

  // If it's a recommended extensions, update its config
  if (defaultExtsConfigID.includes(info.id)) {
    const currentExt = extensionsConfig!.filter((ext) => ext.id === info.id);
    const otherExts = extensionsConfig!.filter((ext) => ext.id !== info.id);

    const updatedConfig = [...otherExts, { ...currentExt[0], installed: true, enabled: true }];

    localStorage.extensions.set(updatedConfig);
  }
}

export async function onUninstall(info: browser.management.ExtensionInfo) {
  const extensionsConfig = await localStorage.extensions.get();

  // If it's a recommended extensions, update its config
  if (defaultExtsConfigID.includes(info.id)) {
    const currentExt = extensionsConfig!.filter((ext) => ext.id === info.id);
    const otherExts = extensionsConfig!.filter((ext) => ext.id !== info.id);

    const updatedConfig = [...otherExts, { ...currentExt[0], installed: false, enabled: false }];

    localStorage.extensions.set(updatedConfig);
  }
}

export async function onEnable(info: browser.management.ExtensionInfo) {
  const extensionsConfig = await localStorage.extensions.get();

  // If it's a recommended extensions, update its config
  if (defaultExtsConfigID.includes(info.id)) {
    const currentExt = extensionsConfig!.filter((ext) => ext.id === info.id);
    const otherExts = extensionsConfig!.filter((ext) => ext.id !== info.id);

    const updatedConfig = [...otherExts, { ...currentExt[0], enabled: true }];

    localStorage.extensions.set(updatedConfig);
  }
}

export async function onDisable(info: browser.management.ExtensionInfo) {
  const extensionsConfig = await localStorage.extensions.get();

  // If it's a recommended extensions, update its config
  if (defaultExtsConfigID.includes(info.id)) {
    const currentExt = extensionsConfig!.filter((ext) => ext.id === info.id);
    const otherExts = extensionsConfig!.filter((ext) => ext.id !== info.id);

    const updatedConfig = [...otherExts, { ...currentExt[0], enabled: false }];

    localStorage.extensions.set(updatedConfig);
  }
}
