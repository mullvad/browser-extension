import { InjectionKey, Ref, ref } from 'vue';
import type { Connection } from '@/helpers/connCheck.types';
import { connCheck } from '@/helpers/connCheck';

//  Keep this outside of the hook to make it a singleton
const connection = ref({} as Connection);
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
      console.log({ useConnectionError: e });
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

export const ConnectionKey: InjectionKey<{
  connection: Ref<Connection>;
  isLoading: Ref<boolean>;
  isError: Ref<boolean>;
}> = Symbol('Connection');

export const defaultConnection = {
  connection: ref({} as Connection),
  isLoading: ref(false),
  isError: ref(false),
};
