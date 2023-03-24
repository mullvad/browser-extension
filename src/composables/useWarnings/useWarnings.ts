import { computed } from 'vue';

import useConnection from '@/composables/useConnection';
import useCheckDnsLeaks from '@/composables/useCheckDnsLeaks';
import { warnings } from '@/composables/useWarnings/warnings';
import useWebRtc from '@/composables/useWebRtc';

const { isMullvadDoh, isthirdPartyDns } = useCheckDnsLeaks();
const { connection } = useConnection();
const { webRTCLeaking } = useWebRtc();

const dohDisable = computed(() => connection.value.isMullvad && isMullvadDoh.value);
const dohEnable = computed(() => !connection.value.isMullvad && !isMullvadDoh.value);
const dohLeak = computed(() => isMullvadDoh.value && isthirdPartyDns.value);
const dnsLeak = computed(() => connection.value.isMullvad && isthirdPartyDns.value);

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
