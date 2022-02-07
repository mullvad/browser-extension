import { management } from 'webextension-polyfill';

import useRecommendations from '@/composables/useRecommendations/useRecommendations';

const { updateRecommendation } = useRecommendations();

type ExtensionInfo = browser.management.ExtensionInfo;

export const addExtListeners = () => {
  management.onInstalled.addListener(onInstall);
  management.onUninstalled.addListener(onUninstall);
  management.onEnabled.addListener(onEnable);
  management.onDisabled.addListener(onDisable);
};

// Listeners
const onInstall = (extensionInfo: ExtensionInfo) => {
  updateRecommendation(extensionInfo.id, {
    activated: true,
    ctaLabel: undefined,
    enabled: true,
    ignored: false,
    installed: true,
  });
};

const onUninstall = (extensionInfo: ExtensionInfo) => {
  updateRecommendation(extensionInfo.id, {
    activated: false,
    ctaLabel: 'install',
    enabled: false,
    installed: false,
  });
};

const onEnable = (extensionInfo: ExtensionInfo) => {
  updateRecommendation(extensionInfo.id, {
    activated: true,
    ctaLabel: undefined,
    enabled: true,
    ignored: false,
  });
};

const onDisable = (extensionInfo: ExtensionInfo) => {
  updateRecommendation(extensionInfo.id, {
    activated: false,
    ctaLabel: 'enable',
    enabled: false,
  });
};
