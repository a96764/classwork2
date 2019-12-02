import Vue from 'vue'
import router from './router'
import App from './App'
import 'assets/css/app.styl'
import axios from 'axios'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
Vue.use(BootstrapVue)
const axiosConfig = {
    //baseURL: 'https://3000-e7488025-8c5a-483a-acea-fc49adeec1df.ws-eu01.gitpod.io/ap'
};
Vue.prototype.$axios = axios.create(axiosConfig)
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')