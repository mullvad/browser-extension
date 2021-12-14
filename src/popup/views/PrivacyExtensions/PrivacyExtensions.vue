<script lang="ts" setup>
import { computed } from 'vue';
import { sortExtensions, extensions } from '@/helpers/extensions';
import PrivacyExtension from '@/popup/views/PrivacyExtensions/PrivacyExtension.vue';

const sortedExtensions = computed(() => sortExtensions(extensions.value));

const updateRecommendations = async () => {
  // Do some kind of update
};
</script>
<template>
  <section>
    <p>Here's a list of recommended third party extensions to improve your privacy</p>
    <div
      v-for="extension in sortedExtensions"
      :key="extension.id"
    >
      <PrivacyExtension
        :extension="extension"
        @update-recommendations="updateRecommendations"
      />
    </div>
  </section>
</template>
