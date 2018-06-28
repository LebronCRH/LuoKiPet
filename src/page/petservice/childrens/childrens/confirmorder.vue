<template>
	<div class="rating_page">
	<head-top :Title="Title" :Color="Color" :MidType="MidType"></head-top>
	<div class="Middle">
	<scroller ref="scroller" lock-x height="-56" scrollbar-y>
	<div>
	            <div class="Co_BigDiv">
              <div class="BDMobile">
                 <router-link  :to="{ path: 'changeorderphone',append:true}">
                   <span class="Msg">将订单凭证码发送至</span>
                   <p ui-sref="Identity_verification">
                   <span class="mobile">{{OrderPhone}}<i></i></span>
                   </p>
                 </router-link>
              </div>
              <div class="ShopNmae">
                <p>洛奇宠物服务会所</p>
              </div>
              <div class="ServiceInfo">
                <p class="serviceName">
                  <img src="static/image/discount.png"><span>{{Service.MShopService.ServiceName}}</span>
                </p>
                <p class="serviceCate">
                <span class="name">{{BuyPackage.name}}</span><span class="num">x{{BuyNum}}</span>
                </p>
                <p class="CurrentMoney">
                <span>￥{{BuyPackage.sprice}}</span>
                </p>
              </div>
              <div class="CouponInfo">
                   <span class="Msg">优惠券</span>
                 <p>
                 <span class="mobile">最大优惠金额￥{{Discount}}<i></i></span>
                 </p>
              </div>
<!--               <div class="LuoKiDiscount">
                <span>可用30洛奇豆抵扣￥3</span>
                <div class=" item-toggle">
                    <label class="toggle toggle-positive">
                     <input type="checkbox" checked="">
                  <div class="track">
                    <div class="handle"></div>
                  </div>
                    </label>
                    </div>
              </div> -->
    <group>
      <x-switch :title="Title2" v-model="UseLuokiBean"></x-switch>
    </group>
              <div class="AllPrice">
                 <span class="msg">订单￥{{BuyPackage.sprice*BuyNum}} 优惠￥{{Discount}} <span v-if="UseLuokiBean">抵扣￥{{LuokiBean}}</span></span>
                 <span class="PayMoney">待支付￥{{TotalMoney}}</span>
              </div>
            </div>
	</div>
	</scroller>
	</div>
	        <div class="FooterPay">
               <div class="Msg">
                  <span class="daiMsg">待支付:</span><span class="Money">￥{{TotalMoney}}</span>
               </div>
               <div class="Bt_Pay">
               <span class="Bt_ConfirmOrder" @click="InitOrderViewModel()">确认支付</span>
               </div>
            </div>

            <paywayselect ref="payway" :Paymoney="TotalMoney" :OrderId="OrderId"></paywayselect>

  <transition name="router-slid" mode="out-in">
            <router-view></router-view>
  </transition>

	</div>
</template>

<script>
import axios from 'axios'
import headTop from '@/components/Head.vue'
import {mapState, mapMutations} from 'vuex'
import { Scroller,XSwitch,Group  } from 'vux'
import {GetShopServiceDetail,UserBuyServiceOrder} from '@/service/getdata' 
import paywayselect from '@/components/common/PayWaySelect'

