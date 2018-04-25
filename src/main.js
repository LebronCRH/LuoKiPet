// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import VueRouter from 'vue-router'
import App from './App'
import store from './store/'
import Home from './components/HelloFromVux'
import routes from './router/index'
import  { ToastPlugin } from 'vux'
import initRichText from './common/initHTMLEditor';
import 'font-awesome/css/font-awesome.css'
initRichText();

Vue.use(VueRouter)
Vue.use(ToastPlugin)

const router = new VueRouter({
  routes
})

FastClick.attach(document.body)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app-box')
