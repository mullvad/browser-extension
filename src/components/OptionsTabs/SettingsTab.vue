<script setup lang="ts">
import PrivacyRecommendations from '@/components/PrivacyRecommendations/PrivacyRecommendations.vue';
import TitleCategory from '@/components/TitleCategory.vue';
import WebRTCToggle from '@/components/PrivacyRecommendations/WebRTCToggle.vue';
</script>

<template>
  <WebRTCToggle class="pt-4" />

  <TitleCategory title="Privacy Recommendations" class="pt-4" />
  <privacy-recommendations />
</template>
