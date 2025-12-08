import { watch } from 'vue';

import { updateCurrentTabProxyBadge } from '@/helpers/proxyBadge';

import useStore from '@/composables/useStore';
import useCheckDnsLeaks from '@/composables/useCheckDnsLeaks';
import useConnection from '@/composables/useConnection';

const { randomProxyMode } = useStore();
const { checkDnsLeaks } = useCheckDnsLeaks();
const { updateConnection } = useConnection();

const useRandomProxy = () => {
  const toggleRandomProxyMode = () => {
    randomProxyMode.value = !randomProxyMode.value;
    updateCurrentTabProxyBadge();
  };

  watch(
    randomProxyMode,
    () => {
      checkDnsLeaks();
      updateConnection();
    },
    { deep: true, immediate: false },
  );

  return {
    toggleRandomProxyMode,
    randomProxyMode,
  };
};

export default useRandomProxy;
