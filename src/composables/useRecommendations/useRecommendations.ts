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

const updateDohRecommentations = (
  isMullvad: boolean,
  isMullvadDoh: boolean,
  isthirdPartyDns: boolean,
) => {
  if (isMullvad && isMullvadDoh) {
    // Mullvad DoH should be disabled
    updateRecommendation('doh-disable', { activated: false });
  }

  if (!isMullvad && !isMullvadDoh) {
    // Mullvad DoH should be enabled
    updateRecommendation('doh-enable', { activated: false });
  }

  if (isMullvadDoh && isthirdPartyDns) {
    // Mullvad DoH is not the only active DNS. Firefox is not properly configured:
    // `network.trr.mode` should be set to`3` in `about:config`.
    updateRecommendation('doh-leak', { activated: false });
  }

  if (isMullvad && isthirdPartyDns) {
    // Mullvad VPN is connected, but DNS are leaking
    updateRecommendation('dns-leak', { activated: false });
  }
};

const updateSettings = () => {
  // Reset DNS recommendations while the DNS check is being made
  updateRecommendation('doh-enable', { activated: true });
  updateRecommendation('doh-disable', { activated: true });
  updateRecommendation('doh-leak', { activated: true });
  updateRecommendation('dns-leak', { activated: true });

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
    updateDohRecommentations,
    updateRecommendation,
    getRecommendationById,
  };
};

export default useRecommendations;
