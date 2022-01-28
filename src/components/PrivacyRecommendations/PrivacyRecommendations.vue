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
    <TitleCategory title="Settings" class="mt-2 -mb-2" />
    <div v-for="setting in settings" :id="setting.id" :key="setting.id" class="pt-4">
      <PrivacyRecommendation :recommendation="setting" />
    </div>
  </section>

  <section class="pb-4">
    <TitleCategory title="Extensions" class="mt-8 -mb-2" />
    <div v-for="extension in extensions" :id="extension.id" :key="extension.id" class="pt-4">
      <PrivacyRecommendation :recommendation="extension" />
    </div>
  </section>
</template>
