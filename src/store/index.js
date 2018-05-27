import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './action'
import getters from './getters'
import {setStore,getStore,removeStore} from '@/config/mUtils.js'

Vue.use(Vuex)

const state = {
	PackageCartList: {}, // 加入购物车的商品列表
	shopDetail: null, //商家详情信息
	userInfo: JSON.parse(getStore('userInfo')) || null, //用户信息
	FooterShow:true,
	shopid: null,//商铺id
	cartId: null, //购物车id
	isLogin: getStore('userInfo')!=null?true : false,//是否登录
	imgPath:null,//头像地址
	removeAddress:[],//移除地址
	addAddress:'',		//新增地址
	LoginFrontPageUrl:'',//转到登录前的地址
	UserRegisterName:'',//用户注册的名字
	UserRegisterPassword:'',//用户注册的密码
	UserRegisterPhone:'',//用户注册的手机号
	UserNode:null,//用户所在地址
	UserSelectNode:null,//服务店用户选择的地址
	UserChangeOrderPhone:null,//购买服务时用户更改的订单编号
	CreateArticleTest:null,
}

export default new Vuex.Store({
	state,
	getters,
	actions,
	mutations,
})