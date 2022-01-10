<script lang="ts" setup>
import LaSpinner from '~icons/la/spinner';
import Collapse from '@/components/Collapse.vue';
import useCheckDnsLeaks from '@/composables/useCheckDnsLeaks';
import useStore from '@/composables/useStore';
import { Connection } from '@/helpers/connCheck';

defineProps<{ connection: Connection; isLoading: boolean }>();
const { dnsServers, isLoading: isGettingDns } = useCheckDnsLeaks();
const { detailsExpanded } = useStore();
const toggleDetails = (open: boolean) => {
  detailsExpanded.value = open ?? false;
};
</script>
<template>
  <Collapse
    title="Details&hellip;"
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
        <tr>
          <td class="text-right">Server</td>
          <td class="text-white pl-2">
            {{ connection.server }}
          </td>
        </tr>
        <tr>
          <td class="text-right align-top">DNS Server(s)</td>
          <td v-if="isGettingDns" class="pl-2">
            <div class="flex items-center">
              Getting DNS Servers<LaSpinner class="ml-2 animate-spin" />
            </div>
          </td>
          <td v-else class="text-white pl-2">
            <div v-for="dnsServer in dnsServers" :key="dnsServer.ip">{{ dnsServer.ip }}</div>
          </td>
        </tr>
      </tbody>
    </table>
  </Collapse>
</template>
