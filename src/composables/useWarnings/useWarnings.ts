import { computed } from 'vue';

import useConnection from '@/composables/useConnection';
import useCheckDnsLeaks from '@/composables/useCheckDnsLeaks';
import { warnings } from '@/composables/useWarnings/warnings';

const { isMullvadDoh, isthirdPartyDns } = useCheckDnsLeaks();
const { connection } = useConnection();

const dohDisable = computed(() => connection.value.isMullvad && isMullvadDoh.value);
const dohEnable = computed(() => !connection.value.isMullvad && !isMullvadDoh.value);
const dohLeak = computed(() => isMullvadDoh.value && isthirdPartyDns.value);
const dnsLeak = computed(() => connection.value.isMullvad && isthirdPartyDns.value);

const activeWarnings = computed(() => {
  const activeWarningIds: string[] = [];

  if (dohDisable.value) {
    activeWarningIds.push('doh-disable');
  }
  if (dohEnable.value) {
    activeWarningIds.push('doh-enable');
  }
  if (dohLeak.value) {
    activeWarningIds.push('doh-leak');
  }
  if (dnsLeak.value) {
    activeWarningIds.push('dns-leak');
  }

  return warnings.filter((warning) => activeWarningIds.includes(warning.id));
});

const useWarnings = () => {
  return {
    activeWarnings,
  };
};

export default useWarnings;
