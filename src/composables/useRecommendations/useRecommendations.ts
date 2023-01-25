import { computed, watch } from 'vue';
import { management } from 'webextension-polyfill';

import useBrowserStorageLocal from '@/composables/useBrowserStorageLocal';
import useHttpsOnly from '@/composables/useHttpsOnly';
import { Recommendation } from '@/composables/useRecommendations/Recommendation.types';
import {
  defaultRecommendations,
  defaultRecommendationsIds,
} from '@/composables/useRecommendations/defaultRecommendations';

const recommendations = useBrowserStorageLocal<Recommendation[]>(
  'recommendations',
  defaultRecommendations,
);

const updateRecommendation = (id: string, modification: Partial<Recommendation>) => {
  recommendations.value = recommendations.value.map((recommendation) =>
    recommendation.id === id ? { ...recommendation, ...modification } : recommendation,
  );
};

const getRecommendationById = (id: string) => {
  return recommendations.value.find((rec) => rec.id === id);
};

const updateHttpsOnly = async () => {
  const httpsOnly = await useHttpsOnly();

  updateRecommendation('https-only-mode', { activated: httpsOnly });
};

const updateSettings = () => {
  updateHttpsOnly();
};

// Update browser extensions recommendations
const getCurrentUserRecommendations = async () => {
  const installedAddons = (await management.getAll()).filter((extension) =>
    defaultRecommendationsIds.includes(extension.id),
  );

  const enabledExtensionIds = installedAddons
    .filter((addon) => addon.enabled)
    .map((addons) => addons.id);

  installedAddons.forEach((extension) => {
    const enabled = enabledExtensionIds.includes(extension.id);

    const partialUpdate: Partial<Recommendation> = {
      ctaLabel: enabled ? undefined : 'enable',
      enabled,
      installed: true,
      activated: enabled,
    };

    updateRecommendation(extension.id, partialUpdate);
  });

  // Update settings recommendations
  updateSettings();
};

// Once recommendations has been returned from localStorage,
// we need to update to match what the user has installed
const stop = watch(recommendations, () => {
  getCurrentUserRecommendations();
  stop();
});

const useRecommendations = () => {
  const activeRecommendations = computed(() =>
    recommendations.value.filter((rec) => !rec.activated && !rec.ignored),
  );

  return {
    recommendations,
    activeRecommendations,
    updateRecommendation,
    getRecommendationById,
  };
};

export default useRecommendations;