export default {
    components: {
    	headTop,
    	Scroller,
    	XSwitch,
    	Group,
      paywayselect
    },
    data () {
      return {
        msg: 'Hello World!',
        Title:'立即购买',
        Color:0,
        MidType:1,
        Service:{
          MShopService:null,
          MServicePackageList:null,
        },
        servicelistdata:[],
        Title2:"可用30洛奇豆抵扣￥3",
        BuyNum:2,
        PackagePrice:35,
        UseLuokiBean:false,
        LuokiBean:3,
        Discount:10,
        UseDiscount:true,
        BuyPackage:{
          PackageId:0,
        	name:null,
        	sprice:0,
        	Oldprice:0,
          ForServiceID:0,
        },
        MServiceShopOrderViewModel:null,
        MPetServiceShopOrder:null,
        MServiceShopOrderDetailsList:null,
        ConfirmOrderState:false,
        OrderId:null,
      }
    },
  beforeCreate(){
    // if(!this.USER_ISLOGIN(this.$route.path)){
    //   console.log("去登录");
    //   this.$router.push('/loginIndex');
    // }
  },
  created(){
    // var flag=this.userInfo;
    // console.log(flag);
    if(this.userInfo==null){
      console.log("去登录");
      this.$router.replace('/loginIndex');
    }
  },
  beforeMount(){
    console.log("beforeMount");
  },
  // beforeUpdate(){
  //   console.log("beforeUpdate");
  // },
  // updated(){
  //   console.log("updated");
  // },
  activated(){
    console.log("activated");
  },
  deactivated(){
    console.log("deactivated");
  },
  beforeDestroy(){
    console.log("beforeDestroy");
  },
  destroyed(){
    console.log("destroyed");
  },
  mounted(){
    	this.initData();
    },
  computed: {
      ...mapState([
                  'PackageCartList','userInfo','UserChangeOrderPhone'
      ]),
    	TotalMoney:function(){
    		if(this.UseLuokiBean){
    			return this.BuyPackage.sprice*this.BuyNum-this.LuokiBean-this.Discount;
    		}
    		else
    		{
    			return this.BuyPackage.sprice*this.BuyNum-this.Discount;
    		}
    	},
      OrderPhone:function(){
        if(this.UserChangeOrderPhone==null)
        {
          return this.userInfo.RegisterPhone;
        }else{
          return this.UserChangeOrderPhone;
        }
      },
      OrderLuokiBean:function(){
        if(this.UseLuokiBean){
          return this.LuokiBean;
        }
        else
        {
          return 0;
        }
      }
  },
    props:[],
    methods: {
        ...mapMutations([
                'USER_ISLOGIN',
        ]),
    	  async initData(){
      		this.BuyNum=this.$route.query.BuyNum;
      		this.GetOrderData();
        },
        BuyService(){
        },
        async GetOrderData(){
          // axios.get("./static/data/ServiceCategory.json").then((response)=>{
          //   this.servicelistdata=response.data;
          //   this.servicelistdata.forEach((item,index)=>{
          //   	if(item.ForServiceID==this.$route.query.ServiceId){
          //   		this.Service=item;
          //   		this.BuyPackage=item.Category[this.$route.query.Index];
          //   	}
          //   })
          // });
          await GetShopServiceDetail(this.$route.query.ServiceId).then(response=>{
            this.Service=response;
            this.Service.MServicePackageList.forEach(item=>{
              if(item.PackageId==this.$route.query.PackageId)
              {
                this.BuyPackage=item;
              }
            })
          });
        },
        //初始化要POST的ViewModel订单数据
        InitOrderViewModel(){
          if(!this.ConfirmOrderState)
          {
            this.MPetServiceShopOrder={
              ShopID:this.Service.MShopService.ForShopID,
              ShopName:this.Service.MPetServiceShop.ShopName,
              OrderTolatPrice:this.BuyPackage.sprice*this.BuyNum,
              YouHuiQuan:this.Discount,
              BoQiBean:this.OrderLuokiBean,
              ActualPrice:this.TotalMoney,
              CreateUserID:this.userInfo.UserID,
              OrderServiceNum:this.BuyNum,
              OrderUserPhone:this.OrderPhone,
            };
            var DetailsList=[];
            var DetailsItem={
              ServiceID:this.Service.MShopService.ServiceId,
              ServiceName:this.Service.MShopService.ServiceName,
              PackageID:this.BuyPackage.PackageId,
              PackageName:this.BuyPackage.name,
              ServiceNum:this.BuyNum,
              OnePrice:this.BuyPackage.sprice,
            };
            DetailsList.push(DetailsItem);
            this.MServiceShopOrderDetailsList=DetailsList;
            this.MServiceShopOrderViewModel={
              _MPetServiceShopOrder:this.MPetServiceShopOrder,
              _MServiceShopOrderDetails:this.MServiceShopOrderDetailsList
            };
            UserBuyServiceOrder(this.MServiceShopOrderViewModel).then(response=>{
              this.OrderId=response._MPetServiceShopOrder.MShopServiceOrderID;
              this.ConfirmOrderState=true;
            })
          }
          this.$refs.payway.modalTaggle();
        },
    }
}
</script>

