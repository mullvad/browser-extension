import { watch } from 'vue';

import { updateCurrentTabProxyBadge } from '@/helpers/proxyBadge';

import useStore from '@/composables/useStore';
import useConnectionStatus from '@/composables/useConnection/useConnectionStatus';

const { randomProxyMode } = useStore();
const { checkStatus } = useConnectionStatus();

const useRandomProxy = () => {
  const toggleRandomProxyMode = () => {
    randomProxyMode.value = !randomProxyMode.value;
    updateCurrentTabProxyBadge();
  };

  watch(
    randomProxyMode,
    () => {
      checkStatus();
    },
    { deep: true, immediate: false },
  );

  return {
    toggleRandomProxyMode,
    randomProxyMode,
  };
};

export default useRandomProxy;
