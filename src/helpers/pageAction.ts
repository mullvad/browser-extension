import { SocksDetails, getSocksDetails } from '@/helpers/socks';

// Update a tab page action icon & title
export const updateTabPA = async (tabId: number, socksDetails: SocksDetails) => {
  const tooltip = `Server: ${socksDetails.server}\nProtocol: ${socksDetails.protocol}\nProxy DNS: ${socksDetails.proxyDNS}`;

  if (socksDetails.socksEnabled) {
    browser.pageAction.show(tabId);
    updateTitle(tabId, tooltip);
  } else {
    browser.pageAction.hide(tabId);
  }
};

// Update the page action for all tabs
export const updateTabs = async () => {
  const tabs = browser.tabs.query({});
  const socksDetails = await getSocksDetails();

  tabs.then((tabs) => {
    for (const tab of tabs) {
      updateTabPA(tab.id!, socksDetails);
    }
  });
};

export const addTabsListener = () => {
  // Each time a tab is updated, reset the page action for that tab.
  browser.tabs.onUpdated.addListener(async (tabId) => {
    const socksDetails = await getSocksDetails();

    updateTabPA(tabId, socksDetails);
  });
};

export const initPageAction = () => {
  addTabsListener();
  browser.pageAction.onClicked.addListener(() => {
    browser.browserAction.openPopup();
  });

  updateTabs();
};

const updateTitle = (tabId: number, tooltip: string) => {
  browser.pageAction.setTitle({ tabId, title: tooltip });
};
