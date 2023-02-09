import { RouteRecordRaw } from 'vue-router';

import Home from '@/popup/views/Home.vue';
import About from '@/popup/views/About.vue';
import PrivacyRecommendations from '@/popup/views/PrivacyRecommendations.vue';

const routes: Array<RouteRecordRaw> = [
  { path: '/', component: Home, meta: { title: 'Mullvad Browser Extension' } },
  { path: '/about', component: About, meta: { title: 'About Mullvad Browser Extension' } },
  {
    path: '/privacy-recommendations',
    component: PrivacyRecommendations,
    meta: { title: 'Privacy Recommendations' },
  },
];

export default routes;
