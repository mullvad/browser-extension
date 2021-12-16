<script lang="ts" setup>
import { asyncComputed } from '@vueuse/core';
import { extension } from 'webextension-polyfill';
import { Connection } from '@/helpers/connCheck';
import ProxyButton from '@/components/ProxyButton.vue';
import ConnectionLocation from '@/components/ConnectionDetails/ConnectionLocation.vue';

defineProps<{ connection: Connection; isLoading: boolean }>();
const showProxySection = asyncComputed(() => extension.isAllowedIncognitoAccess());
</script>
<template>
  <h1 class="text-xl pb-1 pt-4">Connection</h1>
  <div>
    <p v-if="isLoading" class="text-lg flex items-center">
      Loading location<LaSpinner class="ml-2 animate-spin" />
    </p>
    <ConnectionLocation v-else :connection="connection" />
    <div>
      <details :class="{ disabled: isLoading }">
        <summary>Details&hellip;</summary>
        <table class="mb-4">
          <tbody>
            <tr>
              <td>IP</td>
              <td class="text-white px-2">
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
    <summary class="mb-4">Proxy&hellip;</summary>
    <div v-if="showProxySection">
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
details.disabled {
  cursor: not-allowed;
}
details.disabled summary {
  pointer-events: none;
}
em {
  color: hsl(211deg 21% 78%);
}
ol {
  margin-left: 1rem;
  list-style-type: decimal;
}
td:first-of-type {
  text-align: right;
}
</style>
