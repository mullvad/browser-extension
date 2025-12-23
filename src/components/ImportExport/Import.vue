<script setup lang="ts">
import { NButton, NCard } from 'naive-ui';
import TitleCategory from '@/components/TitleCategory.vue';
import { ref } from 'vue';
import useSocksProxy from '@/composables/useSocksProxy';

// CustomProxies.vue uses useSocksProxy, so use that here too to ensure reactivity
const { excludedHosts, globalProxy, globalProxyDetails, hostProxies, hostProxiesDetails } =
  useSocksProxy();

const fileInputRef = ref<HTMLInputElement | null>(null);
const message = ref<string>('');
const settings = ref<ReturnType<JSON['parse']>>('');
const importSuccess = ref<boolean>(false);

const loadSettings = async () => {
  const file = fileInputRef.value?.files?.[0];

  if (!file) {
    message.value = 'Please choose a file';
    return;
  }

  if (!file.name.endsWith('.json')) {
    message.value = 'Please choose a .json file';
    return;
  }

  message.value = '';
  importSuccess.value = false;
  const text = await file.text();
  settings.value = JSON.parse(text);
};

const importSettings = async () => {
  try {
    excludedHosts.value = settings.value.excludedHosts;
    globalProxy.value = settings.value.globalProxy;
    globalProxyDetails.value = settings.value.globalProxyDetails;
    hostProxies.value = settings.value.hostProxies;
    hostProxiesDetails.value = settings.value.hostProxiesDetails;

    importSuccess.value = true;
    settings.value = '';

    // Reset the input field
    if (fileInputRef.value) {
      fileInputRef.value.value = '';
    }
  } catch (error) {
    importSuccess.value = false;
    console.error(error);
  }
};
</script>

<template>
  <TitleCategory title="Import proxy settings" />
  <n-card class="mt-2 mb-8">
    <div>
      <p v-if="message" class="text-error mb-2">{{ message }}</p>
      <input ref="fileInputRef" type="file" required @change="loadSettings()" />
    </div>
    <div v-if="settings" class="settings">
      <p>To be imported:</p>
      <pre>{{ settings }}</pre>
    </div>
    <div v-if="importSuccess" class="mt-4">Successfully imported.</div>
    <div v-else-if="settings" class="mt-4">
      <n-button secondary medium @click="importSettings()">Import</n-button>
    </div>
  </n-card>
</template>

<style scoped>
.settings {
  margin-block: 1rem;

  pre {
    max-height: 300px;
    overflow: auto;
    font-size: small;
    background-color: var(--dark-blue);
    padding: 0.5rem;
  }
}
</style>
