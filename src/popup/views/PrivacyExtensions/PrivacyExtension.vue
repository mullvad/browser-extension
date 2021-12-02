<script lang="ts" setup>
import { Extension, onIgnore } from '@/helpers/extensions';
import { Status } from '@/popup/views/PrivacyExtensions/types';

const { extension } = defineProps<{
  extension: Extension,
}>();

const emit = defineEmits<{ (e: 'update-recommendations'): void }>();
const isClosed = ref(true);
const iconUrl = computed(() => new URL(`icons/${extension.icon}`, import.meta.url).href);
const toggleDropdown = () => {
  isClosed.value = !isClosed.value;
};
const ignoreRecommendation = async (status: boolean) => {
  await onIgnore(extension, status);
  emit('update-recommendations');
  isClosed.value = true;
};

const status = computed(() => {
  if (extension.ignored) {
    return Status.ignored;
  }

  if (extension.installed && !extension.enabled) {
    return Status.disabled;
  }

  if (extension.ignored && !extension.installed) {
    return Status.not_installed;
  }

  return Status.activated;
});

</script>
<template>
  <div>
    <img :src="iconUrl" :alt="extension.name" />
    <h2>{{ extension.name }}</h2>
    <div v-if="status === Status.activated">

    </div>
    <div v-else-if="status === Status.disabled">

    </div>
    <div v-else>
      <button v-if="status === Status.ignored">Ignored</button>
      <button v-else>Install</button>
    </div>
  </div>
  <div>
    <p>{{ extension.longDescription }}</p>

  </div>
</template>
