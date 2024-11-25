import browser from 'webextension-polyfill';

export const clearStorageKey = async (key: string) => {
  await browser.storage.local.remove(key);
};

// Reset recommendations to update them
// We'll keep that for 0.9.4, then we'll remove it
export const resetRecommendations = async () => {
  const manifest = browser.runtime.getManifest();
  const currentVersion = manifest.version;

  if (currentVersion === '0.9.4') {
    await clearStorageKey('recommendations');
  }
};
