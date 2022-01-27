<script lang="ts" setup>
import { toRefs } from 'vue';
import { NTooltip } from 'naive-ui';

import FeCheckCircle from '~icons/fe/check-circle';
import FeWarning from '~icons/fe/warning';
import FeInfo from '~icons/fe/info';

import useRecommendationIconTooltip from '@/composables/useRecommendationIconTooltip';
import type { Recommendation } from '@/composables/useRecommendations/Recommendation.types';

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
