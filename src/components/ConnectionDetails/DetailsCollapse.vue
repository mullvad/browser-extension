<script lang="ts" setup>
import Collapse from '@/components/Collapse.vue';
import useStore from '@/composables/useStore';
import { Connection } from '@/helpers/connCheck';

defineProps<{ connection: Connection; isLoading: boolean }>();
const { detailsExpanded } = useStore();
const toggleDetails = (open: boolean) => {
  detailsExpanded.value = open ?? false;
};

</script>
<template>
  <Collapse
    title="Details&hellip;"
    :open="!isLoading && detailsExpanded"
    :disabled="isLoading"
    @toggle="toggleDetails"
  >
    <table>
      <tbody>
      <tr>
        <td class="text-right">IP</td>
        <td class="text-white px-2">
          {{ connection.ip }}
        </td>
      </tr>
      <tr v-if="connection.ipv6">
        <td class="text-right">IPv6</td>
        <td class="text-white pl-2">{{ connection.ipv6 }}</td>
      </tr>
      <tr>
        <td class="text-right">Provider</td>
        <td class="text-white pl-2">
          {{ connection.provider }}
        </td>
      </tr>
      <tr>
        <td class="text-right">Server</td>
        <td class="text-white pl-2">
          {{ connection.server }}
        </td>
      </tr>
      <tr>
        <td class="text-right">DNS Server(s)</td>
        <td class="text-white pl-2" />
      </tr>
      </tbody>
    </table>
  </Collapse>
</template>