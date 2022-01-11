import { InjectionKey, Ref, ref } from 'vue';
import type { Connection } from '@/helpers/connCheck.types';
import { connCheck } from '@/helpers/connCheck';

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

export const ConnectionKey: InjectionKey<Ref<Connection>> = Symbol('Connection');
export const ConnectionIsLoadingKey: InjectionKey<Ref<boolean>> = Symbol('ConnectionIsLoadingKey');

