import useStore from '@/composables/useStore';
import { watch } from 'vue';
import useCheckDnsLeaks from '@/composables/useCheckDnsLeaks';
import useConnection from '@/composables/useConnection';

const useRandomProxy = () => {
  const { randomProxyMode } = useStore();
  const { checkDnsLeaks } = useCheckDnsLeaks();
  const { updateConnection } = useConnection();

  const toggleRandomProxyMode = () => {
    randomProxyMode.value = !randomProxyMode.value;
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
