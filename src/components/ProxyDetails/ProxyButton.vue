<script lang="ts" setup>
import { computed, inject } from 'vue';
import { NButtonGroup } from 'naive-ui';

import Button from '@/components/Buttons/Button.vue';
import MuSpinner from '@/components/Icons/MuSpinner.vue';
import TaRoute from '@/components/Icons/TaRoute.vue';
import ProxyDisconnectMessage from '@/components/ProxyDetails/ProxyDisconnectMessage.vue';

import { ConnectionKey, defaultConnection } from '@/composables/useConnection';
import useSocksProxy from '@/composables/useSocksProxy';
import useLocations from '@/composables/useLocations';

const { connection, isLoading } = inject(ConnectionKey, defaultConnection);

const { toggleLocations } = useLocations();
const { toggleProxy, socksEnabled } = useSocksProxy();

// Only allow connecting to Proxy if the user is connected to Mullvad
const canUseProxy = computed(() => connection.value.isMullvad);

// Only allow Location selection if using WireGuard
const isWireGuard = computed(() => connection.value.protocol?.includes('WireGuard'));
const color = computed(() => (socksEnabled.value ? 'error' : 'success'));
const label = computed(() => (socksEnabled.value ? 'Disconnect' : 'Connect'));
</script>

<template>
  <div v-if="isLoading">
    <p class="flex items-center mb-2">
      Connecting
      <MuSpinner class="ml-2 animate-spin" />
    </p>
    <ProxyDisconnectMessage v-if="!canUseProxy && socksEnabled" />
  </div>
  <div v-else>
    <ProxyDisconnectMessage v-if="!canUseProxy && socksEnabled" />
    <p v-else-if="!canUseProxy">
      To be able to use a proxy, please <em>connect to Mullvad VPN</em>
    </p>
    <div v-else class="flex">
      <n-button-group v-if="isWireGuard">
        <Button class="flex items-center justify-center" @click="toggleLocations">
          Switch location
        </Button>
        <Button :color="color" class="flex items-center justify-center" @click="toggleProxy">
          <TaRoute />
          <span class="ml-2">{{ label }} proxy</span>
        </Button>
      </n-button-group>
      <Button v-else :color="color" class="flex items-center justify-center" @click="toggleProxy">
        <TaRoute />
        <span class="ml-2">{{ label }} proxy</span>
      </Button>
    </div>
  </div>
</template>
