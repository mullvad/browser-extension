<script lang="ts" setup>
import { computed, inject } from 'vue';
import { NCard } from 'naive-ui';

import ConnectionLocation from '@/components/ConnectionLocation/ConnectionLocation.vue';
import ConnectionStatus from '@/components/ConnectionStatus/ConnectionStatus.vue';
import DetailsCollapse from '@/components/ConnectionDetails/DetailsCollapse.vue';
import IconLabel from '@/components/IconLabel.vue';
import TitleCategory from '@/components/TitleCategory.vue';
import WarningNotifications from '@/components/WarningNotifications.vue';

import { ConnectionKey, defaultConnection } from '@/composables/useConnection';

const { isLoading, isError, connection } = inject(ConnectionKey, defaultConnection);
const connected = computed(() => connection.value.isMullvad);
</script>

<template>
  <TitleCategory title="Connection" />

  <WarningNotifications />

  <n-card :bordered="false" class="mb-4">
    <p class="text-xl mb-2">
      <IconLabel v-if="isLoading" text="Checking connection" type="spinner" />
      <IconLabel v-else-if="isError" text="Couldn't get connection details" type="warning" />
      <ConnectionLocation v-else class="mb-2" />
      <ConnectionStatus v-if="connected" />
    </p>
    <DetailsCollapse v-if="!isLoading && !isError" />
  </n-card>
</template>
