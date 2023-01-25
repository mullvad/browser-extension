<script lang="ts" setup>
// import { computed } from 'vue';
import { NCard, NCarousel, NIcon, NImage } from 'naive-ui';

import { closePopup } from '@/helpers/closePopup';

import Button from '@/components/Buttons/Button.vue';
import MdiArrowLeft from '@/components/Icons/MdiArrowLeft.vue';
import MdiArrowRight from '@/components/Icons/MdiArrowRight.vue';

import useWarnings from '@/composables/useWarnings/useWarnings';

const { activeWarnings } = useWarnings();
</script>

<template>
  <div v-if="activeWarnings.length !== 0" class="-mb-1">
    <n-carousel :show-arrow="activeWarnings.length > 1" :show-dots="false">
      <template #arrow="{ prev, next }">
        <div class="custom-arrow">
          <n-icon class="arrow-icon" size="25" @click="prev"><MdiArrowLeft /></n-icon>
          <n-icon class="arrow-icon" size="25" @click="next"><MdiArrowRight /></n-icon>
        </div>
      </template>

      <n-card v-for="(warning, index) in activeWarnings" :key="index" :bordered="false">
        <template #header>
          <div class="flex">
            <n-image
              v-if="warning.icon"
              class="mr-4"
              width="20"
              :src="`/assets/icons/${warning.icon}`"
              object-fit="contain"
              preview-disabled
            />
            <h3>{{ warning.name }}</h3>
          </div>
        </template>
        <template v-if="activeWarnings.length > 1" #header-extra>
          <p>{{ index + 1 }} / {{ activeWarnings.length }}</p>
        </template>

        <div class="flex flex-col justify-start h-30">
          <p>{{ warning.description }}</p>

          <div class="mt-3 flex items-center">
            <Button
              v-if="warning.ctaUrl"
              :href="warning.ctaUrl"
              class="mr-4 capitalize"
              @click="closePopup"
            >
              Read more
            </Button>
          </div>
        </div>
      </n-card>
    </n-carousel>
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
