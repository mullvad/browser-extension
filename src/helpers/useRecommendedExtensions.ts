import { Extension, extensions } from '@/helpers/extensions';
import { Ref } from 'vue-demi';

const useRecommendedExtensions = (): Ref<Extension[]> => {
  return computed(() =>
    extensions.value.filter(
      (extension) => !extension.ignored || !extension.enabled || !extension.installed,
    ),
  );
};

export default useRecommendedExtensions;
