<script lang="ts" setup>
import PrivacyRecommendation from '@/components/PrivacyRecommendations/PrivacyRecommendation.vue';
import useRecommendations from '@/composables/useRecommendations/useRecommendations';
import { computed } from 'vue';

const { recommendations } = useRecommendations();

const allRecommendations = computed(() => {
  return recommendations.value.filter((rec) => rec.type === 'extension' || rec.type === 'setting');
});
</script>

<template>
  <div class="space-y-4">
    <PrivacyRecommendation
      v-for="setting in allRecommendations"
      :id="setting.id"
      :key="setting.id"
      :recommendation="setting"
    />
  </div>
</template>
