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

// Check permissions on module load so every page context (popup, options, etc.)
// starts with the correct state without requiring consumers to call it manually.
void checkProxyPermissions();

// Keep the permission state in sync if permissions are granted or revoked
// from any context (e.g. the browser's permission management UI).
browser.permissions.onAdded.addListener(() => void checkProxyPermissions());
browser.permissions.onRemoved.addListener(() => void checkProxyPermissions());

const useProxyPermissions = () => {
  return {
    isGranted: readonly(isGranted),
    checkProxyPermissions,
    requestPermissions,
  };
};

export default useProxyPermissions;
