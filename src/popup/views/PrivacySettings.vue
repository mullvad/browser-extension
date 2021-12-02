<script lang="ts" setup>
import { setWebRTC } from "@/helpers/webRTC";
import { storageLocal } from "@/helpers/storageLocal";

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
            type="checkbox"
            v-model="webrtcDisabled"
            @change="toggleWebrtc($event.target.checked)"
          />
          <span class="slider round"></span>
        </label>
      </div>
    </div>
  </section>
</template>
