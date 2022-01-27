<script lang="ts" setup>
import PrivacyRecommendation from '@/components/PrivacyRecommendations/PrivacyRecommendation.vue';
import useRecommendations from '@/composables/useRecommendations/useRecommendations';
import { computed } from 'vue';

const { recommendations } = useRecommendations();

const extensions = computed(() => {
  return recommendations.value.filter((rec) => rec.type === 'extension');
});
const settings = computed(() => {
  return recommendations.value.filter((rec) => rec.type === 'setting');
});
</script>

<template>
  <section>
    <h1>Privacy Browser Settings</h1>
    <p>Here's a list of recommended browser settings.</p>
    <div class="space-y-4 mt-4">
      <PrivacyRecommendation
        v-for="setting in settings"
        :key="setting.id"
        :recommendation="setting"
      />
    </div>
  </section>

  <section>
    <h1>Privacy Extensions</h1>
    <p>Here's a list of recommended third party extensions.</p>
    <div class="space-y-4 mt-4">
      <PrivacyRecommendation
        v-for="extension in extensions"
        :key="extension.id"
        :recommendation="extension"
      />
    </div>
  </section>
</template>
