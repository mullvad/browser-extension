<script lang="ts" setup>
import { toRefs } from 'vue';
import { NTooltip } from 'naive-ui';

import useRecommendationIconTooltip from '@/composables/useRecommendationIconTooltip';
import type { Recommendation } from '@/composables/useRecommendations/Recommendation.types';
import FeInfo from '@/components/Icons/FeInfo.vue';
import FeWarning from '@/components/Icons/FeWarning.vue';
import FeCheckCircle from '@/components/Icons/FeCheckCircle.vue';

const props = defineProps<{ recommendation: Recommendation }>();
const { recommendation } = toRefs(props);
const tooltip = useRecommendationIconTooltip(recommendation);
</script>

<template>
  <n-tooltip>
    <template #trigger>
      <FeInfo v-if="tooltip.status === 'info'" class="text-info" />
      <FeWarning v-if="tooltip.status === 'error'" class="text-error" />
      <FeCheckCircle v-if="tooltip.status === 'success'" class="text-success" />
    </template>
    <span>{{ tooltip.text }}</span>
  </n-tooltip>
</template>
