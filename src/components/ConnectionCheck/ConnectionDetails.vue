<script lang="ts" setup>
import { inject } from 'vue';

import FeCheckCircle from '@/components/Icons/FeCheckCircle.vue';
import FeDrop from '@/components/Icons/FeDrop.vue';
import FeXCircle from '@/components/Icons/FeXCircle.vue';
import FeHelpCircle from '@/components/Icons/FeHelpCircle.vue';
import MuSpinner from '@/components/Icons/MuSpinner.vue';

import { ConnectionKey, defaultConnection } from '@/composables/useConnection';
import { DnsServer } from '@/composables/useCheckDnsLeaks';

defineProps<{
  dnsServers: DnsServer[];
  isErrorDNS: boolean;
  isLoadingDNS: boolean;
}>();

const { connection } = inject(ConnectionKey, defaultConnection);
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
    <div v-if="connection.isMullvad">
      <h4 class="font-semibold inline-block">Server</h4>
      <span class="ml-2">{{ connection.server }}</span>
    </div>
    <div class="flex flex-row">
      <h4 class="font-semibold mr-2">DNS</h4>

      <div>
        <div v-if="isLoadingDNS" class="flex items-center">
          <MuSpinner />
        </div>
        <div v-if="isErrorDNS" class="flex items-center">
          <FeHelpCircle class="text-warning" />
          <span class="ml-1">Couldn't determine DNS</span>
        </div>
        <div v-for="dnsServer in dnsServers" :key="dnsServer.ip" class="flex flex-row">
          <div class="inline-flex items-center">
            <FeDrop v-if="connection.isMullvad && !dnsServer.mullvad_dns" class="text-error" />
            <FeCheckCircle v-if="dnsServer.mullvad_dns" class="text-success" />
            <FeXCircle v-if="!connection.isMullvad && !dnsServer.mullvad_dns" class="text-error" />
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
      </div>
    </div>
  </div>
</template>
