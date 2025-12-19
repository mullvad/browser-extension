import { SocksProxy } from '@/composables/useSocksProxies/socksProxies.types';
import {
  ProxyInfo,
  ProxyInfoMap,
  ProxyDetails,
  ProxyDetailsMap,
  ProxyInfoType,
} from '@/helpers/socksProxy.types';
import { baseConfig, socksIp } from '@/composables/useSocksProxy';

const domainProxyInfoMap: ProxyInfoMap = {};
const domainProxyDetailsMap: ProxyDetailsMap = {};

export const browserStorage = {
  getLocal: async (key: string) => {
    return await browser.storage.local.get(key);
  },
};

export async function getRandomSessionProxy(domain: string) {
  try {
    const { flatProxiesList } = await browserStorage.getLocal('flatProxiesList');
    const socksList: Array<SocksProxy> = JSON.parse(flatProxiesList);

    // Check if we've already assigned a proxy to this domain
    if (!domainProxyInfoMap[domain]) {
      // If not, pick one at random
      if (socksList.length === 0) {
        throw new Error('No proxies available');
      }

      const randomIndex = Math.floor(Math.random() * socksList.length);
      const randomProxy = socksList[randomIndex];

      // Set up the ProxyInfo object
      const proxyInfo: ProxyInfo = {
        host: randomProxy.ipv4_address || socksIp,
        port: randomProxy.port,
        proxyDNS: true,
        type: ProxyInfoType.socks,
      };
      domainProxyInfoMap[domain] = proxyInfo;

      // Optionally store user-facing details in ProxyDetailsMap
      const proxyDetails: ProxyDetails = {
        socksEnabled: true,
        server: randomProxy.hostname!.replace('socks5-', '')!.replace('.relays.mullvad.net', ''),
        country: randomProxy.location.country,
        countryCode: randomProxy.location.countryCode,
        city: randomProxy.location.city,
        proxyDNS: baseConfig.proxyDNS,
      };
      domainProxyDetailsMap[domain] = proxyDetails;
    }

    // Return the assigned ProxyInfo for the current host
    return domainProxyInfoMap[domain];
  } catch (e) {
    console.error(`Error determining proxy for ${domain}`, e);
    // Block all requests if something fails
    return { cancel: true };
  }
}
