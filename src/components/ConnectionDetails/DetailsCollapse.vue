<script lang="ts" setup>
import { inject } from 'vue';

import Collapse from '@/components/Collapse.vue';
import LaSpinner from '@/components/Icons/LaSpinner.vue';

import { ConnectionKey, defaultConnection } from '@/composables/useConnection';
import useCheckDnsLeaks from '@/composables/useCheckDnsLeaks';
import useStore from '@/composables/useStore';

const { connection, isLoading } = inject(ConnectionKey, defaultConnection);
const { dnsServers, isLoading: isGettingDns, isError } = useCheckDnsLeaks();
const { detailsExpanded } = useStore();
const toggleDetails = (open: boolean) => {
  detailsExpanded.value = open ?? false;
};
</script>

<template>
  <Collapse
    title="Connection details"
    :open="detailsExpanded"
    :disabled="isLoading"
    @toggle="toggleDetails"
  >
    <table>
      <tbody>
        <tr>
          <td class="text-right">IP</td>
          <td class="text-white px-2">
            {{ connection.ip }}
          </td>
        </tr>
        <tr v-if="connection.ipv6">
          <td class="text-right">IPv6</td>
          <td class="text-white pl-2">{{ connection.ipv6 }}</td>
        </tr>
        <tr>
          <td class="text-right">Provider</td>
          <td class="text-white pl-2">
            {{ connection.provider }}
          </td>
        </tr>
        <tr v-if="connection.isMullvad">
          <td class="text-right">Server</td>
          <td class="text-white pl-2">
            {{ connection.server }}
          </td>
        </tr>
        <tr>
          <td class="text-right align-top">DNS Servers</td>
          <td v-if="isGettingDns" class="pl-2">
            <div class="flex items-center">
              Getting DNS Servers<LaSpinner class="ml-2 animate-spin" />
            </div>
          </td>
          <td v-else-if="isError" class="pl-2">Could not determine DNS servers</td>
          <td v-else class="text-white pl-2">
            <div v-for="dnsServer in dnsServers" :key="dnsServer.ip">
              {{ dnsServer.ip }}
              <span
                v-if="
                  dnsServer.mullvad_dns_hostname || dnsServer.hostname || dnsServer.organization
                "
              >
                ({{
                  dnsServer.mullvad_dns_hostname || dnsServer.hostname || dnsServer.organization
                }})
              </span>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </Collapse>
</template>

<style scoped>
td:first-child {
  color: var(--light-grey);
}
</style>
