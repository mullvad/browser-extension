<script lang="ts" setup>
import { asyncComputed } from '@vueuse/core';
import { extension } from 'webextension-polyfill';
import IcRoundMenu from '~icons/ic/round-menu';
import useLocations from '@/composables/useLocations';
import useStore from '@/composables/useStore';
import Collapse from '@/components/Collapse.vue';
import ProxyButton from '@/components/ProxyButton.vue';
import LocationDrawer from '@/components/ConnectionDetails/LocationDrawer.vue';

const { proxyExpanded } = useStore();
const showProxyButton = asyncComputed(() => extension.isAllowedIncognitoAccess());
const toggleProxy = (open: boolean) => {
  proxyExpanded.value = open ?? false;
};
const { showLocations, toggleLocations } = useLocations();
</script>
<template>
  <Collapse title="Proxy&hellip;" :isOpen="proxyExpanded" @toggle="toggleProxy">
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
