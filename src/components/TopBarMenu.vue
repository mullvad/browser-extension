<script lang="ts" setup>
import { useRouter } from 'vue-router';
import FeElipsisV from '~icons/fe/elipsis-v';
import { NDropdown } from 'naive-ui';

const router = useRouter();

const menuOptions = [
  {
    label: 'About',
    key: '/about',
  },
];

const onMenuSelect = (key: string) => {
  router.push(key);
};
</script>

<template>
  <n-dropdown trigger="click" :options="menuOptions" :on-select="onMenuSelect">
    <button class="flex p-2">
      <FeElipsisV />
    </button>
  </n-dropdown>
</template>
