export enum Tab {
  SETTINGS = 'settings',
  PROXY = 'proxy',
  ABOUT = 'about',
}

export const { version } = browser.runtime.getManifest();

export const openPopup = () => {
  browser.browserAction.openPopup();
};
export const closePopup = () => {
  // The delay is added to stop a new empty browser window from opening
  // when installing the extension from the popup
  setTimeout(() => {
    window.close();
  }, 100);
};

export const openOptions = async (tab?: Tab) => {
  if (tab) {
    await browser.storage.local.set({ optionsActiveTab: tab });
  }
  closePopup();
  browser.runtime.openOptionsPage();
};

export const isPopupContext = () => {
  const views = browser.extension.getViews({ type: 'popup' });
  return views.includes(window);
};

const findTabIdByUrl = async (url: string): Promise<number | undefined> => {
  const tabs = await browser.tabs.query({ url });
  if (tabs.length > 0 && tabs[0].id !== undefined) {
    return tabs[0].id;
  }
  return undefined;
};

export const reloadOptions = async () => {
  // Reload the options page if we're in the popup context
  if (isPopupContext()) {
    const optionsUrl = browser.runtime.getURL('dist/options/index.html');
    const optionsTabID = await findTabIdByUrl(optionsUrl);

    if (optionsTabID !== undefined) {
      browser.tabs.reload(optionsTabID);
    }
  }
};
