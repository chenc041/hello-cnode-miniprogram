import Vue from 'vue';
import App from './App.vue';
import { ajax } from './utils';

Vue.config.productionTip = false;
App.mpType = 'app';

Vue.prototype.$ajax = ajax;
const app = new Vue(App);
app.$mount();
