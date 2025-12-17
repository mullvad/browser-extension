<script lang="ts" setup>
import { computed } from 'vue';

import ConnectionCheck from '@/components/ConnectionCheck/ConnectionCheck.vue';
import PopupProxyPanel from '@/components/Proxy/PopupProxyPanel.vue';
import LocationDrawer from '@/components/LocationDrawer.vue';
import NotificationsCarousel from '@/components/NotificationsCarousel.vue';
import PopupHeader from '@/components/PopupHeader.vue';

import useCheckDnsLeaks from '@/composables/useConnection/useCheckDnsLeaks';
import useRandomProxy from '@/composables/useRandomProxy';
import useSocksProxy from '@/composables/useSocksProxy';

const {
  isError: isErrorDNS,
  isLoading: isLoadingDNS,
  isLeaking: isLeakingDNS,
  isMullvadDNS,
  isMullvadDoh,
  dnsServers,
} = useCheckDnsLeaks();
const { randomProxyMode } = useRandomProxy();
const { globalProxyEnabled, currentHostProxyEnabled } = useSocksProxy();

const isProxyInUse = computed(
  () => !!(randomProxyMode.value || currentHostProxyEnabled.value || globalProxyEnabled.value),
);
</script>

<template>
  <main class="w-[450px] m-3">
    <PopupHeader
      :isErrorDNS
      :isLeakingDNS
      :isLoadingDNS
      :isMullvadDNS
      :isMullvadDoh
      :isProxyInUse
    />
    <ConnectionCheck
      :dnsServers
      :isErrorDNS
      :isLeakingDNS
      :isLoadingDNS
      :isMullvadDNS
      :isMullvadDoh
      :isProxyInUse
    />
    <PopupProxyPanel />
    <LocationDrawer />
    <NotificationsCarousel />
  </main>
</template>
