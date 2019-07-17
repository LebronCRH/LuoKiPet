<template>
	<div class="rating_page">
	<head-top :Title="Title" :Color="Color" :MidType="MidType"></head-top>
  <div class="SlideOrderState" ref="SlideOrderState">
      <tab bar-active-color="#f55b50" :scroll-threshold="5" :line-width="3" active-color='#fc378c' v-model="InfoActiveIndex">
          <tab-item class="vux-center" active-class="active-tab" v-for="(item, index) in list2" @click="demo2 = item" :key="index">{{item}}</tab-item>
      </tab>
  </div>
	<div class="Middle" ref="Middle">
  	<scroller ref="scroller" lock-x height="-100" scrollbar-y @on-scroll="PageSlide">
  	<div>
    <swiper ref="swiperBigArticle" height="100vh" :show-dots="false" v-model="InfoActiveIndex" @on-index-change="InfoSwiperChange">
                <swiper-item>
                  <div class="PageItem" ref="swiperArticle">
                    <ul class="ul_Order">
                      <li class="li_OrderItem" v-for="item in OrderInfoList">
                        <p class="Head"><span class="ShopName">{{item._MServiceShop.ShopName}}</span>
                        <span class="OrderState" v-if="item._MPetServiceShopOrder.OrderState==0">未付款</span>
                        <span class="OrderState" v-if="item._MPetServiceShopOrder.OrderState==1">待使用</span>
                        <span class="OrderState" v-if="item._MPetServiceShopOrder.OrderState==2">已完成</span>
                        <span class="OrderState" v-if="item._MPetServiceShopOrder.OrderState==10">已取消(系统关闭)</span>
                        <span class="OrderState" v-if="item._MPetServiceShopOrder.OrderState==20">已取消(用户取消)</span>
                        </p>
                        <router-link :to="{ path:'/home/profile/orderdetails/'+item._MPetServiceShopOrder.MShopServiceOrderID}" tag="div" class="OrderInfo" v-for="detailsItem in item._MServiceShopOrderDetails" :key="detailsItem.MShopServiceOrderID">
                          <img :src="GetImgList(item._MServiceShop.ShopImg)" v-ImgEdit="{ width: 2, height: 2 }" alt="">
                          <div class="ServiceInfo">
                            <div class="ServiceAndPackage">{{detailsItem.ServiceName}} {{detailsItem.PackageName}}</div>
                            <div class="PriceAndNum"><span>￥{{detailsItem.OnePrice}}</span><span>{{detailsItem.ServiceNum}}</span></div>
                          </div>
                        </router-link>
                        <div class="OrderMoney">
                          <span>共{{item._MPetServiceShopOrder.OrderServiceNum}}个服务</span>&nbsp<span>合计:</span>&nbsp<span>￥{{item._MPetServiceShopOrder.ActualPrice}}</span>
                        </div>
                        <div class="OrderEdit" v-if="item._MPetServiceShopOrder.OrderState==0">
                          <div class="CancelOrder" @click="CancelServiceOrderFront(item)">
                            <span>取消订单</span>
                          </div>
                          <div class="PayOrder" @click="PayServiceOrder(item)">
                            <span>立即付款</span>
                          </div>
                        </div>
                        <div class="OrderEdit" v-if="item._MPetServiceShopOrder.OrderState==10||item._MPetServiceShopOrder.OrderState==20">
                          <div class="PayOrder">
                            <span>再次购买</span>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </swiper-item>
                <swiper-item>
                  <div class="PageItem" ref="swiperArticle1">
                    <ul class="ul_Order">
                      <li class="li_OrderItem" v-for="item in WaitPayOrder">
                        <p class="Head"><span class="ShopName">{{item._MServiceShop.ShopName}}</span>
                        <span class="OrderState" v-if="item._MPetServiceShopOrder.OrderState==0">未付款</span>
                        <span class="OrderState" v-if="item._MPetServiceShopOrder.OrderState==1">待使用</span>
                        <span class="OrderState" v-if="item._MPetServiceShopOrder.OrderState==2">已完成</span>
                        <span class="OrderState" v-if="item._MPetServiceShopOrder.OrderState==10">已取消(系统关闭)</span>
                        <span class="OrderState" v-if="item._MPetServiceShopOrder.OrderState==20">已取消(用户取消)</span>
                        </p>
                        <router-link :to="{ path:'home/profile/orderdetails/'+item._MPetServiceShopOrder.MShopServiceOrderID}" tag="div" class="OrderInfo" v-for="detailsItem in item._MServiceShopOrderDetails" :key="detailsItem.MShopServiceOrderID">
                          <img :src="GetImgList(item._MServiceShop.ShopImg)" v-ImgEdit="{ width: 2, height: 2 }" alt="">
                          <div class="ServiceInfo">
                            <div class="ServiceAndPackage">{{detailsItem.ServiceName}} {{detailsItem.PackageName}}</div>
                            <div class="PriceAndNum"><span>￥{{detailsItem.OnePrice}}</span><span>{{detailsItem.ServiceNum}}</span></div>
                          </div>
                        </router-link>
                        <div class="OrderMoney">
                          <span>共{{item._MPetServiceShopOrder.OrderServiceNum}}个服务</span>&nbsp<span>合计:</span>&nbsp<span>￥{{item._MPetServiceShopOrder.ActualPrice}}</span>
                        </div>
                        <div class="OrderEdit" v-if="item._MPetServiceShopOrder.OrderState==0">
                          <div class="CancelOrder" @click="CancelServiceOrderFront(item)">
                            <span>取消订单</span>
                          </div>
                          <div class="PayOrder">
                            <span>立即付款</span>
                          </div>
                        </div>
                        <div class="OrderEdit" v-if="item._MPetServiceShopOrder.OrderState==10||item._MPetServiceShopOrder.OrderState==20">
                          <div class="PayOrder">
                            <span>再次购买</span>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </swiper-item>
                <swiper-item>
                  <div class="PageItem" ref="swiperArticle2">
                    <ul class="ul_Order">
                      <li class="li_OrderItem" v-for="item in WaitUseOrder">
                        <p class="Head"><span class="ShopName">{{item._MServiceShop.ShopName}}</span>
                        <span class="OrderState" v-if="item._MPetServiceShopOrder.OrderState==0">未付款</span>
                        <span class="OrderState" v-if="item._MPetServiceShopOrder.OrderState==1">待使用</span>
                        <span class="OrderState" v-if="item._MPetServiceShopOrder.OrderState==2">已完成</span>
                        <span class="OrderState" v-if="item._MPetServiceShopOrder.OrderState==10">已取消(系统关闭)</span>
                        <span class="OrderState" v-if="item._MPetServiceShopOrder.OrderState==20">已取消(用户取消)</span>
                        </p>
                        <router-link :to="{ path:'home/profile/orderdetails/'+item._MPetServiceShopOrder.MShopServiceOrderID}" tag="div" class="OrderInfo" v-for="detailsItem in item._MServiceShopOrderDetails" :key="detailsItem.MShopServiceOrderID">
                          <img :src="GetImgList(item._MServiceShop.ShopImg)" v-ImgEdit="{ width: 2, height: 2 }" alt="">
                          <div class="ServiceInfo">
                            <div class="ServiceAndPackage">{{detailsItem.ServiceName}} {{detailsItem.PackageName}}</div>
                            <div class="PriceAndNum"><span>￥{{detailsItem.OnePrice}}</span><span>{{detailsItem.ServiceNum}}</span></div>
                          </div>
                        </router-link>
                        <div class="OrderMoney">
                          <span>共{{item._MPetServiceShopOrder.OrderServiceNum}}个服务</span>&nbsp<span>合计:</span>&nbsp<span>￥{{item._MPetServiceShopOrder.ActualPrice}}</span>
                        </div>
                        <div class="OrderEdit" v-if="item._MPetServiceShopOrder.OrderState==0">
                          <div class="CancelOrder">
                            <span>取消订单</span>
                          </div>
                          <div class="PayOrder">
                            <span>立即付款</span>
                          </div>
                        </div>
                        <div class="OrderEdit" v-if="item._MPetServiceShopOrder.OrderState==10||item._MPetServiceShopOrder.OrderState==20">
                          <div class="PayOrder">
                            <span>再次购买</span>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </swiper-item>
                <swiper-item>
                  <div class="PageItem" ref="swiperArticle3">
                    <ul class="ul_Order">
                      <li class="li_OrderItem">
                        <p class="Head"><span class="ShopName">贵宾犬之家</span><span class="OrderState">未付款</span></p>
                        <div class="OrderInfo">
                          <img src="static/image/UserBJ.png" alt="">
                          <div class="ServiceInfo">
                            <div class="ServiceAndPackage">狗狗寄样迷你犬 0kg-3kg</div>
                            <div class="PriceAndNum"><span>￥85</span><span>1</span></div>
                          </div>
                        </div>
                        <div class="OrderMoney">
                          <span>共1个服务</span>&nbsp<span>合计:</span>&nbsp<span>￥85</span>
                        </div>
                        <div class="OrderEdit">
                          <div class="CancelOrder">
                            <span>取消订单</span>
                          </div>
                          <div class="PayOrder">
                            <span>立即付款</span>
                          </div>
                        </div>
                      </li>
                      <li class="li_OrderItem">
                        <p class="Head"><span class="ShopName">贵宾犬之家</span><span class="OrderState">未付款</span></p>
                        <div class="OrderInfo">
                          <img src="static/image/UserBJ.png" alt="">
                          <div class="ServiceInfo">
                            <div class="ServiceAndPackage">狗狗寄样迷你犬 0kg-3kg</div>
                            <div class="PriceAndNum"><span>￥85</span><span>1</span></div>
                          </div>
                        </div>
                        <div class="OrderMoney">
                          <span>共1个服务</span>&nbsp<span>合计:</span>&nbsp<span>￥85</span>
                        </div>
                        <div class="OrderEdit">
                          <div class="CancelOrder">
                            <span>取消订单</span>
                          </div>
                          <div class="PayOrder">
                            <span>立即付款</span>
                          </div>
                        </div>
                      </li>
                      <li class="li_OrderItem">
                        <p class="Head"><span class="ShopName">贵宾犬之家</span><span class="OrderState">未付款</span></p>
                        <div class="OrderInfo">
                          <img src="static/image/UserBJ.png" alt="">
                          <div class="ServiceInfo">
                            <div class="ServiceAndPackage">狗狗寄样迷你犬 0kg-3kg</div>
                            <div class="PriceAndNum"><span>￥85</span><span>1</span></div>
                          </div>
                        </div>
                        <div class="OrderMoney">
                          <span>共1个服务</span>&nbsp<span>合计:</span>&nbsp<span>￥85</span>
                        </div>
                        <div class="OrderEdit">
                          <div class="CancelOrder">
                            <span>取消订单</span>
                          </div>
                          <div class="PayOrder">
                            <span>立即付款</span>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </swiper-item>
                <swiper-item>
                  <div class="PageItem" ref="swiperArticle4">
                    <ul class="ul_Order">
                      <li class="li_OrderItem">
                        <p class="Head"><span class="ShopName">贵宾犬之家</span><span class="OrderState">未付款</span></p>
                        <div class="OrderInfo">
                          <img src="static/image/UserBJ.png" alt="">
                          <div class="ServiceInfo">
                            <div class="ServiceAndPackage">狗狗寄样迷你犬 0kg-3kg</div>
                            <div class="PriceAndNum"><span>￥85</span><span>1</span></div>
                          </div>
                        </div>
                        <div class="OrderMoney">
                          <span>共1个服务</span>&nbsp<span>合计:</span>&nbsp<span>￥85</span>
                        </div>
                        <div class="OrderEdit">
                          <div class="CancelOrder">
                            <span>取消订单</span>
                          </div>
                          <div class="PayOrder">
                            <span>立即付款</span>
                          </div>
                        </div>
                      </li>
                      <li class="li_OrderItem">
                        <p class="Head"><span class="ShopName">贵宾犬之家</span><span class="OrderState">未付款</span></p>
                        <div class="OrderInfo">
                          <img src="static/image/UserBJ.png" alt="">
                          <div class="ServiceInfo">
                            <div class="ServiceAndPackage">狗狗寄样迷你犬 0kg-3kg</div>
                            <div class="PriceAndNum"><span>￥85</span><span>1</span></div>
                          </div>
                        </div>
                        <div class="OrderMoney">
                          <span>共1个服务</span>&nbsp<span>合计:</span>&nbsp<span>￥85</span>
                        </div>
                        <div class="OrderEdit">
                          <div class="CancelOrder">
                            <span>取消订单</span>
                          </div>
                          <div class="PayOrder">
                            <span>立即付款</span>
                          </div>
                        </div>
                      </li>
                      <li class="li_OrderItem">
                        <p class="Head"><span class="ShopName">贵宾犬之家</span><span class="OrderState">未付款</span></p>
                        <div class="OrderInfo">
                          <img src="static/image/UserBJ.png" alt="">
                          <div class="ServiceInfo">
                            <div class="ServiceAndPackage">狗狗寄样迷你犬 0kg-3kg</div>
                            <div class="PriceAndNum"><span>￥85</span><span>1</span></div>
                          </div>
                        </div>
                        <div class="OrderMoney">
                          <span>共1个服务</span>&nbsp<span>合计:</span>&nbsp<span>￥85</span>
                        </div>
                        <div class="OrderEdit">
                          <div class="CancelOrder">
                            <span>取消订单</span>
                          </div>
                          <div class="PayOrder">
                            <span>立即付款</span>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </swiper-item>
              </swiper>
  	</div>
  	</scroller>
	</div>
  <div v-transfer-dom>
      <confirm v-model="CancelOrderconfirm"
      :title="'提示'"
      :content="'确定要取消该订单吗？'"
      @on-confirm="CancelServiceOrder">
      </confirm>
  </div>
  <paywayselect ref="payway" :Paymoney="TotalMoney" :OrderId="OrderId" :CancelType="2"></paywayselect>
  <transition :name="transitionName" mode="out-in">
            <router-view></router-view>
  </transition>

	</div>
