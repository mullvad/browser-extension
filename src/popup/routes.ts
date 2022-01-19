import { RouteRecordRaw } from 'vue-router';

import Home from '@/popup/views/Home.vue';
import Location from '@/popup/views/Location.vue';
import PrivacyRecommendations from '@/popup/views/PrivacyRecommendations.vue';

const routes: Array<RouteRecordRaw> = [
  { path: '/', component: Home },
  { path: '/location', component: Location },
  { path: '/privacy-recommendations', component: PrivacyRecommendations },
];

export default routes;
