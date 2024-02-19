import { getActiveProxyDetails } from '@/helpers/socksProxy';
import { ProxyDetails } from './socksProxy.types';

export const initBrowserAction = () => {
  // Each time a tab is updated, reset the browserAction for that tab
  browser.tabs.onUpdated.addListener(updatedTabListener);

  updateTabsProxyBadges();
};

// Update a tab browserAction badge & title
const updateTabProxyBadge = async (tab: browser.tabs.Tab, activeProxyDetails: ProxyDetails) => {
  const { id: tabId, url } = tab;
  const { excludedHosts } = await browser.storage.local.get('excludedHosts');
  const tabHost = new URL(url!).host;

  const isExcluded = excludedHosts?.includes(tabHost);

  if (isExcluded) {
    browser.browserAction.setTitle({ tabId, title: `${tabHost} is set to never be proxied` });
    await setTabExtBadge(tab, false, isExcluded);
    return;
  } else if (activeProxyDetails.socksEnabled) {
    const proxyDNSMessage = activeProxyDetails.proxyDNS ? 'DNS proxied' : 'DNS not proxied';
    const title = `${activeProxyDetails.city}, ${activeProxyDetails.country}\nServer: ${activeProxyDetails.server}\n${proxyDNSMessage}`;

    browser.browserAction.setTitle({ tabId, title });
    await setTabExtBadge(tab, true, isExcluded, activeProxyDetails.countryCode);
  } else {
    browser.browserAction.setTitle({ tabId, title: 'Proxy not in use' });
    await setTabExtBadge(tab, false, isExcluded);
  }
};

// Update state of the proxy badge & title, for all tabs
const updateTabsProxyBadges = async () => {
  const tabs = await browser.tabs.query({});
  const activeProxyDetails = await getActiveProxyDetails();

  for (const tab of tabs) {
    if (tab.id !== undefined) {
      updateTabProxyBadge(tab, activeProxyDetails);
    }
  }
};

const updatedTabListener = async (
  _tabId: number,
  _changeInfo: browser.tabs._OnUpdatedChangeInfo,
  tab: browser.tabs.Tab,
) => {
  const activeProxyDetails = await getActiveProxyDetails();
  updateTabProxyBadge(tab, activeProxyDetails);
};

const setTabExtBadge = async (
  tab: browser.tabs.Tab,
  proxy = true,
  isExcluded = false,
  countryCode = 'P',
) => {
  const { id: tabId } = tab;

  if (proxy && !isExcluded) {
    browser.browserAction.setBadgeText({ text: countryCode.toUpperCase(), tabId });
    browser.browserAction.setBadgeBackgroundColor({ color: '#ffd524', tabId });
    browser.browserAction.setBadgeTextColor({ color: 'black', tabId });
  } else {
    browser.browserAction.setBadgeText({ text: '', tabId });
  }
};
