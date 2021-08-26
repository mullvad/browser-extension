<template>
  <sub-view
    title="Privacy settings"
    description="Here's a list of settings to configure the privacy of your browser"
  >
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
  </sub-view>
</template>

<script lang="ts">
import Vue from 'vue';
import router from '../router';

import { localStorage, setWebRTC } from '@/helpers';
import SubView from '../components/SubView.vue';

export default Vue.extend({
  name: 'PrivacySettings',
  components: {
    SubView,
  },
  data() {
    return {
      webrtcDisabled: true,
    };
  },
  methods: {
    handleBack() {
      router.push('/');
    },
    toggleWebrtc(checked: boolean): void {
      setWebRTC(checked);
    },
  },
  async created(): Promise<void> {
    this.webrtcDisabled = await localStorage.webrtcDisabled.get();
  },
});
</script>

<style lang="scss">
@import '../../assets/scss/colors';

.switch-container {
  display: flex;
  align-items: center;
}

/* switch */
.switch {
  position: relative;
  display: inline-block;
  width: 61px;
  height: 34px;
  margin-left: 0.5rem;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border: solid 1px $white;
  /* background-color: #ccc; */
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

/* Toggle circle */
.slider:before {
  position: absolute;
  content: '';
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  -webkit-transition: 0.4s;
  transition: 0.4s;
  background-color: $red;
}

input:checked + .slider::before {
  background-color: $green;
}

input:checked + .slider:before {
  transform: translateX(24px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}
</style>
