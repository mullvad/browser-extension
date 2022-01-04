import { ref } from 'vue';
import { connCheck, Connection } from '@/helpers/connCheck';

//  Keep this outside of the hook to make it a singleton
const connection = ref({ isMullvad: false } as Connection);
const isLoading = ref(false);
const isError = ref(false);
const error = ref<Error | undefined>(undefined);

const useConnection = () => {
  const updateConnection = async () => {
    isLoading.value = true;
    isError.value = false;
    error.value = undefined;
    try {
      connection.value = await connCheck();
    } catch (e) {
      isError.value = true;
      error.value = e as Error;
    } finally {
      isLoading.value = false;
    }
  };

  // Don't run multiple checks at the same time
  if (!isLoading.value) {
    updateConnection();
  }

  return { connection, updateConnection, isLoading, isError, error };
};

export default useConnection;
