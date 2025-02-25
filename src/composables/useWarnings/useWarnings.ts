import { computed } from 'vue';

import useConnection from '@/composables/useConnection';
import useCheckDnsLeaks from '@/composables/useCheckDnsLeaks';
import { warnings } from '@/composables/useWarnings/warnings';
import useWebRtc from '@/composables/useWebRtc';

const { isMullvadDoh, isMullvadDNS, isLoading, isError } = useCheckDnsLeaks();
const { connection } = useConnection();
const { webRTCLeaking } = useWebRtc();

const isDNSCheckCompleted = computed(() => !isLoading.value && isError.value === false);

const dohDisable = computed(
  () => isDNSCheckCompleted.value && connection.value.isMullvad && isMullvadDoh.value,
);
const dohEnable = computed(
  () => isDNSCheckCompleted.value && !connection.value.isMullvad && !isMullvadDoh.value,
);
const dohLeak = computed(
  () => isDNSCheckCompleted.value && isMullvadDoh.value && !isMullvadDNS.value,
);
const dnsLeak = computed(
  () => isDNSCheckCompleted.value && connection.value.isMullvad && !isMullvadDNS.value,
);

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
