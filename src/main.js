import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./kstore";
import create from '@/utils/create';
import './icons/index';
import AppPlugin from './appPlugin';

Vue.use(create);

Vue.config.productionTip = false;

Vue.use(AppPlugin);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
