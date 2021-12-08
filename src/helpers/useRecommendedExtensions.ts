import { Extension } from '@/helpers/extensions';
import { storageLocal } from '@/helpers/storageLocal';
import { Ref } from 'vue-demi';

const useRecommendedExtensions = (): Ref<Extension[]> => {
  const recommendedExtensions = ref<Extension[]>([]);
  storageLocal.extensions.get().then((storedExtensions) => {
    recommendedExtensions.value = storedExtensions.filter(
      (extension) => !extension.ignored || !extension.enabled || !extension.installed,
    );
  });

  return recommendedExtensions;
};

export default useRecommendedExtensions;
