import { storageLocal } from '@/helpers/storageLocal';
import { Extension } from '@/helpers/extensions';

const useStoredExtensions = () => {
  const extensions = ref<Extension[]>([]);
  storageLocal.extensions.get().then((storedExtensions) => {
    extensions.value = storedExtensions;
  });
  return extensions;
};

export default useStoredExtensions;
