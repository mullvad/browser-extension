import { SocksDetails, getSocksDetails } from '@/helpers/socksProxy';
import { getHostname, isValidURL } from './url';
import { getProxySettings } from './socksProxy';

export const initPageAction = () => {
  // Open main popup when clicking on proxy icon in the URL bar
  browser.pageAction.onClicked.addListener(() => {
    browser.browserAction.openPopup();
  });

  // Each time a tab is updated, reset the page action for that tab.
  browser.tabs.onUpdated.addListener(updatedTabListener);

  updateTabsProxyIcons();
};

// Update state of the proxy icon for all tabs
export const updateTabsProxyIcons = async () => {
  const tabs = browser.tabs.query({});
  const socksDetails = await getSocksDetails();
  const { passthrough } = await getProxySettings();

  tabs.then((tabs) => {
    for (const tab of tabs) {
      if (tab.id && tab.url && isValidURL(tab.url)) {
        const hostname = getHostname(tab.url);
        let showPageAction = true;

        if (passthrough.includes(hostname)) {
          showPageAction = false;
        }

        updateTabProxyIcon(tab.id, socksDetails, showPageAction);
      }
    }
  });
};

const updatedTabListener = async (
  tabId: number,
  changeInfo: browser.tabs._OnUpdatedChangeInfo,
  tab: browser.tabs.Tab,
) => {
  const socksDetails = await getSocksDetails();
  const { passthrough } = await getProxySettings();

  let showPageAction = true;

  if (tab.url && isValidURL(tab.url)) {
    const hostname = getHostname(tab.url);

    if (passthrough.includes(hostname)) {
      showPageAction = false;
    }

    updateTabProxyIcon(tabId, socksDetails, showPageAction);
  }
};

// Update a tab page action icon & title
const updateTabProxyIcon = async (
  tabId: number,
  socksDetails: SocksDetails,
  showPageAction: boolean,
) => {
  const tooltip = `Server: ${socksDetails.server}\nProtocol: ${socksDetails.protocol}\nProxy DNS: ${socksDetails.proxyDNS}`;

  if (showPageAction) {
    browser.pageAction.show(tabId);
    browser.pageAction.setTitle({ tabId, title: tooltip });
  } else {
    browser.pageAction.hide(tabId);
  }
};
