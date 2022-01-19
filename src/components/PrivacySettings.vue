<script lang="ts" setup>
import { NSwitch, SwitchProps } from 'naive-ui';
import { setWebRTC } from '@/helpers/webRTC';
import useStore from '@/composables/useStore';

type SwitchThemeOverrides = NonNullable<SwitchProps['themeOverrides']>;
const switchThemeOverrides: SwitchThemeOverrides = {
  railColorActive: 'var(--success)',
  railColor: 'var(--error)',
};

const { webrtcDisabled } = useStore();
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
