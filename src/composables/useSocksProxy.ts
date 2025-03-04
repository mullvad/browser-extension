import { computed, watch } from 'vue';

import {
  ProxyDetails,
  ProxyInfo,
  ProxyInfoType,
  ProxyOperationArgs,
} from '@/helpers/socksProxy/socksProxy.types';
import { reloadOptions } from '@/helpers/browserExtension';
import { updateCurrentTabProxyBadge } from '@/helpers/proxyBadge';

import useActiveTab from '@/composables/useActiveTab';
import useConnection from '@/composables/useConnection';
import useStore from '@/composables/useStore';
import { reloadGlobalProxiedTabs, reloadMatchingTabs } from '@/helpers/tabs';
import { checkDomain } from '@/helpers/domain';
import { getTargetHost } from '@/helpers/socksProxy/getTargetHost';
import { baseConfig, socksIp } from '@/helpers/socksProxy/constants';

const { activeTabHost } = useActiveTab();
const { updateConnection } = useConnection();
const {
  excludedHosts,
  globalProxy,
  globalProxyDetails,
  hostProxies,
  hostProxiesDetails,
  proxyAutoReload,
} = useStore();

const currentHostProxyDetails = computed(() => {
  const { hasSubdomain, domain } = checkDomain(activeTabHost.value);

  // First check for exact matches that are enabled
  if (hostProxiesDetails.value[activeTabHost.value]?.socksEnabled) {
    return hostProxiesDetails.value[activeTabHost.value];
  }

  // Then check parent domain if this is a subdomain
  if (hasSubdomain && hostProxiesDetails.value[domain]?.socksEnabled) {
    return hostProxiesDetails.value[domain];
  }

  // If no enabled proxies found, return any existing proxy config
  if (hostProxiesDetails.value[activeTabHost.value]) {
    return hostProxiesDetails.value[activeTabHost.value];
  }

  return null;
});

const globalProxyEnabled = computed(() => globalProxyDetails.value.socksEnabled);
const currentHostProxyEnabled = computed(
  () => currentHostProxyDetails.value?.socksEnabled ?? false,
);

const globalProxyDNSEnabled = computed(() => globalProxy.value?.proxyDNS ?? false);
const currentHostProxyDNSEnabled = computed(() => currentHostProxyDetails.value?.proxyDNS ?? false);

const combinedHosts = computed(() => {
  // hosts that are excluded from proxying + hosts that enabled for proxying
  const enabledProxyHosts = Object.entries(hostProxiesDetails.value)
    .filter(([, details]) => details.socksEnabled)
    .map(([host]) => host);
  const allHosts = [...enabledProxyHosts, ...excludedHosts.value];
  return [...new Set(allHosts)].sort((a, b) => a.localeCompare(b));
});

const toggleGlobalProxy = () => {
  globalProxyDetails.value.socksEnabled = !globalProxyDetails.value.socksEnabled;
  reloadOptions();
  if (proxyAutoReload.value) {
    reloadGlobalProxiedTabs(combinedHosts.value);
  }
  updateCurrentTabProxyBadge();
};

const toggleSubDomainProxy = (subdomain: string) => {
  const { domain } = checkDomain(subdomain);

  // If no subdomain proxy exists but parent domain has proxy
  if (!hostProxiesDetails.value[subdomain] && hostProxiesDetails.value[domain]) {
    // Clone parent domain proxy settings
    hostProxiesDetails.value[subdomain] = {
      ...hostProxiesDetails.value[domain],
      socksEnabled: true,
    };
    hostProxies.value[subdomain] = {
      ...hostProxies.value[domain],
      proxyDNS: hostProxiesDetails.value[domain].proxyDNS,
    };
  } else {
    // Toggle existing subdomain proxy
    hostProxiesDetails.value[subdomain].socksEnabled =
      !hostProxiesDetails.value[subdomain].socksEnabled;
  }

  reloadOptions();
  if (proxyAutoReload.value) {
    reloadMatchingTabs(subdomain);
  }
  updateCurrentTabProxyBadge();
};

