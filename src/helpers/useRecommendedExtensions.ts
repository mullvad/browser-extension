import { Extension } from '@/helpers/extensions';
import { Ref } from 'vue-demi';
import useStoredExtensions from '@/helpers/useStoredExtensions';

const useRecommendedExtensions = (): Ref<Extension[]> => {
  const extensions = useStoredExtensions();
  return computed(() =>
    extensions.value.filter(
      (extension) => !extension.ignored || !extension.enabled || !extension.installed,
    ),
  );
};

export default useRecommendedExtensions;
