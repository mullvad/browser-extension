<script lang="ts" setup>
import { computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { runtime } from 'webextension-polyfill';
import { NTag } from 'naive-ui';

import FeFileText from '@/components/Icons/FeFileText.vue';
import FeGithub from '@/components/Icons/FeGithub.vue';
import FeInfo from '@/components/Icons/FeInfo.vue';
import LetaSettings from '@/components/LetaSettings.vue';
import PrivacyRecommendations from '@/components/PrivacyRecommendations/PrivacyRecommendations.vue';
import TitleCategory from '@/components/TitleCategory.vue';
import WebRTCToggle from '@/components/PrivacyRecommendations/WebRTCToggle.vue';

import { closePopup } from '@/helpers/closePopup';

const { version } = runtime.getManifest();

// Scroll to anchor (if one is provided), or scroll to top
// Workaround for scrollBehavior router method not mixing well with `overflow: auto` css property
// See the non-explanation in the following issue: https://github.com/vuejs/vue-router/issues/1459#issuecomment-466235189
const { currentRoute } = useRouter();
const hash = computed(() => currentRoute.value.hash);

if (hash.value) {
  onMounted(() => {
    const anchor = hash.value.replace('#', '');
    const el = document.getElementById(anchor);

    el!.scrollIntoView({ behavior: 'smooth' });
  });
} else {
  document.body.scrollTo(0, 0);
}
</script>

<template>
  <div class="flex items-center justify-between p-3 pb-1">
    <n-tag round :bordered="false" type="info">
      <a href="https://github.com/mullvad/browser-extension/releases" @click="closePopup">
        {{ version }} | Changelog
      </a>
      <template #icon>
        <FeInfo />
      </template>
    </n-tag>
    <n-tag round :bordered="false" type="info">
      <a href="https://github.com/mullvad/browser-extension" @click="closePopup"> Source code </a>
      <template #icon>
        <FeGithub />
      </template>
    </n-tag>
    <n-tag round :bordered="false" type="info">
      <router-link to="/license"> License </router-link>
      <template #icon>
        <FeFileText />
      </template>
    </n-tag>
  </div>

  <TitleCategory title="Settings" class="pt-4" />
  <LetaSettings />
  <WebRTCToggle />

  <TitleCategory title="Privacy Recommendations" class="pt-4" />
  <privacy-recommendations />
</template>

<style scoped>
a {
  text-decoration: none;
  color: rgba(255 255 255 / 80%);
  font-weight: 600;
}

a:hover {
  color: white;
}
</style>
