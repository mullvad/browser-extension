import { RouteRecordRaw } from 'vue-router';

import Home from '@/popup/views/Home.vue';
import PrivacyRecommendations from '@/popup/views/PrivacyRecommendations.vue';

const routes: Array<RouteRecordRaw> = [
  { path: '/', component: Home, meta: { title: 'Mullvad Privacy Companion' } },
  {
    path: '/privacy-recommendations',
    component: PrivacyRecommendations,
    meta: { title: 'Privacy Recommendations' },
  },
];

export default routes;
