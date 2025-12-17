<script lang="ts" setup>
import { computed, inject } from 'vue';
import { NCard } from 'naive-ui';

import ConnectionDetails from '@/components/ConnectionCheck/ConnectionDetails.vue';
import ConnectionLocation from '@/components/ConnectionCheck/ConnectionLocation.vue';
import IconLabel from '@/components/IconLabel.vue';
import WebTRCDetails from '@/components/ConnectionCheck/WebTRCDetails.vue';

import { DnsServer } from '@/composables/useConnection/useCheckDnsLeaks';
import { ConnectionKey, defaultConnection } from '@/composables/useConnection/useConnection';

defineProps<{
  dnsServers: DnsServer[];
  isErrorDNS: boolean;
  isLeakingDNS: boolean;
  isLoadingDNS: boolean;
  isMullvadDNS: boolean;
  isMullvadDoh: boolean;
  isProxyInUse: boolean;
}>();

const { isLoading, isError, connection } = inject(ConnectionKey, defaultConnection);
const isMullvad = computed(() => connection.value.isMullvad);
</script>

<template>
  <n-card :bordered="false" class="mb-2">
    <div v-if="isLoading || isError">
      <p>
        <IconLabel v-if="isLoading" text="Checking connection" type="spinner" />
        <IconLabel v-if="isError || (!isLoading && isProxyInUse && !isMullvad)" type="warning">
          Internet can't be reached. Make sure you're connected to the internet and Mullvad VPN, or
          disable the proxy.
        </IconLabel>
      </p>
    </div>

    <div v-else>
      <ConnectionLocation />
      <ConnectionDetails
        :dnsServers
        :isErrorDNS
        :isLeakingDNS
        :isLoadingDNS
        :isMullvadDNS
        :isMullvadDoh
      />
      <WebTRCDetails />
    </div>
  </n-card>
</template>
