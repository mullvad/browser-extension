import { createApp } from 'vue';
import { createRouter, createMemoryHistory } from 'vue-router';

import routes from '@/popup/routes';
import App from './Popup.vue';
import '../styles';

const router = createRouter({
  history: createMemoryHistory(),
  routes,
});

const app = createApp(App);
app.use(router);
app.mount('#app');