const toggleDomainProxy = (domain: string) => {
  hostProxiesDetails.value[domain].socksEnabled = !hostProxiesDetails.value[domain].socksEnabled;
  reloadOptions();
  if (proxyAutoReload.value) {
    reloadMatchingTabs(domain);
  }
  updateCurrentTabProxyBadge();
};

const toggleCustomProxy = (host: string) => {
  const targetHost = getTargetHost(host, hostProxiesDetails.value);
  hostProxiesDetails.value[targetHost].socksEnabled =
    !hostProxiesDetails.value[targetHost].socksEnabled;
  reloadOptions();
  if (proxyAutoReload.value) {
    reloadMatchingTabs(targetHost);
  }
  updateCurrentTabProxyBadge();
};

const toggleCustomProxyDNS = (host: string) => {
  const targetHost = getTargetHost(host, hostProxiesDetails.value);
  const updatedProxyDNS = !hostProxiesDetails.value[targetHost].proxyDNS;

  hostProxiesDetails.value[targetHost].proxyDNS = updatedProxyDNS;
  hostProxies.value[targetHost].proxyDNS = updatedProxyDNS;

  updateCurrentTabProxyBadge();
  if (proxyAutoReload.value) {
    reloadMatchingTabs(targetHost);
  }
};

const toggleGlobalProxyDNS = () => {
  const updatedGlobalProxyDNS = !globalProxyDetails.value.proxyDNS;
  globalProxyDetails.value.proxyDNS = updatedGlobalProxyDNS;
  globalProxy.value.proxyDNS = updatedGlobalProxyDNS;
  if (proxyAutoReload.value) {
    reloadGlobalProxiedTabs(combinedHosts.value);
  }
  updateCurrentTabProxyBadge();
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

  reloadOptions();
  if (proxyAutoReload.value) {
    reloadGlobalProxiedTabs(combinedHosts.value);
  }
};

const setCustomProxy = (
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

  reloadOptions();
  if (proxyAutoReload.value) {
    reloadMatchingTabs(host);
  }
};

const removeCustomProxy = (host: string) => {
  delete hostProxies.value[host];
  delete hostProxiesDetails.value[host];
  updateCurrentTabProxyBadge();
  reloadOptions();
  if (proxyAutoReload.value) {
    reloadMatchingTabs(host);
  }
};

const removeGlobalProxy = () => {
  globalProxy.value = {} as ProxyInfo;
  globalProxyDetails.value = {} as ProxyDetails;
  updateCurrentTabProxyBadge();
  reloadOptions();
  if (proxyAutoReload.value) {
    reloadGlobalProxiedTabs(combinedHosts.value);
  }
};

const allowProxy = (host: string) => {
  excludedHosts.value = excludedHosts.value.filter((excluded) => excluded !== host);
  updateCurrentTabProxyBadge();
  reloadOptions();
  if (proxyAutoReload.value) {
    reloadMatchingTabs(host);
  }
};

const neverProxyHost = (host: string) => {
  excludedHosts.value = [...excludedHosts.value, host];
  updateCurrentTabProxyBadge();
  reloadOptions();
  if (proxyAutoReload.value) {
    reloadMatchingTabs(host);
  }
};

watch(
  [() => globalProxyDetails.value, () => hostProxiesDetails.value],
  () => {
    updateConnection();
  },
  { deep: true, immediate: false },
);

const useSocksProxy = () => {
  return {
    allowProxy,
    currentHostProxyDetails,
    currentHostProxyDNSEnabled,
    currentHostProxyEnabled,
    excludedHosts,
    globalProxy,
    globalProxyDetails,
    globalProxyDNSEnabled,
    globalProxyEnabled,
    hostProxiesDetails,
    neverProxyHost,
    removeCustomProxy,
    removeGlobalProxy,
    setCustomProxy,
    setGlobalProxy,
    toggleDomainProxy,
    toggleSubDomainProxy,
    toggleCustomProxy,
    toggleCustomProxyDNS,
    toggleGlobalProxy,
    toggleGlobalProxyDNS,
  };
};

export default useSocksProxy;
