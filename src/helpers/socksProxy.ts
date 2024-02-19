import { RequestDetails, ProxyDetails } from './socksProxy.types';

const getGlobalProxyDetails = async (): Promise<ProxyDetails> => {
  const response = await browser.storage.local.get('globalProxyDetails');

  if ('globalProxyDetails' in response) {
    return JSON.parse(response.globalProxyDetails);
  }
  return { socksEnabled: false };
};

const getHostProxyDetails = async (): Promise<ProxyDetails> => {
  const { hostProxiesDetails } = await browser.storage.local.get('hostProxiesDetails');

  if (hostProxiesDetails) {
    const hostProxiesDetailsParsed = JSON.parse(hostProxiesDetails);
    const proxiedHosts = Object.keys(hostProxiesDetailsParsed);

    const activeTab = await browser.tabs.query({ active: true });
    const activeTabHost = new URL(activeTab[0].url!).host;
    if (
      proxiedHosts.includes(activeTabHost) &&
      hostProxiesDetailsParsed[activeTabHost].socksEnabled
    ) {
      return hostProxiesDetailsParsed[activeTabHost];
    }
  }
  return { socksEnabled: false };
};

export const getActiveProxyDetails = async () => {
  const globalProxyDetails = await getGlobalProxyDetails();
  const hostProxyDetails = await getHostProxyDetails();
  return hostProxyDetails.socksEnabled ? hostProxyDetails : globalProxyDetails;
};

export const initProxyRequests = () => {
  browser.proxy.onRequest.addListener(handleProxyRequest, { urls: ['<all_urls>'] });
};

// TODO decide what how to handle fallback proxy (if proxy is invalid, it will fallback to Firefox proxy if configured)
// https://bugzilla.mozilla.org/show_bug.cgi?id=1750561

const handleProxyRequest = async (details: browser.proxy._OnRequestDetails) => {
  const { globalProxy } = await browser.storage.local.get('globalProxy');
  const { globalProxyDetails } = await browser.storage.local.get('globalProxyDetails');
  const { excludedHosts } = await browser.storage.local.get('excludedHosts');
  const { hostProxies } = await browser.storage.local.get('hostProxies');
  const { hostProxiesDetails } = await browser.storage.local.get('hostProxiesDetails');
  const { randomProxyActive } = await browser.storage.local.get('randomProxyActive');

  const globalConfigParsed = JSON.parse(globalProxy);
  const globalProxyDetailsParsed: ProxyDetails = JSON.parse(globalProxyDetails);
  const excludedHostsParsed: string[] = JSON.parse(excludedHosts);
  const hostProxiesParsed = JSON.parse(hostProxies);
  const hostProxiesDetailsParsed = JSON.parse(hostProxiesDetails);
  const randomProxyActiveParsed = JSON.parse(randomProxyActive);

  const proxiedHosts = Object.keys(hostProxiesParsed);
  const currentHost = getCurrentHost(details);

  if (excludedHostsParsed.includes(currentHost) || currentHost.includes('localhost')) {
    // Disable logging for localhost
    if (!currentHost.includes('localhost')) {
      console.log('excluded: ', details.url);
      console.log('proxy used: direct');
      console.log('_____________________________');
    }
    return { type: 'direct' };
  } else if (
    proxiedHosts.includes(currentHost) &&
    hostProxiesDetailsParsed[currentHost].socksEnabled
  ) {
    return hostProxiesParsed[currentHost];
  } else if (randomProxyActiveParsed) {
    // TODO implement random proxy
    return { type: 'direct' };
  } else if (globalProxyDetailsParsed.socksEnabled) {
    return globalConfigParsed;
  }
  return { type: 'direct' };
};

const getCurrentHost = (details: RequestDetails) => {
  if (details.frameAncestors && details.frameAncestors.length > 0) {
    // when the request initiate from an iframe, it has a parent frame
    // the host is determined from its top parent frame (frameID === 0)
    const frame = details.frameAncestors.find((frame) => frame.frameId === 0);
    if (frame) {
      return new URL(frame.url).host;
    }
  } else if (
    new URL(details.url).host.includes('localhost') ||
    new URL(details.url).host.includes('::1') ||
    new URL(details.url).host.includes('127.0.0.1')
  ) {
    // This is to make sure localhost traffic is not proxied
    return new URL(details.url).host;
  } else if (details.documentUrl) {
    // when the request comes froms a a page(top level frame),
    // then the host is determined from the document URL
    return new URL(details.documentUrl).host;
  }
  // When a request is initiated in the browser background,
  // the host is derived from the request URL itself
  return new URL(details.url).host;
};
