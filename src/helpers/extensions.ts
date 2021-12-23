import useExtensions from '@/composables/useExtensions/useExtensions';
import { ExtensionInfo } from '@/composables/useExtensions/Extension.types';

const { updateExtConfig, loadExtConfigs } = useExtensions();

const addExtListeners = () => {
  browser.management.onInstalled.addListener(onInstall);
  browser.management.onUninstalled.addListener(onUninstall);
  browser.management.onEnabled.addListener(onEnable);
  browser.management.onDisabled.addListener(onDisable);
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

export const onIgnore = async (extensionInfo: ExtensionInfo, status: boolean) => {
  await updateExtConfig(extensionInfo, { ignored: status });
};

export const initExtensions = () => {
  // Add listener on extension action
  addExtListeners();

  // Load extensions settings
  loadExtConfigs();
};