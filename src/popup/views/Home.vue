<script lang="ts" setup>
import { inject, onMounted, ref } from 'vue';

import ConnectionDetails from '@/components/ConnectionDetails/ConnectionDetails.vue';
import IconLabel from '@/components/IconLabel.vue';
import NotificationsCarousel from '@/components/NotificationsCarousel.vue';

import useActiveTab from '@/composables/useActiveTab';
import { ConnectionKey, defaultConnection } from '@/composables/useConnection';
import useProxyPermissions from '@/composables/useProxyPermissions';
import useSocksProxy from '@/composables/useSocksProxy';
import useStore from '@/composables/useStore';

const { proxyPermissionsGranted } = useProxyPermissions();
const { activeTabHost } = useActiveTab();
const { currentHostProxyDetails, currentHostProxyEnabled } = useSocksProxy();
const { excludedHosts } = useStore();
const { isLoading, isError, connection } = inject(ConnectionKey, defaultConnection);

const currentHostExcluded = ref(false);

onMounted(async () => {
  if (proxyPermissionsGranted.value) {
    currentHostExcluded.value = excludedHosts.value.includes(activeTabHost.value);
  }
});
</script>

<template>
  <NotificationsCarousel v-if="!isLoading && !isError" />
  <ConnectionDetails />
  <div v-if="!isLoading && proxyPermissionsGranted">
    <IconLabel v-if="currentHostExcluded" type="info" class="my-2">
      <strong>{{ activeTabHost }}</strong> is set to never be proxied
    </IconLabel>

    <IconLabel v-else-if="currentHostProxyEnabled && connection.isMullvad" type="info" class="my-2">
      <strong>{{ activeTabHost }}</strong> is set to always be proxied through
      <strong>{{ currentHostProxyDetails.server }}</strong>
    </IconLabel>

    <IconLabel v-if="currentHostProxyEnabled && !connection.isMullvad" type="warning" class="my-2">
      <strong>{{ activeTabHost }}</strong> can't be reached, either disconnect its proxy or connect
      to Mullvad VPN.
    </IconLabel>
  </div>
</template>
