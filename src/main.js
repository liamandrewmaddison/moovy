import Vue from 'vue';
import MagicGrid from 'vue-magic-grid';
import App from './App.vue';
import store from './store/index';
import './registerServiceWorker';

Vue.use(MagicGrid);

Vue.config.productionTip = false;

new Vue({
  store,
  render: h => h(App),
}).$mount('#app');
