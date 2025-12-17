<script lang="ts" setup>
import { computed, inject } from 'vue';

import FeLock from '@/components/Icons/FeLock.vue';
import FeDrop from '@/components/Icons/FeDrop.vue';
import FeXCircle from '@/components/Icons/FeXCircle.vue';
import FeHelpCircle from '@/components/Icons/FeHelpCircle.vue';
import MuSpinner from '@/components/Icons/MuSpinner.vue';

import { DnsServer } from '@/composables/useConnection/useCheckDnsLeaks';
import { ConnectionKey, defaultConnection } from '@/composables/useConnection/useConnection';

defineProps<{
  dnsServers: DnsServer[];
  isErrorDNS: boolean;
  isLeakingDNS: boolean;
  isLoadingDNS: boolean;
  isMullvadDNS: boolean;
  isMullvadDoh: boolean;
}>();

const { connection } = inject(ConnectionKey, defaultConnection);
const isMullvad = computed(() => connection.value.isMullvad);
</script>

<template>
  <div class="ml-30px">
    <div>
      <h4 class="font-semibold inline-block">IP</h4>
      <span class="ml-2"
        >{{ connection.ip }} <span v-if="connection.ipv6"> / {{ connection.ipv6 }}</span></span
      >
    </div>
    <div>
      <h4 class="font-semibold inline-block">Provider</h4>
      <span class="ml-2">{{ connection.provider }}</span>
    </div>
    <div v-if="isMullvad">
      <h4 class="font-semibold inline-block">Server</h4>
      <span class="ml-2">{{ connection.server }}</span>
    </div>
    <div class="flex flex-row">
      <h4 class="font-semibold mr-2">DNS</h4>

      <div>
        <div v-if="isLoadingDNS" class="flex items-center">
          <MuSpinner />
        </div>

        <div
          v-else-if="dnsServers.length > 0"
          v-for="dnsServer in dnsServers"
          :key="dnsServer.ip"
          class="flex flex-row"
        >
          <div class="inline-flex items-center">
            <FeLock v-if="isMullvadDNS || isMullvadDoh" class="text-success" />
            <FeDrop v-if="isLeakingDNS && isMullvad" class="text-error" />
            <FeXCircle v-else-if="isLeakingDNS && !isMullvad" class="text-error" />
            <span class="ml-1">
              {{ dnsServer.ip }}
              ({{
                dnsServer.mullvad_dns_hostname ||
                dnsServer.hostname ||
                dnsServer.organization ||
                'unknown'
              }})
            </span>
          </div>
        </div>
        <div v-else-if="isErrorDNS" class="flex items-center">
          <FeHelpCircle class="text-warning" />
          <span class="ml-1">Couldn't determine DNS</span>
        </div>
      </div>
    </div>
  </div>
</template>
