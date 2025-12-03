<script lang="ts" setup>
import ConnectionCheck from '@/components/ConnectionCheck/ConnectionCheck.vue';
import PopupProxyPanel from '@/components/Proxy/PopupProxyPanel.vue';
import LocationDrawer from '@/components/LocationDrawer.vue';
import NotificationsCarousel from '@/components/NotificationsCarousel.vue';
import PopupHeader from '@/components/PopupHeader.vue';

import useCheckDnsLeaks from '@/composables/useCheckDnsLeaks';

const { dnsServers, isError, isLeaking, isLoading, isMullvadDNS, isMullvadDoh } =
  useCheckDnsLeaks();
</script>

<template>
  <main class="w-[450px] m-3">
    <PopupHeader
      :isLeaking
      :isErrorDNS="isError"
      :isLoadingDNS="isLoading"
      :isMullvadDNS
      :isMullvadDoh
    />
    <ConnectionCheck :dnsServers :isErrorDNS="isError" :isLoadingDNS="isLoading" />
    <PopupProxyPanel />
    <LocationDrawer />
    <NotificationsCarousel />
  </main>
</template>
