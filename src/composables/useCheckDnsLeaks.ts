import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { ref } from 'vue';
import unique from '@/helpers/unique';

export type DnsServer = {
  ip: string;
  mullvad_dns: boolean;
  mullvad_dns_hostname: string;
  country: string;
  organization: string;
};

const DNSLEAK_URL = 'dnsleak.am.i.mullvad.net';
const CONNCHECK_URL = 'am.i.mullvad.net';

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

const isLeaking = ref<boolean | undefined>();
const dnsServers = ref([] as DnsServer[]);
const isLoading = ref(false);

const useCheckDnsLeaks = () => {
  const checkDnsLeaks = async () => {
    isLoading.value = true;
    // The returned value from  Promise.all is here a list of lists, so add .flat() to make it a single level list
    const allDnsServers = (await Promise.all([...Array(6)].map(() => dnsLeakRequest()))).flat();
    // Remove duplicates, based on DnsServer.ip
    const uniqueDnsServers = unique(allDnsServers, 'ip');

    isLeaking.value = uniqueDnsServers.some((server) => !server.mullvad_dns);
    dnsServers.value = uniqueDnsServers;
    isLoading.value = false;
  };

  // Don't start multiple checks
  if (!isLoading.value) {
    checkDnsLeaks();
  }

  return { isLeaking, dnsServers, isLoading };
};

export default useCheckDnsLeaks;
