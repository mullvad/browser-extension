<script lang="ts" setup>
import { asyncComputed } from '@vueuse/core';
import { extension } from 'webextension-polyfill';

import FeMenu from '@/components/Icons/FeMenu.vue';
import LocationDrawer from '@/components/ConnectionDetails/LocationDrawer.vue';
import ProxyButton from '@/components/ProxyDetails/ProxyButton.vue';

const showProxyButton = asyncComputed(() => extension.isAllowedIncognitoAccess());
</script>

<template>
  <div v-if="showProxyButton">
    <ProxyButton />
  </div>
  <div v-else>
    <p>Please allow <em>Run in Private Windows</em>:</p>
    <ol class="ml-4 list-decimal">
      <li>
        <p class="flex items-center">
          Click the&nbsp;<em class="inline-flex">
            <FeMenu /> </em
          >&nbsp;icon in the top right corner of the browser
        </p>
      </li>
      <li>Click <em>Add-ons and themes</em></li>
      <li>Click <em>Extensions</em> in the left hand sidebar</li>
      <li>Click <em>Mullvad Browser Extension</em></li>
      <li>Make sure that <em>Run in Private Windows</em> is set to <em>Allow</em></li>
    </ol>
  </div>
  <LocationDrawer />
</template>
