<script lang="ts" setup>
import { computed, toRefs } from 'vue';
import FeLinkExternal from '~icons/fe/link-external';
import FeCheckCircle from '~icons/fe/check-circle';
import FeWarning from '~icons/fe/warning';
import { NAvatar, NCard } from 'naive-ui';
import { Extension } from '@/composables/useExtensions/Extension.types';
import { Status } from '@/popup/views/PrivacyExtensions/Status.types';
import Button from '@/components/Button/Button.vue';

const props = defineProps<{
  extension: Extension;
}>();

const extension = toRefs(props).extension;

const closePopup = () => {
  // The delay is added to stop a new browser window from opening
  // when installing the extension
  setTimeout(() => {
    window.close();
  }, 100);
};

const toggleIgnore = () => {
  extension.value.ignored = !extension.value.ignored;
};

const status = computed(() => {
  if (extension.value.ignored) {
    return Status.ignored;
  }

  if (extension.value.installed && !extension.value.enabled) {
    return Status.disabled;
  }

  if (!extension.value.ignored && !extension.value.installed) {
    return Status.not_installed;
  }

  return Status.activated;
});
</script>
<template>
  <n-card>
    <template #header>
      <div class="flex">
        <n-avatar size="small" :src="`/assets/icons/${extension.icon}`" class="mr-2"></n-avatar>
        <h2>{{ extension.name }}</h2>
      </div>
    </template>
    <template #header-extra>
      <div class="text-2xl flex">
        <FeCheckCircle v-if="status === Status.activated" class="text-success" />
        <FeWarning v-if="status === Status.disabled" class="text-warning" />
      </div>
    </template>
    <p>{{ extension.longDescription }}</p>
    <div v-if="status === Status.disabled" class="warning pt-4 flex items-center">
      <FeWarning class="text-warning mr-2 text-lg" />
      <p>Enable {{ extension.name }} from the Firefox <em>Extensions</em> settings page.</p>
    </div>
    <template #action>
      <div class="flex justify-between">
        <Button :href="extension.homeUrl">
          <span class="flex items-center">Learn More&nbsp;<FeLinkExternal /></span>
        </Button>
        <div v-if="status !== Status.activated && status !== Status.disabled">
          <Button
            v-if="status !== Status.ignored"
            :href="extension.addonUrl"
            color="success"
            @click="closePopup"
          >
            Install
          </Button>
          <Button :color="status === Status.ignored ? 'success' : 'error'" @click="toggleIgnore()">
            <span v-if="status === Status.ignored">Enable recommendation</span>
            <span v-else>Disable recommendation</span>
          </Button>
        </div>
      </div>
    </template>
  </n-card>
</template>
<style scoped>
.warning {
  color: var(--light-grey);
}
</style>
