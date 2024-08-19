<script lang="ts" setup>
import { inject } from 'vue';

import AdvancedDns from '@/components/ConnectionDetails/AdvancedDns.vue';
import AdvancedInfo from '@/components/ConnectionDetails/AdvancedInfo.vue';
import AdvancedWebRTC from '@/components/ConnectionDetails/AdvancedWebTRC.vue';
import ConnectionLocation from '@/components/ConnectionLocation/ConnectionLocation.vue';
import IconLabel from '@/components/IconLabel.vue';

import UsingMullvadConnectionStatus from '@/components/ConnectionStatus/UsingMullvadConnectionStatus.vue';
import DnsLeakStatus from '@/components/ConnectionStatus/DnsLeakStatus.vue';

import { ConnectionKey, defaultConnection } from '@/composables/useConnection';
import useSocksProxy from '@/composables/useSocksProxy';

const { globalProxyEnabled } = useSocksProxy();
const { isLoading, isError, connection } = inject(ConnectionKey, defaultConnection);
</script>

<template>
  <div class="p-2 pt-0">
    <div v-if="isLoading || isError">
      <p class="mb-2">
        <IconLabel v-if="isLoading" text="Checking connection" type="spinner" />
        <IconLabel v-if="isError" text="Couldn't get connection details" type="warning" />
      </p>

      <div v-if="globalProxyEnabled">
        <p>Either disconnect the default proxy (all websites) or connect to Mullvad VPN.</p>
      </div>
    </div>

    <div v-else>
      <ConnectionLocation />
      <div v-if="connection.isMullvad" class="my-2">
        <UsingMullvadConnectionStatus class="text-lg" />
        <AdvancedInfo :disabled="isLoading" />

        <DnsLeakStatus class="text-lg" />
        <AdvancedDns :disabled="isLoading" />

        <AdvancedWebRTC />
      </div>

      <div v-else class="mb-4 mt-1">
        <div class="flex">
          <h4 class="font-semibold">IP</h4>
          <div class="ml-2">{{ connection.ip }}</div>
        </div>
        <div v-if="connection.ipv6" class="flex">
          <h4 class="font-semibold">IPv6</h4>
          <div class="ml-2">{{ connection.ipv6 }}</div>
        </div>
        <div class="flex">
          <h4 class="font-semibold">Provider</h4>
          <div class="ml-2">{{ connection.provider }}</div>
        </div>
        <DnsLeakStatus class="text-lg mt-2" />
        <AdvancedDns class="ml-8" />
      </div>
    </div>
  </div>
</template>
