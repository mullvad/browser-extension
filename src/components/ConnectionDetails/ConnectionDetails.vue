<script lang="ts" setup>
import LaSpinner from '~icons/la/spinner';
import { Connection } from '@/helpers/connCheck';
import ConnectionLocation from '@/components/ConnectionLocation/ConnectionLocation.vue';
import DetailsCollapse from '@/components/ConnectionDetails/DetailsCollapse.vue';
import ProxyCollapse from '@/components/ConnectionDetails/ProxyCollapse.vue';

defineProps<{ connection: Connection; isLoading: boolean }>();
</script>
<template>
  <h1 class="text-sm pb-1 pt-4">Connection</h1>
  <div>
    <p v-if="isLoading" class="text-lg flex items-center">
      Loading location<LaSpinner class="ml-2 animate-spin" />
    </p>
    <ConnectionLocation v-else :connection="connection" />
  </div>
  <DetailsCollapse :is-loading="isLoading" :connection="connection" />
  <ProxyCollapse />
</template>
