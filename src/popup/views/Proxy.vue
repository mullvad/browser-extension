<script lang="ts" setup>
import { computed, inject } from 'vue';

import IconLabel from '@/components/IconLabel.vue';
import LocationDrawer from '@/components/ConnectionDetails/LocationDrawer.vue';
import ProxyGlobal from '@/components/Proxy/ProxyGlobal.vue';
import ProxyHost from '@/components/Proxy/ProxyHost.vue';

import useActiveTab from '@/composables/useActiveTab';
import { ConnectionKey, defaultConnection } from '@/composables/useConnection';

const { isAboutPage } = useActiveTab();
const { connection } = inject(ConnectionKey, defaultConnection);

const isWireGuard = computed(
  () =>
    connection.value.protocol === 'WireGuard' ||
    connection.value.protocol === 'SOCKS through WireGuard',
);
</script>

<template>
  <IconLabel v-if="!isWireGuard" type="warning" class="my-2">
    Connect first to Mullvad VPN (WireGuard) to use the proxy.
  </IconLabel>

  <div>
    <ProxyHost v-if="!isAboutPage" />
    <ProxyGlobal />
    <LocationDrawer />
  </div>
</template>
