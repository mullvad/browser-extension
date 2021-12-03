<script lang="ts" setup>

</script>
<template>
  <main class="w-[500px]">
    <div>
      <header class="px-4 py-2 min-h-14 flex justify-between items-center">
        <div class="flex items-center">
          <img src="/assets/icon.svg" class="w-8 h-8" />
          <div class="mx-4">
            <h1 class="uppercase text-2xl font-bold">Mullvad Privacy Companion</h1>
          </div>
        </div>
      </header>
    </div>
    <div class="px-4 py-1.5rem">
      <router-view />
    </div>
  </main>
</template>
