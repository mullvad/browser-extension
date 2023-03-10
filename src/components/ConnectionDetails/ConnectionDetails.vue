<script lang="ts" setup>
import { computed, inject } from 'vue';
import { NCard } from 'naive-ui';

import ConnectionLocation from '@/components/ConnectionLocation/ConnectionLocation.vue';
import AdvancedDns from '@/components/ConnectionDetails/AdvancedDns.vue';
import AdvancedInfo from '@/components/ConnectionDetails/AdvancedInfo.vue';
import IconLabel from '@/components/IconLabel.vue';
import TitleCategory from '@/components/TitleCategory.vue';
import ProxyDetails from '@/components/ProxyDetails/ProxyDetails.vue';

import FeChevronDown from '@/components/Icons/FeChevronDown.vue';

import UsingMullvadConnectionStatus from '@/components/ConnectionStatus/UsingMullvadConnectionStatus.vue';
import DnsLeakStatus from '@/components/ConnectionStatus/DnsLeakStatus.vue';

import { ConnectionKey, defaultConnection } from '@/composables/useConnection';

const { isLoading, isError, connection } = inject(ConnectionKey, defaultConnection);
const connected = computed(() => connection.value.isMullvad);
</script>

<template>
  <TitleCategory title="Connection" />

  <n-card :bordered="false">
    <p class="text-xl">
      <IconLabel v-if="isLoading" text="Checking connection" type="spinner" />
      <IconLabel v-else-if="isError" text="Couldn't get connection details" type="warning" />
      <ConnectionLocation v-else />
    </p>

    <div v-if="!isLoading && !isError">
      <div v-if="connected" class="my-2">
        <div class="inline-flex items-center">
          <UsingMullvadConnectionStatus />
          <p class="text-size-20px ml-1">
            <FeChevronDown />
          </p>
        </div>
        <AdvancedInfo :disabled="isLoading" />

        <div class="inline-flex items-center">
          <DnsLeakStatus />
          <p class="text-size-20px ml-1">
            <FeChevronDown />
          </p>
        </div>
        <AdvancedDns :disabled="isLoading" class="mb-2" />
      </div>

      <div v-else class="mb-4">
        <div>
          <h4 class="font-semibold inline-block">IP</h4>
          <span class="ml-2">{{ connection.ip }}</span>
        </div>
        <div v-if="connection.ipv6">
          <h4 class="font-semibold inline-block">IPv6</h4>
          <span class="ml-2">{{ connection.ipv6 }}</span>
        </div>
        <div>
          <h4 class="font-semibold inline-block">Provider</h4>
          <span class="ml-2">{{ connection.provider }}</span>
        </div>
        <div class="inline-flex">
          <h4 class="font-semibold">DNS Server(s)</h4>
          <span class="ml-2">
            <AdvancedDns />
          </span>
        </div>
      </div>
    </div>

    <ProxyDetails />
  </n-card>
</template>
