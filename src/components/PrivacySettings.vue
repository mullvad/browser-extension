<script lang="ts" setup>
import { NSwitch, SwitchProps } from 'naive-ui';
import useWebRtc from '@/composables/useWebRtc';

type SwitchThemeOverrides = NonNullable<SwitchProps['themeOverrides']>;
const switchThemeOverrides: SwitchThemeOverrides = {
  railColorActive: 'var(--success)',
  railColor: 'var(--error)',
};

const { webrtcDisabled, setWebRTC } = useWebRtc();
</script>

<template>
  <section>
    <p>Disable WebRTC</p>
    <n-switch
      v-model:value="webrtcDisabled"
      :theme-overrides="switchThemeOverrides"
      @update:value="setWebRTC"
    />
  </section>
</template>
