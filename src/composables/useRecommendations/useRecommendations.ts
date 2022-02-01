import { computed } from 'vue';
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
  if (defaultRecommendationsIds.includes(id)) {
    recommendations.value = recommendations.value.map((recommendation) =>
      recommendation.id === id ? { ...recommendation, ...modification } : recommendation,
    );
  }
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

export const loadRecConfigs = async (): Promise<void> => {
  // Update browser extensions recommendations
  const installedAddons = await management.getAll();
  const installedAddonsIds = installedAddons
    .map((addons) => addons.id)
    .filter((id) => defaultRecommendationsIds.includes(id));

  // Create a disabled extensions ID list
  const disabledIDs = installedAddons.filter((addon) => !addon.enabled).map((addons) => addons.id);

  installedAddons.forEach((extension) => {
    const disabled = disabledIDs.includes(extension.id);
    const installed = installedAddonsIds.includes(extension.id);

    const partialUpdate: Partial<Recommendation> = {
      ctaLabel: installed ? (disabled ? 'enable' : undefined) : 'install',
      enabled: disabled,
      installed,
      activated: installed && !disabled,
    };

    // Update recommendation
    updateRecConfig(extension.id, partialUpdate);
  });

  // Update settings recommendations
  updateSettings();
};

const useRecommendations = () => {
  // sortRecommendations MUST NOT mutate the original list
  // const sortedRecommendations = computed(() => sortRecommendations(recommendations.value));

  const activeRecommendations = computed(() =>
    recommendations.value.filter((rec) => !rec.activated && !rec.ignored),
  );

  return {
    recommendations,
    activeRecommendations,
    updateRecConfig,
    loadRecConfigs,
    updateSettings,
    getRecConfigById,
  };
};

export default useRecommendations;
