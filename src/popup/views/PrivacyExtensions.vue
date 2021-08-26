<template>
  <sub-view
    title="Privacy extensions"
    description="Here's a list of recommended third party extensions to improve your privacy"
  >
    <section>
      <div v-for="ext in extensions" :key="ext.id">
        <privacy-extension
          :ext="ext"
          :extensions="extensions"
          @update-recommendations="updateRecommendations"
        />
      </div>
    </section>
  </sub-view>
</template>

<script lang="ts">
import Vue from 'vue';
import router from '../router';

import { Extension, sortExtensions } from '@/helpers/extensions';
import PrivacyExtension from '../components/PrivacyExtension.vue';
import { localStorage } from '@/helpers';

import SubView from '../components/SubView.vue';

export default Vue.extend({
  name: 'PrivacyExtensions',
  components: {
    SubView,
    PrivacyExtension,
  },
  data() {
    return {
      extensions: [] as Extension[],
    };
  },
  methods: {
    handleBack() {
      router.push('/');
    },
    async updateRecommendations(): Promise<void> {
      const extensions = await localStorage.extensions.get();
      this.extensions = sortExtensions(extensions);
    },
  },
  async created(): Promise<void> {
    const extensions = await localStorage.extensions.get();
    this.extensions = sortExtensions(extensions);
  },
});
</script>
