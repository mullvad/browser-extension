import { SocksEnabled, getsocksEnabled } from '@/helpers/socks';

// TODO Remove this example and add data from the socks set
const exDetails = {
  server: 'wg-socks-04',
  protocol: 'WireGuard',
};

const details = `Server: ${exDetails.server}\nProtocol: ${exDetails.protocol}`;

// Update the page action icon
export const updateTabIcon = async (tabId: number, socksEnabled: SocksEnabled) => {
  if (socksEnabled) {
    browser.pageAction.show(tabId);
    updatePATitle(tabId, details);
  } else {
    browser.pageAction.hide(tabId);
  }
};

// Update the page action for all tabs
export const updateTabsIcons = async () => {
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
  browser.tabs.onUpdated.addListener(async (tabId) => {
    const socksEnabled = await getsocksEnabled();

    updateTabIcon(tabId, socksEnabled);
    updatePATitle(tabId, details);
  });
};

const updatePATitle = (tabId: number, details: string) => {
  browser.pageAction.setTitle({ tabId, title: details });
};
