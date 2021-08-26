import Vue from 'vue';
import router from './router';
import Options from './Options.vue';

new Vue({
  router,
  el: '#app',
  render: (h) => h(Options),
});
