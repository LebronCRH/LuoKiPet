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
	})

//登录API结束 


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