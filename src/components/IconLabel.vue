<script lang="ts" setup>
import Check from '~icons/fe/check-circle';
import Warning from '~icons/fe/warning';
import Info from '~icons/fe/info';
import Spinner from '~icons/la/spinner';

type IconType = 'warning' | 'success' | 'info' | 'spinner';

defineProps<{ text: string; type: IconType }>();
</script>

<template>
  <p v-if="type == 'success'" class="text-success"><Check class="mr-2" />{{ text }}</p>
  <p v-if="type == 'warning'" class="text-warning"><Warning class="mr-2" />{{ text }}</p>
  <p v-if="type == 'info'" class="text-info"><Info class="mr-2" />{{ text }}</p>
  <p v-if="type == 'spinner'" class="text-info"><Spinner class="mr-2 animate-spin" />{{ text }}</p>
</template>

<style scoped>
p {
  font-size: 1.25rem;
  display: flex;
  align-items: center;
}
</style>
