import { computed } from 'vue';

import useCheckDnsLeaks from '@/composables/useConnection/useCheckDnsLeaks';
import useConnection from '@/composables/useConnection/useConnection';
import { warnings } from '@/composables/useWarnings/warnings';
import useWebRtc from '@/composables/useWebRtc';

const { connection } = useConnection();
const { isMullvadDoh, isMullvadDNS, isQuad9Doh, isLoading, isError } = useCheckDnsLeaks();
const { webRTCLeaking } = useWebRtc();

const isMullvad = computed(() => connection.value.isMullvad);
const isDNSCheckCompleted = computed(() => !isLoading.value && isError.value === false);
const dohDeprecated = computed(() => isDNSCheckCompleted.value && isMullvadDoh.value);
const dohDisable = computed(
  () => isDNSCheckCompleted.value && isMullvad.value && (isMullvadDoh.value || isQuad9Doh.value),
);
const dohEnable = computed(
  () => isDNSCheckCompleted.value && !isMullvad.value && !isMullvadDoh.value && !isQuad9Doh.value,
);
const dohLeak = computed(
  () => isDNSCheckCompleted.value && isMullvadDoh.value && !isMullvadDNS.value,
);
const dnsLeak = computed(
  () => isDNSCheckCompleted.value && isMullvad.value && !isMullvadDNS.value && !isQuad9Doh.value,
);

const activeWarnings = computed(() => {
  const activeWarningsIds: string[] = [];

  if (dohDeprecated.value) {
    activeWarningsIds.push('doh-deprecated');
  }
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
