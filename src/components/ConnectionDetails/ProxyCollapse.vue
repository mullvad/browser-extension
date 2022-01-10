<script lang="ts" setup>
import { computed, toRefs } from 'vue';
import { asyncComputed } from '@vueuse/core';
import { extension } from 'webextension-polyfill';
import IcRoundMenu from '~icons/ic/round-menu';
import useStore from '@/composables/useStore';
import Button from '@/components/Button/Button.vue';
import Collapse from '@/components/Collapse.vue';
import ProxyButton from '@/components/ProxyButton.vue';

import type { Connection } from '@/helpers/connCheck';
import useSocksProxy from '@/composables/useSocksProxy';
import LocationDrawer from '@/components/ConnectionDetails/LocationDrawer.vue';

const props = defineProps<{ connection: Connection }>();
const { connection } = toRefs(props);

const { proxyExpanded } = useStore();
const { socksEnabled, disableProxy } = useSocksProxy();

// Only show the Proxy collapse if the user is connected to Mullvad
const showProxyCollapse = computed(() => connection.value.isMullvad);

// Only show the Proxy Button inside the collapse if the extension is allowed to change the proxy settings.
// If not, show a message on how to enable this
const showProxyButton = asyncComputed(() => extension.isAllowedIncognitoAccess());

// If the user has connected to a Proxy but disconnected from Mullvad,
// make sure he can remove the bullet from his foot by showing a disconnect button
const showDisconnectButton = computed(() => !connection.value.isMullvad && socksEnabled.value);

// Store the state of the proxy collapse in storage
const toggleProxyCollapse = (open: boolean) => (proxyExpanded.value = open ?? false);
</script>
<template>
  <Button v-if="showDisconnectButton" color="error" @click="disableProxy">Disconnect Proxy</Button>
  <Collapse
    v-else-if="showProxyCollapse"
    title="Proxy&hellip;"
    :isOpen="proxyExpanded"
    @toggle="toggleProxyCollapse"
  >
    <div v-if="showProxyButton">
      <ProxyButton />
    </div>
    <div v-else>
      <p>Please allow <em>Run in Private Windows</em>:</p>
      <ol class="ml-4 list-decimal">
        <li>
          <p class="flex items-center">
            Click the&nbsp;<em class="inline-flex"><IcRoundMenu /></em>&nbsp;icon in the top right
            corner of the browser
          </p>
        </li>
        <li>Click <em>Add-ons and themes</em></li>
        <li>Click <em>Extensions</em> in the left hand sidebar</li>
        <li>Click <em>Mullvad Privacy Companion</em></li>
        <li>Make sure that <em>Run in Private Windows</em> is set to <em>Allow</em></li>
      </ol>
    </div>
  </Collapse>
  <LocationDrawer />
</template>
