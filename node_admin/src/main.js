import Vue from 'vue';
import App from './App';
import md5 from 'js-md5';
import uView from '@/uni_modules/uview-ui';
import '@/http'; // 接口api
Vue.use(uView);

Vue.config.productionTip = false;
Vue.prototype.$md5 = md5;

App.mpType = 'app';

const app = new Vue({
  ...App,
});
app.$mount();
