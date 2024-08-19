<script lang="ts" setup>
import { inject } from 'vue';
import { NIcon } from 'naive-ui';

import ConnectionDetails from '@/components/ConnectionDetails/ConnectionDetails.vue';
import FeCog from '@/components/Icons/FeCog.vue';
import HomeProxyStatus from '@/components/Proxy/HomeProxyStatus.vue';
import LocationDrawer from '@/components/ConnectionDetails/LocationDrawer.vue';
import NotificationsCarousel from '@/components/NotificationsCarousel.vue';

import { openOptions } from '@/helpers/browserExtension';

import { ConnectionKey, defaultConnection } from '@/composables/useConnection';
import useProxyPermissions from '@/composables/useProxyPermissions';

const { proxyPermissionsGranted } = useProxyPermissions();

const { isLoading, isError } = inject(ConnectionKey, defaultConnection);
</script>

<template>
  <main class="w-[450px] m-3">
    <div class="absolute z-60 top-4 right-4 hover:text-white cursor-pointer" @click="openOptions()">
      <n-icon size="20">
        <FeCog />
      </n-icon>
    </div>
    <NotificationsCarousel v-if="!isLoading && !isError" />
    <ConnectionDetails />
    <HomeProxyStatus v-if="!isLoading && proxyPermissionsGranted" />
    <LocationDrawer />
  </main>
</template>
