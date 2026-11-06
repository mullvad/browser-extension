import { ref, watch } from 'vue';
import { v4 as uuidv4 } from 'uuid';

import unique from '@/helpers/unique';
import useConnection from '@/composables/useConnection/useConnection';
import useStore from '@/composables/useStore';

/**
 * Match the DNSInfo type in
 * https://github.com/mullvad/conncheck/blob/5fb1cbf65d564de6a1cea4285fd68ec6c65e8c59/api/dns.go#L16-L26
 */
export type DnsServer = {
  hostname?: string;
  ip: string;
  server_type?: string;
  quad9_dns: boolean;
  mullvad_dns: boolean;
  mullvad_dns_hostname?: string;
  city?: string;
  country?: string;
  organization?: string;
};

const { connCheckConfig } = useStore();

const dnsLeakRequest = async () => {
  const { dns_leak_domain } = connCheckConfig.value;
  const uuid = uuidv4();
  const response = await fetch(`https://${uuid}.${dns_leak_domain}`, {
    headers: { Accept: 'application/json' },
  });
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return await response.json();
};

const dnsServers = ref([] as DnsServer[]);
const error = ref<Error>();
const isError = ref(false);
const isLeaking = ref(false);
const isLoading = ref(false);
const isMullvadDNS = ref(false);
const isMullvadDoh = ref(false);
const isQuad9Doh = ref(false);

const { isError: isConnectionError } = useConnection();

// Watch for connection errors and abort DNS leak check if needed.
watch(isConnectionError, (newValue) => {
  if (newValue && isLoading.value) {
    // Connection error occurred during DNS leak check
    isLoading.value = false;
    isError.value = true;
    error.value = new Error('Connection error detected, aborting DNS leak check');
  }
});

const useCheckDnsLeaks = () => {
  const checkDnsLeaks = async () => {
    dnsServers.value = [];
    error.value = undefined;
    isError.value = false;
    isLeaking.value = false;
    isLoading.value = true;
    isMullvadDNS.value = false;
    isMullvadDoh.value = false;
    isQuad9Doh.value = false;
    try {
      // The returned value from  Promise.all is here a list of lists, so add .flat() to make it a single level list
      const allDnsServers = (await Promise.all([...Array(6)].map(() => dnsLeakRequest()))).flat();

      // Remove duplicates, based on DnsServer.ip
      const uniqueDnsServers = unique(allDnsServers, 'ip');

      // Quad9 provides encrypted DNS, so it's not considered a leak
      isLeaking.value = uniqueDnsServers.some((server) => !server.mullvad_dns && !server.quad9_dns);
      dnsServers.value = uniqueDnsServers;

      // If a DNS from the list is Mullvad && contains "dns", it means it's a DoH one
      // See: //mullvad.net/en/help/dns-over-https-and-dns-over-tls/
      isMullvadDoh.value = uniqueDnsServers.some(
        (server) => server.mullvad_dns && server.mullvad_dns_hostname?.includes('dns'),
      );
      isMullvadDNS.value = uniqueDnsServers.some((server) => server.mullvad_dns);
      isQuad9Doh.value = uniqueDnsServers.some((server) => server.quad9_dns);
    } catch (e) {
      // If the users is not connected to Mullvad, but using a Proxy we will end up here
      isError.value = true;
      error.value = e as Error;
    } finally {
      isLoading.value = false;
    }
  };

  return {
    checkDnsLeaks,
    dnsServers,
    error,
    isError,
    isLeaking,
    isLoading,
    isMullvadDoh,
    isMullvadDNS,
    isQuad9Doh,
  };
};

export default useCheckDnsLeaks;
