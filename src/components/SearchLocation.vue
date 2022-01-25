<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { NInput } from 'naive-ui';

import useFilteredSocksProxies from '@/composables/useFilteredSocksProxies/useFilteredSocksProxies';

const { query } = useFilteredSocksProxies();

const inputRef = ref<HTMLInputElement>();

onMounted(() => {
  // Autofocus the input so the user can start typing right away
  inputRef.value?.focus();
});
</script>

<template>
  <n-input ref="inputRef" v-model:value="query" placeholder="Search" clearable />
</template>
