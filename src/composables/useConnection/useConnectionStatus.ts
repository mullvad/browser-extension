import { ref } from 'vue';
import useConnection from '@/composables/useConnection/useConnection';
import useCheckDnsLeaks from '@/composables/useConnection/useCheckDnsLeaks';

const isChecking = ref(false);

const useConnectionStatus = () => {
  const { updateConnection, isError } = useConnection();
  const { checkDnsLeaks, isLoading: dnsIsLoading } = useCheckDnsLeaks();

  const checkStatus = async () => {
    if (isChecking.value) {
      return;
    }

    isChecking.value = true;
    // Show DNS spinner for the entire duration (connection check + DNS check)
    dnsIsLoading.value = true;

    try {
      await updateConnection();

      if (!isError.value) {
        await checkDnsLeaks();
      } else {
        dnsIsLoading.value = false;
      }
    } finally {
      isChecking.value = false;
    }
  };

  return {
    checkStatus,
    isChecking,
  };
};

export default useConnectionStatus;
