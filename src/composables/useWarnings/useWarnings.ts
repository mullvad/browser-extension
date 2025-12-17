import { computed } from 'vue';

import useCheckDnsLeaks from '@/composables/useConnection/useCheckDnsLeaks';
import useConnection from '@/composables/useConnection/useConnection';
import { warnings } from '@/composables/useWarnings/warnings';
import useWebRtc from '@/composables/useWebRtc';

const { connection } = useConnection();
const { isMullvadDoh, isMullvadDNS, isLoading, isError } = useCheckDnsLeaks();
const { webRTCLeaking } = useWebRtc();

const isMullvad = computed(() => connection.value.isMullvad);
const isDNSCheckCompleted = computed(() => !isLoading.value && isError.value === false);
const dohDisable = computed(() => isDNSCheckCompleted.value && isMullvad && isMullvadDoh.value);
const dohEnable = computed(() => isDNSCheckCompleted.value && !isMullvad && !isMullvadDoh.value);
const dohLeak = computed(
  () => isDNSCheckCompleted.value && isMullvadDoh.value && !isMullvadDNS.value,
);
const dnsLeak = computed(() => isDNSCheckCompleted.value && isMullvad && !isMullvadDNS.value);

const activeWarnings = computed(() => {
  const activeWarningsIds: string[] = [];

  if (dohDisable.value) {
    activeWarningsIds.push('doh-disable');
  }
  if (dohEnable.value) {
    activeWarningsIds.push('doh-enable');
  }
  if (dohLeak.value) {
    activeWarningsIds.push('doh-leak');
  }
  if (dnsLeak.value) {
    activeWarningsIds.push('dns-leak');
  }
  if (webRTCLeaking.value) {
    activeWarningsIds.push('webrtc-leak');
  }

  return warnings.filter((warning) => activeWarningsIds.includes(warning.id));
});

const useWarnings = () => {
  return {
    activeWarnings,
  };
};

export default useWarnings;
