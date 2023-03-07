<script lang="ts" setup>
import { computed } from 'vue';
import { NCard, NCarousel, NIcon, NImage } from 'naive-ui';

import { closePopup } from '@/helpers/closePopup';

import Button from '@/components/Buttons/Button.vue';
import ExternalLinkIconLabel from '@/components/ExternalLinkIconLabel.vue';
import IconLabel from '@/components/IconLabel.vue';
import MdiArrowLeft from '@/components/Icons/MdiArrowLeft.vue';
import MdiArrowRight from '@/components/Icons/MdiArrowRight.vue';

import useRecommendations from '@/composables/useRecommendations/useRecommendations';
import useWarnings from '@/composables/useWarnings/useWarnings';

const { activeRecommendations } = useRecommendations();
const { activeWarnings } = useWarnings();

const activeNotifications = computed(() => {
  return [...activeWarnings.value, ...activeRecommendations.value];
});
</script>

<template>
  <div v-if="activeNotifications.length > 0" class="mb-4">
    <n-carousel show-arrow :show-dots="false">
      <template #arrow="{ prev, next }">
        <div v-if="activeNotifications.length > 1" class="custom-arrow">
          <n-icon class="arrow-icon" size="25" @click="prev"><MdiArrowLeft /></n-icon>
          <n-icon class="arrow-icon" size="25" @click="next"><MdiArrowRight /></n-icon>
        </div>
      </template>

      <n-card v-for="(notification, index) in activeNotifications" :key="index" :bordered="false">
        <template #header>
          <div v-if="!(notification.type === 'warning')" class="flex">
            <n-image
              v-if="notification.icon"
              class="mr-4"
              width="20"
              :src="`/assets/icons/${notification.icon}`"
              object-fit="contain"
              preview-disabled
            />
            <h3>{{ notification.name }}</h3>
          </div>
          <IconLabel v-else :text="notification.name" :type="notification.iconType || 'info'" />
        </template>
        <template #header-extra>
          <p v-if="activeNotifications.length > 1">
            {{ index + 1 }} / {{ activeNotifications.length }}
          </p>
        </template>

        <div class="flex flex-col justify-start h-30">
          <p>
            {{ notification.description }}
          </p>

          <div v-if="!(notification.type === 'warning')" class="mt-3 flex items-center">
            <Button
              v-if="notification.ctaUrl"
              :href="notification.ctaUrl"
              class="mr-4 capitalize"
              @click="closePopup"
            >
              <ExternalLinkIconLabel v-if="notification.ctaLabel" :text="notification.ctaLabel" />
            </Button>
            <Button :to="`/privacy-recommendations#${notification.id}`"> Learn more </Button>
          </div>
          <div v-else class="mt-3 flex items-center">
            <Button :href="notification.ctaUrl" @click="closePopup"> Read more </Button>
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
