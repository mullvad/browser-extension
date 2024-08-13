<script lang="ts" setup>
import { provide } from 'vue';
import { NConfigProvider, darkTheme } from 'naive-ui';

import Popup from '@/popup/Popup.vue';
import { themeOverrides } from '@/styles/themeOverrides';
import useConnection, { ConnectionKey } from '@/composables/useConnection';

const { isLoading, connection, isError } = useConnection();
provide(ConnectionKey, { connection, isLoading, isError });
</script>

<template>
  <n-config-provider :theme-overrides="themeOverrides" :theme="darkTheme">
    <Popup />
  </n-config-provider>
</template>
