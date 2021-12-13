<script lang="ts" setup>
import { computed, ref, toRefs } from 'vue';
import { Extension, onIgnore } from '@/helpers/extensions';
import { Status } from '@/popup/views/PrivacyExtensions/types';

const props = defineProps<{
  extension: Extension,
}>();

const extension = toRefs(props).extension;

const emit = defineEmits<{ (e: 'update-recommendations'): void }>();
const isClosed = ref(true);
const iconUrl = computed(() => `/assets/icons/${extension.value.icon}`);
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const toggleDropdown = () => {
  isClosed.value = !isClosed.value;
};
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const ignoreRecommendation = async (status: boolean) => {
  await onIgnore(extension.value, status);
  emit('update-recommendations');
  isClosed.value = true;
};

const status = computed(() => {
  if (extension.value.ignored) {
    return Status.ignored;
  }

  if (extension.value.installed && !extension.value.enabled) {
    return Status.disabled;
  }

  if (extension.value.ignored && !extension.value.installed) {
    return Status.not_installed;
  }

  return Status.activated;
});

</script>
<template>
  <div>
    <img
      :src="iconUrl"
      :alt="extension.name"
    >
    <h2>{{ extension.name }}</h2>
    <div v-if="status === Status.activated" />
    <div v-else-if="status === Status.disabled" />
    <div v-else>
      <button v-if="status === Status.ignored">
        Ignored
      </button>
      <button v-else>
        Install
      </button>
    </div>
  </div>
  <div>
    <p>{{ extension.longDescription }}</p>
  </div>
</template>
