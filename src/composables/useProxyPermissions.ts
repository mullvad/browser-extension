import { ref } from 'vue';
import { getProxyPermissions, requestProxyPermissions } from '@/helpers/permissions';

const useProxyPermissions = () => {
  const proxyPermissionsGranted = ref(false);

  const checkProxyPermissions = async () => {
    proxyPermissionsGranted.value = await getProxyPermissions();
  };

  const triggerRequestProxyPermissions = async () => {
    proxyPermissionsGranted.value = await requestProxyPermissions();
    return proxyPermissionsGranted.value;
  };

  checkProxyPermissions();

  return { proxyPermissionsGranted, triggerRequestProxyPermissions };
};

export default useProxyPermissions;
