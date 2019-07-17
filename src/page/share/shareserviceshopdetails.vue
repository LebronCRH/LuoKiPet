<template>
  <div class="rating_page" v-if="shopinfo.PetShopInfo.ShopImg">
    <div class="ShopHead">
       <div class="shopheadback">
<!--          <img src="static/image/back.png"> -->
       </div>
       <div class="shopheadmid" ref="my_shopheadmid">
          <p>{{shopinfo.PetShopInfo.ShopName}}</p>
       </div>
       <div class="shopheadedit" ui-sref="zx_article">
<!--           <img src="static/image/dian.png" @click.self="ToggleShareEdit()">
          <ul class="ul_ShopEdit" v-show="ShareEdit">
            <li class="editItem top"><img src="static/image/png/SC.png" alt="">收藏</li>
            <li class="editItem top" @click="ToggelshowShareList"><img src="static/image/png/share2.png" alt="">分享</li>
            <li class="editItem"><img src="static/image/png/ruzhu.png" alt="">商家入驻</li>
          </ul> -->
       </div>
    </div>
    <div>
      <scroller ref="scroller" lock-x height="-45" scrollbar-y use-pulldown :use-pullup=true @on-scroll="PageSlide" @on-pullup-loading="UpPagedade" @on-pulldown-loading="DownPageData" v-model="scrollerStaues">
        <div>
          <swiper auto  v-model="Swiper_index" dots-position="center">
            <swiper-item v-for="(item,index) in GetImgList(shopinfo.PetShopInfo.ShopImg)" :key="index">
               <div class="TopSlideImg" @click="show(index)">
                <img class="TopSlideImgItem" :src="item">
               </div>
            </swiper-item>
          </swiper>
          <div class="psd_Mid">
              <p class="shopname">{{shopinfo.PetShopInfo.ShopName}}</p>
              <router-link :to="{ path: '/petserviceIndex/serviceshopdetails/'+shopinfo.PetShopInfo.Shop_id+'/shopmap',query:{shopid:shopinfo.PetShopInfo.Shop_id}}">
                <div class="shopnode">
                  <img src="static/image/node1.png">
                  <span>{{shopinfo.PetShopInfo.Address.substring(0,17)}}…</span>
                </div>
              </router-link>
              <div class="shopjuli"> 
                <img src="static/image/qizi.png">
                <span>距离{{shopinfo.PetShopInfo.Distance}} | {{shopinfo.PetShopInfo.Node}}</span>
              </div>
              <div class="shop_evaluate">
                <p class="pinjia">5.5</p>
              <div class="xingji">
              </div>
                <p class="shouNum">已售{{shopinfo.PetShopInfo.SaleNum}}</p>
              </div>
              <div class="shopyuyue">
                 <router-link :to="{ path: '/petserviceIndex/serviceshopdetails/confirmorder'}">
                     <div class="bt_yuyue">
                     <span>电话预约</span>
                     </div>
                 </router-link>
              </div>
          </div>
          <div class="ps_liInfoBt">
             <img src="static/image/discount.png">
             <span>全场服务86折优惠</span>
             <div class="Right">
               <span>1个活动<i></i></span>
             </div>
          </div>
          <div style="width:100%;height:0.2rem;background:#f2f0f2"></div>    
          <div class="ps_topcate" style="padding:0rem 0.3rem;">
            <ul class="ps_ulcate">
              <li :class="InfoActiveIndex==0?'active':''" @click="SelectInfoSwiper(0)">服务列表</li>
              <li :class="InfoActiveIndex==1?'active':''" @click="SelectInfoSwiper(1)">商家信息</li>
             </ul>
          </div>  
          <swiper ref="swipershop" :show-dots="false" v-model="InfoActiveIndex" @on-index-change="InfoSwiperChange">
             <swiper-item>
               <div class="pss_service" ref="swiperLeft">
                     <div class="ps_scategory">
                     <ul class="ul_cateItem">
                       <li class="active" v-for="item in shopinfo.ShopServiceCate">
                       <span>{{item.CateName}}</span>
                       </li>
                     </ul>
                     </div>
                     <div class="ps_servicelist">
                       <ul class="ul_serviceItem" v-for="serviceCate in shopinfo.ShopServiceCate">
                         <li class="ServiceCateName">
                            <span>{{serviceCate.CateName}}</span>
                         </li>
                         <li v-for="serviceItem in serviceCate.ServiceList">
