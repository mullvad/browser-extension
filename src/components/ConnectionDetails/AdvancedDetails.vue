<script lang="ts" setup>
import { inject } from 'vue';

import IconLabel from '@/components/IconLabel.vue';
import LaSpinner from '@/components/Icons/LaSpinner.vue';

import { ConnectionKey, defaultConnection } from '@/composables/useConnection';
import useCheckDnsLeaks from '@/composables/useCheckDnsLeaks';

const { connection, isLoading } = inject(ConnectionKey, defaultConnection);
const { dnsServers, isLoading: isGettingDns, isError } = useCheckDnsLeaks();
</script>

<template>
  <div :disabled="isLoading">
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
            <div class="flex items-center">Getting DNS Servers<LaSpinner class="ml-2" /></div>
          </td>
          <td v-else-if="isError" class="pl-2">Could not determine DNS servers</td>
          <td v-else class="text-white pl-2">
            <div v-for="dnsServer in dnsServers" :key="dnsServer.ip">
              <IconLabel
                :text="`${dnsServer.ip} (${
                  dnsServer.mullvad_dns_hostname ||
                  dnsServer.hostname ||
                  dnsServer.organization ||
                  'unknown'
                })`"
                :type="dnsServer.mullvad_dns_hostname ? 'success' : 'leak'"
              />
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
td:first-child {
  color: var(--light-grey);
}
</style>
