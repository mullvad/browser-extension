import { checkDomain } from '@/helpers/domain';
import { ProxyDetails } from '@/helpers/socksProxy/socksProxy.types';

export const reloadMatchingTabs = async (url: string) => {
  const urlPattern = `*://*.${url}/*`;

  const tabs = await browser.tabs.query({ url: urlPattern });
  tabs.forEach((tab) => {
    if (tab.id) {
      browser.tabs.reload(tab.id);
    }
  });
};

export const reloadGlobalProxiedTabs = async (excludedURLs: string[]) => {
  const tabs = await browser.tabs.query({ url: '*://*/*' });

  const tabsToReload = tabs.filter((tab) => {
    if (!tab.url) {
      return false;
    }
    return !isExcludedURL(tab.url, excludedURLs);
  });

  tabsToReload.forEach((tab) => {
    if (tab.id) {
      browser.tabs.reload(tab.id);
    }
  });
};

const isExcludedURL = (url: string, excludedURLs: string[]): boolean => {
  const { hostname } = new URL(url);
  return excludedURLs.some((excludedUrl) => hostname === excludedUrl);
};

export const getActiveTabDetails = async () => {
  const activeTab = await getActiveTab();

  // activeTab will be null if tabs permission has not been granted
  if (!activeTab?.url) {
    return { host: '', protocol: '', isAboutPage: false, isExtensionPage: false };
  }

  const activeTabURL = new URL(activeTab.url);

  return {
    host: activeTabURL.hostname,
    protocol: activeTabURL.protocol,
    isAboutPage: activeTabURL.protocol === 'about:',
    isExtensionPage: activeTabURL.protocol === 'moz-extension:',
  };
};

export const getActiveProxyDetails = async () => {
  const globalProxyDetails = await getGlobalProxyDetails();
  const { hostProxiesDetails } = await browser.storage.local.get('hostProxiesDetails');

  if (hostProxiesDetails) {
    const hostProxiesDetailsParsed = JSON.parse(hostProxiesDetails);
    const activeTab = await getActiveTab();
    const tabHost = new URL(activeTab.url!).hostname;
    const { domain } = checkDomain(tabHost);

    // Check subdomain proxy first
    if (hostProxiesDetailsParsed[tabHost]?.socksEnabled) {
      return hostProxiesDetailsParsed[tabHost];
    }

    // Then check domain proxy
    if (hostProxiesDetailsParsed[domain]?.socksEnabled) {
      return hostProxiesDetailsParsed[domain];
    }
  }

  return globalProxyDetails;
};

const getGlobalProxyDetails = async (): Promise<ProxyDetails> => {
  const response = await browser.storage.local.get('globalProxyDetails');

  if ('globalProxyDetails' in response) {
    return JSON.parse(response.globalProxyDetails);
  }
  return { socksEnabled: false };
};

export const getActiveTab = async () => {
  const [activeTab] = await browser.tabs.query({ active: true, currentWindow: true });
  return activeTab;
};
