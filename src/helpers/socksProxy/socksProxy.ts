import ipaddr from 'ipaddr.js';

import { RequestDetails, ProxyDetails, ProxyInfoMap } from '@/helpers/socksProxy/socksProxy.types';
import { checkDomain } from '@/helpers/domain';
import { getRandomSessionProxy } from '@/helpers/socksProxy/getRandomSessionProxy';

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

    const globalConfigParsed = JSON.parse(globalProxy);
    const randomProxyModeParsed = JSON.parse(randomProxyMode);
    const globalProxyDetailsParsed: ProxyDetails = JSON.parse(globalProxyDetails);
    const excludedHostsParsed: string[] = JSON.parse(excludedHosts);
    const hostProxiesParsed: ProxyInfoMap = JSON.parse(hostProxies);
    const hostProxiesDetailsParsed: Record<string, ProxyDetails> = JSON.parse(hostProxiesDetails);

    const currentHost = getCurrentHost(details);
    const { hasSubdomain, domain, subDomain } = checkDomain(currentHost);

    // Block speculative requests, since we can't identify their origins
    if (details.type === 'speculative') {
      return { cancel: true };
    }

    // Skip proxy for local/reserved IPs
    if (isLocalOrReservedIP(currentHost)) {
      return { type: 'direct' };
    }

    // 0. If random proxy is enabled, get a random proxy per domain
    if (randomProxyModeParsed) {
      const randomProxy = await getRandomSessionProxy(domain);
      return randomProxy;
    }

    // 1. Check subdomain level
    if (hasSubdomain) {
      if (excludedHostsParsed.includes(subDomain)) {
        return { type: 'direct' };
      }

      if (
        Object.hasOwn(hostProxiesParsed, subDomain) &&
        hostProxiesDetailsParsed[currentHost].socksEnabled
      ) {
        return hostProxiesParsed[subDomain];
      }
    }

    // 2. Check domain level
    if (excludedHostsParsed.includes(domain)) {
      return { type: 'direct' };
    }
    if (Object.hasOwn(hostProxiesParsed, domain) && hostProxiesDetailsParsed[domain].socksEnabled) {
      return hostProxiesParsed[domain];
    }

    // 3. Check global proxy
    if (globalProxyDetailsParsed.socksEnabled) {
      return globalConfigParsed;
    }

    // 4. Default: no proxy
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
