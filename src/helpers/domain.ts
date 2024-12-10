import tlds from 'tlds';
import { ProxyDetails } from './socksProxy.types';

export const checkDomain = (host: string) => {
  // Check if the hostname contains a subdomain
  const parts = host.split('.');
  return {
    hasSubdomain: parts.length > 2,
    subDomain: host,
    domain: parts.slice(-2).join('.'),
  };
};

export const isValidDomain = (domain: string): boolean => {
  const parts = domain.split('.');
  if (parts.length < 2) return false;
  const tld = parts[parts.length - 1].toLowerCase();
  return tlds.includes(tld);
};

export const getTargetHost = (host: string, proxyDetails: Record<string, ProxyDetails>) => {
  // If there's already a proxy for this exact host, use it
  if (proxyDetails[host]) {
    return host;
  }

  // Otherwise check for parent domain
  const { hasSubdomain, domain } = checkDomain(host);
  return hasSubdomain && proxyDetails[domain] ? domain : host;
};

export default isValidDomain;
