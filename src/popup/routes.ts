import { RouteRecordRaw } from 'vue-router';

import Home from '@/popup/views/Home.vue';
import Proxy from '@/popup/views/Proxy.vue';

const routes: Array<RouteRecordRaw> = [
  { path: '/', component: Home, meta: { title: 'Status' } },
  { path: '/proxy', component: Proxy, meta: { title: 'Proxy' } },
];

export default routes;
