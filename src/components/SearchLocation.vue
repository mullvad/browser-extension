<script lang="ts" setup>
import { NInput } from 'naive-ui';
import useSocksProxies from '@/composables/useSocksProxies/useSocksProxies';

const { query } = useSocksProxies();
</script>

<template>
  <NInput v-model:value="query" placeholder="Search" clearable class="mb-3" />
</template>
