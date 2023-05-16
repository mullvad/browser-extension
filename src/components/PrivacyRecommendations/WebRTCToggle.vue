<script lang="ts" setup>
import { ref, watchEffect } from 'vue';
import { NCard, NSwitch, NTooltip } from 'naive-ui';

import Button from '@/components/Buttons/Button.vue';
import ExternalLinkIconLabel from '@/components/ExternalLinkIconLabel.vue';
import IconLabel from '@/components/IconLabel.vue';

import { closePopup } from '@/helpers/closePopup';
import useWebRtc from '@/composables/useWebRtc';

const { setWebRTC, webRTCStatus } = useWebRtc();
const webRTCLabel = ref('Enabled');

watchEffect(() => {
  webRTCLabel.value = webRTCStatus.value ? 'Enabled' : 'Disabled';
});
</script>

<template>
  <n-card id="webrtc-leak" :bordered="false">
    <div class="flex justify-between">
      <h2 class="text-lg">WebRTC</h2>
      <n-tooltip>
        <template #trigger>
          <n-switch v-model:value="webRTCStatus" @update-value="setWebRTC(webRTCStatus)" />
        </template>
        <span>{{ webRTCLabel }}</span>
      </n-tooltip>
    </div>

    <div class="py-4 flex items-center">
      <IconLabel
        text="If a webRTC leak is reported, read the guide before disabling it."
        type="info"
      />
    </div>

    <Button href="https://mullvad.net/en/help/webrtc/" @click="closePopup">
      <ExternalLinkIconLabel text="Read the guide" />
    </Button>
  </n-card>
</template>

<style scoped>
.n-card {
  scroll-margin-top: 15px;
}
</style>
