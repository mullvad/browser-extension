import useExtensions from '@/composables/useExtensions/useExtensions';
import { ref, watchEffect } from 'vue';
import { asyncComputed } from '@vueuse/core';
import useHTTPSOnly from '@/composables/useHttpsOnly';

type Recommendation = {
  image?: string;
  title: string;
  description: string;
  anchor: string;
  cta: string;
  ctaURL?: string;
};

const { recommendedExtensions } = useExtensions();

const recommendations = ref<Recommendation[]>([]);

const useRecommendations = () => {
  // Add other recommendations here...
  const httpsOnly = asyncComputed(useHTTPSOnly);

  // watchEffect lets us watch multiple properties and trigger side effects
  watchEffect(() => {
    // We need to listen for changes to recommendedExtensions since it is read asynchronously from browser storage
    recommendations.value = recommendedExtensions.value.map((extension) => {
      const cta = extension.installed && !extension.enabled ? 'Enable' : 'Install';

      return {
        image: `/assets/icons/${extension.icon}`,
        title: `${cta} ${extension.name}`,
        description: extension.longDescription,
        ctaURL: extension.addonUrl,
        cta,
        anchor: `/privacy-recommendations#${extension.id}`,
      };
    });

    // We need to listen for httpsOnly updates since it is also read asynchronously
    if (!httpsOnly.value) {
      recommendations.value.push({
        title: 'Set HTTPS-only mode',
        description:
          'Enabling this security enhancing mode provides a guarantee that all of your connections to websites are upgraded to use HTTPS, and warn you if only HTTP unsafe mode is available.',
        anchor: '/privacy-recommendations#https-only',
        cta: 'Set HTTPS-Only mode',
        ctaURL:
          'https://support.mozilla.org/en-US/kb/https-only-prefs#w_enabledisable-https-only-mode',
      });
    } else {
      // Ugly filter function to remove Https-only mode from the array
      recommendations.value = recommendations.value.filter(
        (r) => r.title !== 'Set HTTPS-only mode',
      );
    }
  });

  return { recommendations };
};

export default useRecommendations;
