<script lang="ts" setup>
import { NCard, NCarousel, NIcon, NImage } from 'naive-ui';

import { closePopup } from '@/helpers/closePopup';

import Button from '@/components/Buttons/Button.vue';
import MdiArrowLeft from '@/components/Icons/MdiArrowLeft.vue';
import MdiArrowRight from '@/components/Icons/MdiArrowRight.vue';
import TitleCategory from '@/components/TitleCategory.vue';

import useRecommendations from '@/composables/useRecommendations/useRecommendations';
import ExternalLinkIconLabel from '@/components/ExternalLinkIconLabel.vue';

const { activeRecommendations } = useRecommendations();
</script>

<template>
  <TitleCategory title="Privacy recommendations" />

  <div v-if="activeRecommendations.length === 0">
    <p class="text-white text-lg" data-test="success-message">
      Sweet! You have taken action on all recommendations.
    </p>
    <router-link class="hover:text-white" to="privacy-recommendations">
      See all Privacy Recommendations
    </router-link>
  </div>

  <div v-else class="-mb-1">
    <n-carousel show-arrow :show-dots="false">
      <template #arrow="{ prev, next }">
        <div class="custom-arrow">
          <n-icon class="arrow-icon" size="25" @click="prev"><MdiArrowLeft /></n-icon>
          <n-icon class="arrow-icon" size="25" @click="next"><MdiArrowRight /></n-icon>
        </div>
      </template>

      <n-card
        v-for="(recommendation, index) in activeRecommendations"
        :key="index"
        :bordered="false"
      >
        <template #header>
          <div class="flex">
            <n-image
              v-if="recommendation.icon"
              class="mr-4"
              width="20"
              :src="`/assets/icons/${recommendation.icon}`"
              object-fit="contain"
              preview-disabled
            />
            <h3>{{ recommendation.name }}</h3>
          </div>
        </template>
        <template #header-extra>
          <p>{{ index + 1 }} / {{ activeRecommendations.length }}</p>
        </template>

        <div class="flex flex-col justify-start h-30">
          <p>
            {{ recommendation.description }}
          </p>

          <div class="mt-3 flex items-center">
            <Button
              v-if="recommendation.ctaUrl"
              :href="recommendation.ctaUrl"
              class="mr-4 capitalize"
              @click="closePopup"
            >
              <ExternalLinkIconLabel
                v-if="recommendation.ctaLabel"
                :text="recommendation.ctaLabel"
              />
            </Button>
            <router-link
              :to="`/privacy-recommendations#${recommendation.id}`"
              class="hover:text-white underline"
            >
              Learn more
            </router-link>
          </div>
        </div>
      </n-card>
    </n-carousel>

    <div class="text-right pt-2 mr-2">
      <router-link class="hover:text-white" to="privacy-recommendations" data-test="show-all-link"
        >Show all</router-link
      >
    </div>
  </div>
</template>

<style>
.custom-arrow {
  display: flex;
  position: absolute;
  align-items: center;
  bottom: 9px;
  right: 11px;
}

.custom-arrow .n-icon {
  margin-left: 5px;
  cursor: pointer;
}

.custom-arrow .n-icon:hover {
  color: white;
}

.custom-arrow .n-icon:active {
  transform: scale(0.95);
  transform-origin: center;
}

.n-carousel {
  border-radius: 8px;
}
</style>
