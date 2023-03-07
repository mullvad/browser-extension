<script lang="ts" setup>
import { NCard } from 'naive-ui';

import { closePopup } from '@/helpers/closePopup';

import Button from '@/components/Buttons/Button.vue';
import IconLabel from '@/components/IconLabel.vue';

import useWarnings from '@/composables/useWarnings/useWarnings';

const { activeWarnings } = useWarnings();
</script>

<template v-if="activeWarnings.length !== 0">
  <n-card
    v-for="(warning, index) in activeWarnings"
    :key="index"
    :bordered="false"
    class="mt-3 mb-4"
  >
    <template #header>
      <IconLabel :text="warning.name" :type="warning.iconType || 'info'" />
    </template>

    <div class="flex flex-col justify-start">
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
</template>
