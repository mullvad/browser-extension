import { RouteRecordRaw } from 'vue-router';

import Home from '@/popup/views/Home.vue';
import Settings from '@/popup/views/Settings.vue';
import PrivacyRecommendations from '@/popup/views/PrivacyRecommendations.vue';

const routes: Array<RouteRecordRaw> = [
  { path: '/', component: Home, meta: { title: 'Mullvad Browser Extension' } },
  { path: '/settings', component: Settings, meta: { title: 'Settings' } },
  {
    path: '/privacy-recommendations',
    component: PrivacyRecommendations,
    meta: { title: 'Privacy recommendations' },
  },
];

export default routes;
