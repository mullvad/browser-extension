import { SocksEnabled, getsocksEnabled } from '@/helpers/socks';

// Initialize the page action: show/hide pageAction icon
export const updateTabIcon = async (tabId: number, socksEnabled: SocksEnabled) => {
  if (socksEnabled) {
    browser.pageAction.show(tabId);
  } else {
    browser.pageAction.hide(tabId);
  }
};

// When first loaded, initialize the page action for all tabs.
export const updateTabs = async () => {
  const tabs = browser.tabs.query({});
  const socksEnabled = await getsocksEnabled();

  tabs.then((tabs) => {
    for (const tab of tabs) {
      updateTabIcon(tab.id!, socksEnabled);
    }
  });
};

export const addTabsListener = () => {
  // Each time a tab is updated, reset the page action for that tab.
  browser.tabs.onUpdated.addListener(async (id) => {
    const socksEnabled = await getsocksEnabled();
    updateTabIcon(id, socksEnabled);
  });
};
