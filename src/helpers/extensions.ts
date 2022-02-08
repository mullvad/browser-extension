import { management } from 'webextension-polyfill';

import { isRecommended } from '@/composables/useRecommendations/defaultRecommendations';
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
  if (isRecommended(extensionInfo.id)) {
    updateRecommendation(extensionInfo.id, {
      activated: true,
      ctaLabel: undefined,
      enabled: true,
      ignored: false,
      installed: true,
    });
  }
};

const onUninstall = (extensionInfo: ExtensionInfo) => {
  if (isRecommended(extensionInfo.id)) {
    updateRecommendation(extensionInfo.id, {
      activated: false,
      ctaLabel: 'install',
      enabled: false,
      installed: false,
    });
  }
};

const onEnable = (extensionInfo: ExtensionInfo) => {
  if (isRecommended(extensionInfo.id)) {
    updateRecommendation(extensionInfo.id, {
      activated: true,
      ctaLabel: undefined,
      enabled: true,
      ignored: false,
    });
  }
};

const onDisable = (extensionInfo: ExtensionInfo) => {
  if (isRecommended(extensionInfo.id)) {
    updateRecommendation(extensionInfo.id, {
      activated: false,
      ctaLabel: 'enable',
      enabled: false,
    });
  }
};
