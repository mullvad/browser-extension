<script setup lang="ts">
import LocationDrawer from '@/components/ConnectionDetails/LocationDrawer.vue';
import ProxyGlobal from '@/components/Proxy/ProxyGlobal.vue';
import CustomProxies from '@/components/Proxy/CustomProxies.vue';
</script>

<template>
  <ProxyGlobal />
  <CustomProxies />
  <LocationDrawer />
</template>
