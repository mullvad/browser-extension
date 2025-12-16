<script lang="ts" setup>
import { computed } from 'vue';

import ConnectionCheck from '@/components/ConnectionCheck/ConnectionCheck.vue';
import PopupProxyPanel from '@/components/Proxy/PopupProxyPanel.vue';
import LocationDrawer from '@/components/LocationDrawer.vue';
import NotificationsCarousel from '@/components/NotificationsCarousel.vue';
import PopupHeader from '@/components/PopupHeader.vue';

import useSocksProxy from '@/composables/useSocksProxy';
import useRandomProxy from '@/composables/useRandomProxy';

const { globalProxyEnabled, currentHostProxyEnabled } = useSocksProxy();
const { randomProxyMode } = useRandomProxy();

const isProxyInUse = computed(
  () => !!(randomProxyMode.value || currentHostProxyEnabled.value || globalProxyEnabled.value),
);
</script>

<template>
  <main class="w-[450px] m-3">
    <PopupHeader :isProxyInUse />
    <ConnectionCheck :isProxyInUse />
    <PopupProxyPanel />
    <LocationDrawer />
    <NotificationsCarousel />
  </main>
</template>
