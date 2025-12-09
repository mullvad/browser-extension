<script lang="ts" setup>
import { computed } from 'vue';

import IconLabel from '@/components/IconLabel.vue';
import useWebRtc from '@/composables/useWebRtc';

const { webRTCLeaking, webRTCLeakedIPs } = useWebRtc();

const labelText = computed(() =>
  webRTCLeaking.value ? 'WebRTC is leaking internal IPs' : 'No webRTC Leaks',
);
const iconType = computed(() => (webRTCLeaking.value ? 'leak' : 'success'));
</script>

<template>
  <!-- On Chromium, by default internal IPs are leaking, so this should always be displayed -->
  <div v-if="webRTCLeaking">
    <div class="flex items-center text-lg">
      <IconLabel :text="labelText" :type="iconType" />
    </div>

    <div class="mb-2 ml-35px">
      <div>
        <div v-for="ip in webRTCLeakedIPs" :key="ip">
          <IconLabel :text="ip" type="leak" />
        </div>
      </div>
    </div>
  </div>
</template>
