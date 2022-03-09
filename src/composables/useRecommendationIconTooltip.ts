import { computed, Ref } from 'vue';
import { Recommendation } from '@/composables/useRecommendations/Recommendation.types';

const useRecommendationIconTooltip = (recommendation: Ref<Recommendation>) => {
  const tooltip = computed(() => {
    const tooltip = { text: 'Active', status: 'success' };
    if (recommendation.value.ignored) {
      tooltip.text = 'Ignored';
      tooltip.status = 'info';
    } else if (recommendation.value.id === 'disable-webrtc') {
      tooltip.text = recommendation.value.activated ? 'WebRTC disabled' : 'WebRTC enabled';
    } else if (recommendation.value.installed && !recommendation.value.enabled) {
      tooltip.text = 'Disabled';
      tooltip.status = 'error';
    } else if (!recommendation.value.activated && recommendation.value.type === 'extension') {
      tooltip.text = 'Not installed';
      tooltip.status = 'error';
    } else if (!recommendation.value.activated && recommendation.value.type === 'setting') {
      tooltip.text = 'Not set';
      tooltip.status = 'error';
    }
    return tooltip;
  });

  return tooltip;
};

export default useRecommendationIconTooltip;