<!--                          <router-link :to="{ path: 'servicedetails',params:{serviceid:serviceItem.ServiceId},append:true}"> -->
                         <router-link :to="{ name: 'servicedetails',params:{serviceid:serviceItem.ServiceId},append:true}">
                         <p class="ItemName"><span>{{serviceItem.ServiceName}}</span><img src="static/image/discount.png"></p>
                         <div class="ItemMid">
                           <span>已售{{serviceItem.SaleNum}} ~ 暂无评价</span>
                           <div class="buy" @click.stop.prevent="BuyService(serviceItem.ServiceId)">购买</div>
                         </div>
                         <p class="ItemPrice">￥{{serviceItem.MinPrice}}起</p>
                         </router-link>
                       </li>
                     </ul>
                   </div>
                   </div>
             </swiper-item>
             <swiper-item>
                <div class="swiperRight" ref="swiperRight">
                  <div class="ShopIntroBig">
                      <div class="ShopHours ShopItem">
                             <p class="Title">营业时间</p>
                            <div class="Content">
                             <img src="static/image/yuandian.png">
                             <span>{{shopinfo.PetShopInfo.BusinessHours}}</span>
                            </div>
                      </div>
                      <div class="ShopCart ShopItem">
                        <p class="Title">车位情况</p>
                          <div class="Content">
                           <img src="static/image/yuandian.png">
                            <span>{{shopinfo.PetShopInfo.WiFi}}</span>
                          </div>
                      </div>
                      <div class="ShopWiFi ShopItem">
                          <p class="Title">有无WiFi</p>
                          <div class="Content">
                             <img src="static/image/yuandian.png">
                              <span>{{shopinfo.PetShopInfo.Cart}}</span>
                          </div>
                      </div>
                      <div class="ShopIntro ShopItem">
                         <p class="Title">商户介绍</p>
                          <div class="Content">
                            <img src="static/image/yuandian.png">
                             <span>{{shopinfo.PetShopInfo.ShopIntro}}</span>
                          </div>
                      </div>
                  </div>
