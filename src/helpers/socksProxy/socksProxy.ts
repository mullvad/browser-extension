import ipaddr from 'ipaddr.js';

import {
  RequestDetails,
  ProxyDetails,
  ProxyInfoMap,
  ProxyInfo,
} from '@/helpers/socksProxy/socksProxy.types';
import { checkDomain } from '@/helpers/domain';
import { getRandomSessionProxy } from '@/helpers/socksProxy/getRandomSessionProxy';
import { getActiveTabDetails } from '@/helpers/tabs';

// TODO decide what how to handle fallback proxy (if proxy is invalid, it will fallback to Firefox proxy if configured)
// https://bugzilla.mozilla.org/show_bug.cgi?id=1750561

export const handleProxyRequest = async (details: browser.proxy._OnRequestDetails) => {
  try {
    const { globalProxy } = await browser.storage.local.get('globalProxy');
    const { randomProxyMode } = await browser.storage.local.get('randomProxyMode');
    const { globalProxyDetails } = await browser.storage.local.get('globalProxyDetails');
    const { excludedHosts } = await browser.storage.local.get('excludedHosts');
    const { hostProxies } = await browser.storage.local.get('hostProxies');
    const { hostProxiesDetails } = await browser.storage.local.get('hostProxiesDetails');

    const globalConfigParsed: ProxyInfo = JSON.parse(globalProxy);
    const randomProxyModeParsed: boolean = JSON.parse(randomProxyMode);
    const globalProxyDetailsParsed: ProxyDetails = JSON.parse(globalProxyDetails);
    const excludedHostsParsed: string[] = JSON.parse(excludedHosts);
    const hostProxiesParsed: ProxyInfoMap = JSON.parse(hostProxies);
    const hostProxiesDetailsParsed: Record<string, ProxyDetails> = JSON.parse(hostProxiesDetails);

    const currentHost = getCurrentHost(details);
    const { hasSubdomain, domain, subDomain } = checkDomain(currentHost);
    const currentDomain = hasSubdomain ? subDomain : domain;

    const isDomainExcluded = excludedHostsParsed.includes(currentDomain);
    const isDomainProxied = Object.hasOwn(hostProxiesParsed, currentDomain);
    const isDomainProxydEnabled = !!hostProxiesDetailsParsed[currentDomain]?.socksEnabled;
    const isGlobalProxyEnabled = globalProxyDetailsParsed.socksEnabled;

    // 1. Block speculative requests, since we can't identify their origins
    if (details.type === 'speculative') {
      return { cancel: true };
    }

    // 2. Skip proxy for local/reserved IPs
    if (isLocalOrReservedIP(currentHost)) {
      return { type: 'direct' };
    }

    // 3. When the request if a conncheck/DNS check originating from the extension,
    // we want to use the same proxy as the active tab, to get a consistent conncheck result
    const isExtensionRequest = details.documentUrl?.startsWith('moz-extension://');
    const isConnCheck = details.url?.endsWith('am.i.mullvad.net/json');
    const isDNSCheck = details.url?.endsWith('dnsleak.am.i.mullvad.net/');

    const isExtConnCheck = isExtensionRequest && (isConnCheck || isDNSCheck);

    if (isExtConnCheck) {
      return getProxyForExtensionConnectionCheck(
        isGlobalProxyEnabled,
        globalConfigParsed,
        randomProxyModeParsed,
        excludedHostsParsed,
        hostProxiesParsed,
        hostProxiesDetailsParsed,
      );
    }

    // 4. Check for random proxy mode
    // For now, overrides all other proxy settings
    if (randomProxyModeParsed) {
      return getRandomSessionProxy(domain);
    }

    // 5. Check domain/subdomain level
    if (isDomainExcluded) {
      return { type: 'direct' };
    }

    if (isDomainProxied && isDomainProxydEnabled) {
      return hostProxiesParsed[currentDomain];
    }

    // 6. Check global proxy
    if (isGlobalProxyEnabled) {
      return globalConfigParsed;
    }

    // 7. Default: no proxy
    return { type: 'direct' };
  } catch (error) {
    console.log(error);
  }
};

const getCurrentHost = (details: RequestDetails) => {
  if (details.frameAncestors && details.frameAncestors.length > 0) {
    // when the request initiate from an iframe, it has a parent frame
    // the host is determined from its top parent frame (frameID === 0)
    const frame = details.frameAncestors.find((frame) => frame.frameId === 0);
    if (frame) {
      return new URL(frame.url).hostname;
    }
  } else if (isLocalOrReservedIP(new URL(details.url).hostname)) {
    // This is to handle localhost/reserved IP ranges
    return new URL(details.url).hostname;
  } else if (details.documentUrl) {
    // when the request comes froms a a page(top level frame),
    // then the host is determined from the document URL
    return new URL(details.documentUrl).hostname;
  }
  // When a request is initiated in the browser background,
  // the host is derived from the request URL itself
  return new URL(details.url).hostname;
};

export const isLocalOrReservedIP = (hostname: string) => {
  if (hostname.includes('localhost')) return true;
  if (!ipaddr.isValid(hostname)) return false;

  try {
    const addr = ipaddr.parse(hostname);
    const range = addr.range();

    return (
      range === 'private' ||
      range === 'multicast' ||
      range === 'linkLocal' ||
      range === 'loopback' ||
      range === 'uniqueLocal'
    );
  } catch (e: unknown) {
    console.error('Invalid IP address:', e);
    return false;
  }
};

const getProxyForExtensionConnectionCheck = async (
  isGlobalProxyEnabled: boolean,
  globalConfigParsed: ProxyInfo,
  randomProxyModeParsed: boolean,
  excludedHostsParsed: string[],
  hostProxiesParsed: ProxyInfoMap,
  hostProxiesDetailsParsed: Record<string, ProxyDetails>,
) => {
  const { isAboutPage, host } = await getActiveTabDetails();
  const { domain, hasSubdomain, subDomain } = checkDomain(host);
  const tabDomain = hasSubdomain ? subDomain : domain;

  const isTabDomainExcluded = excludedHostsParsed.includes(tabDomain);
  const isTabDomainProxied = Object.hasOwn(hostProxiesParsed, tabDomain);
  const isTabProxyEnabled = !!hostProxiesDetailsParsed[tabDomain]?.socksEnabled;

  // a) If the current tab is an about page, we only need to check for a global proxy
  if (isAboutPage) {
    return isGlobalProxyEnabled ? globalConfigParsed : { type: 'direct' };
  }

  // b) If random proxy mode is enabled, we need to check for the current tab's proxy
  if (randomProxyModeParsed) {
    return getRandomSessionProxy(tabDomain);
  }

  // c) If current tab domain is excluded, connection is direct
  if (isTabDomainExcluded) {
    return { type: 'direct' };
  }

  // d) If current tab is proxied, we need to check for the current tab's proxy
  if (isTabDomainProxied && isTabProxyEnabled) {
    return hostProxiesParsed[tabDomain];
  }

  // e) If global proxy is enabled
  if (isGlobalProxyEnabled) {
    return globalConfigParsed;
  }

  return { type: 'direct' };
};
