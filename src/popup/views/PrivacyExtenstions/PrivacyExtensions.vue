<script lang="ts" setup>

import { Extension, sortExtensions } from "@/helpers/extensions";
import { storageLocal } from "@/helpers/storageLocal";
import PrivacyExtension from "@/popup/views/PrivacyExtenstions/PrivacyExtension.vue";

const extensions = ref<Extension[]>([]);
storageLocal.extensions.get().then((ext) => {
  extensions.value = sortExtensions(ext);
});

const updateRecommendations = async () => {
  const ext = await storageLocal.extensions.get();
  extensions.value = sortExtensions(ext);
};

</script>
<template>
  <section>
    <p>Here's a list of recommended third party extensions to improve your privacy</p>
    <div v-for="extension in extensions" :key="extension.id">
      <PrivacyExtension
        :extension="extension"
        @update-recommendations="updateRecommendations"
      />
    </div>
  </section>
</template>
