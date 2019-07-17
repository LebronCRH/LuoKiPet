<template>
	<div class="rating_page">
	<head-top :Title="Title" :Color="Color" :MidType="MidType"></head-top>
	<div class="Middle" ref="Middle">
  	<scroller ref="scroller" lock-x height="-56" scrollbar-y>
  	<div>
    <div v-if="OrderInfo">
      <div class="OrderState" v-if="OrderInfo._MPetServiceShopOrder.OrderState==0">
        <span>未付款</span>
      </div>
      <div class="OrderState" v-if="OrderInfo._MPetServiceShopOrder.OrderState==1">
        <span>待使用</span>
      </div>
      <div class="OrderState" v-if="OrderInfo._MPetServiceShopOrder.OrderState==2">
        <span>已完成</span>
      </div>
      <div class="OrderState" v-if="OrderInfo._MPetServiceShopOrder.OrderState==10">
        <span>已取消(系统关闭)</span>
      </div>
      <div class="OrderState" v-if="OrderInfo._MPetServiceShopOrder.OrderState==20">
        <span>已取消(用户取消)</span>
      </div>
      <div class="OrderInfo">
          <img :src="GetImgList(OrderInfo._MServiceShop.ShopImg)" v-ImgEdit="{ width: 2, height: 2 }" alt="">
          <div class="ServiceInfo">
            <div class="ShopName">{{OrderInfo._MServiceShop.ShopName}}</div>
            <div class="ServiceAndPackage">总价:&nbsp ￥{{OrderInfo._MPetServiceShopOrder.ActualPrice}}&nbsp 数量:{{OrderInfo._MPetServiceShopOrder.OrderServiceNum}}张</div>
            <div class="PriceAndNum"><span>城西银泰</span><span>111.3km</span></div>
          </div>
      </div>
      <div class="ServiceInfo">
        <div class="ServiceName" v-for="item in OrderInfo._MServiceShopOrderDetails">
          <span class="Name">{{item.ServiceName}}&nbsp{{item.PackageName}}</span>
          <span class="Price">￥{{item.OnePrice}}&nbsp{{item.ServiceNum}}张</span>
        </div>
        <ul class="ul_serviceinfo">
          <li class="li_item">
            <span class="Title">购买数量</span><span class="Value">{{OrderInfo._MPetServiceShopOrder.OrderServiceNum}}张</span>
          </li>
          <li class="li_item">
            <span class="Title">优惠金额</span><span class="Value">-￥{{DiscountPrice}}</span>
          </li>
          <li class="li_item">
            <span class="Title">服务总价</span><span class="Value">￥{{OrderInfo._MPetServiceShopOrder.ActualPrice}}</span>
          </li>
        </ul>
        <div class="OrderPrice">
          <span class="Title">订单金额</span><span class="Value">￥{{OrderInfo._MPetServiceShopOrder.ActualPrice}}</span>
        </div>
      </div>
      <div class="Bottom">
          <ul class="ul_bottom">
            <li class="li_item">
              <span class="Title">订单编号</span><span class="Value">{{OrderInfo._MPetServiceShopOrder.OrderNumber}}</span>
            </li>
            <li class="li_item">
              <span class="Title">下单时间</span><span class="Value">{{OrderInfo._MPetServiceShopOrder.CreateTime}}</span>
            </li>
          </ul>
        </div>
    </div>
  	</div>
  	</scroller>
	</div>
  <div v-if="OrderInfo">
  <div class="OrderEdit" v-show="OrderInfo._MPetServiceShopOrder.OrderState==0">
      <div class="CancelOrder" @click="CancelServiceOrderFront()">
        <span>取消订单</span>
      </div>
      <div class="PayOrder" @click="PayServiceOrder()">
        <span>立即付款</span>
      </div>
  </div>
  <div class="OrderEdit" v-show="OrderInfo._MPetServiceShopOrder.OrderState==10||OrderInfo._MPetServiceShopOrder.OrderState==20">
      <div class="PayOrder">
        <span>再次购买</span>
      </div>
  </div>
  </div>
  <paywayselect ref="payway" :Paymoney="OrderInfo._MPetServiceShopOrder.ActualPrice" :OrderId="OrderInfo._MPetServiceShopOrder.MShopServiceOrderID" :CancelType="2" v-if="OrderInfo"></paywayselect>
  <div v-transfer-dom>
      <confirm v-model="CancelOrderconfirm"
      :title="'提示'"
      :content="'确定要取消该订单吗？'"
      @on-confirm="CancelServiceOrder">
      </confirm>
  </div>
  <transition name="router-slid" mode="out-in">
            <router-view></router-view>
  </transition>

	</div>
