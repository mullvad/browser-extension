<script setup lang="ts">
import { NCard, NTag } from 'naive-ui';

import FeGithub from '@/components/Icons/FeGithub.vue';
import FeInfo from '@/components/Icons/FeInfo.vue';

import { version } from '@/helpers/browserExtension';
</script>

<template>
  <div class="flex items-center p-3 pb-1">
    <n-tag round :bordered="false" type="info" class="mr-4">
      <a href="https://github.com/mullvad/browser-extension/releases">
        {{ version }} | Changelog
      </a>
      <template #icon>
        <FeInfo />
      </template>
    </n-tag>
    <n-tag round :bordered="false" type="info">
      <a href="https://github.com/mullvad/browser-extension"> Source code </a>
      <template #icon>
        <FeGithub />
      </template>
    </n-tag>
  </div>

  <n-card class="mt-4">
    <p>
      Mullvad Browser Extension as a whole is licensed
      <a href="https://github.com/mullvad/browser-extension/blob/master/LICENSE.md"> GPLv3+</a>
      except for the parts specified below:
    </p>

    <ul list="disc inside" class="py-2">
      <li>
        Open Sans -
        <a href="http://www.apache.org/licenses/LICENSE-2.0">Apache License, Version 2.0</a>
      </li>
      <li>
        Source Sans Pro -
        <a href="https://scripts.sil.org/cms/scripts/page.php?site_id=nrsi&id=OFL">
          Open Font License
        </a>
      </li>
      <li>
        Feather Icon -
        <a href="https://github.com/feathericon/feathericon/blob/master/LICENSE"> MIT </a>
      </li>
    </ul>
    <p>Third party extensions logos are the property of their respective owners.</p>
  </n-card>
</template>
