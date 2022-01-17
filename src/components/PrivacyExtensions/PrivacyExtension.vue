<script lang="ts" setup>
import { computed, toRefs } from 'vue';
import FeLinkExternal from '~icons/fe/link-external';
import FeCheckCircle from '~icons/fe/check-circle';
import FeWarning from '~icons/fe/warning';
import { NAvatar, NCard, NDropdown, NButtonGroup, NTooltip } from 'naive-ui';
import { Extension } from '@/composables/useExtensions/Extension.types';
import { Status } from '@/components/PrivacyExtensions/Status.types';
import Button from '@/components/Button/Button.vue';
import { closePopup } from '@/helpers/closePopup';

const props = defineProps<{
  extension: Extension;
}>();

const extension = toRefs(props).extension;

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

const options = computed(() => [
  {
    label: `${status.value === Status.ignored ? 'Enable' : 'Disable'} Recommendation`,
    props: { onClick: toggleIgnore },
  },
]);
</script>
<template>
  <n-card :id="extension.id">
    <template #header>
      <div class="flex">
        <n-avatar size="small" :src="`/assets/icons/${extension.icon}`" class="mr-2"></n-avatar>
        <h2>{{ extension.name }}</h2>
      </div>
    </template>
    <template #header-extra>
      <div class="text-2xl flex">
        <n-tooltip v-if="status === Status.activated">
          <template #trigger>
            <FeCheckCircle class="text-success" />
          </template>
          <span>Installed</span>
        </n-tooltip>
        <n-tooltip v-if="status === Status.disabled">
          <template #trigger>
            <FeWarning class="text-warning" />
          </template>
          <span>Disabled</span>
        </n-tooltip>
      </div>
    </template>
    <p>{{ extension.longDescription }}</p>
    <div v-if="status === Status.disabled" class="warning pt-4 flex items-center">
      <FeWarning class="text-warning mr-2 text-lg" />
      <p>Enable {{ extension.name }} from the Firefox <em>Extensions</em> settings page.</p>
    </div>
    <template #action>
      <div class="flex justify-between">
        <Button :href="extension.homeUrl" @click="closePopup">
          <span class="flex items-center">Learn More&nbsp;<FeLinkExternal /></span>
        </Button>
        <div v-if="status !== Status.activated && status !== Status.disabled">
          <n-button-group>
            <Button
              v-if="status !== Status.ignored"
              :href="extension.addonUrl"
              color="success"
              @click="closePopup"
            >
              Install
            </Button>
            <n-dropdown trigger="click" :options="options">
              <Button class="h-10">
                <span v-if="status === Status.ignored">Ignored&hellip;</span>
                <span v-else>Options&hellip;</span>
              </Button>
            </n-dropdown>
          </n-button-group>
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
