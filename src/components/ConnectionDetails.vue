<script lang="ts" setup>
import { extension } from 'webextension-polyfill';
import { Connection } from '@/helpers/connCheck';
import ProxyButton from '@/components/ProxyButton.vue';
import { asyncComputed } from '@vueuse/core';

defineProps<{ connection: Connection }>();
const showProxySection = asyncComputed(() => extension.isAllowedIncognitoAccess());
</script>
<template>
  <h1 class="text-xl pb-1 pt-4">Connection</h1>
  <div>
    <div>
      <span v-if="connection.city" class="text-white text-lg">{{ connection.city }}</span>
      <span v-if="connection.country" class="text-white text-lg">{{ connection.country }}</span>
      <h2 v-if="!connection.city && !connection.country" class="text-white text-lg">
        Unknown location
      </h2>
    </div>
    <div>
      <details>
        <summary>Show details</summary>
        <table class="mb-4">
          <tbody>
            <tr>
              <td>IP</td>
              <td class="text-white pl-2">
                {{ connection.ip }}
              </td>
            </tr>
            <tr v-if="connection.ipv6">
              <td>IPv6</td>
              <td class="text-white pl-2">{{ connection.ipv6 }}</td>
            </tr>
            <tr>
              <td>Provider</td>
              <td class="text-white pl-2">
                {{ connection.provider }}
              </td>
            </tr>
            <tr>
              <td>Server</td>
              <td class="text-white pl-2">
                {{ connection.server }}
              </td>
            </tr>
            <tr>
              <td>DNS Server(s)</td>
              <td class="text-white pl-2" />
            </tr>
          </tbody>
        </table>
      </details>
    </div>
  </div>
  <details>
    <summary>Show Proxy</summary>
    <div v-if="showProxySection">
      <p>{{ connection.protocol }}</p>
      <ProxyButton />
    </div>
    <div v-else>
      <p>Please allow <em>Run in Private Windows</em>:</p>
      <ol>
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
  </details>
</template>
<style scoped>
details {
  padding-left: 1rem;
}
summary {
  cursor: pointer;
  margin-left: -1rem;
}
em {
  color: hsl(211deg 21% 78%);
}
ol {
  margin-left: 1rem;
  list-style-type: decimal;
}
</style>
