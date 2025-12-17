import { ref } from 'vue';
import useConnection from '@/composables/useConnection/useConnection';
import useCheckDnsLeaks from '@/composables/useConnection/useCheckDnsLeaks';

const isChecking = ref(false);

export default function useConnectionStatus() {
  const { updateConnection, isError } = useConnection();
  const { checkDnsLeaks } = useCheckDnsLeaks();

  const checkStatus = async () => {
    // Prevent multiple simultaneous checks
    if (isChecking.value) {
      console.log('Status check already in progress, skipping');
      return;
    }

    isChecking.value = true;

    try {
      // First check connection
      await updateConnection();

      // Then check DNS leaks only if connection is good
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
}
