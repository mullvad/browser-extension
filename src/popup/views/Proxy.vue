<script lang="ts" setup>
import { computed, inject, onMounted } from 'vue';
import { NCard } from 'naive-ui';

import Button from '@/components/Buttons/Button.vue';
import IconLabel from '@/components/IconLabel.vue';
import LocationDrawer from '@/components/ConnectionDetails/LocationDrawer.vue';
import ProxyGlobal from '@/components/Proxy/ProxyGlobal.vue';
import ProxyHost from '@/components/Proxy/ProxyHost.vue';
import TitleCategory from '@/components/TitleCategory.vue';

import useActiveTab from '@/composables/useActiveTab';
import { ConnectionKey, defaultConnection } from '@/composables/useConnection';
import useListProxies from '@/composables/useListProxies';
import useProxyPermissions from '@/composables/useProxyPermissions';

const { isBrowserPage } = useActiveTab();
const { getSocksProxies } = useListProxies();
const { proxyPermissionsGranted, triggerRequestProxyPermissions } = useProxyPermissions();

const { connection } = inject(ConnectionKey, defaultConnection);

const isWireGuard = computed(
  () =>
    connection.value.protocol === 'WireGuard' ||
    connection.value.protocol === 'SOCKS through WireGuard',
);

const loadProxies = async () => {
  await getSocksProxies();
};

onMounted(loadProxies);
</script>

<template>
  <template v-if="proxyPermissionsGranted">
    <IconLabel v-if="!isWireGuard" type="warning" class="my-2">
      Connect first to Mullvad VPN (WireGuard) to use the proxy.
    </IconLabel>

    <div>
      <ProxyGlobal />
      <ProxyHost v-if="!isBrowserPage" />
      <LocationDrawer />
    </div>
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
