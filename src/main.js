import Vue from 'vue';
import App from './App';
import router from './router';
import store from "./store/store";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import api from "@/server/api.js";
import message from "@/components/myMsg/index";//请求变量
import global from './store/global.js' ; //全局变量


Vue.config.productionTip = false;
Vue.prototype.$http = api;
Vue.prototype.$global = global;
Vue.use(ElementUI);
Vue.use(message.register);

new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
