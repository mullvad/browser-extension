<script lang="ts" setup>
import { computed, ref, toRefs } from 'vue';
import { NAvatar, NButtonGroup, NCard, NPopover, NTooltip } from 'naive-ui';

import FeCheckCircle from '~icons/fe/check-circle';
import FeDropDown from '~icons/fe/drop-down';
import FeWarning from '~icons/fe/warning';

import { closePopup } from '@/helpers/closePopup';

import { Status } from '@/components/PrivacyExtensions/Status.types';
import Button from '@/components/Button/Button.vue';
import IconLabel from '@/components/IconLabel.vue';

import { Extension } from '@/composables/useExtensions/Extension.types';

const props = defineProps<{
  extension: Extension;
}>();

const popoverRef = ref<typeof NPopover>();
const rotateDropDown = ref(false);
const onUpdateShow = (show: boolean) => {
  rotateDropDown.value = show;
};

const extension = toRefs(props).extension;

const toggleIgnore = () => {
  extension.value.ignored = !extension.value.ignored;
  popoverRef?.value?.setShow(false);
  rotateDropDown.value = false;
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

const buttonLabel = computed(
  () => `${status.value === Status.ignored ? 'Enable' : 'Ignore'} Recommendation`,
);
const buttonColor = computed(() => (status.value === Status.ignored ? 'success' : 'error'));
</script>

<template>
  <n-card :id="extension.id" :bordered="false">
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
    <p>{{ extension.description }}</p>
    <div v-if="status === Status.disabled" class="warning pt-4 flex items-center">
      <FeWarning class="text-warning mr-2 text-lg" />
      <p>Enable {{ extension.name }} from the Firefox <em>Extensions</em> settings page.</p>
    </div>
    <template #action>
      <div class="flex justify-between">
        <Button :href="extension.homeUrl" @click="closePopup">
          <IconLabel text="Learn More" type="external" />
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
            <n-popover
              ref="popoverRef"
              trigger="click"
              raw
              placement="bottom"
              @update:show="onUpdateShow"
            >
              <template #trigger>
                <Button class="h-10 flex items-center">
                  <span v-if="status === Status.ignored">Ignored&hellip;</span>
                  <FeDropDown
                    v-else
                    class="transform transition-transform duration-400 text-lg"
                    :class="{ 'rotate-180': rotateDropDown }"
                  />
                </Button>
              </template>
              <Button :color="buttonColor" @click="toggleIgnore">{{ buttonLabel }}</Button>
            </n-popover>
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
