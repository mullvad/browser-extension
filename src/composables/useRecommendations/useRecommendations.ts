import { computed } from 'vue';
import { management } from 'webextension-polyfill';

import useBrowserStorageLocal from '@/composables/useBrowserStorageLocal';
import useHttpsOnly from '@/composables/useHttpsOnly';
import useWebRtc from '@/composables/useWebRtc';
import { Recommendation } from '@/composables/useRecommendations/Recommendation.types';
import {
  defaultRecommendations,
  defaultRecommendationsIds,
} from '@/composables/useRecommendations/defaultRecommendations';
import sortRecommendations from './sortRecommendations';

const recommendations = useBrowserStorageLocal<Recommendation[]>(
  'recommendations',
  defaultRecommendations,
);

const updateRecConfig = async (id: string, modification: Partial<Recommendation>) => {
  if (defaultRecommendationsIds.includes(id)) {
    recommendations.value = recommendations.value.map((recommendation) =>
      recommendation.id === id ? { ...recommendation, ...modification } : recommendation,
    );
  }
};

const updateHttpsOnly = async () => {
  const httpsOnly = await useHttpsOnly();
  const instructions = httpsOnly ? undefined : 'To set HTTPS-Only mode, do this and that.';

  updateRecConfig('https-only-mode', { activated: httpsOnly, instructions });
};

const updateWebrtc = async () => {
  const { webrtcDisabled } = useWebRtc();

  updateRecConfig('https-only-mode', { activated: webrtcDisabled.value });
};

const updateSettings = async () => {
  updateHttpsOnly();
  updateWebrtc();
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
      instructions: installed && disabled ? 'To Enable an extension, do this and that' : undefined,
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
  const sortedRecommendations = computed(() => sortRecommendations(recommendations.value));

  const activeRecommendations = computed(() =>
    recommendations.value.filter((rec) => !rec.activated && !rec.ignored),
  );

  return {
    recommendations: sortedRecommendations,
    activeRecommendations,
    updateRecConfig,
    loadRecConfigs,
    updateSettings,
  };
};

export default useRecommendations;
