export const reloadMatchingTabs = async (url: string) => {
  const urlPattern = `*://*.${url}/*`;

  const tabs = await browser.tabs.query({ url: urlPattern });
  tabs.forEach((tab) => {
    if (tab.id) {
      browser.tabs.reload(tab.id);
    }
  });
};
