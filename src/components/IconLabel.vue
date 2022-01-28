<script lang="ts" setup>
import FeWarning from '@/components/Icons/FeWarning.vue';
import FeCheckCircle from '@/components/Icons/FeCheckCircle.vue';
import FeInfo from '@/components/Icons/FeInfo.vue';
import LaSpinner from '@/components/Icons/LaSpinner.vue';
import FeLinkExternal from '@/components/Icons/FeLinkExternal.vue';

type IconType = 'warning' | 'success' | 'info' | 'spinner' | 'external';

defineProps<{ text: string; type: IconType }>();
</script>

<template>
  <span v-if="type === 'success'" class="text-success"><FeCheckCircle class="mr-2" />{{ text }}</span>
  <span v-if="type === 'warning'" class="text-warning"><FeWarning class="mr-2" />{{ text }}</span>
  <span v-if="type === 'info'" class="text-info"><FeInfo class="mr-2" />{{ text }}</span>
  <span v-if="type === 'spinner'" class="text-info"><LaSpinner class="mr-2 animate-spin" />{{ text }}</span>
  <span v-if="type === 'external'" class="text-info">{{ text }}<FeLinkExternal class="ml-2" /></span>
</template>

<style scoped>
span {
  display: flex;
  align-items: center;
}
</style>
