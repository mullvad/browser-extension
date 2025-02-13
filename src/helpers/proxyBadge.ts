import { ProxyDetails } from '@/helpers/socksProxy/socksProxy.types';
import { checkDomain } from '@/helpers/domain';
import { getActiveProxyDetails, getActiveTab } from '@/helpers/tabs';
import { isLocalOrReservedIP } from '@/helpers/socksProxy/socksProxy';

export const updateCurrentTabProxyBadge = async () => {
  const activeTab = await getActiveTab();

  if (activeTab) {
    await updateTabProxyBadge(activeTab, await getActiveProxyDetails());
  }
};

export const updateTabProxyBadge = async (
  tab: browser.tabs.Tab,
  activeProxyDetails: ProxyDetails,
) => {
  const { id: tabId, url } = tab;
  const { excludedHosts } = await browser.storage.local.get('excludedHosts');
  const { hostProxiesDetails } = await browser.storage.local.get('hostProxiesDetails');
  const { globalProxyDetails } = await browser.storage.local.get('globalProxyDetails');

  const hostProxiesDetailsParsed = JSON.parse(hostProxiesDetails);
  const excludedHostsParsed = JSON.parse(excludedHosts);
  const globalProxyDetailsParsed = JSON.parse(globalProxyDetails);

  const tabHost = new URL(url!).hostname;
  const { domain, subDomain, hasSubdomain } = checkDomain(tabHost);

  // Block for local/reserved IPs
  if (isLocalOrReservedIP(tabHost)) {
    browser.browserAction.setTitle({ tabId, title: 'Local/Reserved IP - No proxy needed' });
    await setTabExtBadge(tab, false, false);
    return;
  }

  // 1. Check subdomain level
  if (hasSubdomain) {
    if (excludedHostsParsed.includes(subDomain)) {
      browser.browserAction.setTitle({ tabId, title: `${subDomain} is set to never be proxied` });
      await setTabExtBadge(tab, false, true);
      return;
    }

    if (hostProxiesDetailsParsed[subDomain]?.socksEnabled) {
      const proxyDNSMessage = activeProxyDetails.proxyDNS ? 'DNS proxied' : 'DNS not proxied';
      const title = `${activeProxyDetails.city}, ${activeProxyDetails.country}\nServer: ${activeProxyDetails.server}\n${proxyDNSMessage}`;
      browser.browserAction.setTitle({ tabId, title });
      await setTabExtBadge(tab, true, false, activeProxyDetails.countryCode);
      return;
    }
  }

  // 2. Check domain level
  if (excludedHostsParsed.includes(domain)) {
    browser.browserAction.setTitle({ tabId, title: `${domain} is set to never be proxied` });
    await setTabExtBadge(tab, false, true);
    return;
  }

  if (hostProxiesDetailsParsed[domain]?.socksEnabled) {
    const proxyDNSMessage = activeProxyDetails.proxyDNS ? 'DNS proxied' : 'DNS not proxied';
    const title = `${activeProxyDetails.city}, ${activeProxyDetails.country}\nServer: ${activeProxyDetails.server}\n${proxyDNSMessage}`;
    browser.browserAction.setTitle({ tabId, title });
    await setTabExtBadge(tab, true, false, activeProxyDetails.countryCode);
    return;
  }

  // 3. Check global proxy
  if (globalProxyDetailsParsed.socksEnabled) {
    const proxyDNSMessage = activeProxyDetails.proxyDNS ? 'DNS proxied' : 'DNS not proxied';
    const title = `${activeProxyDetails.city}, ${activeProxyDetails.country}\nServer: ${activeProxyDetails.server}\n${proxyDNSMessage}`;
    browser.browserAction.setTitle({ tabId, title });
    await setTabExtBadge(tab, true, false, activeProxyDetails.countryCode);
    return;
  }

  // 4. Default: no proxy
  browser.browserAction.setTitle({ tabId, title: 'Proxy not in use' });
  await setTabExtBadge(tab, false, false);
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
