<script lang="ts" setup>
import { computed, toRefs, watchEffect } from 'vue';
import { NAvatar, NCard, NSwitch, NTooltip } from 'naive-ui';

import { closePopup } from '@/helpers/closePopup';

import Button from '@/components/Buttons/Button.vue';
import IconLabel from '@/components/IconLabel.vue';
import RecommendationIconWithTooltip from '@/components/RecommendationIconWithTooltip.vue';
import SplitButton from '@/components/Buttons/SplitButton.vue';

import type { Recommendation } from '@/composables/useRecommendations/Recommendation.types';
import useRecommendationIconTooltip from '@/composables/useRecommendationIconTooltip';
import useWebRtc from '@/composables/useWebRtc';

const props = defineProps<{
  recommendation: Recommendation;
}>();

const { recommendation } = toRefs(props);
const { setWebRTC } = useWebRtc();

// Toggle Ignore recommendation
const toggleIgnore = () => {
  recommendation.value.ignored = !recommendation.value.ignored;
};

// Toggle WebRTC
watchEffect(() => {
  if (recommendation.value.id === 'disable-webrtc') {
    recommendation.value.ctaLabel = recommendation.value.activated ? 'disable' : 'enable';
  }
});

const mainTextExtension = computed(() => (recommendation.value.installed ? 'Enable' : 'Install'));
const tooltip = useRecommendationIconTooltip(recommendation);
</script>

<template>
  <n-card :bordered="false">
    <template #header>
      <div class="flex">
        <n-avatar
          v-if="recommendation.icon"
          size="small"
          :src="`/assets/icons/${recommendation.icon}`"
          class="mr-2"
        />
        <h2>{{ recommendation.name }}</h2>
      </div>
    </template>

    <template #header-extra>
      <div class="text-2xl flex">
        <div v-if="recommendation.id === 'disable-webrtc' && !recommendation.ignored">
          <n-tooltip>
            <template #trigger>
              <n-switch v-model:value="recommendation.activated" @update-value="setWebRTC" />
            </template>
            <span>{{ tooltip.text }}</span>
          </n-tooltip>
        </div>

        <RecommendationIconWithTooltip v-else :recommendation="recommendation" />
      </div>
    </template>

    <p>{{ recommendation.description }}</p>

    <div v-if="recommendation.instructions" class="pt-4 flex items-center">
      <IconLabel :text="recommendation.instructions" type="warning" />
    </div>

    <div v-if="recommendation.warning" class="pt-4 flex items-center">
      <IconLabel :text="recommendation.warning" type="info" />
    </div>

    <template #action>
      <div class="flex justify-between">
        <Button :href="recommendation.homeUrl" @click="closePopup">
          <IconLabel text="Learn More" type="external" />
        </Button>

        <Button v-if="recommendation.ignored" color="success" @click="toggleIgnore">
          Enable recommendation
        </Button>

        <div v-else-if="recommendation.type === 'extension'">
          <SplitButton
            v-if="!recommendation.activated"
            main-color="success"
            :main-text="mainTextExtension"
            sub-color="error"
            sub-text="Ignore recommendation"
            :href="recommendation.ctaUrl"
            @sub-click="toggleIgnore"
            @main-click="closePopup"
          />
        </div>

        <SplitButton
          v-else-if="recommendation.type === 'setting' && !recommendation.activated"
          sub-color="error"
          sub-text="Ignore recommendation"
          :href="recommendation.ctaUrl"
          @sub-click="toggleIgnore"
        />
      </div>
    </template>
  </n-card>
</template>
<style scoped>
.n-card {
  scroll-margin-top: 10px;
}
</style>
