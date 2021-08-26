import Vue from 'vue';
import VueRouter from 'vue-router';

import Home from '../../popup/views/Home.vue';
import Location from '../../popup/views/Location.vue';
import PrivacyExtensions from '../../popup/views/PrivacyExtensions.vue';
import PrivacySettings from '../../popup/views/PrivacySettings.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/location',
    name: 'Location',
    component: Location,
  },
  {
    path: '/privacy-extensions',
    name: 'Privacy extensions',
    component: PrivacyExtensions,
  },
  {
    path: '/privacy-settings',
    name: 'Privacy settings',
    component: PrivacySettings,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
