import Vue from 'vue';
import App from './App.vue';
import cgutils from './js/cgutils';

Vue.config.productionTip = false;

Vue.use(cgutils);

new Vue({
  render: h => h(App),
}).$mount('#app');
