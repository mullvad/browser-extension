<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { NButton, NCard, NFlex } from 'naive-ui';

import MuSpinner from '@/components/Icons/MuSpinner.vue';
import TitleCategory from '@/components/TitleCategory.vue';

import useSocksProxy from '@/composables/useSocksProxy';

const href = ref('');

/**
 * Create a blob URL of the exportable data.
 * The blob URL is then added to an <a> tag.
 * This way the data can be downloaded without the use of downloads API,
 * which would require additional permissions.
 */
const setupExport = async () => {
  const { excludedHosts, globalProxy, globalProxyDetails, hostProxies, hostProxiesDetails } =
    useSocksProxy();

  const data = {
    excludedHosts: excludedHosts.value,
    globalProxy: globalProxy.value,
    globalProxyDetails: globalProxyDetails.value,
    hostProxies: hostProxies.value,
    hostProxiesDetails: hostProxiesDetails.value,
  };

  const jsonString = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonString], {
    type: 'application/json;charset=utf-8',
  });

  href.value = URL.createObjectURL(blob);
};

onMounted(() => {
  setupExport();
});
</script>

<template>
  <div>
    <TitleCategory title="Export proxy settings" />
    <n-card class="mt-2">
      <n-flex v-if="!href" align="center"> Loading <MuSpinner /> </n-flex>
      <n-button
        v-else
        secondary
        medium
        tag="a"
        :href
        download="mullvad-browser-extension-settings.json"
        >Export</n-button
      >
    </n-card>
  </div>
</template>
