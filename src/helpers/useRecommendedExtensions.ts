import { Ref, computed } from 'vue';
import { Extension, extensions } from '@/helpers/extensions';

const useRecommendedExtensions = (): Ref<Extension[]> => {
  return computed(() =>
    extensions.value.filter(
      (extension) => !extension.ignored || !extension.enabled || !extension.installed,
    ),
  );
};

export default useRecommendedExtensions;
