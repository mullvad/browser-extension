import { management } from 'webextension-polyfill';

import useExtensions from '@/composables/useExtensions/useExtensions';
import { ExtensionInfo } from '@/composables/useExtensions/Extension.types';

const { updateExtConfig, loadExtConfigs } = useExtensions();

const addExtListeners = () => {
  management.onInstalled.addListener(onInstall);
  management.onUninstalled.addListener(onUninstall);
  management.onEnabled.addListener(onEnable);
  management.onDisabled.addListener(onDisable);
};

// Listeners
const onInstall = async (extensionInfo: ExtensionInfo) => {
  await updateExtConfig(extensionInfo, { installed: true, enabled: true, ignored: false });
};

const onUninstall = async (extensionInfo: ExtensionInfo) => {
  await updateExtConfig(extensionInfo, { installed: false, enabled: false });
};

const onEnable = async (extensionInfo: ExtensionInfo) => {
  await updateExtConfig(extensionInfo, { enabled: true, ignored: false });
};

const onDisable = async (extensionInfo: ExtensionInfo) => {
  await updateExtConfig(extensionInfo, { enabled: false });
};

export const initExtensions = () => {
  // Add listener on extension action
  addExtListeners();

  // Load extensions settings
  loadExtConfigs();
};