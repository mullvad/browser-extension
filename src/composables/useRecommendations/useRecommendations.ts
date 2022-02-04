import { computed, shallowRef, watch } from 'vue';
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

const updateRecConfig = (id: string, modification: Partial<Recommendation>) => {
  recommendations.value = recommendations.value.map((recommendation) =>
    recommendation.id === id ? { ...recommendation, ...modification } : recommendation,
  );
};

const getRecConfigById = (id: string) => {
  return recommendations.value.find((rec) => rec.id === id);
};

const updateHttpsOnly = async () => {
  const httpsOnly = await useHttpsOnly();

  updateRecConfig('https-only-mode', { activated: httpsOnly });
};

const updateSettings = () => {
  updateHttpsOnly();
};

// Update browser extensions recommendations
export const getCurrentUserRecommendations = async () => {
  const installedAddons = (await management.getAll()).filter((extension) =>
    defaultRecommendationsIds.includes(extension.id),
  );
  const installedAddonsIds = installedAddons.map((addons) => addons.id);

  // Create a disabled extensions ID list
  const disabledIDs = installedAddons.filter((addon) => !addon.enabled).map((addons) => addons.id);

  installedAddons.forEach((extension) => {
    const enabled = !disabledIDs.includes(extension.id);
    const installed = installedAddonsIds.includes(extension.id);

    const partialUpdate: Partial<Recommendation> = {
      ctaLabel: installed ? (!enabled ? 'enable' : undefined) : 'install',
      enabled,
      installed,
      activated: installed && enabled,
    };

    // Update recommendation
    updateRecConfig(extension.id, partialUpdate);
  });

  // Update settings recommendations
  updateSettings();
};

const isInitialized = shallowRef(false);
// Once recommendations has been returned from localStorage,
// we need to update to match what the user has installed
watch(
  () => recommendations.value,
  () => {
    if (isInitialized.value) {
      return;
    }

    isInitialized.value = true;
    getCurrentUserRecommendations();
  },
);

const useRecommendations = () => {
  const activeRecommendations = computed(() =>
    recommendations.value.filter((rec) => !rec.activated && !rec.ignored),
  );

  return {
    recommendations,
    activeRecommendations,
    updateRecConfig,
    updateSettings,
    getRecConfigById,
  };
};

export default useRecommendations;
