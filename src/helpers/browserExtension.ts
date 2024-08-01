export enum Tab {
  SETTINGS = 'settings',
  PROXY = 'proxy',
  ABOUT = 'about',
}
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

export const { version } = browser.runtime.getManifest();
