<script lang="ts" setup>
import { setWebRTC } from '@/helpers/webRTC';
import useStore from '@/composables/useStore';

const { webrtcDisabled } = useStore();
const toggleWebrtc = (event: Event) => {
  setWebRTC((event.target as HTMLInputElement).checked);
};

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
            @change="toggleWebrtc($event)"
          />
          <span class="slider round" />
        </label>
      </div>
    </div>
  </section>
</template>
