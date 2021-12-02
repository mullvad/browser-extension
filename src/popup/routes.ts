import { RouteRecordRaw } from 'vue-router';

import Home from '@/popup/views/Home.vue';
import PrivacySettings from '@/popup/views/PrivacySettings.vue';

const routes: Array<RouteRecordRaw> = [
  { path: '/', component: Home, name: 'Home' },
  { path: '/PrivacySettings', component: PrivacySettings, name: 'PrivacySettings' },
];

export default routes;
