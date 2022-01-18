<script lang="ts" setup>
import { NButton, NCard, NCarousel, NIcon, NImage } from 'naive-ui';
import ArrowForward from '~icons/mdi/arrow-right';
import ArrowBack from '~icons/mdi/arrow-left';

import { closePopup } from '@/helpers/closePopup';
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
      <template #dots="{ total, currentIndex, to }">
        <ul class="custom-dots">
          <li
            v-for="index of total"
            :key="index"
            :class="{ ['is-active']: currentIndex === index - 1 }"
            @click="to(index - 1)"
          ></li>
        </ul>
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

        <p>
          {{ recommendation.description }}
        </p>

        <div class="inline-flex items-center">
          <a
            v-if="recommendation.ctaURL"
            :href="recommendation.ctaURL"
            class="hover:text-white underline mr-4"
            @click="closePopup"
          >
            <n-button ghost>{{ recommendation.cta }}</n-button>
          </a>
          <router-link :to="recommendation.anchor" class="hover:text-white underline">
            Learn more
          </router-link>
        </div>
      </n-card>
    </n-carousel>

    <div class="text-right pt-2 mr-2">
      <router-link class="hover:text-white" to="privacy-recommendations">
        Show all ({{ recommendations.length }})
      </router-link>
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

.custom-dots {
  display: flex;
  margin: 0;
  padding: 0;
  position: absolute;
  bottom: 20px;
  left: 20px;
}

.custom-dots li {
  display: inline-block;
  width: 12px;
  height: 4px;
  margin: 0 3px;
  border-radius: 4px;
  background-color: rgba(255 255 255 / 40%);
  transition: width 0.3s, background-color 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
}

.custom-dots li.is-active {
  width: 40px;
  background: white;
}

.n-card > .n-card__content {
  min-height: 11em;
}
</style>
