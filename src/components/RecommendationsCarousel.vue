<script lang="ts" setup>
import { NCard, NCarousel, NIcon, NImage } from 'naive-ui';
import ArrowForward from '~icons/mdi/arrow-right';
import ArrowBack from '~icons/mdi/arrow-left';
import FeLinkExternal from '~icons/fe/link-external';

import { closePopup } from '@/helpers/closePopup';
import Button from '@/components/Button/Button.vue';
import useRecommendations from '@/composables/useRecommendations';

const { recommendations } = useRecommendations();
</script>

<template>
  <h1 class="text-sm pb-1">Privacy Recommendations</h1>

  <div v-if="recommendations.length === 0">
    <p class="text-white text-lg">Sweet! You have taken action on all recommendations</p>
    <router-link class="hover:text-white" to="privacy-extensions"
      >See all Privacy Recommendations</router-link
    >
  </div>

  <div v-else>
    <n-carousel show-arrow>
      <template #arrow="{ prev, next }">
        <div class="custom-arrow">
          <n-icon class="arrow-icon" size="25" @click="prev"><ArrowBack /></n-icon>
          <n-icon class="arrow-icon" size="25" @click="next"><ArrowForward /></n-icon>
        </div>
      </template>

      <n-card v-for="(recommendation, index) in recommendations" :key="index" :bordered="false">
        <template #header>
          <div class="flex">
            <n-image
              v-if="recommendation.image"
              class="mr-4"
              width="20"
              :src="recommendation.image"
              object-fit="contain"
              preview-disabled
            />
            <h3>{{ recommendation.title }}</h3>
          </div>
        </template>
        <template #header-extra>
          <p>{{ index + 1 }} / {{ recommendations.length }}</p>
        </template>

        <p>
          {{ recommendation.description }}
        </p>

        <template #footer>
          <Button
            v-if="recommendation.ctaURL"
            :href="recommendation.ctaURL"
            class="mr-4"
            @click="closePopup"
          >
            <span class="flex items-center">{{ recommendation.cta }}&nbsp;<FeLinkExternal /></span>
          </Button>
          <router-link :to="recommendation.anchor" class="hover:text-white underline"
            >Learn more</router-link
          >
        </template>
      </n-card>
    </n-carousel>

    <div class="text-right pt-2 mr-2">
      <router-link class="hover:text-white" to="privacy-recommendations">Show all</router-link>
    </div>
  </div>
</template>

<style scoped>
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
</style>
