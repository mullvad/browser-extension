<script lang="ts" setup>
import { inject } from 'vue';

import ConnectionDetails from '@/components/ConnectionDetails/ConnectionDetails.vue';
import NotificationsCarousel from '@/components/NotificationsCarousel.vue';
import HomeProxyStatus from '@/components/Proxy/HomeProxyStatus.vue';

import { ConnectionKey, defaultConnection } from '@/composables/useConnection';
import useProxyPermissions from '@/composables/useProxyPermissions';

const { proxyPermissionsGranted } = useProxyPermissions();

const { isLoading, isError } = inject(ConnectionKey, defaultConnection);
</script>

<template>
  <NotificationsCarousel v-if="!isLoading && !isError" />
  <ConnectionDetails />
  <HomeProxyStatus v-if="!isLoading && proxyPermissionsGranted" />
</template>
