// TODO: Remove entire options folder before publishing

import { createApp } from 'vue';
import { createRouter, createMemoryHistory } from 'vue-router';

import routes from '@/popup/routes';
import App from '@/popup/App.vue';
import '../styles';

const router = createRouter({
  history: createMemoryHistory(),
  scrollBehavior(to) {
    if (to.hash) {
      return {
        el: to.hash,
        top: 60, // Make sure that the entire card is visible when auto-scrolling
        behavior: 'smooth',
      };
    }
  },
  routes,
});

const app = createApp(App);
app.use(router);
app.mount('#app');
