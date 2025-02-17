import { ref, readonly } from 'vue';
import { getProxyPermissions, requestProxyPermissions } from '@/helpers/permissions';

const useProxyPermissions = () => {
  const isGranted = ref(false);

  const checkProxyPermissions = async () => {
    isGranted.value = await getProxyPermissions();
  };

  const requestPermissions = async (): Promise<boolean> => {
    isGranted.value = await requestProxyPermissions();
    return isGranted.value;
  };

  checkProxyPermissions();

  return {
    isGranted: readonly(isGranted),
    requestPermissions,
  };
};

export default useProxyPermissions;
