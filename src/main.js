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

Vue.prototype.$msgbox = function(title, position) {
    // this.$vux.alert.show({
    //     title: title,
    //     content: msg
    // });
    this.$vux.toast.text(title,position);
}

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
	console.log(to);
    console.log(from);
	var TopathSplit=Topath.fullPath.split("/");
	if(TopathSplit.length==3)
	{
		store.commit("ToggleFooterShow", true);
	}
	else
	{
		store.commit("ToggleFooterShow", false);
	}
	if (to.matched.some(record => record.meta.requiresAuth)) {
	    if (!store.state.isLogin) {
	    	console.log(to);
	    	store.state.LoginFrontPageUrl=to;
	      next({
	        path: '/loginIndex',
	        // query: { redirect: to.fullPath }
	      })
	    } else {
	      next()
	    }
	} else {
	    next() // 确保一定要调用 next()
	}
	next()
});
router.afterEach((to, from) => {
  router.isBack=false;
})

FastClick.attach(document.body)

Vue.config.productionTip = false

/* eslint-disable no-new */
const vm=new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app-box') 