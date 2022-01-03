<script lang="ts" setup>
import PrivacyExtension from '@/components/PrivacyExtension.vue';
import useExtensions from '@/composables/useExtensions/useExtensions';

const { extensions } = useExtensions();

</script>
<template>
  <section>
    <p>Here's a list of recommended third party extensions to improve your privacy</p>
    <div class="space-y-4 mt-4">
      <PrivacyExtension
        v-for="extension in extensions"
        :key="extension.id"
        :extension="extension"
      />
    </div>
  </section>
</template>
