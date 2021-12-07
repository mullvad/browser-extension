import { Extension } from '@/helpers/extensions';
import { storageLocal } from '@/helpers/storageLocal';

const useRecommendedExtensions = () => {
  const recommendedExtensions = ref<Extension[]>([]);
  storageLocal.extensions.get().then((storedExtensions) => {
    recommendedExtensions.value = storedExtensions.filter(
      (extension) => !extension.ignored || !extension.enabled || !extension.installed,
    );
  });

  return recommendedExtensions;
};

export default useRecommendedExtensions;
