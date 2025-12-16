import { ref, watch } from 'vue';
import { v4 as uuidv4 } from 'uuid';

import unique from '@/helpers/unique';
import useConnection from '@/composables/useConnection';

export type DnsServer = {
  hostname: string;
  ip: string;
  mullvad_dns: boolean;
  mullvad_dns_hostname: string;
  country: string;
  organization: string;
};

const DNSLEAK_URL = 'dnsleak.am.i.mullvad.net';

const dnsLeakRequest = async () => {
  const uuid = uuidv4();
  const response = await fetch(`https://${uuid}.${DNSLEAK_URL}`, {
    headers: { Accept: 'application/json' },
    method: 'GET',
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

const { isError: isConnectionError } = useConnection();

const useCheckDnsLeaks = () => {
  // Watch for connection errors and abort DNS leak check if needed
  watch(isConnectionError, (newValue) => {
    if (newValue && isLoading.value) {
      // Connection error occurred during DNS leak check
      isLoading.value = false;
      isError.value = true;
      error.value = new Error('Connection error detected, aborting DNS leak check');
    }
  });

  const checkDnsLeaks = async () => {
    dnsServers.value = [];
    error.value = undefined;
    isError.value = false;
    isLeaking.value = false;
    isLoading.value = true;
    isMullvadDNS.value = false;
    isMullvadDoh.value = false;
    try {
      // The returned value from  Promise.all is here a list of lists, so add .flat() to make it a single level list
      const allDnsServers = (await Promise.all([...Array(6)].map(() => dnsLeakRequest()))).flat();

      // Remove duplicates, based on DnsServer.ip
      const uniqueDnsServers = unique(allDnsServers, 'ip');

      isLeaking.value = uniqueDnsServers.some((server) => !server.mullvad_dns);
      dnsServers.value = uniqueDnsServers;

      // If a DNS from the list is Mullvad && contains "dns", it means it's a DoH one
      // See: //mullvad.net/en/help/dns-over-https-and-dns-over-tls/
      isMullvadDoh.value = uniqueDnsServers.some(
        (server) => server.mullvad_dns && server.mullvad_dns_hostname.includes('dns'),
      );
      isMullvadDNS.value = uniqueDnsServers.some((server) => server.mullvad_dns);
    } catch (e) {
      // If the users is not connected to Mullvad, but using a Proxy we will end up here
      isError.value = true;
      error.value = e as Error;
    } finally {
      isLoading.value = false;
    }
  };

  // Don't start multiple checks
  if (!isLoading.value) {
    checkDnsLeaks();
  }

  return {
    checkDnsLeaks,
    dnsServers,
    error,
    isError,
    isLeaking,
    isLoading,
    isMullvadDoh,
    isMullvadDNS,
  };
};

export default useCheckDnsLeaks;
