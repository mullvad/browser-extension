<script lang="ts" setup>
import { Connection } from '@/helpers/connCheck';
import ProxyButton from '@/components/ProxyButton.vue';

defineProps<{ connection: Connection }>();
</script>
<template>
  <h1 class="text-xl pb-1 pt-4">Connection</h1>
  <div>
    <div>
      <span v-if="connection.city" class="text-white text-lg">{{ connection.city }}</span> <span v-if="connection.country" class="text-white text-lg">{{ connection.country }}</span>
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
              <td class="text-white pl-2">{{ connection.ip }}</td>
            </tr>
            <tr>
              <td>IP v6</td>
              <td class="text-white pl-2"></td>
            </tr>
            <tr>
              <td>Provider</td>
              <td class="text-white pl-2">{{ connection.provider }}</td>
            </tr>
            <tr>
              <td>Server</td>
              <td class="text-white pl-2">{{ connection.server }}</td>
            </tr>
            <tr>
              <td>DNS Server(s)</td>
              <td class="text-white pl-2"></td>
            </tr>
          </tbody>
        </table>
      </details>
    </div>
  </div>
  <details>
    <summary>Show Proxy</summary>
    <p>{{ connection.protocol }}</p>
    <ProxyButton />
  </details>
</template>
<style scoped>
summary {
  cursor: pointer;
}
</style>
