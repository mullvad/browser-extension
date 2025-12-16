import { InjectionKey, Ref, ref } from 'vue';
import type { Connection } from '@/helpers/connCheck.types';
import { connCheckIpv4, connCheckIpv6 } from '@/helpers/connCheck';

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
      const ipv4Promise = connCheckIpv4();
      const ipv6Promise = connCheckIpv6();

      // Wait for IPv4 result
      connection.value = await ipv4Promise;

      // Because IPV6 is not reliably working in socks proxy,
      // don't wait IPv6 result so that it's non-blocking.
      ipv6Promise
        .then((ipv6) => {
          connection.value = { ...connection.value, ipv6 };
        })
        .catch((e) => {
          console.log(`IPv6 check error: ${e.message}`);
        });
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

  return { connection, error, isError, isLoading, updateConnection };
};

export default useConnection;

export const ConnectionKey: InjectionKey<{
  connection: Ref<Connection>;
  isError: Ref<boolean>;
  isLoading: Ref<boolean>;
}> = Symbol('Connection');

export const defaultConnection = {
  connection: ref({} as Connection),
  isLoading: ref(false),
  isError: ref(false),
};
