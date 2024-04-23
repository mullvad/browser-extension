<script lang="ts" setup>
import IconLabel from '@/components/IconLabel.vue';
import MuSpinner from '@/components/Icons/MuSpinner.vue';

import useCheckDnsLeaks from '@/composables/useCheckDnsLeaks';

const { dnsServers, isLoading, isError } = useCheckDnsLeaks();
</script>

<template>
  <div class="mb-2 ml-35px">
    <div v-if="isLoading">
      <div class="flex items-center">
        Determining DNS Servers
        <MuSpinner class="ml-2" />
      </div>
    </div>

    <div v-else-if="isError">Could not determine DNS servers</div>

    <div v-else>
      <div v-for="dnsServer in dnsServers" :key="dnsServer.ip">
        <IconLabel
          v-if="dnsServer.mullvad_dns"
          :text="`${dnsServer.ip} (${
            dnsServer.mullvad_dns_hostname ||
            dnsServer.hostname ||
            dnsServer.organization ||
            'unknown'
          })`"
          :type="dnsServer.mullvad_dns_hostname ? 'check' : 'leak'"
        />
        <span v-else>
          {{ dnsServer.ip }} ({{
            dnsServer.mullvad_dns_hostname ||
            dnsServer.hostname ||
            dnsServer.organization ||
            'unknown'
          }})
        </span>
      </div>
    </div>
  </div>
</template>
