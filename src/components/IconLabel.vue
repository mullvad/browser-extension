<script lang="ts" setup>
import Check from '~icons/fe/check-circle';
import Warning from '~icons/fe/warning';
import Info from '~icons/fe/info';
import LinkExternal from '~icons/fe/LinkExternal';
import Spinner from '~icons/la/spinner';

type IconType = 'warning' | 'success' | 'info' | 'spinner' | 'external';

defineProps<{ text: string; type: IconType }>();
</script>

<template>
  <span v-if="type === 'success'" class="text-success"><Check class="mr-2" />{{ text }}</span>
  <span v-if="type === 'warning'" class="text-warning"><Warning class="mr-2" />{{ text }}</span>
  <span v-if="type === 'info'" class="text-info"><Info class="mr-2" />{{ text }}</span>
  <span v-if="type === 'spinner'" class="text-info"><Spinner class="mr-2 animate-spin" />{{ text }}</span>
  <span v-if="type === 'external'" class="text-info">{{ text }}<LinkExternal class="ml-2" /></span>
</template>

<style scoped>
span {
  display: flex;
  align-items: center;
}
</style>
