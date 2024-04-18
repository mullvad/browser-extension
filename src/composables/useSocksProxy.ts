import { computed } from 'vue';

import {
  ProxyDetails,
  ProxyInfo,
  ProxyInfoType,
  ProxyOperationArgs,
} from '@/helpers/socksProxy.types';
import { updateTabsProxyBadges } from '@/helpers/browserAction';

import useActiveTab from '@/composables/useActiveTab';
import useConnection from '@/composables/useConnection';
import useStore from '@/composables/useStore';

const baseConfig: Partial<ProxyInfo> = {
  port: 1080,
  proxyDNS: true,
};

const socksIp = '10.64.0.1';

const { activeTabHost } = useActiveTab();
const { updateConnection } = useConnection();
const { globalProxy, globalProxyDetails, hostProxies, hostProxiesDetails } = useStore();

const currentHostProxyDetails = computed(
  () => hostProxiesDetails.value[activeTabHost.value] || null,
);

const globalProxyEnabled = computed(() => globalProxyDetails.value.socksEnabled);
const currentHostProxyEnabled = computed(
  () => currentHostProxyDetails.value?.socksEnabled ?? false,
);

const globalProxyDNSEnabled = computed(() => globalProxy.value?.proxyDNS ?? false);
const currentHostProxyDNSEnabled = computed(() => currentHostProxyDetails.value?.proxyDNS ?? false);

const toggleGlobalProxy = () => {
  globalProxyDetails.value.socksEnabled = !globalProxyDetails.value.socksEnabled;
  updateTabsProxyBadges();
};
const toggleCurrentHostProxy = () => {
  hostProxiesDetails.value[activeTabHost.value].socksEnabled = !currentHostProxyEnabled.value;
  updateTabsProxyBadges();
};

const toggleGlobalProxyDNS = () => {
  const updatedGlobalProxyDNS = !globalProxyDetails.value.proxyDNS;
  globalProxyDetails.value.proxyDNS = updatedGlobalProxyDNS;
  globalProxy.value.proxyDNS = updatedGlobalProxyDNS;
};
const toggleCurrentHostProxyDNS = () => {
  const updatedCurrentHostProxyDNS = !currentHostProxyDetails.value.proxyDNS;
  hostProxiesDetails.value[activeTabHost.value].proxyDNS = updatedCurrentHostProxyDNS;
  hostProxies.value[activeTabHost.value].proxyDNS = updatedCurrentHostProxyDNS;
};

const setGlobalProxy = ({
  country,
  countryCode,
  city,
  hostname,
  ipv4_address,
  port = baseConfig.port,
}: ProxyOperationArgs) => {
  const newGlobalProxy: ProxyInfo = {
    host: ipv4_address,
    port: port || 1080,
    proxyDNS: baseConfig.proxyDNS,
    type: ProxyInfoType.socks,
  };

  const newGlobalProxyDetails: ProxyDetails = {
    socksEnabled: true,
    server: hostname!.replace('socks5-', '')!.replace('.relays.mullvad.net', ''),
    country: country,
    countryCode: countryCode,
    city: city,
    proxyDNS: baseConfig.proxyDNS,
  };

  globalProxy.value = newGlobalProxy;
  globalProxyDetails.value = newGlobalProxyDetails;

  updateConnection();
};

const setCurrentHostProxy = (
  {
    country,
    countryCode,
    city,
    hostname,
    ipv4_address,
    port = baseConfig.port,
  }: Partial<ProxyOperationArgs>,
  host: string,
) => {
  const newHostProxy: ProxyInfo = {
    host: ipv4_address || socksIp,
    port: port!,
    proxyDNS: baseConfig.proxyDNS,
    type: ProxyInfoType.socks,
  };

  const newHostProxyDetails: ProxyDetails = {
    socksEnabled: true,
    server: hostname!.replace('socks5-', '')!.replace('.relays.mullvad.net', ''),
    country: country,
    countryCode: countryCode,
    city: city,
    proxyDNS: baseConfig.proxyDNS,
  };

  hostProxies.value = { ...hostProxies.value, [host]: newHostProxy };
  hostProxiesDetails.value = { ...hostProxiesDetails.value, [host]: newHostProxyDetails };
};

const useSocksProxy = () => {
  return {
    currentHostProxyDetails,
    currentHostProxyDNSEnabled,
    currentHostProxyEnabled,
    globalProxyDetails,
    globalProxyDNSEnabled,
    globalProxyEnabled,
    setCurrentHostProxy,
    setGlobalProxy,
    toggleCurrentHostProxy,
    toggleCurrentHostProxyDNS,
    toggleGlobalProxy,
    toggleGlobalProxyDNS,
  };
};

export default useSocksProxy;
