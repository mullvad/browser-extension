<script lang="ts" setup>
import { NInput } from 'naive-ui';
import { nextTick, onMounted, ref } from 'vue';
import useSocksProxies from '@/composables/useSocksProxies/useSocksProxies';

const { query } = useSocksProxies();
const inputRef = ref<HTMLInputElement | null>(null);

onMounted(async () => {
  await nextTick();
  inputRef.value?.focus();
});
</script>

<template>
  <NInput ref="inputRef" v-model:value="query" placeholder="Search" clearable class="mb-3" />
</template>