<!--                   <ul class="ul_ShopTeach">
                          <li class="TeachItem" v-for="item in shopinfo.ShopTeach">
                            <div class="TeachImg">
                            <img :src="imgBaseUrl+item.Image">
                            </div>
                            <div class="TeachInfo">
                              <p class="Name">{{item.TeachName}}</p>
                              <div class="TeachLevel">
                                <img src="static/image/star1.png">  <span>311人评价</span>
                              </div>
                              <p class="Intro">{{item.Intro}}…</p>
                            </div>
                          </li>
                  </ul> -->
                </div>
             </swiper-item>
          </swiper>
        </div>
         <div slot="pulldown" class="xs-plugin-pulldown-container xs-plugin-pulldown-down" style="position: absolute; width: 100%; height:1.4rem; line-height:1.4rem; top:-1.4rem; text-align: center;">
            <span v-show="scrollerStaues.pulldownStatus === 'default'"></span>
            <span class="pulldown-arrow" v-show="scrollerStaues.pulldownStatus === 'down' || scrollerStaues.pulldownStatus === 'up'" :class="{'rotate': scrollerStaues.pulldownStatus === 'up'}">↓</span>
            <span v-show="scrollerStaues.pulldownStatus === 'loading'"><spinner type="ios-small"></spinner></span>
          </div>
          <div slot="pullup" class="xs-plugin-pullup-container xs-plugin-pullup-up" style="position: absolute; width: 100%; height:1.4rem; line-height:1.4rem; bottom:-1.4rem; text-align: center;">
            <span v-show="scrollerStaues.pullupStatus === 'default'"></span>
            <span class="pulldown-arrow" v-show="scrollerStaues.pullupStatus === 'down' || scrollerStaues.pullupStatus === 'down'" :class="{'rotate': scrollerStaues.pullupStatus === 'down'}">↑</span>
            <span v-show="scrollerStaues.pullupStatus === 'loading'"><spinner type="ios-small"></spinner></span>
          </div>
      </scroller>
    </div>
    <transition name="fadePackageList">
      <div class="PackageCartList1" v-show="showPackageCartList">
        <div class="Top">
          <p>券包</p>
          <div class="Clear">
            <img src="static/image/Clear.png">
            <span>清空</span>
          </div>
        </div>
        <ul class="ul_packagelist">
          <li class="li_packageitem" v-for="item in ShopPackageCartList">
            <div class="PackageName">
            <span>{{item.ForServiceName}} {{item.PackageName}}</span>
            </div>
            <div class="MiddlePrice">
              <span>￥{{item.PackagePrice}}</span>
            </div>
            <div class="EditPackage">
              <div class="jian" @click="PackageCartJian(item.ForShopId,item.ForServiceID,item.PackageId)">
                <img src="static/image/buyjian.png" alt="">
              </div>
              <div class="buynum">
                <span>{{item.SaleNum}}</span>
              </div>
              <div class="jia" @click="PackageCartJia(item.ForShopId,item.ForServiceID,item.PackageId)">
                <img src="static/image/buyAdd.png" alt="">
              </div>
            </div>
          </li>
        </ul>
      </div>
    </transition>
    <transition name="fadePackageList">
      <div class="DivShareEdit" v-show="showShareList">
      <ul class="ul_ShareEdit">
        <li class="li_ShareItem" @click="ShareMessage('weixin',1)">
          <img src="static/image/png/WXLogin.png" alt="">
          <span>微信</span>
        </li>
        <li class="li_ShareItem" @click="ShareMessage('weixin',2)">
          <img src="static/image/png/PYQ.png" alt="">
          <span>朋友圈</span>
        </li>
        <li class="li_ShareItem" @click="ShareMessage('qq')">
          <img src="static/image/png/QQLogin.png" alt="">
          <span>QQ好友</span>
        </li>
        <li class="li_ShareItem">
          <img src="static/image/png/QQKJ.png" alt="">
          <span>QQ空间</span>
        </li>
      </ul>
      <div class="CancelShare" @click="ToggelshowShareList">取消</div>
      </div>
    </transition>
    <div class="zhemodale" v-show="showPackageCartList" @click="TagglePackageCartList"></div>
    <div class="zhemodale" v-show="showShareList" @click="ToggelshowShareList"></div>
    <div class="ps_ServiceBag">
       <div class="Left">
         <div class="Img" @click="TagglePackageCartList">
           <img src="static/image/bag1.png">
           <p v-if="CartTotalNum>0" class="Num">{{this.CartTotalNum}}</p>
         </div>
         <p v-if="CartTotalMoney>0" class="TotalMoney">￥{{this.CartTotalMoney}}</p>
         <p v-else>券包为空</p>
       </div>
       <div v-if="CartTotalNum>0" class="Right Active">去结算</div>
       <div v-else class="Right">去结算</div>
    </div>
           <buyservice :ServiceId='ServiceId' :ShopId='shopinfo.PetShopInfo.Shop_id' :ShopName='shopinfo.PetShopInfo.ShopName' ref="buyservice"></buyservice>
           <section class="animation_opactiy shop_back_svg_container" v-show="showLoading">
               <img src="static/image/shop_back_svg.svg">
           </section>
           <loading v-show="showLoading"></loading>
           <transition name="router-slid" mode="out-in">
                <router-view></router-view>
            </transition>
    <div class="swiper-container" id="origin-img">
        <div class="swiper-wrapper"></div>
        <div class="swiper-pagination"></div>
        <div class="upload">xxx上传于2018-06-17</div>
    </div>
    <div v-transfer-dom>
      <previewer :list="list" ref="previewer" :options="options" @on-index-change="logIndexChange"></previewer>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import {mapState, mapMutations} from 'vuex'
  import { Swiper,Scroller,Spinner,SwiperItem,Previewer,TransferDom} from 'vux'
  import buyservice from '@/page/petservice/components/buyservice.vue'
  import {GetPetServiceShopByID,cityGuess,GetPetShopByShopId} from '@/service/getdata' 
  import loading from '@/components/common/loading.vue'
  import {imgBaseUrl,H5LuoKiPetUrl} from '@/config/env'

  const baseList = [{
        url: 'javascript:',
        img: '/static/image/Slides.jpg'
      }, {
        url: 'javascript:',
        img: '/static/image/Slides1.jpg'
      }, {
        url: 'javascript:',
        img: '/static/image/Slides2.jpg'
      }, {
        url: 'javascript:',
        img: '/static/image/Slides3.jpg'
  }]

  export default {
    components: {
        Swiper,
        Scroller,
        Spinner,
        SwiperItem,
        buyservice,
        loading,
        Previewer,
    },
    directives: {
        TransferDom
    },
    data () {
      return {
        SlideList:baseList,
        Swiper_index: 0,
        ShowBigImg:false,
        ShareEdit:false,
        showShareList:false,
        msg: 'Hello World!',
        scrollerStaues: {
            pulldownStatus: 'default',
            pullupStatus: 'default'
        },
        x:0,
        y:0,
        shoplistdata:[],
        shopinfo:{
          PetShopInfo:{
            Shop_id:null,
            ShopImg:null,
            ShopName:null,
            lng:null,
            lat:null,
            Evaluate:null,
            MinPrice:null,
            Address:null,
            Node:null,
            Distance:null,
            SaleNum:null,
            ShopPhone:null,
            BusinessHours:null,
            WiFi:null,
            Cart:null,
            ShopIntro:null,
          },
          ShopServiceCate:{
            CateId:null,
            CateName:null,
            ServiceList:null,
          },
        },
        imgBaseUrl:"./static/image/",
        ShopimgBaseUrl:imgBaseUrl, 
        ImgHeight:180,
        HeadHeight:0,
        windowHeight: null, //屏幕的高度
        showLoading:true,
        Chaju:0,
        swiperHeight:0,
        ServiceId:83275,
        InfoActiveIndex:0,
        CurrentParamsShopId:null,
        ShopPackageCartList:[],
        showPackageCartList:false,
        swiper:null,
        options: {
          getThumbBoundsFn (index) {
            let thumbnail = document.querySelectorAll('.TopSlideImgItem')[index]
            let pageYScroll = window.pageYOffset || document.documentElement.scrollTop
            let rect = thumbnail.getBoundingClientRect()
            return {x: rect.left, y: rect.top + pageYScroll, w: rect.width}
          }
        }
      }
    },
    beforeRouteEnter: (to, from, next) => {
      console.log(this)  //undefined，不能用this来获取vue实例;但其实是可以获取到this的
      console.log(to);
      console.log(from);
      console.log('回退组件路由勾子：beforeRouteEnter')
      next(vm => {
        console.log('组件路由勾子beforeRouteEnter的next')
      })
    },
    computed:{
      ...mapState([
                  'PackageCartList','UserNode','UserSelectNode','ShareServices',
              ]),
      //当前商店券包信息
              shopPackageCart: function (){
                  if({...this.PackageCartList[this.CurrentParamsShopId]}.ShopName==undefined)
                  {
                    console.log("空");
                    return {};
                  }
                  else
                  {
                    console.log("非空");
                    return {...this.PackageCartList[this.CurrentParamsShopId]};
                  }
              },
              CartTotalNum: function (){
                  let num = 0;
                  this.ShopPackageCartList.forEach(item => {
                      num += item.SaleNum
                  })
                  return num
              },
              CartTotalMoney:function(){
                let totalmoney=0;
                this.ShopPackageCartList.forEach(item => {
                      totalmoney += item.SaleNum*item.PackagePrice
                  })
                return totalmoney.toFixed(2);
              },
              list:function(){
                let imglist=[];
                this.GetImgList(this.shopinfo.PetShopInfo.ShopImg).forEach(item=>{
                  imglist.push({src:item,msrc:item,w: 1200,h: 900});
                });
                return imglist;
              },
    },
    mounted() {
        this.initData();
    },
    methods:{
      ...mapMutations([
                  'ADD_PACKAGECART','JIA_PACKAGECART','JIAN_PACKAGECART'
              ]),
        async initData(){
          await cityGuess().then(res => {
              this.$store.state.UserNode=res;
          })
          console.log(this.$route);
          this.CurrentParamsShopId=this.$route.params.shopid;//获取店铺id
          console.log(this.CurrentParamsShopId);
          await GetPetShopByShopId(this.CurrentParamsShopId,this.UserNode.longitude,this.UserNode.latitude).then(response=>{//SQL数据库的
            this.shopinfo=response;
            console.log(response);
          })
          this.hideLoading();
        },
        initShareService(){
          if(window.plus)
          {
            plus.share.getServices((services)=>{
              for(var i in services){
                var service=services[i];
                console.log(service.id+": "+service.description);
                this.$store.state.ShareServices[service.id]=service;
              }
            }, function(e){
              alert( "获取分享服务列表失败："+e.message );
            } );
          }
        },
        ShareMessage(id,type)
        {
          var shareservice=this.ShareServices[id];
          var that=this;
          if(shareservice)
          {
            if (shareservice.authenticated) {
              var MessageContent={title:that.shopinfo.PetShopInfo.ShopName,content:that.shopinfo.PetShopInfo.Address,href:H5LuoKiPetUrl+"#/shareserviceshopdetails/"+that.shopinfo.PetShopInfo.Shop_id,thumbs:["http://www.joingp.com:8080/Images/Icons/ShareLogo.png"]};
              if(id=='weixin')
              {
                if(type==1)
                {
                  MessageContent.extra={scene:"WXSceneSession"}
                }
                else if(type==2)
                {
                  MessageContent.extra={scene:"WXSceneTimeline"}
                }
              }
              shareservice.send(MessageContent, function(){
                alert( "分享成功！" );
              }, function(e){
                alert( "分享失败："+e.message );
              });
            }
            else
            {
              shareservice.authorize(function() {    
                  console.log('授权成功...');   
                  var MessageContent={title:that.shopinfo.PetShopInfo.ShopName,content:that.shopinfo.PetShopInfo.Address,href:H5LuoKiPetUrl+"#/shareserviceshopdetails/"+that.shopinfo.PetShopInfo.Shop_id,thumbs:["http://www.joingp.com:8080/Images/Icons/ShareLogo.png"]};
                  if(id=='weixin')
                  {
                    if(type==1)
                    {
                      MessageContent.extra={scene:"WXSceneSession"}
                    }
                    else if(type==2)
                    {
                      MessageContent.extra={scene:"WXSceneTimeline"}
                    }
                  }
                  shareservice.send(MessageContent, function(){
                    alert( "分享成功！" );
                  }, function(e){
                    alert( "分享失败："+e.message );
                  });
              }, function(e) {        
                  console.log("认证授权失败：" + e.code + " - " + e.message);
              });
            }
          }
        },
        //隐藏动画
        hideLoading(){
          this.showLoading = false;
        },
        logIndexChange (arg) {
          console.log(arg)
        },
        show (index) {
          this.$refs.previewer.show(index)
        },
        ShowBigShopImg(){
          this.ShowBigImg=!this.ShowBigImg;
        },
        ToggleShareEdit(){
          this.ShareEdit=!this.ShareEdit;
        },
        ToggelshowShareList(){
          this.ShareEdit=false;
          this.showShareList=!this.showShareList;
        },
        BuyService(id){
          this.ServiceId=id;
          this.$refs.buyservice.modalTaggle();
          console.log(this.ServiceId);
        },
        TagglePackageCartList(){
          this.showPackageCartList=!this.showPackageCartList;
        },
        PageSlide(pos){
          let swiperLeftH=this.$refs.swiperLeft.offsetHeight;
          let swiperRightH=this.$refs.swiperRight.offsetHeight;
          if(swiperLeftH>swiperRightH){
            this.swiperHeight=swiperLeftH;
          }
          else{
            this.swiperHeight=swiperRightH;
          }
          this.$refs.swipershop.$el.children[0].style.height=this.swiperHeight+"px";
          this.HeadHeight=this.$refs.my_shopheadmid.offsetHeight;
          let Cj=this.ImgHeight-this.HeadHeight;
          if(pos.top>Cj)
                {
                  this.$refs.my_shopheadmid.style.opacity=1;
                }
                else if(0<pos.top<Cj)
                {
                  var Rate=pos.top/Cj;
                  this.$refs.my_shopheadmid.style.opacity=Rate;
                }
                else if(pos.top<0)
                {
                  this.$refs.my_shopheadmid.style.opacity=0;
                }
        },
        GetShopList(){
              // GetPetServiceShopByID(this.CurrentParamsShopId).then(response=>{
              //   this.shopinfo=response;
              // });
              // console.log(this.shopinfo);
        },
        initPackageCartList(){
          this.ShopPackageCartList=[];
          console.log("初始化券包数据");
          console.log(this.shopPackageCart.ServiceList);
          Object.keys(this.shopPackageCart.ServiceList).forEach(serviceid=>{
            console.log(serviceid);
            Object.keys(this.shopPackageCart.ServiceList[serviceid]).forEach(packageid=>{
              console.log(packageid);
              this.ShopPackageCartList.push(this.shopPackageCart.ServiceList[serviceid][packageid]);
              console.log("66");

            })
          })
        },
        PackageCartJia(shopid,serviceid,packageid){
              this.JIA_PACKAGECART({shopid,serviceid,packageid});
            },
        PackageCartJian(shopid,serviceid,packageid,){
              this.JIAN_PACKAGECART({shopid,serviceid,packageid});
            },
        InfoSwiperChange(index){
          this.InfoActiveIndex=index;
        },
        SelectInfoSwiper(index){
          this.InfoActiveIndex=index;
        },
        UpPagedade(){
          console.log(666);
          this.$nextTick(() => {
          setTimeout(() => {
            this.$refs.scroller.donePullup()
          }, 1000)
          })
        },
        DownPageData(){
          console.log("555");
          this.$nextTick(() => {
          setTimeout(() => {
            this.$refs.scroller.donePulldown()
          }, 1000)
         })
        },
        GetImgList(imglist){
          if(imglist!=null)
          {
            var firstimg=imglist.split(",");
            return firstimg.slice(1,15);
          }
          else{
            return null;
          }
        },
        FormatDistance(val){
              var value=val.toFixed(2);
              return value;
        },
        FormatEvaluate(val){
              if(val%1===0){
                return val+'.0';
              }
              else{
                return val;
              }
        }
    },
    watch:{
      '$route':function(){
        if(this.CurrentParamsShopId!=this.$route.params.shopid){
          console.log("改变");
          console.log(this.CurrentParamsShopId);
          console.log(this.$route.params.shopid);
          this.initData();//用户在地图里面换店铺时候的变换店铺数据
        }
        else
        {
          console.log("没变");
          console.log(this.CurrentParamsShopId);
          console.log(this.$route.params.shopid);
        }
      },
      shopPackageCart:function (value){
        if(value.ShopName!=undefined)
          this.initPackageCartList();
      },
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
      z-index: 101;
          p, span{
              font-family: Helvetica Neue,Tahoma,Arial;
          }
  }
  .ShopImgModel{
    width:100vw;height:100vh;background:#000;z-index:999;position:absolute;top:0rem;left:0rem;

  }
  .fadePackageList-enter-active, .fadePackageList-leave-active {
          transition: all .2s;
          transform: translateY(0%);
  }
  .fadePackageList-enter, .fadePackageList-leave-active {
          transform: translateY(100%);
  }
  .ShopHead{
    width:10rem;height:1.5rem;padding-top:0.5rem;position:fixed;left:0rem;top:0rem;z-index:99;box-sizing:border-box;
    .shopheadback{
      height:100%;width:1.5rem;text-align:center;padding:0.45rem 0.45rem;position:absolute;left:0rem;top:0rem;z-index:99;box-sizing:border-box;
      display:flex;justify-content:content;align-items:content;
      img{
        width:0.6rem;height:0.6rem;
      }
    }
    .shopheadmid{
      width:10rem;height:100%;list-style:none;margin:0;padding: 0;text-align:center;position:absolute;top:0rem;left:0rem;background:#38dbb0;z-index:98;opacity:0;
      p{line-height:1.5rem;color:#fff;font-size:0.5rem;}
    }
    .shopheadedit{
      width:1.5rem;height:100%;color:#38dbb0;padding:0.45rem 0.45rem;position:absolute;top:0rem;right:0rem;z-index:99;box-sizing:border-box;
      display:flex;justify-content:content;align-items:content;
      img{
        width:0.6rem;height:0.6rem;
      }
      .ul_ShopEdit:before{
          position: absolute;top: -10px;content: '';right:0.5rem;
          width: 0;
          height: 0;
          border-left: 5px solid transparent;
          border-right: 5px solid transparent;
          border-bottom: 10px solid #fff;
      }
      .ul_ShopEdit{
        list-style:none;position:absolute;width:2rem;background-color:#fff;right:0.2rem;top:1.2rem;
        .editItem{
          width:100%;height:1rem;display:flex;align-items:center;justify-content:center;font-size:0.2rem;color:#cdcdcd;border-bottom:solid 0.5px #fff;
          img{
            width:0.4rem;height:0.4rem;margin-right: 0.15rem;
          }
          &.top{
            border-bottom:solid 0.5px #cdcdcd;
          }
        }
      }
    }
  }
  .ps_liInfoBt{
         width:10rem;height:1.2rem;padding:0.35rem 0.25rem;display:flex;align-items:center;background-color:#fff;margin-top:2px;position:relative;
         img{width:0.5rem;height:0.5rem;margin-right:0.3rem;}
       span{line-height:0.5rem;font-size:0.4rem;color:#1c1c1c;height:0.5rem;}
            .Right{height:0.5rem;line-height:0.5rem;font-size:0.5rem;position:absolute;right:0.3rem;display:flex;align-items:center;
          span{
            color:#a4a4a4;line-height:0.5rem;font-size:0.4rem;
            i{background:url(../../../static/image/right_.png) no-repeat center center;width:0.3rem;height:0.3rem;display:inline-block;background-size:0.5rem 0.5rem;margin-left:0.2rem;}
            }
          }
      }
      .Slide_Img{
    width:10rem;height:5.5rem;
    a{
      img{width:10rem;height:5.5rem;}
    }
  }
  .psd_Mid{width:10rem;padding:0rem 0.35rem;background-color:#fff;position:relative;box-sizing: border-box;
    .shopname{width:100%;height:1.4rem;line-height:1.4rem;font-size:0.5rem;color:#5d5d5d;margin-bottom:0rem;}
    .shopnode{width:100%;height:0.6rem;margin-top:0.7rem;display:flex;align-items:center;
      img{width:0.5rem;height:0.5rem;}
      span{font-size:0.3rem;margin-left:0.2rem;color:#1296db;}
    }
    .shopjuli{width:100%;height:0.6rem;display:flex;align-items:center;
      img{width:0.5rem;height:0.5rem;}
      span{font-size:0.3rem;margin-left:0.2rem;color:#cdcdcd;}
    }
    .shop_evaluate{position:absolute;;top:0.5rem;right:0.4rem;width:2.5rem;height:2.5rem;box-shadow:0rem 0.1rem 0.3rem #cdcdcd;
      .pinjia{width:100%;height:1rem;line-height:1rem;font-size:0.5rem;color:#000;text-align:center;margin:0rem;padding:0rem;}
      .xingji{width:100%;height:0.5rem;background:url(../../../static/image/star1.png) no-repeat center center;background-size:2.5rem 0.5rem;}
      .shouNum{width:100%;height:1rem;line-height:1rem;font-size:0.3rem;color:#8a8a8a;text-align:center;
        margin:0rem;padding:0rem;}
    }
    .shopyuyue{width:100%;height:1.87rem;padding:0.4rem 0rem;box-sizing: border-box;
      .bt_yuyue{width:100%;height:100%;border:solid 0.04rem #ff5500;border-radius:0.06rem;display:flex;align-items:center;text-align:center;justify-content:center;
        span{font-size:0.32rem;color:#ff5500;}
      }
    }
  }
  .ps_topcate{width:10rem;height:1.2rem;padding:0rem 0.3rem;background-color:#fff;margin-top:0.2rem;margin-bottom:0.1rem;
    .ps_ulcate{height:1.2rem;width:6.6rem;float:left;list-style:none;
      li{height:1.2rem;padding:0rem 0.15rem;margin-right:0.5rem;float:left;line-height:1.2rem;font-size:0.43rem;color:#000;box-sizing:padding-box;border-bottom:solid 0.1rem #fff;text-align:center;
        &.active{border-bottom:solid 0.1rem #f6443c;color:#f6443c;}
      }
    }
    .AllShop{height:1.2rem;width:2rem;float:right;line-height:1.2rem;font-size:0.37rem;color:#afb0af;display:flex;align-items:center;
      i{background:url(../../../static/image/right_.png);background-size:0.3rem 0.3rem;display:inline-block;width:0.3rem;height:0.3rem;margin-left:0.2rem;margin-top:-0.1rem;}
    }
  }
  .pss_service{width:100%;background-color:#fff;overflow:hidden;
    .ps_scategory{width:2.8rem;float:left;
      .ul_cateItem{width:100%;list-style:none;
        li{width:100%;height:1.5rem;text-align:center;
        span{height:1.2rem;line-height:1.5rem;font-size:0.4rem;width:100%;text-align:center;color:#636563;}
      }
      li.active{
        span{color:#ff6d00;}
      }
      }
    }
    .ps_servicelist{width:7.2rem;float:left;border-left:solid 2px #f7f7ff;box-sizing: border-box;
      .ul_serviceItem{width:100%;overflow:hidden;list-style:none;
        li.ServiceCateName{
          width:100%;height:0.6rem;background:#f2f0f2;display:flex;align-items: center;
          span{font-size:0.15rem;line-height:0.2rem;color:#999999;}
        }
        li{width:100%;height:2.8rem;border-bottom:dotted 0.06rem #ddd;padding:0rem 0.15rem;
          .ItemName{width:100%;height:0.8rem;padding:0rem;margin:0rem;display:flex;align-items:center;margin-top:0.2rem;
            span{line-height:0.8rem;font-size:0.4rem;color:#000;margin-right:0.2rem;}
            img{width:0.4rem;height:0.4rem;}
          }
          .ItemMid{width:100%;height:0.8rem;position:relative;display:flex;align-items:center;
            span{line-height:0.8rem;font-size:0.35rem;color:#b5b6b5;}
            .buy{padding:0rem 0.2rem;height:0.7rem;border:solid 0.03rem #f75952;position:absolute;right:0.3rem;border-radius:0.35rem;color:#f75952;font-size:0.3rem;display:flex;align-items:center;}
          }
          .ItemPrice{height:0.8rem;line-height:0.8rem;font-size:0.5rem;color:#f75952;}
        }
      }
    }
  }
  .ShopIntroBig{width:100%;padding:0rem 0.3rem;background:#fff;padding-bottom:0.2rem;
    .ShopItem{
      .Title{
        font-size:0.4rem;line-height:1.1rem;margin:0rem;
      }
      .Content{
        margin:0rem 0.35rem;display:flex;align-items:center;
        img{width:0.3rem;height:0.3rem;margin-right:0.2rem;}
        span{font-size:0.35rem;line-height:0.45rem;}
      }
    }
  }
  .ul_ShopTeach{
    width:100%;margin-top:0.4rem;list-style:none;
    .TeachItem{
      width:100%;height:2.5rem;display:flex;align-items:center;background:#fff;padding:0rem 0.3rem;margin-bottom:0.05rem;
      .TeachImg{
        width:2rem;height:2rem;
        img{width:2rem;height:2rem;}
      }
      .TeachInfo{
        margin-left:0.2rem;width:7.2rem;height:2rem;
        .Name{line-height:0.6rem;font-size:0.37rem;color:#0f0f0f;margin:0rem;}
        .TeachLevel{
          height:0.55rem;display:flex;align-items:center;
          img{height:0.4rem;}
          span{line-height:0.55rem;font-size:0.3rem;color:#818281;}
        }
          .Intro{height:0.5rem;line-height:0.5rem;font-size:0.38rem;margin:0rem;margin-top:0.3rem;color:#707270;}
      }
    }
  }
  .ps_ServiceBag{width:100%;height:1.2rem;position:fixed;bottom:0rem;left:0rem;background-color:#fff;border-top:solid 1px #f9f9ff;z-index:99;
    .Left{width:6.5rem;height:100%;float:left;
      .Img{
        width:1.2rem;height:1.2rem;float:left;margin-left:0.3rem;position:relative;
        img{width:1.2rem;height:1.2rem;padding:0.3rem;float:left;box-sizing: border-box;} 
        .Num{position:absolute;width:0.4rem;height:0.4rem;border-radius:0.2rem;top:0.15rem;right:0.15rem;background-color:#f75952;color:#fff;display:flex;align-items:center;justify-content:center;font-size:0.2rem;line-height:0.4rem;}
      }
      p{width:5rem;padding:0rem;margin:0rem;padding-left:0rem;line-height:1.2rem;font-size:0.4rem;color:#5b5c5b;float:left;}
      p.TotalMoney{width:5rem;padding:0rem;margin:0rem;padding-left:0rem;line-height:1.2rem;font-size:0.4rem;color:#f75952;float:left;}
    }
    .Right{width:3.5rem;height:100%;background-color:#adaaad;color:#fff;line-height:1.2rem;text-align:center;font-size:0.4rem;float:left;}
    .Right.Active{width:3.5rem;height:100%;background-color:#f75952;color:#fff;line-height:1.2rem;text-align:center;font-size:0.4rem;float:left;}
  }
  .zhemodale{position:absolute;left:0rem;top:0rem;bottom:0rem;right:0rem;background-color:rgba(0, 0, 0, 0.5);z-index:97;}
  .PackageCartList1{
    width:100%;position:fixed;bottom:1.2rem;left:0rem;background-color:#fff;border-top:solid 1px #f9f9ff;z-index:98;
    .Top{width:100%;height:1.1rem;display:flex;align-items:center;justify-content:space-between;padding:0rem 0.3rem;box-sizing:border-box;
      p{font-size:0.4rem;color:#707070;}
      .Clear{height:1.1rem;display:flex;align-items:center;justify-content:center;
        img{width:0.5rem;height:0.5rem;}
        span{font-size:0.4rem;color:#707070;margin-left:0.1rem;}
      }background-color:#f6f6f6;
    }
    .ul_packagelist{
      list-style:none;width:10rem;padding:0rem 0.5rem;box-sizing:border-box;
      .li_packageitem{
        width:100%;height:1.58rem;padding:0.3rem 0rem;box-sizing:border-box;display:flex;align-items:center;justify-content:center;border-bottom:solid 1px #ebe7e7;
        .PackageName{
          width:4.3rem;height:100%;
          span{font-size:0.43rem;line-height:0.49rem;height:0.98rem;float:left;}
        }
        .MiddlePrice{
          width:2rem;height:100%;display:flex;align-items:center;
          span{font-size:0.45rem;line-height:0.49rem;float:left;color:#f3572d;}
        }
        .EditPackage{
          width:2.7rem;height:100%;display:flex;justify-content:center;align-items:center;
          .jian{width:0.6;height:0.6rem;
            img{width:0.6rem;height:0.6rem;float:left;}
          }
          .buynum{
            width:1.5rem;height:0.6rem;display:flex;text-align:center;
            span{font-size:0.3rem;line-height:0.6rem;width:1.5rem;text-align:center;}
          }
          .jia{width:0.6;height:0.6rem;
            img{width:0.6rem;height:0.6rem;float:left;}
          }
        }
      }
    }
  }
  .DivShareEdit{
    width:100%;position:fixed;bottom:0rem;left:0rem;z-index:100;
    .ul_ShareEdit{
      width:100%;background-color:#cdcdcd;list-style:none;overflow:hidden;
      .li_ShareItem{
        width:25%;height:2.5rem;float:left;text-align:center;
        img{width:1rem;height:1rem;display:block;margin:0 auto;margin-top:0.5rem;}
        span{font-size:0.3rem;display:block;height:0.5rem;line-height:0.5rem;}
      }
    }
    .CancelShare{
      width:100%;height:1.2rem;background-color:#fff;display:flex;align-items:center;justify-content:center;font-size:0.4rem;font-family:'微软雅黑';
    }
  }
  .router-slid-enter-active, .router-slid-leave-active {
      transition: all .4s;
  }
  .router-slid-enter, .router-slid-leave-active {
      transform: translate3d(2rem, 0, 0);
      opacity: 0;
  }
  .TopSlideImg{
    width:10rem;height:5rem;
    img{
      width:10rem;height:5rem;
    }
  }
  #origin-img{
    display:none;
    position:fixed;
    top:0;
    left:0;
    width:100%;
    height:100%;
    background:#000;
    }
  #origin-img .swiper-slide img{
    width:100%;
    vertical-align:middle;
    } 
  .swiper-pagination{
    top:1em;
    bottom:auto;
    color:#fff;}  
  .upload{
    position:absolute;
    bottom:0;
    line-height:3em;
    background:rgba(0,0,0,.5);
    z-index:5;
    color:#fff;
    text-indent:1em;
    width:100%;}  
</style>
