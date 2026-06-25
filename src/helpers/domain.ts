import { parse } from 'tldts';

export const checkDomain = (host: string) => {
  const parsed = parse(host, { detectSpecialUse: true });
  return {
    hasSubdomain: Boolean(parsed.subdomain),
    fullHost: host,
    domain: parsed.domain || host,
  };
};

export const isValidDomain = (domain: string): boolean => {
  // Handle special-use domains (localhost, test, invalid, example, local, onion, alt and home.arpa)
  const parsed = parse(domain, { detectSpecialUse: true });

  return Boolean(parsed.isSpecialUse || (parsed.domain && parsed.isIcann));
};

export const normalizeToFQDN = (input: string): string | null => {
  const parsed = parse(input);
  return parsed.hostname || null;
};

export const truncateHost = (host: string, maxLength = 21): string => {
  if (!host || host.length <= maxLength) {
    return host;
  }

  return host.slice(0, maxLength - 1) + '…';
};
