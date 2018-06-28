// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import VueRouter from 'vue-router'
import App from './App'
import store from './store/'
import Home from './components/HelloFromVux'
import routes from './router/index'
import {setStore,getStore,removeStore} from '@/config/mUtils.js'
import  { ToastPlugin } from 'vux'
import initRichText from './common/initHTMLEditor';
import VueTouch from '@/plugins/touchEvent'
import 'font-awesome/css/font-awesome.css'
initRichText();

Vue.use(VueTouch)
Vue.use(VueRouter)
Vue.use(ToastPlugin)

const router = new VueRouter({
  routes
})
VueRouter.prototype.goBack = function () {
  this.isBack = true
  this.go(-1)
}

// router.beforeEach((to, from, next) => {
// 	let user = JSON.parse(localStorage.getItem("user"))
// 	if(to.meta.auth && !logined && !user.account) {
// 		console.error("需先登录")
// 		next(false);
// 		router.push({
// 			name: 'login'
// 		});
// 	} 
// 	else {
// 		next();
// 	}
// });
router.beforeEach((to, from, next) => {
	let Topath=to;
	// console.log(router);
	// router.PriveUrl=from;
	// console.log(Topath);
	var TopathSplit=Topath.fullPath.split("/");
	if(TopathSplit.length==3)
	{
		// setStore("FooterShow",true);
		store.commit("ToggleFooterShow", true);
	}
	else
	{
		// setStore("FooterShow",false);
		store.commit("ToggleFooterShow", false);
		console
	}
	next();
});
router.afterEach((to, from) => {
  router.isBack=false;
})

FastClick.attach(document.body)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app-box')
