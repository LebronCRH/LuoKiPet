import fetch from '../config/fetch'

//登录API开始
	/*用户密码登录*/
	export const userLogin=(username,password)=>fetch('/user/UserLogin',{
		UserName:username,
		UserPassword:password,
	});
	/*判断是否有当前用户名注册过*/
	export const JudgeHasUser=(username)=>fetch('/user/JudgeHasUser',{
		UserName:username,
	})

	/*发送短信验证码*/
	export const MessageSend=(phone)=>fetch('/api/MessageSend',{
		Phone:phone,
	})

	/*短信验证码登录*/
	export const GetUserInfoByYzm=(phone,yzm)=>fetch('/user/GetUserInfoByYzm',{
		Mobile:phone,
		PhoneYzm:yzm,
	})

	/*创建用户的时候判断输入的手机号是否已被注册*/
	export const UserRegisterPhoneHas=(phone)=>fetch('/user/UserRegisterPhoneHas',{
		Phone:phone,
	});
	/*注册用户信息到数据库*/
	export const UserRegister=(Obj)=>fetch('/user/UserRegister',Obj,'POST');
	/*用户忘记密码手机验证*/
	export const ForgetPasswordVerification=(phone)=>fetch('/user/ForgetPasswordVerification',{
		Phone:phone,
	});
	/*忘记密码第二部验证码验证*/
	export const YzmVerification=(yzm,phone)=>fetch('/user/YzmVerification',{
		UserYzm:yzm,
		UserPhone:phone,
	});
	/*修改密码*/
	export const UpdateUserPassword=(Obj)=>fetch('/user/UpdateUserPassword',Obj,'POST');

	/*发送短信给某个手机号*/
	export const PhoneSendMessage=(phone)=>fetch('/user/PhoneSendMessage',{
		Phone:phone,
	});

	/*根据用户的ID获得某个用户的信息*/
	export const GetUserInfoByUserID=(userid)=>fetch('/user/GetUserInfoByUserID',{
		UserID:userid,
	});

	/*获得用户的好友列表*/
	export const GetUserFriendly=(userid)=>fetch('/user/GetUserFriendly',{
		UserId:userid,
	});

	/*获取用户的收货地址*/
	export const GetUserReceivingAddress=(userid)=>fetch('/user/GetUserReceivingAddress',{
		UserId:userid,
	});

	/*添加用户的收获地址*/
	export const AddUserReceivingAddress=(Obj)=>fetch('/user/AddUserReceivingAddress',Obj,'Post');

	/*获取一个收获地址信息*/
	export const GetUserReceivingAddressItem=(addressid)=>fetch('/user/GetUserReceivingAddressItem',{
		addressId:addressid,
	});
	/*删除某个收获地址并处理默认的地址*/
	export const DeleteAddressItemAndReturnList=(addressid)=>fetch('/user/DeleteAddressItemAndReturnList',{
		addressId:addressid,
	});
	/*更改用户的默认地址*/
	export const UpdateUserDefaultAddress=(addressid)=>fetch('/user/UpdateUserDefaultAddress',{
		addressId:addressid,
	});

//登录API结束 


//爱秀宠物API开始
    export const GetLoveShowPhotos=()=>fetch('/loveshow/GetLoveShowPhotos');
//爱秀宠物API结束


//宠物服务店的API开始
    
    /*获取所有服务店的信息*/
    export const GetAllPetServiceShop=()=>fetch('/api/GetAllPetServiceShop');

    /*根据服务店ID来获取一个服务店的信息*/
    export const GetPetServiceShopByID=(id)=>fetch('/serviceshop/GetPetServiceShopById',{
    	shopid:id,
    })

    /*服务详情页根据服务ID来获取服务的数据信息*/
    export const GetShopServiceInfoByServiceID=(id)=>fetch('/serviceshop/GetServiceInfoByID',{
    	serviceId:id,
    })

    /*获取所有的排序方式*/
    export const GetAllShopScreen=()=>fetch('/serviceshop/GetAllShopScreen');

    /*获取所有的服务店区域数据*/
    export const GetAllCityArea=()=>fetch('/serviceshop/GetAllCityArea');

    /*SQL数据库根据城市和经纬度来默认先获取最近的前十个店铺数据*/
    export const GetPetShopByCityAndJwd=(cityname,lng,lat)=>fetch('/serviceshop/GetPetShopByCityAndJwd',{
    	CityName:cityname,
    	lng:lng,
    	lat:lat
    });
    /*SQL数据库根据店铺Id获取店铺信息数据*/
    export const GetPetShopByShopId=(shopid,lng,lat)=>fetch('/serviceshop/GetPetShopByShopId',{
    	ShopId:shopid,
    	lng:lng,
    	lat:lat
    });
    /*SQL数据库根据服务的ID获取服务的详细信息(包含服务和服务的套餐)*/
    export const GetShopServiceDetail=(serviceid)=>fetch('/serviceshop/GetShopServiceDetail',{
    	ServiceId:serviceid,
    });
    /*SQL数据库根据ID近获取简单的店铺数据*/
    export const GetPetShopItemByShopId=(shopid)=>fetch('/serviceshop/GetPetShopItemByShopId',{
    	ShopId:shopid,
    });
    /*SQL数据库用户地图显示的时候获取店铺信息和附近店铺的信息*/
    export const GetPetShopMapByShopId=(shopid)=>fetch('/serviceshop/GetPetShopMapByShopId',{
    	ShopId:shopid,
    });
    /*SQL数据库服务主页用来获取城市的区域和地址首字母的视图*/
    export const GetMCityViewModel=(cityname)=>fetch('/mcity/GetMCityViewModel',{
    	CityName:cityname,
    });
    /*SQL数据库按条件进行分页POST查询*/
    export const PostPetShopByQueryModel=(Obj)=>fetch('/serviceshop/PostPetShopByQueryModel',Obj,'POST');

//宠物服务店的API结束

//仿饿了么项目API接口开始
   export const cityGuess = () => fetch('/v1/cities', {
	  type: 'guess'
   },'GET','fetch','elm');

   /*搜索地址API*/
   export const searchplace = (cityid, value) => fetch('/v1/pois', {
		type: 'search',
		city_id: cityid,
		keyword: value
   },'GET','fetch','elm');

   /*获取热门城市*/
   export const hotcity = () => fetch('/v1/cities', {
	  type: 'hot'
   },'GET','fetch','elm');

   /*获取所有的城市*/
   export const groupcity = () => fetch('/v1/cities', {
		type: 'group'
   },'GET','fetch','elm');
//仿饿了么项目API接口结束