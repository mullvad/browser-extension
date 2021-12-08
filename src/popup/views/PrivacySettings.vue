<script lang="ts" setup>
import { ref } from 'vue';
import { setWebRTC } from '@/helpers/webRTC';
import { storageLocal } from '@/helpers/storageLocal';

const webrtcDisabled = ref(true);
const toggleWebrtc = (checked: boolean) => {
  setWebRTC(checked);
};
storageLocal.webrtcDisabled.get().then((checked) => {
  webrtcDisabled.value = checked;
});
</script>
<template>
  <section>
    <div class="container">
      <div class="switch-container">
        <p>Disable WebRTC</p>
        <label class="switch">
          <input
            v-model="webrtcDisabled"
            type="checkbox"
            @change="toggleWebrtc($event.target.checked)"
          />
          <span class="slider round" />
        </label>
      </div>
    </div>
  </section>
</template>
