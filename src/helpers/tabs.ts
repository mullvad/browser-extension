export const reloadMatchingTabs = async (url: string) => {
  const urlPattern = `*://*.${url}/*`;

  const tabs = await browser.tabs.query({ url: urlPattern });
  tabs.forEach((tab) => {
    if (tab.id) {
      browser.tabs.reload(tab.id);
    }
  });
};

export const reloadGlobalProxiedTabs = async (excludedURLs: string[]) => {
  const tabs = await browser.tabs.query({ url: '*://*/*' });

  const tabsToReload = tabs.filter((tab) => {
    if (!tab.url) {
      return false;
    }
    return !isExcludedURL(tab.url, excludedURLs);
  });

  tabsToReload.forEach((tab) => {
    if (tab.id) {
      browser.tabs.reload(tab.id);
    }
  });
};

const isExcludedURL = (url: string, excludedURLs: string[]): boolean => {
  const { hostname } = new URL(url);
  return excludedURLs.some((excludedUrl) => hostname === excludedUrl);
};
