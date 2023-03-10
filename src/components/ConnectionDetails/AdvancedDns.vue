<script lang="ts" setup>
import IconLabel from '@/components/IconLabel.vue';
import MuSpinner from '@/components/Icons/MuSpinner.vue';

import useCheckDnsLeaks from '@/composables/useCheckDnsLeaks';

const { dnsServers, isLoading, isError } = useCheckDnsLeaks();
</script>

<template>
  <div v-if="isLoading">
    <div class="flex items-center">
      Determining DNS Servers
      <MuSpinner class="ml-2" />
    </div>
  </div>

  <div v-else-if="isError" class="pl-2">Could not determine DNS servers</div>

  <div v-else class="text-white ml-35px">
    <div v-for="dnsServer in dnsServers" :key="dnsServer.ip">
      <IconLabel
        :text="`${dnsServer.ip} (${
          dnsServer.mullvad_dns_hostname ||
          dnsServer.hostname ||
          dnsServer.organization ||
          'unknown'
        })`"
        :type="dnsServer.mullvad_dns_hostname ? 'check' : 'leak'"
      />
    </div>
  </div>
</template>
