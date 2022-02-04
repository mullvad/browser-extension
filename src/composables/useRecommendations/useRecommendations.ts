import { computed, watchEffect } from 'vue';
import { management } from 'webextension-polyfill';

import useBrowserStorageLocal from '@/composables/useBrowserStorageLocal';
import useHttpsOnly from '@/composables/useHttpsOnly';
import { Recommendation } from '@/composables/useRecommendations/Recommendation.types';
import {
  defaultRecommendations,
  isRecommended,
  defaultRecommendationsIds,
} from '@/composables/useRecommendations/defaultRecommendations';

const recommendations = useBrowserStorageLocal<Recommendation[]>(
  'recommendations',
  defaultRecommendations,
);

const updateRecConfig = (id: string, modification: Partial<Recommendation>) => {
  if (isRecommended(id)) {
    console.log(`${id} updating`);
    // console.log('recommendations before update :>> ', recommendations.value);

    recommendations.value = recommendations.value.map((recommendation) =>
      recommendation.id === id ? { ...recommendation, ...modification } : recommendation,
    );
    // console.log('recommendations after update :>> ', recommendations.value);
  }
};

watchEffect(() => {
  console.log('recommendations.value :>> ', recommendations.value);
});

const getRecConfigById = (id: string) => {
  return recommendations.value.find((rec) => rec.id === id);
};

const updateHttpsOnly = async () => {
  const httpsOnly = await useHttpsOnly();
  console.log('httpsOnly :>> ', httpsOnly);

  updateRecConfig('https-only-mode', { activated: httpsOnly });
};

const updateSettings = () => {
  updateHttpsOnly();
};

export const initRecommendations = async (): Promise<void> => {
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

    // console.log(`${extension.id} disabled :>> `, disabled);

    const partialUpdate: Partial<Recommendation> = {
      ctaLabel: installed ? (disabled ? 'enable' : undefined) : 'install',
      enabled: !disabled,
      installed,
      activated: installed && !disabled,
    };

    console.log({ id: extension.id, partialUpdate });

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
    initRecommendations,
    updateSettings,
    getRecConfigById,
  };
};

export default useRecommendations;
