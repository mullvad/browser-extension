<script lang="ts" setup>
import { computed, toRefs } from 'vue';
import { NButtonGroup } from 'naive-ui';
import IcLocation from '~icons/ic/baseline-location-on';
import useSocksProxy from '@/composables/useSocksProxy';
import Button from '@/components/Button/Button.vue';
import useLocations from '@/composables/useLocations';
import type { Connection } from '@/helpers/connCheck';

const props = defineProps<{ connection: Connection, isLoading: boolean }>();
const { connection } = toRefs(props);

const { toggleLocations } = useLocations();
const { toggleProxy, disableProxy, socksEnabled } = useSocksProxy();

// Only allow connecting to Proxy if the user is connected to Mullvad
const canUseProxy = computed(() => connection.value.isMullvad);

const color = computed(() => (socksEnabled.value ? 'error' : 'success'));
const label = computed(() => (socksEnabled.value ? 'Disconnect' : 'Connect'));
</script>
<template>
  <div v-if="isLoading">Connecting&hellip;</div>
  <div v-else-if="!canUseProxy && socksEnabled">
    <p class="mb-2">You are <em>not</em> connected to Mullvad VPN, but have a Proxy configured and can therefore not reach the internet.</p>
    <p>Either <em>connect to Mullvad VPN (safe)</em> or disconnect the proxy (unsafe).</p>
    <Button :color="color" class="mt-2" @click="disableProxy">Disconnect Proxy</Button>
  </div>
  <p v-else-if="!canUseProxy">To be able to use a proxy, please <em>connect to Mullvad VPN</em></p>
  <div v-else class="flex">
    <n-button-group>
      <Button :color="color" @click="toggleProxy">{{ label }} Proxy</Button>
      <Button class="flex items-center justify-center" @click="toggleLocations">
        <IcLocation />
      </Button>
    </n-button-group>
  </div>
</template>
