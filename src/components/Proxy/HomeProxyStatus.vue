<script lang="ts" setup>
import { computed, inject } from 'vue';

import IconLabel from '@/components/IconLabel.vue';

import useActiveTab from '@/composables/useActiveTab';
import { ConnectionKey, defaultConnection } from '@/composables/useConnection';
import useSocksProxy from '@/composables/useSocksProxy';
import useStore from '@/composables/useStore';

const { activeTabHost, isAboutPage } = useActiveTab();
const { currentHostProxyDetails, currentHostProxyEnabled, globalProxyDetails, globalProxyEnabled } =
  useSocksProxy();
const { excludedHosts } = useStore();
const { connection } = inject(ConnectionKey, defaultConnection);

const currentHostExcluded = computed(() => {
  return excludedHosts.value.includes(activeTabHost.value);
});
</script>

<template>
  <IconLabel v-if="currentHostExcluded" type="info" class="my-2">
    <strong>{{ activeTabHost }}</strong> is set to never be proxied
  </IconLabel>

  <IconLabel v-else-if="currentHostProxyEnabled && connection.isMullvad" type="info" class="my-2">
    <strong>{{ activeTabHost }}</strong> is set to always be proxied through
    <strong>{{ currentHostProxyDetails.server }}</strong>
  </IconLabel>

  <IconLabel
    v-if="globalProxyEnabled && connection.isMullvad && !isAboutPage"
    type="info"
    class="my-2"
  >
    All websites are set to be proxied through
    <strong>{{ globalProxyDetails.server }}</strong>
  </IconLabel>

  <IconLabel v-if="currentHostProxyEnabled && !connection.isMullvad" type="warning" class="my-2">
    <strong>{{ activeTabHost }}</strong> can't be reached, either disconnect its proxy or connect to
    Mullvad VPN.
  </IconLabel>
</template>
