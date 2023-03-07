<script lang="ts" setup>
import { runtime } from 'webextension-polyfill';
import { NIcon, NTag, NCard } from 'naive-ui';

import TitleCategory from '@/components/TitleCategory.vue';
import FeArrowRight from '@/components/Icons/FeArrowRight.vue';

const { version } = runtime.getManifest();
</script>

<template>
  <router-link to="/privacy-recommendations">
    <div class="flex flex-grow items-center justify-between">
      <div class="flex items-center">
        <h1 class="text-2xl font-semibold">Recommendations</h1>
      </div>
      <n-icon size="30">
        <FeArrowRight />
      </n-icon>
    </div>
  </router-link>

  <TitleCategory title="Version" />
  <n-card>
    <n-tag
      :color="{ color: 'var(--yellow)', textColor: 'black', borderColor: 'var(--yellow)' }"
      round
    >
      Beta {{ version }}
    </n-tag>
  </n-card>

  <TitleCategory title="License" class="pt-4" />
  <n-card>
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

    <p class="pt-4">
      <span class="text-lg font-semibold">Source code </span>
      <a href="https://github.com/mullvad/browser-extension">Github</a>
    </p>
  </n-card>
</template>

<style scoped>
a {
  text-decoration: underline;
}

a:hover {
  color: white;
}
</style>