<style lang="scss" scoped="">
.rating_page{
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: #f7f3f7;
		z-index: 100;
        p, span{
            font-family: Helvetica Neue,Tahoma,Arial;
        }
}
.router-slid-enter-active, .router-slid-leave-active {
    transition: all .4s;
}
.router-slid-enter, .router-slid-leave-active {
    transform: translate3d(2rem, 0, 0);
    opacity: 0;
}
/*确认订单界面样式*/
.Co_BigDiv{width:100%;overflow:hidden;
	.BDMobile{width:100%;height:1.3rem;position:relative;display:flex;align-items:center;background-color:#fff;padding:0rem 0.3rem;margin-top:0.06rem;box-sizing: border-box;
		.Msg{font-size:0.4rem;color:#0f0f0f;}
		p{position:absolute;height:1.3rem;top:0rem;right:0.3rem;display:flex;align-items:center;
			.mobile{font-size:0.3rem;color:#8e8e8e;
				i{display:inline-block;width:0.3rem;height:0.3rem;background:url(../../../../../static/image/right_.png);background-size:0.3rem 0.3rem;margin-left:0.3rem;}
			}
		}
	}
	.ShopNmae{width:100%;padding:0rem 0.3rem;height:1.3rem;display:flex;align-items:center;background-color:#fff;margin-top:0.06rem;    box-sizing: border-box;
		p{color:#0f0f0f;font-size:0.4rem;margin:0rem;}
	}
	.ServiceInfo{width:100%;height:1.7rem;padding:0.2rem 0.3rem;margin-top:0.06rem;background-color:#fff;position:relative;    box-sizing: border-box;
		.serviceName{height:0.75rem;display:flex;align-items:center;margin:0rem;
			img{width:0.5rem;height:0.5rem;margin-right:0.2rem;}
			span{font-size:0.38rem;color:#0f0f0f;}
		}

		.serviceCate{height:0.55rem;display:flex;align-items:center;margin:0rem;
			.name{font-size:0.3rem;color:#8e8e8e;margin-right:0.5rem;}
			.num{font-size:0.3rem;color:#8e8e8e;}
		}

		.CurrentMoney{position:absolute;height:1.7rem;display:flex;align-items:center;top:0rem;right:0.3rem;
			span{font-size:0.3rem;color:#0f0f0f;}
		}
	}
		.CouponInfo{width:100%;height:1.3rem;position:relative;display:flex;align-items:center;background-color:#fff;padding:0rem 0.3rem;margin-top:0.06rem;    box-sizing: border-box;
		   .Msg{font-size:0.4rem;color:#0f0f0f;}
		  p{position:absolute;height:1.3rem;top:0rem;right:0.3rem;display:flex;align-items:center;
			.mobile{font-size:0.3rem;color:#8e8e8e;
				i{display:inline-block;width:0.3rem;height:0.3rem;background:url(../../../../../static/image/right_.png);background-size:0.3rem 0.3rem;margin-left:0.3rem;}
			}
		  }
		}
		.LuoKiDiscount{width:100%;height:1.3rem;display:flex;align-items:center;background-color:#fff;padding:0rem 0.3rem;margin-top:0.06rem;justify-content:space-between;position:relative; box-sizing: border-box;
			span{
				font-size:0.4rem;
			}
		}
		.AllPrice{width:100%;height:1.3rem;display:flex;align-items:center;background-color:#fff;padding:0rem 0.3rem;margin-top:0.06rem;justify-content:space-between;    box-sizing: border-box;
			.msg{font-size:0.36rem;color:#8f8f94;}
			.PayMoney{font-size:0.36rem;color:#0f0f0f;}
		}
}
.FooterPay{width:100%;height:1.25rem;background-color:#fff;position:fixed;left:0rem;bottom:0rem;
	.Msg{
		width:7rem;height:100%;padding-left:0.3rem;display:flex;align-items:center;float:left;    box-sizing: border-box;
		.daiMsg{font-size:0.34rem;color:#676767;margin-right:0.4rem;}
		.Money{font-size:0.37rem;color:#f75952;}
	}
	.Bt_Pay{
		width:3rem;height:100%;background-color:#f75952;float:left;display:flex;align-items:center;justify-content:center;
		.Bt_ConfirmOrder{
			font-size:0.45rem;color:#fff;
		}
	}
}
.Middle{
    position:absolute;top:1.6rem;left:0rem;bottom:0rem;width:100%;
}
</style>
