<script lang="ts" setup>
import { NCard } from 'naive-ui';

import { closePopup } from '@/helpers/closePopup';

import Button from '@/components/Buttons/Button.vue';
import IconLabel from '@/components/IconLabel.vue';

import useNotifications from '@/composables/useNotifications/useNotifications';

const { activeNotifications } = useNotifications();
</script>

<template v-if="activeNotifications.length !== 0">
  <n-card
    v-for="(notification, index) in activeNotifications"
    :key="index"
    :bordered="false"
    class="mt-3 mb-4"
  >
    <template #header>
      <IconLabel :text="notification.name" :type="notification.icon || 'info'" />
    </template>

    <div class="flex flex-col justify-start">
      <p>{{ notification.description }}</p>

      <div class="mt-3 flex items-center">
        <Button
          v-if="notification.ctaUrl"
          :href="notification.ctaUrl"
          class="mr-4 capitalize"
          @click="closePopup"
        >
          Read more
        </Button>
      </div>
    </div>
  </n-card>
</template>
