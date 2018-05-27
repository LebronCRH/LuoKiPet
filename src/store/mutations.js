import {
	ADD_PACKAGECART,
	JIA_PACKAGECART,
	JIAN_PACKAGECART,
	UPDATE_PACKAGECART,
	USER_ISLOGIN,
	LOCAL_USER,
} from './mutation-types.js'
import {setStore,getStore,removeStore} from '@/config/mUtils.js'

export default {
	[ADD_PACKAGECART](state,{
		shopid,
		shopname,
		serviceid,
		servicename,
		packageid,
		packagename,
		salenum,
		packageprice,
		packageoldprice,
	}){
		let PackageCart = state.PackageCartList;
		let shop = PackageCart[shopid] = (PackageCart[shopid] || {'ShopName':null,ServiceList:{}});
		let service = shop.ServiceList[serviceid] = (shop.ServiceList[serviceid] || {});
		let shopName=shop.ShopName=(shop.ShopName ||{'ShopName':shopname});
		let item = service[packageid];
		if(item){
			item['SaleNum']=item['SaleNum']+salenum;
			console.log("1");
			console.log(item['SaleNum']);
			console.log(item);
		}
		else{
			console.log("2");
			service[packageid]={
				'ForShopId':shopid, 
				'ForServiceID':serviceid,
				'ForServiceName':servicename,
				'PackageId':packageid,
				'PackageName':packagename,
				'SaleNum':salenum,
				'PackagePrice':packageprice,
				'PackageOldPrice':packageoldprice,
				'SelectStatue':false,
			};
		}
		state.PackageCartList = {...PackageCart};
		console.log(state.PackageCartList);
	},
	[JIA_PACKAGECART](state,{
		shopid,
		serviceid,
		packageid,
	}){
		let PackageCart = state.PackageCartList;
		let shop = PackageCart[shopid] = (PackageCart[shopid] || {'ShopName':null,ServiceList:{}});
		let service = shop.ServiceList[serviceid] = (shop.ServiceList[serviceid] || {});
		let item = service[packageid];
		if(item){
			item['SaleNum']=item['SaleNum']+1;
			console.log("1");
			console.log(item['SaleNum']);
		}
		state.PackageCartList = {...PackageCart};
	},
	[JIAN_PACKAGECART](state,{
		shopid,
		serviceid,
		packageid,
	}){
		let PackageCart = state.PackageCartList;
		let shop = PackageCart[shopid] = (PackageCart[shopid] || {'ShopName':null,ServiceList:{}});
		let service = shop.ServiceList[serviceid] = (shop.ServiceList[serviceid] || {});
		let item = service[packageid];
		if(item){
			item['SaleNum']=item['SaleNum']-1;
		}
		state.PackageCartList = {...PackageCart};
	},
	[UPDATE_PACKAGECART](state,{
		shopid,
		serviceid,
		oldpackageid,
		newpackageid,
		newpackagename,
		newpackageprice,
		newpackageoldprice
	}){
		let PackageCart = state.PackageCartList;
		console.log(PackageCart);
		console.log(shopid);
		let shop = PackageCart[shopid] = (PackageCart[shopid] || {'ShopName':null,ServiceList:{}});
		console.log(shop);
		let service = shop.ServiceList[serviceid] = (shop.ServiceList[serviceid] || {});
		console.log(service);
		let olditem = service[oldpackageid];
		let newitem = service[newpackageid];
		console.log(olditem);
		if(olditem){
			console.log("有旧的");
		}
		if(newitem){
			console.log("有新的");
			newitem['SaleNum']=newitem['SaleNum']+olditem['SaleNum']
		}
		else{
			service[newpackageid]={
				'ForShopId':olditem.ForShopId, 
				'ForServiceID':olditem.ForServiceID,
				'ForServiceName':olditem.ForServiceName,
				'PackageId':newpackageid,
				'PackageName':newpackagename,
				'SaleNum':olditem.SaleNum,
				'PackagePrice':newpackageprice,
				'PackageOldPrice':newpackageoldprice,
				'SelectStatue':olditem.SelectStatue,
			}
		}
		service[oldpackageid]=null;
	},
	[USER_ISLOGIN](state){
		console.log("输出用户信息");
		console.log(state.userInfo);
		if(state.userInfo==null){
			// state.LoginFrontPageUrl=url;
			return true;
		}
		else{
			return true;
		}
	},
	[LOCAL_USER](state,user){
		setStore("userInfo", user);
		console.log(user);
		state.userInfo = user;
		state.isLogin=true;
	},
	ToggleFooterShow(state,flag){
		state.FooterShow=flag;
	},
}
