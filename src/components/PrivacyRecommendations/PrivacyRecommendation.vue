<script lang="ts" setup>
import { computed, toRefs, watchEffect } from 'vue';
import { NAvatar, NCard } from 'naive-ui';

import Button from '@/components/Buttons/Button.vue';
import IconLabel from '@/components/IconLabel.vue';
import Instructions from '@/components/PrivacyRecommendations/Instructions.vue';
import RecommendationIconWithTooltip from '@/components/RecommendationIconWithTooltip.vue';
import SplitButton from '@/components/Buttons/SplitButton.vue';

import { closePopup } from '@/helpers/browserExtension';

import type { Recommendation } from '@/composables/useRecommendations/Recommendation.types';
import ExternalLinkIconLabel from '@/components/ExternalLinkIconLabel.vue';
import useConnection from '@/composables/useConnection';

const { connection } = useConnection();

const props = defineProps<{
  recommendation: Recommendation;
}>();

const { recommendation } = toRefs(props);

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
</script>

<template>
  <n-card :id="recommendation.id" :bordered="false">
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
        <RecommendationIconWithTooltip :recommendation="recommendation" />
      </div>
    </template>

    <p>{{ recommendation.description }}</p>

    <div
      v-if="!recommendation.activated && recommendation.id === 'https-only-mode'"
      class="pt-4 flex items-center"
    >
      <Instructions :recommendation="recommendation" />
    </div>

    <div v-if="recommendation.warning" class="pt-4 flex items-center">
      <IconLabel :text="recommendation.warning" type="info" />
    </div>

    <template #action>
      <div class="flex justify-between">
        <Button
          v-if="!recommendation.activated && recommendation.id === 'default-search'"
          :href="`https://duckduckgo.com`"
          @click="closePopup"
        >
          <ExternalLinkIconLabel :text="`DuckDuckGo`" />
        </Button>

        <Button v-else :href="recommendation.homeUrl" @click="closePopup">
          <ExternalLinkIconLabel text="Learn More" />
        </Button>

        <div>
          <Button v-if="recommendation.ignored" color="success" @click="toggleIgnore">
            Enable recommendation
          </Button>

          <div v-else>
            <Button
              v-if="recommendation.id === 'uBlock0@raymondhill.net'"
              color="success"
              :href="recommendation.ctaUrl"
              @click="closePopup"
            >
              Install
            </Button>
            <Button class="ml-2" color="error" @click="toggleIgnore"> Ignore </Button>
          </div>
        </div>
      </div>
    </template>
  </n-card>
</template>

<style scoped>
.n-card {
  scroll-margin-top: 15px;
}
</style>
