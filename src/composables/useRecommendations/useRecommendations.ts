import { ref } from 'vue';

import type { Recommendation } from '@/composables/useRecommendations/Recommendation.types';
import useBrowserStorageLocal from '@/composables/useBrowserStorageLocal';
import useExtensions from '@/composables/useExtensions/useExtensions';

const { recommendedExtensions } = useExtensions();

// Create recommendations and add recommended extensions
const extensionsRecommendations: Recommendation[] = recommendedExtensions.value.map((extension) => {
  const cta = extension.installed && !extension.enabled ? 'Enable' : 'Install';

  return {
    image: `/assets/icons/${extension.icon}`,
    title: `${cta} ${extension.name}`,
    description: extension.longDescription,
    ctaURL: extension.addonUrl,
    cta: cta,
    anchor: `/privacy-extensions#${extension.id}`,
    ignored: extension.ignored,
  };
});

const extensionsRecRef = ref(extensionsRecommendations);

const recommendations = useBrowserStorageLocal<Recommendation[]>('recommendations', [
  {
    title: 'Set HTTPS-only mode',
    description:
      'Enabling this security enhancing mode provides a guarantee that all of your connections to websites are upgraded to use HTTPS, and warn you if only HTTP unsafe mode is available.',
    anchor: '/privacy-extensions#https-only',
    cta: 'Set HTTPS-Only mode',
    ctaURL: 'https://support.mozilla.org/en-US/kb/https-only-prefs#w_enabledisable-https-only-mode',
    ignored: false,
  },
]);

const useRecommendations = () => {
  return { recommendations };
};

export default useRecommendations;
