import tlds from 'tlds';

const isValidDomain = (domain: string): boolean => {
  const parts = domain.split('.');
  if (parts.length < 2) return false;
  const tld = parts[parts.length - 1].toLowerCase();
  return tlds.includes(tld);
};

export default isValidDomain;
