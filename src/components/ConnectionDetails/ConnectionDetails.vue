<script lang="ts" setup>
import { computed, inject } from 'vue';

import ConnectionLocation from '@/components/ConnectionLocation/ConnectionLocation.vue';
import AdvancedDns from '@/components/ConnectionDetails/AdvancedDns.vue';
import AdvancedInfo from '@/components/ConnectionDetails/AdvancedInfo.vue';
import AdvancedWebRTC from '@/components/ConnectionDetails/AdvancedWebTRC.vue';
import IconLabel from '@/components/IconLabel.vue';
import ProxyDetails from '@/components/ProxyDetails/ProxyDetails.vue';

import UsingMullvadConnectionStatus from '@/components/ConnectionStatus/UsingMullvadConnectionStatus.vue';
import DnsLeakStatus from '@/components/ConnectionStatus/DnsLeakStatus.vue';

import { ConnectionKey, defaultConnection } from '@/composables/useConnection';

const { isLoading, isError, connection } = inject(ConnectionKey, defaultConnection);
const connected = computed(() => connection.value.isMullvad);
</script>

<template>
  <div class="p-2 pt-0">
    <IconLabel
      v-if="!connected && !isLoading"
      text="Not using Mullvad"
      type="info"
      class="my-2 text-lg"
    />

    <p class="text-xl mb-2">
      <IconLabel v-if="isLoading" text="Checking connection" type="spinner" />
      <IconLabel v-else-if="isError" text="Couldn't get connection details" type="warning" />
      <ConnectionLocation v-else />
    </p>

    <div v-if="!isLoading && !isError">
      <div v-if="connected" class="my-2">
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
        <div class="flex">
          <h4 class="font-semibold">DNS Server(s)</h4>
          <AdvancedDns class="ml-2" />
        </div>
      </div>
    </div>

    <ProxyDetails />
  </div>
</template>
