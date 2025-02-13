import { addCountryCodeToProxy } from '@/helpers/socksProxy/addCountryCode';
import { baseConfig, socksIp } from '@/helpers/socksProxy/constants';
import { SocksProxy } from '@/helpers/socksProxy/socksProxies.types';
import {
  ProxyInfo,
  ProxyInfoMap,
  ProxyDetails,
  ProxyDetailsMap,
  ProxyInfoType,
} from '@/helpers/socksProxy/socksProxy.types';

const domainProxyInfoMap: ProxyInfoMap = {};
export const domainProxyDetailsMap: ProxyDetailsMap = {};

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
    // Otherwise assign a random one
    if (!domainProxyInfoMap[domain]) {
      const randomIndex = Math.floor(Math.random() * socksList.length);
      const randomProxy = socksList[randomIndex];

      const proxyInfo: ProxyInfo = {
        host: randomProxy.ipv4_address || socksIp,
        port: randomProxy.port,
        proxyDNS: true,
        type: ProxyInfoType.socks,
      };
      domainProxyInfoMap[domain] = proxyInfo;

      const proxyDetails: ProxyDetails = {
        socksEnabled: true,
        server: randomProxy.hostname!.replace('socks5-', '')!.replace('.relays.mullvad.net', ''),
        country: randomProxy.location.country,
        countryCode: addCountryCodeToProxy(randomProxy).location.countryCode,
        city: randomProxy.location.city,
        proxyDNS: baseConfig.proxyDNS,
      };
      domainProxyDetailsMap[domain] = proxyDetails;
    }

    return domainProxyInfoMap[domain];
  } catch (e) {
    console.error(`Error determining proxy for ${domain}`, e);
    // Block all requests if something fails
    return { cancel: true };
  }
}