</template>

<script>
import axios from 'axios'
import headTop from '@/components/Head.vue'
import {mapState, mapMutations} from 'vuex'
import { Swiper, Scroller, Spinner,SwiperItem,Tab, TabItem,Confirm,TransferDomDirective as TransferDom } from 'vux'
import {GetServiceOrderInfo,GetUserServiceOrderInfoList,CancelServiceOrder} from '@/service/getdata' 
import paywayselect from '@/components/common/PayWaySelect' 

export default {
  components: {
    	headTop,
    	Scroller,
    	Tab,
      TabItem,
      Swiper,
      SwiperItem,
      Confirm,
      paywayselect,
  },
  data () {
      return {
        Title:'订单详情',
        Color:0,
        MidType:1,
        OrderInfo:null,
        CancelOrderconfirm:false,
      }
  },
  beforeRouteEnter (to, from, next) {
    console.log(from);
    console.log(to);  
    console.log('组件路由勾子：beforeRouteEnter');
    next(vm => {
      console.log(vm);  //vm为vue的实例
      console.log('组件路由勾子beforeRouteEnter的next')
    });
  },
  beforeCreate(){

  },
  created(){
    console.log(this.$router);
  },
  beforeMount(){
    console.log("beforeMount");
  },
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
    this.initHeadHeight();
    this.initData();
  },
  computed: {
      ...mapState([
                  'PackageCartList','userInfo','UserChangeOrderPhone','StatusbarHeight','StatusbarHeightRem',
      ]),
      DiscountPrice(){
        // console.log(parseFloat(this.OrderInfo._MPetServiceShopOrder.YouHuiQuan.BoQiBean));
         return parseFloat(this.OrderInfo._MPetServiceShopOrder.YouHuiQuan);
      },
  },
    props:[],
    methods: {
        ...mapMutations([
                'USER_ISLOGIN',
        ]),
        initHeadHeight(){
          if(this.$refs.Middle)
          {
            console.log("购买");
            this.$refs.Middle.style.top=(1.5+this.StatusbarHeightRem)*window.screen.width / 10+"px";
          }
        },
    	  async initData(){
          await GetServiceOrderInfo(this.$route.params.orderid).then(response=>{
            this.OrderInfo=response;
          })
        },
        GetImgList(imglist){
              var firstimg=imglist.split(",")[0];
              return firstimg;
        },
        PayServiceOrder(){
          this.$refs.payway.modalTaggle();
        },
        CancelServiceOrderFront(){
          this.CancelOrderconfirm=true;
        },
        async CancelServiceOrder()
        {
          await CancelServiceOrder(this.OrderInfo._MPetServiceShopOrder.MShopServiceOrderID).then(response=>{
            if(response==1)
            {
              this.OrderInfo._MPetServiceShopOrder.OrderState=20;
              this.$vux.toast.text('取消成功','middle');
            }
            else
            {
              this.$vux.toast.text('取消失败','middle');
            }
          })
        },
    },
    directives: {
      ImgEdit: {//图片显示按长宽等比居中显示的指令方法
        // 指令的定义
        inserted: function (el,binding) {
          var image=new Image();
          image.src=el.src; //获取图像路径
          image.onload=function(){
            var width1=image.width; //获取图像宽度
            var height1=image.height; //获取图像高度
            var RequestW=binding.value.width/10*window.screen.width;
            var RequestH=binding.value.height/10*window.screen.width;
            var a1=height1/width1;
            var a2=RequestH/RequestW;
            if(a1>a2){
              el.width=RequestW;
              el.height=height1*RequestW/width1;
              el.style.marginTop='-' + Math.round((el.height-RequestH)/2)+ 'px';
            }else{
              el.height=RequestH;
              el.width=width1*RequestH/height1;
              el.style.marginLeft='-' + Math.round((el.width-RequestW)/2)+ 'px';
            }
          };
        }
      },
      TransferDom
    },
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
  .Middle{
      position:absolute;top:1.5rem;left:0rem;bottom:0rem;width:100%;
  }
  .OrderState{
    width:100%;padding:0rem 0.25rem;height:1.2rem;display:flex;align-items:center;background:#f55b50;
    span{
      color:#fff;font-size:0.45rem;font-family:"微软雅黑";
    }
  }
  .OrderInfo{
          width:100%;height:2.5rem;padding:0.25rem;display:flex;align-items:center;justify-content:space-between;background:#fff;margin-bottom:0.2rem;
          img{
            width:2rem;height:2rem;margin-right:0.25rem;
          }
          .ServiceInfo{
            width:7.25rem;height:2rem;position:relative;
            .ShopName{
              width:100%;height:0.7rem;font-size:0.42rem;color:#000;font-family:"微软雅黑";line-height:0.7rem;
            }
            .ServiceAndPackage{
              width:100%;height:0.5rem;font-size:0.35rem;font-family:"微软雅黑";color:#000;margin:0.15rem 0rem;line-height:0.5rem;
            }
            .PriceAndNum{
              width:100%;height:0.5rem;line-height:0.5rem;font-size:0.35rem;font-family:"微软雅黑";color:#999;display:flex;align-items:center;justify-content:space-between;
            }
          }
   }
   .ServiceInfo{
    width:100%;list-style:none;background:#fff;
    .ServiceName{
      width:100%;padding:0rem 0.25rem;border-bottom:solid 1px #f8f8f8;height:1.5rem;display:flex;align-items:center;justify-content:space-between;
      .Name{
        font-size:0.45rem;color:#000;
      }
      .Price{
        font-size:0.45rem;color:#999;
      }
    }
    .ul_serviceinfo{
      width:100%;list-style:none;padding:0.1rem 0.25rem;
      .li_item{
        width:100%;height:0.8rem;font-size:0.35rem;display:flex;align-items:center;justify-content:space-between;color:#999;font-family:"微软雅黑";
      }
    }
    .OrderPrice{
      width:100%;padding:0rem 0.25rem;height:1.3rem;display:flex;align-items:center;justify-content:space-between;border-top:solid 1px #f8f8f8;
      .Title{
        color:#000;font-size:0.45rem;
      }
      .Value{
        color:#f55b50;font-size:0.45rem;
      }
    }
   }
  .Bottom{
      width:100%;margin-top:0.2rem;background: #fff;
      .ul_bottom{
        width:100%;list-style:none;padding:0.1rem 0.25rem;
        .li_item{
          width:100%;height:0.9rem;font-size:0.37rem;display:flex;align-items:center;justify-content:space-between;color:#999;font-family:"微软雅黑";
        }
      }
  }
  .OrderEdit{
          width:100%;height:1.4rem;border-top:solid 1px #f8f8f8;display:flex;align-items:center;justify-content:flex-end;background:#fff;padding:0rem 0.25rem;
          position:fixed;left:0rem;bottom:0rem;
          .CancelOrder{
            font-size:0.4rem;font-family:"微软雅黑";padding:0.1rem 0.25rem;background:#fff;border:solid 2px #f2f3f4;border-radius:5px;margin:0rem 0.2rem;
          }
          .PayOrder{
            font-size:0.4rem;font-family:"微软雅黑";padding:0.1rem 0.25rem;background:#f55b50;border:solid 2px #f55b50;border-radius:5px;color:#fff;
          }
  }
</style>
