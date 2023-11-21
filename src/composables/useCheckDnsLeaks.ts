import { ref } from 'vue';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

import unique from '@/helpers/unique';

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
  const { data } = await axios.get(`https://${uuid}.${DNSLEAK_URL}`, {
    headers: { accept: 'application/json' },
    timeout: 10000,
  });
  return data;
};

const dnsServers = ref([] as DnsServer[]);
const error = ref<Error>();
const isError = ref(false);
const isLeaking = ref<boolean | undefined>();
const isLoading = ref(false);
const isthirdPartyDns = ref(false);
const isMullvadDoh = ref(false);

const useCheckDnsLeaks = () => {
  const checkDnsLeaks = async () => {
    isLoading.value = true;
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
      isthirdPartyDns.value = uniqueDnsServers.some((server) => !server.mullvad_dns);
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
    dnsServers,
    error,
    isError,
    isLeaking,
    isLoading,
    isMullvadDoh,
    isthirdPartyDns,
  };
};

export default useCheckDnsLeaks;
