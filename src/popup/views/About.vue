<script lang="ts" setup>
import { runtime } from 'webextension-polyfill';

const { version } = runtime.getManifest();
</script>

<template>
  <h1 class="text-2xl mb-4">About Mullvad Privacy Companion</h1>
  <p>Mullvad Privacy Companion version <span class="text-white">{{version}}</span></p>
</template>
