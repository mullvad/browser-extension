<script lang="ts" setup>
import { NButton } from 'naive-ui';

defineProps<{ city: string; onClickCity: (city: string) => void }>();
</script>

<template>
  <n-button quaternary @click.prevent="onClickCity(city)">
    {{ city }}
  </n-button>
</template>
