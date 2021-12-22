<script lang="ts" setup>
import { computed } from 'vue';
import { sortExtensions, extensions } from '@/helpers/extensions';
import PrivacyExtension from '@/popup/views/PrivacyExtensions/PrivacyExtension.vue';

const sortedExtensions = computed(() => sortExtensions(extensions.value));

</script>
<template>
  <section>
    <p>Here's a list of recommended third party extensions to improve your privacy</p>
    <div class="space-y-4 mt-4">
      <PrivacyExtension
        v-for="extension in sortedExtensions"
        :key="extension.id"
        :extension="extension"
      />
    </div>
  </section>
</template>
