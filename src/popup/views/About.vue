<script lang="ts" setup>
import { runtime } from 'webextension-polyfill';
import TitleCategory from '@/components/TitleCategory.vue';

const { version } = runtime.getManifest();
</script>

<template>
  <TitleCategory title="About Mullvad Privacy Companion" />
  <p>
    Mullvad Privacy Companion version <span class="text-white">{{ version }}</span>
  </p>
</template>
