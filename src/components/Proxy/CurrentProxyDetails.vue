<script lang="ts" setup>
import { ProxyDetails } from '@/helpers/socksProxy.types';

interface Props {
  proxyDetails: ProxyDetails;
}

const { proxyDetails } = defineProps<Props>();
</script>

<template>
  <h1>{{ proxyDetails.country }} {{ proxyDetails.city }}</h1>
  <ul class="mb-2">
    <li>Proxy Server: {{ proxyDetails.server }}</li>
    <li>Proxy DNS: {{ proxyDetails.proxyDNS }}</li>
  </ul>
</template>
