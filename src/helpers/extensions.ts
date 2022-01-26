import { management } from 'webextension-polyfill';

import useRecommendations from '@/composables/useRecommendations/useRecommendations';

const { updateRecConfig } = useRecommendations();

type ExtensionInfo = browser.management.ExtensionInfo;

export const addExtListeners = () => {
  management.onInstalled.addListener(onInstall);
  management.onUninstalled.addListener(onUninstall);
  management.onEnabled.addListener(onEnable);
  management.onDisabled.addListener(onDisable);
};

// Listeners
const onInstall = async (extensionInfo: ExtensionInfo) => {
  await updateRecConfig(extensionInfo.id, {
    activated: true,
    ctaLabel: undefined,
    enabled: true,
    ignored: false,
    installed: true,
    instructions: undefined,
  });
};

const onUninstall = async (extensionInfo: ExtensionInfo) => {
  await updateRecConfig(extensionInfo.id, {
    activated: false,
    ctaLabel: 'install',
    enabled: false,
    installed: false,
    instructions: undefined,
  });
};

const onEnable = async (extensionInfo: ExtensionInfo) => {
  await updateRecConfig(extensionInfo.id, {
    activated: true,
    ctaLabel: undefined,
    enabled: true,
    ignored: false,
    instructions: undefined,
  });
};

const onDisable = async (extensionInfo: ExtensionInfo) => {
  const instructions = 'To Enable an extension, do this and that';

  await updateRecConfig(extensionInfo.id, {
    activated: false,
    ctaLabel: 'enable',
    enabled: false,
    instructions,
  });
};
