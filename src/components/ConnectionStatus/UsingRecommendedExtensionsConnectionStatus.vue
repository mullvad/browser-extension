<script lang="ts" setup>
import { computed, toRefs } from 'vue';
import IconLabel from '@/components/IconLabel.vue';
import { Extension } from '@/helpers/extensions';
import pluralize from '@/helpers/pluralize';

const props = defineProps<{ extensions: Extension[] }>();
const { extensions } = toRefs(props);
const isUsingAllExtensions = computed(() => extensions.value.length === 0);
const labelText = computed(() =>
  isUsingAllExtensions.value
    ? 'Handled all recommended extensions'
    : `Install ${pluralize('recommended extension', extensions.value.length)}`,
);
</script>
<template>
  <IconLabel :state="isUsingAllExtensions" :text="labelText" />
</template>
