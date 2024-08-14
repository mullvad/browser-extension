import { getActiveProxyDetails } from '@/helpers/socksProxy';
import { ProxyDetails } from '@/helpers/socksProxy.types';

export const updateCurrentTabProxyBadge = async () => {
  const activeTab = await browser.tabs.query({ active: true, currentWindow: true });

  if (activeTab[0]) {
    await updateTabProxyBadge(activeTab[0], await getActiveProxyDetails());
  }
};

export const updateTabProxyBadge = async (
  tab: browser.tabs.Tab,
  activeProxyDetails: ProxyDetails,
) => {
  const { id: tabId, url } = tab;
  const { excludedHosts } = await browser.storage.local.get('excludedHosts');
  const tabHost = new URL(url!).hostname;

  const isExcluded = tabHost.length !== 0 && excludedHosts?.includes(tabHost);

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

const setTabExtBadge = async (
  tab: browser.tabs.Tab,
  proxy = true,
  isExcluded = false,
  countryCode = 'P',
) => {
  const { id: tabId } = tab;

  if (isExcluded) {
    browser.browserAction.setBadgeText({ text: '🚫', tabId });
    // TODO Remove one of these lines based on design feedback
    browser.browserAction.setBadgeBackgroundColor({ color: [0, 0, 0, 0], tabId });
    browser.browserAction.setBadgeBackgroundColor({ color: '#ffd524', tabId });
    browser.browserAction.setBadgeTextColor({ color: 'black', tabId });
  } else if (proxy) {
    browser.browserAction.setBadgeText({ text: countryCode.toUpperCase(), tabId });
    browser.browserAction.setBadgeBackgroundColor({ color: '#ffd524', tabId });
    browser.browserAction.setBadgeTextColor({ color: 'black', tabId });
  } else {
    browser.browserAction.setBadgeText({ text: '', tabId });
  }
};
