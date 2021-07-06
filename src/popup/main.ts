import Vue from 'vue';
import Popup from './Popup.vue';
import router from './router';

new Vue({
  router,
  el: '#app',
  render: (h) => h(Popup),
});
