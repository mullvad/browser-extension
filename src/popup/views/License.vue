<script lang="ts" setup>
import { NCard } from 'naive-ui';

import { closePopup } from '@/helpers/closePopup';
</script>

<template>
  <n-card>
    <p>
      Mullvad Browser Extension as a whole is licensed
      <a
        href="https://github.com/mullvad/browser-extension/blob/master/LICENSE.md"
        @click="closePopup"
      >
        GPLv3+</a
      >
      except for the parts specified below:
    </p>

    <ul list="disc inside" class="py-2">
      <li>
        Open Sans -
        <a href="http://www.apache.org/licenses/LICENSE-2.0" @click="closePopup"
          >Apache License, Version 2.0</a
        >
      </li>
      <li>
        Source Sans Pro -
        <a
          href="https://scripts.sil.org/cms/scripts/page.php?site_id=nrsi&id=OFL"
          @click="closePopup"
        >
          Open Font License
        </a>
      </li>
      <li>
        Feather Icon -
        <a
          href="https://github.com/feathericon/feathericon/blob/master/LICENSE"
          @click="closePopup"
        >
          MIT
        </a>
      </li>
    </ul>
    <p>Third party extensions logos are the property of their respective owners.</p>
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
