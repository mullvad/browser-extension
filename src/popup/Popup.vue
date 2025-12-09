<script lang="ts" setup>
import { computed } from 'vue';

import ConnectionCheck from '@/components/ConnectionCheck/ConnectionCheck.vue';
import PopupProxyPanel from '@/components/Proxy/PopupProxyPanel.vue';
import LocationDrawer from '@/components/LocationDrawer.vue';
import NotificationsCarousel from '@/components/NotificationsCarousel.vue';
import PopupHeader from '@/components/PopupHeader.vue';

import useCheckDnsLeaks from '@/composables/useCheckDnsLeaks';
import useSocksProxy from '@/composables/useSocksProxy';
import useRandomProxy from '@/composables/useRandomProxy';

const { dnsServers, isError, isLeaking, isLoading, isMullvadDNS, isMullvadDoh } =
  useCheckDnsLeaks();
const { globalProxyEnabled, currentHostProxyEnabled } = useSocksProxy();
const { randomProxyMode } = useRandomProxy();

const isProxyInUse = computed(
  () => !!(randomProxyMode.value || currentHostProxyEnabled.value || globalProxyEnabled.value),
);
</script>

<template>
  <main class="w-[450px] m-3">
    <PopupHeader
      :isLeaking
      :isErrorDNS="isError"
      :isLoadingDNS="isLoading"
      :isMullvadDNS
      :isMullvadDoh
      :isProxyInUse
    />
    <ConnectionCheck :dnsServers :isProxyInUse :isErrorDNS="isError" :isLoadingDNS="isLoading" />
    <PopupProxyPanel />
    <LocationDrawer />
    <NotificationsCarousel />
  </main>
</template>
