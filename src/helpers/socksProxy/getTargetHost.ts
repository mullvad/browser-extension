import { checkDomain } from '@/helpers/domain';
import { ProxyDetails } from '@/helpers/socksProxy/socksProxy.types';

export const getTargetHost = (host: string, proxyDetails: Record<string, ProxyDetails>) => {
  if (proxyDetails[host]) {
    return host;
  }

  const { hasSubdomain, domain } = checkDomain(host);
  return hasSubdomain && domain && proxyDetails[domain] ? domain : host;
};
