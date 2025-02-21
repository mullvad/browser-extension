import { parse } from 'tldts';
import { ProxyDetails } from '@/helpers/socksProxy/socksProxy.types';

export const checkDomain = (host: string) => {
  const parsed = parse(host);
  return {
    hasSubdomain: Boolean(parsed.subdomain),
    subDomain: host,
    domain: parsed.domain || host,
  };
};

export const isValidDomain = (domain: string): boolean => {
  const parsed = parse(domain);
  return Boolean(parsed.domain && parsed.publicSuffix);
};

export const getTargetHost = (host: string, proxyDetails: Record<string, ProxyDetails>) => {
  if (proxyDetails[host]) {
    return host;
  }

  const { hasSubdomain, domain } = checkDomain(host);
  return hasSubdomain && domain && proxyDetails[domain] ? domain : host;
};

export const normalizeToFQDN = (input: string): string | null => {
  const parsed = parse(input);
  return parsed.hostname || null;
};
