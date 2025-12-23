import { parse } from 'tldts';

export const checkDomain = (host: string) => {
  const parsed = parse(host);
  return {
    hasSubdomain: Boolean(parsed.subdomain),
    subDomain: host,
    domain: parsed.domain || host,
  };
};

export const isValidDomain = (domain: string): boolean => {
  // Special use domains should be allowed according to the IETF RFC 6761
  const publicSuffixes = ['arpa', 'test', 'localhost', 'internal'];

  const parsed = parse(domain, {
    validHosts: publicSuffixes,
  });

  return Boolean(parsed.domain && (parsed.isIcann || publicSuffixes.includes(parsed.domain)));
};

export const normalizeToFQDN = (input: string): string | null => {
  const parsed = parse(input);
  return parsed.hostname || null;
};
