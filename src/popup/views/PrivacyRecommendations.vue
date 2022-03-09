<script lang="ts" setup>
import { computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';

import PrivacyRecommendations from '@/components/PrivacyRecommendations/PrivacyRecommendations.vue';

// Scroll to anchor, if one is provided
// Workaround for scrollBehavior router method not mixing well with `overflow: auto` css property
// See the non-explanation in the following issue: https://github.com/vuejs/vue-router/issues/1459#issuecomment-466235189
const { currentRoute } = useRouter();
const hash = computed(() => currentRoute.value.hash);

if (hash.value) {
  onMounted(() => {
    const anchor = hash.value.replace('#', '');
    const el = document.getElementById(anchor);

    el!.scrollIntoView({ behavior: 'smooth' });
  });
}
</script>

<template>
  <privacy-recommendations />
</template>
