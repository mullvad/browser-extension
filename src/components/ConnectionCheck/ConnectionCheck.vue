<script lang="ts" setup>
import { inject, ref } from 'vue';
import { NCard, NCollapseTransition, NIcon } from 'naive-ui';

import ConnectionDetails from '@/components/ConnectionCheck/ConnectionDetails.vue';
import ConnectionLocation from '@/components/ConnectionCheck/ConnectionLocation.vue';
import FeChevronDown from '@/components/Icons/FeChevronDown.vue';
import FeChevronUp from '@/components/Icons/FeChevronUp.vue';
import IconLabel from '@/components/IconLabel.vue';
import WebTRCDetails from '@/components/ConnectionCheck/WebTRCDetails.vue';

import { ConnectionKey, defaultConnection } from '@/composables/useConnection';
import { DnsServer } from '@/composables/useCheckDnsLeaks';

defineProps<{
  dnsServers: DnsServer[];
  isErrorDNS: boolean;
  isLoadingDNS: boolean;
  isProxyInUse: boolean;
}>();

const { isLoading, isError, connection } = inject(ConnectionKey, defaultConnection);

const showDetails = ref(true);
</script>

<template>
  <n-card :bordered="false" class="mb-2">
    <div v-if="isLoading || isError">
      <p>
        <IconLabel v-if="isLoading" text="Checking connection" type="spinner" />
        <IconLabel
          v-if="isError || (!isLoading && isProxyInUse && !connection.isMullvad)"
          type="warning"
        >
          Internet can't be reached. Make sure you're connected to the internet and Mullvad VPN, or
          disable the proxy.
        </IconLabel>
      </p>
    </div>

    <div v-else>
      <div>
        <ConnectionLocation />
        <n-icon size="20" class="cursor-pointer" @click="showDetails = !showDetails">
          <FeChevronUp v-if="showDetails" />
          <FeChevronDown v-else />
        </n-icon>
      </div>

      <div>
        <n-collapse-transition :show="showDetails">
          <ConnectionDetails :dnsServers :isErrorDNS :isLoadingDNS />
          <WebTRCDetails />
        </n-collapse-transition>
      </div>
    </div>
  </n-card>
</template>
