<script lang="ts" setup>
</script>
<template>
  <main class="w-[500px]">
    <header class="px-4 py-2 min-h-14 flex justify-between items-center sticky top-0 z-1">
      <div class="flex items-center">
        <img
          src="./icon.svg"
          class="w-8 h-8"
          alt="Mullvad Logo"
        >
        <div class="mx-4">
          <h1 class="uppercase text-2xl font-bold">
            Mullvad Privacy Companion
          </h1>
        </div>
      </div>
    </header>
    <div class="px-4 py-1.5rem">
      <router-view />
    </div>
  </main>
</template>
<style scoped>
header {
  box-shadow: rgba(0, 0, 0, 0.05) 0px 1px 2px 0px, rgba(0, 0, 0, 0.05) 0px 1px 4px 0px, rgba(0, 0, 0, 0.05) 0px 2px 8px 0px;
}
</style>
