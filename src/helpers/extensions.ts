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
const onInstall = (extensionInfo: ExtensionInfo) => {
  updateRecConfig(extensionInfo.id, {
    activated: true,
    ctaLabel: undefined,
    enabled: true,
    ignored: false,
    installed: true,
  });
};

const onUninstall = (extensionInfo: ExtensionInfo) => {
  updateRecConfig(extensionInfo.id, {
    activated: false,
    ctaLabel: 'install',
    enabled: false,
    installed: false,
  });
};

const onEnable = (extensionInfo: ExtensionInfo) => {
  updateRecConfig(extensionInfo.id, {
    activated: true,
    ctaLabel: undefined,
    enabled: true,
    ignored: false,
  });
};

const onDisable = (extensionInfo: ExtensionInfo) => {
  updateRecConfig(extensionInfo.id, {
    activated: false,
    ctaLabel: 'enable',
    enabled: false,
  });
};
