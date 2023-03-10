<script lang="ts" setup>
import IconLabel from '@/components/IconLabel.vue';
import MuSpinner from '@/components/Icons/MuSpinner.vue';

import useCheckDnsLeaks from '@/composables/useCheckDnsLeaks';

const { dnsServers, isLoading: isGettingDns, isError } = useCheckDnsLeaks();
</script>

<template>
  <h4 class="font-semibold inline-block">DNS Servers</h4>

  <div v-if="isGettingDns">
    <div class="flex items-center">
      Getting DNS Servers
      <MuSpinner class="ml-2" />
    </div>
  </div>

  <div v-else-if="isError" class="pl-2">Could not determine DNS servers</div>

  <div v-else class="text-white pl-2">
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
  </div>
</template>
