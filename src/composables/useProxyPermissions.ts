import { ref } from 'vue';
import { getProxyPermissions, requestProxyPermissions } from '@/helpers/permissions';

const useProxyPermissions = () => {
  const proxyPermissionsGranted = ref(false);

  const checkProxyPermissions = async () => {
    proxyPermissionsGranted.value = await getProxyPermissions();
  };

  const triggerProxyPermissions = async () => {
    proxyPermissionsGranted.value = await requestProxyPermissions();
  };

  checkProxyPermissions();

  return { proxyPermissionsGranted, triggerProxyPermissions };
};

export default useProxyPermissions;
