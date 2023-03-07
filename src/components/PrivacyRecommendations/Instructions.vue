<script lang="ts" setup>
import IconLabel from '@/components/IconLabel.vue';
import FeMenu from '@/components/Icons/FeMenu.vue';

import { Recommendation } from '@/composables/useRecommendations/Recommendation.types';
import { computed } from 'vue';

const props = defineProps<{ recommendation: Recommendation }>();

const title = computed(() => {
  return `How to enable ${props.recommendation.name}`;
});
</script>

<template>
  <div class="flex-col">
    <IconLabel :text="title" type="info" class="mb-2" />
    <ol class="ml-4 list-decimal">
      <li>
        <p class="flex items-center">
          Click the&nbsp;<em class="inline-flex">
            <FeMenu /> </em
          >&nbsp;icon in the top right corner of the browser
        </p>
      </li>
      <li>Click <em>Settings</em></li>
      <li>Click <em>Privacy & Security</em> in the left hand sidebar</li>
      <li>Scroll down to <em>HTTPS-Only Mode</em></li>
      <li>Select <em>Enable HTTPS-Only Mode in all windows</em></li>
    </ol>
  </div>
</template>
