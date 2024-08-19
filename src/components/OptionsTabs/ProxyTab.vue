<script setup lang="ts">
import { NCard } from 'naive-ui';

import Button from '@/components/Buttons/Button.vue';
import ProxyList from '@/components/Proxy/ProxyList.vue';
import IconLabel from '@/components/IconLabel.vue';
import TitleCategory from '@/components/TitleCategory.vue';
import useProxyPermissions from '@/composables/useProxyPermissions';

const { proxyPermissionsGranted, triggerRequestProxyPermissions } = useProxyPermissions();
</script>

<template>
  <template v-if="proxyPermissionsGranted">
    <div>List of the existing proxies</div>
    <ProxyList />
  </template>

  <template v-else>
    <n-card :bordered="false" class="mb-4">
      <div class="flex justify-between">
        <TitleCategory title="Permissions required" />
      </div>

      <IconLabel type="warning" class="my-2">
        <ul>
          <li>- <strong>tabs</strong> to show proxy settings from the active tab</li>
          <li>- <strong>proxy</strong> to configure and use Mullvad proxy servers</li>
          <li>- <strong>&lt;all_urls&gt;</strong> to have granular proxy settings</li>
        </ul>
      </IconLabel>

      <Button class="mt-3" @click="triggerRequestProxyPermissions"> Grant permissions </Button>
    </n-card>
  </template>
</template>
