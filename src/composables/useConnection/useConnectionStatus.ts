import { ref } from 'vue';
import useConnection from '@/composables/useConnection/useConnection';
import useCheckDnsLeaks from '@/composables/useConnection/useCheckDnsLeaks';

const isChecking = ref(false);

const useConnectionStatus = () => {
  const { updateConnection, isError } = useConnection();
  const { checkDnsLeaks } = useCheckDnsLeaks();

  const checkStatus = async () => {
    if (isChecking.value) {
      console.log('Status check already in progress, skipping');
      return;
    }

    isChecking.value = true;

    try {
      await updateConnection();

      if (!isError.value) {
        await checkDnsLeaks();
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
