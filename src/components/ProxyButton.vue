<script lang="ts" setup>
import { computed, inject, ref } from 'vue';
import { NButtonGroup } from 'naive-ui';
import LaSpinner from '~icons/la/spinner';
import IcLocation from '~icons/ic/baseline-location-on';
import type { Connection } from '@/helpers/connCheck.types';
import { ConnectionIsLoadingKey, ConnectionKey } from '@/composables/useConnection';
import useSocksProxy from '@/composables/useSocksProxy';
import Button from '@/components/Button/Button.vue';
import useLocations from '@/composables/useLocations';
import ProxyDisconnectMessage from '@/components/ProxyDisconnectMessage.vue';

const connection = inject(ConnectionKey, ref({} as Connection));
const isLoading = inject(ConnectionIsLoadingKey, ref(false));

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
    <p class="flex items-center mb-2">Connecting<LaSpinner class="ml-2 animate-spin" /></p>
    <ProxyDisconnectMessage v-if="!canUseProxy && socksEnabled" />
  </div>
  <div v-else>
    <ProxyDisconnectMessage v-if="!canUseProxy && socksEnabled" />
    <p v-else-if="!canUseProxy">To be able to use a proxy, please <em>connect to Mullvad VPN</em></p>
    <div v-else class="flex">
      <n-button-group v-if="isWireGuard">
        <Button :color="color" @click="toggleProxy">{{ label }} Proxy</Button>
        <Button class="flex items-center justify-center" @click="toggleLocations">
          <IcLocation />
        </Button>
      </n-button-group>
      <Button v-else :color="color" @click="toggleProxy">{{ label }} Proxy</Button>
    </div>
  </div>
</template>
