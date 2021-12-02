import { RouteRecordRaw } from 'vue-router';

import Home from '@/popup/views/Home.vue';
import Location from '@/popup/views/Location.vue';
import PrivacySettings from '@/popup/views/PrivacySettings.vue';
import PrivacyExtensions from '@/popup/views/PrivacyExtensions/PrivacyExtensions.vue';

const routes: Array<RouteRecordRaw> = [
  { path: '/', component: Home },
  { path: '/location', component: Location },
  { path: '/privacy-extensions', component: PrivacyExtensions },
  { path: '/privacy-settings', component: PrivacySettings },
];

export default routes;
