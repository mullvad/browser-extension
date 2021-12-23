<script lang="ts" setup>
import UsingMullvadConnectionStatus from '@/components/ConnectionStatus/UsingMullvadConnectionStatus.vue';
import UsingProxyConnectionStatus from '@/components/ConnectionStatus/UsingProxyConnectionStatus.vue';
import UsingRecommendedExtensionsConnectionStatus from '@/components/ConnectionStatus/UsingRecommendedExtensionsConnectionStatus.vue';
import { Extension } from '@/composables/useExtensions/Extension.types';

defineProps<{ connected: boolean; extensions: Extension[]; protocol?: string }>();
</script>
<template>
  <div v-if="connected" class="mt-8">
    <UsingMullvadConnectionStatus :connected="connected" />
    <UsingProxyConnectionStatus :protocol="protocol" />
    <UsingRecommendedExtensionsConnectionStatus :extensions="extensions" />
  </div>
</template>
