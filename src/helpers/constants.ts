import { ProxyInfo } from '@/helpers/socksProxy.types';

export const baseConfig: Partial<ProxyInfo> = {
  port: 1080,
  proxyDNS: true,
};

export const socksIp = '10.64.0.1';