</template>

<script>
import axios from 'axios'
import headTop from '@/components/Head.vue'
import {mapState, mapMutations} from 'vuex'
import { Swiper, Scroller, Spinner,SwiperItem,Tab, TabItem,Confirm,TransferDomDirective as TransferDom} from 'vux'
import {GetServiceOrderInfo,GetUserServiceOrderInfoList,CancelServiceOrder} from '@/service/getdata' 
import paywayselect from '@/components/common/PayWaySelect' 

const list = () => ['全部', '待付款', '待使用', '待评价', '已完成']
export default {
  components: {
    	headTop,
    	Scroller,
    	Tab,
      TabItem,
      Swiper,
      SwiperItem,
      Confirm,
      paywayselect
  },
  data () {
      return {
        Title:'我的服务订单',
        Color:0,
        MidType:1,
        list2: list(),
        InfoActiveIndex:0,
        OrderInfoList:[],
        transitionName:'router-slid',
        transitionMode:'in-out',
        CancelOrderconfirm:false,
        PlanCancelOrder:null,
        TotalMoney:0,
        OrderId:null
      }
  },
  beforeCreate(){

  },
  created(){
    if(this.userInfo==null){
      console.log("去登录");
      this.$router.replace('/loginIndex');
    }
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
    this.initData();
    this.initHeadHeight();
    },
  computed: {
      ...mapState([
                  'PackageCartList','userInfo','UserChangeOrderPhone','StatusbarHeight','StatusbarHeightRem',
      ]),
      WaitPayOrder:function(){
        if(this.OrderInfoList.length>0)
        {
          var list=[];
          this.OrderInfoList.forEach((item)=>{
            if(item._MPetServiceShopOrder.OrderState==0){
              list.push(item);
            }
          })
          return list;
        }
        else
        {
          return [];
        }
      },
      WaitUseOrder:function(){
        if(this.OrderInfoList.length>0)
        {
          var list=[];
          this.OrderInfoList.forEach((item)=>{
            if(item._MPetServiceShopOrder.OrderState==1){
              list.push(item);
            }
          })
          return list;
        }
        else
        {
          return [];
        }
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
            this.$refs.SlideOrderState.style.marginTop=(1.5+this.StatusbarHeightRem)*window.screen.width / 10+"px";
            this.$refs.Middle.style.top=(1.5+this.StatusbarHeightRem)*window.screen.width / 10+44+"px";
          }
        },
    	  async initData(){
          await GetUserServiceOrderInfoList(this.userInfo.UserID).then(response=>{
            this.OrderInfoList=response;
          })
        },
        GetImgList(imglist){
              var firstimg=imglist.split(",")[0];
              return firstimg;
        },
        PageSlide (pos) {
          this.SlideChangeSwiperHeight(this.InfoActiveIndex);
        },
        InfoSwiperChange(index){
          this.InfoActiveIndex=index;
          this.SlideChangeSwiperHeight(index);
        },
        SlideChangeSwiperHeight(index){
          if(index==0){
            let swiperArticletH=this.$refs.swiperArticle.offsetHeight;
              this.swiperArticleHeight=swiperArticletH;
              this.$refs.swiperBigArticle.$el.children[0].style.height=this.swiperArticleHeight+"px";
              // console.log(this.$refs.swiperBigArticle.$el.children[0].style.height);
          }
          else if(index==1){
            let swiperArticletH=this.$refs.swiperArticle1.offsetHeight;
              this.swiperArticleHeight=swiperArticletH;
              this.$refs.swiperBigArticle.$el.children[0].style.height=this.swiperArticleHeight+"px";
          }
          else if(index==2){
            let swiperArticletH=this.$refs.swiperArticle2.offsetHeight;
              this.swiperArticleHeight=swiperArticletH;
            this.$refs.swiperBigArticle.$el.children[0].style.height=this.swiperArticleHeight+"px";
          }
          else if(index==3){
            let swiperArticletH=this.$refs.swiperArticle3.offsetHeight;
              this.swiperArticleHeight=swiperArticletH;
            this.$refs.swiperBigArticle.$el.children[0].style.height=this.swiperArticleHeight+"px";
          }
          else if(index==4){
            let swiperArticletH=this.$refs.swiperArticle4.offsetHeight;
              this.swiperArticleHeight=swiperArticletH;
            this.$refs.swiperBigArticle.$el.children[0].style.height=this.swiperArticleHeight+"px";
          }
        },
        CancelServiceOrderFront(order)
        {
          this.CancelOrderconfirm=true;
          this.PlanCancelOrder=order;
        },
        async CancelServiceOrder()
        {
          await CancelServiceOrder(this.PlanCancelOrder._MPetServiceShopOrder.MShopServiceOrderID).then(response=>{
            if(response==1)
            {
              this.PlanCancelOrder._MPetServiceShopOrder.OrderState=20;
              this.$vux.toast.text('取消成功','middle');
            }
            else
            {
              this.$vux.toast.text('取消失败','middle');
            }
          })
        },
        PayServiceOrder(order){
          this.TotalMoney=order._MPetServiceShopOrder.ActualPrice;
          this.OrderId=order._MPetServiceShopOrder.MShopServiceOrderID;
          this.$refs.payway.modalTaggle();
        }
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
  .SlideOrderState{
    width:100%;margin-top:1.5rem;
    .vux-tab-container {
        height:1.5rem;
        top: 0;
        left: 0;
        right: 0;
        overflow: hidden;
        position: absolute;
    }
  }
  .scrollable {
      box-sizing:content-box;
  }
  .router-slid-enter-active, .router-slid-leave-active {
      transition: all .4s;
  }
  .router-slid-enter, .router-slid-leave-active {
      transform: translate3d(2rem, 0, 0);
      opacity: 0;
  }
  .Middle{
      position:absolute;top:2.7rem;left:0rem;bottom:0rem;width:100%;
  }
  .active-tab{
    color:#f55b50 !important;
    border-color:#f55b50 !important;
  }
  .PageItem{
    width:100%;
    .ul_Order{
      list-style:none;width:100%;
      .li_OrderItem{
        width:100%;margin-bottom:0.2rem;
        .Head{
          width:100%;height:1rem;padding:0rem 0.25rem;display:flex;align-items:center;justify-content:space-between;background:#fff;
          .ShopName{font-size:0.35rem;font-family:"微软雅黑";color:#000;}
          .OrderState{font-size:0.35rem;font-family:"微软雅黑";color:#f55b50;}
        }
        .OrderInfo{
          width:100%;height:2.5rem;padding:0.25rem;display:flex;align-items:center;justify-content:space-between;background:#f8f8f8;
          img{
            width:2rem;height:2rem;margin-right:0.25rem;
          }
          .ServiceInfo{
            width:7.25rem;height:2rem;position:relative;
            .ServiceAndPackage{
              width:100%;height:0.5rem;font-size:0.35rem;font-family:"微软雅黑";color:#000;position:absolute;top:0rem;
            }
            .PriceAndNum{
              width:100%;height:0.5rem;font-size:0.35rem;font-family:"微软雅黑";color:#999;display:flex;align-items:center;justify-content:space-between;position:absolute;bottom:0rem;
            }
          }
        }
        .OrderMoney{
            width:100%;height:1.1rem;padding:0rem 0.25rem;display:flex;align-items:center;justify-content:flex-end;background:#fff;
            span{
              font-size:0.4rem;font-family:"微软雅黑";color:#000;
            }
        }
        .OrderEdit{
          width:100%;height:1.4rem;border-top:solid 1px #f8f8f8;display:flex;align-items:center;justify-content:flex-end;background:#fff;padding:0rem 0.25rem;
          .CancelOrder{
            font-size:0.4rem;font-family:"微软雅黑";padding:0.1rem 0.25rem;background:#fff;border:solid 2px #f2f3f4;border-radius:5px;margin:0rem 0.2rem;
          }
          .PayOrder{
            font-size:0.4rem;font-family:"微软雅黑";padding:0.1rem 0.25rem;background:#f55b50;border:solid 2px #f55b50;border-radius:5px;color:#fff;
          }
        }
      }
    }
  }
</style>
