<script lang="ts" setup>
const extensionVersion = computed(() => {
  const { version } = browser.runtime.getManifest();
  return version;
});
</script>
<template>
  <main class="w-[300px]">
    <div>
      <header class="px-4 py-1">
        <div class="flex justify-between items-center">
          <div class="flex">
            <img src="/assets/icon.svg" class="w-10" />
            <div class="mx-2">
              <h1 class="uppercase">Mullvad</h1>
              <p>Privacy Companion</p>
            </div>
          </div>
          <Label :content="extensionVersion" />
        </div>
      </header>
      <ul>
        <li>
          <router-link to="/">Home</router-link>
        </li>
        <li>
          <router-link to="/location">Location</router-link>
        </li>
        <li>
          <router-link to="/privacy-extensions">Privacy Extensions</router-link>
        </li>
        <li>
          <router-link to="/privacy-settings">Privacy Settings</router-link>
        </li>
      </ul>
    </div>
    <router-view />
  </main>
</template>
