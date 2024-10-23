import tlds from 'tlds';

export const checkDomain = (host: string) => {
  // Check if the hostname contains a subdomain
  const parts = host.split('.');
  return {
    hasSubdomain: parts.length > 2,
    subdomain: parts.slice(0, -2).join('.'),
    domain: parts.slice(-2).join('.'),
  };
};

export const isValidDomain = (domain: string): boolean => {
  const parts = domain.split('.');
  if (parts.length < 2) return false;
  const tld = parts[parts.length - 1].toLowerCase();
  return tlds.includes(tld);
};

export default isValidDomain;
