<script lang="ts" setup>
import { inject, ref } from 'vue';
import LaSpinner from '~icons/la/spinner';
import ConnectionLocation from '@/components/ConnectionLocation/ConnectionLocation.vue';
import DetailsCollapse from '@/components/ConnectionDetails/DetailsCollapse.vue';
import ProxyCollapse from '@/components/ConnectionDetails/ProxyCollapse.vue';
import { ConnectionIsLoadingKey } from '@/composables/useConnection';

const isLoading = inject(ConnectionIsLoadingKey, ref(false));
</script>
<template>
  <h1 class="text-sm pb-1 pt-4">Connection</h1>
  <div>
    <p v-if="isLoading" class="text-lg flex items-center">
      Loading location<LaSpinner class="ml-2 animate-spin" />
    </p>
    <ConnectionLocation v-else />
  </div>
  <DetailsCollapse />
  <ProxyCollapse />
</template>
