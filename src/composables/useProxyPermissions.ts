import { ref, readonly } from 'vue';
import { getProxyPermissions, requestProxyPermissions } from '@/helpers/permissions';

const isGranted = ref(false);

const checkProxyPermissions = async () => {
  isGranted.value = await getProxyPermissions();
};

const requestPermissions = async (): Promise<boolean> => {
  isGranted.value = await requestProxyPermissions();
  return isGranted.value;
};

const useProxyPermissions = () => {
  return {
    isGranted: readonly(isGranted),
    checkProxyPermissions,
    requestPermissions,
  };
};

export default useProxyPermissions;
