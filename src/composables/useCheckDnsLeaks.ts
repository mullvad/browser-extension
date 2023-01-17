import { ref } from 'vue';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

import unique from '@/helpers/unique';

import useRecommendations from '@/composables/useRecommendations/useRecommendations';
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
const CONNCHECK_URL = 'am.i.mullvad.net';

const { updateDohRecommentations } = useRecommendations();
const { connection } = useConnection();

const dnsLeakRequest = async () => {
  const uuid = uuidv4().replace(/-/g, '');
  try {
    await axios.get(`https://${uuid}.${DNSLEAK_URL}`, { timeout: 10000 });
  } catch (_) {
    // This request is intended to fail
  }
  const { data } = await axios.get<DnsServer[]>(`https://${CONNCHECK_URL}/dnsleak/${uuid}`, {
    timeout: 10000,
  });

  return data;
};

const dnsServers = ref([] as DnsServer[]);
const error = ref<Error>();
const isError = ref(false);
const isLeaking = ref<boolean | undefined>();
const isLoading = ref(false);

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

      // We need to make a conncheck because a Dns check wont always tell if you're connected to Mullvad,
      // for example when DoH is strictly set in the browser.
      const isMullvad = connection.value.isMullvad;
      // If a DNS from the list is Mullvad && contains "dns", it means it's a DoH one
      // See: //mullvad.net/en/help/dns-over-https-and-dns-over-tls/
      const isMullvadDoh = uniqueDnsServers.some(
        (server) => server.mullvad_dns && server.mullvad_dns_hostname.includes('dns'),
      );
      const isthirdPartyDns = uniqueDnsServers.some((server) => !server.mullvad_dns);

      updateDohRecommentations(isMullvad, isMullvadDoh, isthirdPartyDns);
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
  };
};

export default useCheckDnsLeaks;
