import { RouteRecordRaw } from 'vue-router';

import Home from '@/popup/views/Home.vue';
import Settings from '@/popup/views/Settings.vue';
import License from '@/popup/views/License.vue';

const routes: Array<RouteRecordRaw> = [
  { path: '/', component: Home, meta: { title: 'Mullvad Browser Extension' } },
  { path: '/settings', component: Settings, meta: { title: 'Settings' } },
  {
    path: '/license',
    component: License,
    meta: { title: 'License' },
  },
];

export default routes;
