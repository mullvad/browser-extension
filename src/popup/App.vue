<script lang="ts" setup>
import { onMounted, provide } from 'vue';
import { NConfigProvider, darkTheme } from 'naive-ui';

import Popup from '@/popup/Popup.vue';
import { themeOverrides } from '@/styles/themeOverrides';

import useConnection, { ConnectionKey } from '@/composables/useConnection/useConnection';
import useConnectionStatus from '@/composables/useConnection/useConnectionStatus';

const { isLoading, connection, isError } = useConnection();
const { checkStatus } = useConnectionStatus();

provide(ConnectionKey, { connection, isLoading, isError });

onMounted(() => {
  void checkStatus();
});
</script>

<template>
  <n-config-provider :theme-overrides="themeOverrides" :theme="darkTheme">
    <Popup />
  </n-config-provider>
</template>
