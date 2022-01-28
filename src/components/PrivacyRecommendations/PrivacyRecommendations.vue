<script lang="ts" setup>
import PrivacyRecommendation from '@/components/PrivacyRecommendations/PrivacyRecommendation.vue';
import useRecommendations from '@/composables/useRecommendations/useRecommendations';
import { computed } from 'vue';
import TitleCategory from '../TitleCategory.vue';

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
    <TitleCategory title="Settings" class="mt-2" />
    <div class="space-y-4">
      <PrivacyRecommendation
        v-for="setting in settings"
        :key="setting.id"
        :recommendation="setting"
      />
    </div>
  </section>

  <section>
    <TitleCategory title="Extensions" class="mt-8" />
    <div class="space-y-4">
      <PrivacyRecommendation
        v-for="extension in extensions"
        :key="extension.id"
        :recommendation="extension"
      />
    </div>
  </section>
</template>
