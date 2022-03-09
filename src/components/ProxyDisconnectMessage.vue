<script lang="ts" setup>
import Button from '@/components/Buttons/Button.vue';
import useSocksProxy from '@/composables/useSocksProxy';

const { disableProxy } = useSocksProxy();
</script>
<template>
  <p>The connection is set to use a proxy server.</p>
  <p>If you can't load any pages, disconnect the proxy to access the internet directly.</p>
  <Button color="error" class="mt-2" @click="disableProxy">Disconnect proxy</Button>
</template>
