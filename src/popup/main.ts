import { createApp } from 'vue';
import { createRouter, createMemoryHistory } from 'vue-router';
import browser from 'webextension-polyfill';

import routes from '@/popup/routes';
import App from './Popup.vue';
import '../styles';

const baseElem = document.createElement('base');
baseElem.href = __DEV__ ? 'http://localhost:3303' : browser.runtime.getURL('/');
document.head.appendChild(baseElem);

const router = createRouter({
  history: createMemoryHistory(),
  routes,
});

const app = createApp(App);
app.use(router);
app.mount('#app');
