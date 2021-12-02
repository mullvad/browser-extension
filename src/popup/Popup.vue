<template>
  <main class="w-[300px] px-4 py-5 text-center text-gray-700">
    <div>
      <router-link to="/">Home</router-link>
      <router-link to="/location">Location</router-link>
      <router-link to="/privacy-extensions">Privacy Extensions</router-link>
      <router-link to="/privacy-settings">Privacy Settings</router-link>
    </div>
    <router-view />
  </main>
</template>
