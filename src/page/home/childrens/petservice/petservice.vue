<template>
<div>
  <div class="service_Head">
	     <div class="ps_Indextop">
       <span @click="goChangeLocation()">{{CurrentNode.name}}</span>
       <img src="static/image/sjDown.png" alt="">
       <div>
       <router-link :to="{ path: '/petserviceIndex/ticketbag'}">
       <img src="../../../../assets/image/bag1.png">
       <p v-if="CartTotalNum>0" class="Num">{{this.CartTotalNum}}</p>
       </router-link>
       </div>
</div>
<div class="ps_serach">
   <div class="ps_divserach">
   <img src="../../../../assets/image/serach2.png">
   <input type="text" name="serachName">
   </div>
</div>
</div>
<div class="Middle">
<scroller ref="scroller" lock-x height="-133" scrollbar-y use-pulldown :use-pullup=true @on-scroll="PageSlide" @on-pullup-loading="UpPagedade" @on-pulldown-loading="DownPageData" v-model="scrollerStaues">
<div>
      <div class="ps_Img">
    <img src="../../../../assets/image/serviceShop1.png">
</div>
<div class="ps_topcate">
   <ul class="ps_ulcate">
   <li class="active">附近</li>
   <li>医疗</li>
   </ul>
   <router-link :to="{ path: '/petserviceIndex'}">
   <div class="AllShop" ui-sref="petAllservice"><span>全部商家<i></i></span></div>
   </router-link>
</div>
<serviceshoplist :shoplistdata="shoplistdata"></serviceshoplist>
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
       <section class="animation_opactiy shop_back_svg_container" v-show="showLoading">
           <img src="static/image/shop_back_svg.svg">
       </section>
       <loading v-show="showLoading"></loading>
       <transition name="router-slid" mode="out-in">
            <router-view></router-view>
        </transition>
</div>
</template>

<script>
  import {mapState, mapMutations} from 'vuex'
	import serviceshoplist from '@/page/petservice/components/serviceshoplist'
  import loading from '@/components/common/loading.vue'
	import axios from 'axios'
  import { Swiper, Scroller, Spinner } from 'vux'
  import {GetAllPetServiceShop,cityGuess,GetPetShopByCityAndJwd} from '../../../../service/getdata'

	export default {
		data () {
			return{
				shoplistdata:[],
        CartTotalNum:0,
        showLoading:true,
        scrollerStaues: {
          pulldownStatus: 'default',
          pullupStatus: 'default'
        },
        imgliststr:'123,456,789',
			}
		},
		 components: {
		 	serviceshoplist,
      Swiper,
      Scroller,
      Spinner,
      loading,
        },
    computed:{
          ...mapState([
                'PackageCartList','UserNode','UserSelectNode',
            ]),
          CurrentNode:function(){
            if(this.UserSelectNode){
              return this.UserSelectNode;
            }
            else
            {
              return this.UserNode;
            }
          }
    },
		mounted () {
      this.initData();
		},
	    methods: {
      onRefresh (done) {
          done()
      },
      hideLoading(){
          this.showLoading = false;
      },
      goChangeLocation(){
        this.$router.push('/petserviceIndex/changelocation');
      },
      async initData(){
        if(this.UserNode==null)
        {
          await cityGuess().then(res => {
              this.$store.state.UserNode=res;
              console.log(res);
          })
        };
        this.GetShopList();
      },
      initPackCartData(){
        Object.keys(this.PackageCartList).forEach(shopid=>{
          Object.keys(this.PackageCartList[shopid].ServiceList).forEach(serviceid=>{
            Object.keys(this.PackageCartList[shopid].ServiceList[serviceid]).forEach(packageid=>{
              this.CartTotalNum+=this.PackageCartList[shopid].ServiceList[serviceid][packageid].SaleNum
            })
          })
        })
      },
      onInfinite (done) {
          done()
      },
      async GetShopList () {
      	// axios.get("./static/data/PetServiceShopList.json").then((response)=>{
        // axios.get("api/GetAllPetServiceShop").then((response)=>{ 
       //  await GetAllPetServiceShop().then(response=>{
      	// 	this.shoplistdata=response;
      	// 	console.log(response);
      	// })
        // await GetPetShopByCityAndJwd("杭州",120.206911,30.297499).then(response=>{
        await GetPetShopByCityAndJwd(this.CurrentNode.name,this.CurrentNode.longitude,this.CurrentNode.latitude).then(response=>{
          this.shoplistdata=response;
          console.log(response);
        })
        console.log("完成了");
        await this.initPackCartData();
        this.hideLoading();
      },
      PageSlide (pos) {

      },
      UpPagedade () {
        console.log(66);
        this.$nextTick(() => {
        setTimeout(() => {
          this.$refs.scroller.donePullup()
        }, 1000)
        })
      },
      DownPageData () {
        console.log("555");
        this.$nextTick(() => {
        setTimeout(() => {
          this.$refs.scroller.donePulldown()
        }, 1000)
       })
      }
  },
  watch:{
    PackageCartList:function(){
      this.initPackCartData();
    },
  }
	}
</script>

<style lang="less" scoped="">
  // @import '../../../../style/mixin';
  .service_Head{
  	width:100%;height:2.2rem;z-index:99;position:absolute;top:0rem;left:0rem;
  }
      .Middle{
      	position:absolute;top:2.2rem;left:0rem;bottom:0rem;width:100%;
      }
  	.ps_Indextop{
  	width:10rem;height:1rem;padding:0rem 0.5rem;background-color:#fff;display:flex;position:relative;
      align-items: center;
  	span{height:1rem;line-height:1rem;color:#555555;font-size:0.4rem;float:left;}
    img{width:0.4rem;height:0.4rem;}
  	div{width:0.7rem;height:1rem;float:right;position:absolute;right:0.2rem;
      a{width:100%;height:100%;display:flex;align-items:center;
  		img{width:100%;height:70%;float:left;}
      .Num{position:absolute;width:0.4rem;height:0.4rem;border-radius:0.2rem;top:0rem;right:0rem;background-color:#f75952;color:#fff;display:flex;align-items:center;justify-content:center;font-size:0.2rem;line-height:0.4rem;}
    }
  	}
  }
  .ps_serach{height:1.2rem;width:10rem;padding:0rem 0.2rem 0rem 0.5rem;background-color:#fff;display:flex;align-items:center;
  	.ps_divserach{width:100%;height:1rem;border-radius:0.2rem;background-color:#f7f7ff;
  		img{height:1rem;width:1rem;float:left;padding:0.2rem;    box-sizing: border-box;}
  		input{width:8rem;height:1rem;padding:0rem;margin:0rem;float:left;border:none;color:#e0e0e0;background-color:#f7f7ff;}
  	}
  }
  .ps_Img{width:10rem;height:5rem;
  	img{width:100%;height:100%;}
  }
  .ps_topcate{width:10rem;height:1.2rem;padding:0rem 0.3rem;background-color:#fff;margin-top:0.2rem;margin-bottom:0.1rem;box-sizing:border-box;
  	.ps_ulcate{height:1.2rem;width:6.6rem;float:left;list-style:none;
  		li{height:1.2rem;padding:0rem 0.15rem;margin-right:0.5rem;float:left;line-height:1.2rem;font-size:0.43rem;color:#000;box-sizing:padding-box;border-bottom:solid 0.1rem #fff;text-align:center;
  			&.active{border-bottom:solid 0.1rem #f6443c;color:#f6443c;}
  		}
  	}
  	.AllShop{height:1.2rem;width:2rem;float:right;line-height:1.2rem;font-size:0.37rem;color:#afb0af;display:flex;align-items:center;
  		i{background:url(../../../../assets/image/right_.png);background-size:0.3rem 0.3rem;display:inline-block;width:0.3rem;height:0.3rem;margin-left:0.2rem;margin-top:-0.1rem;}
  	}
  }
  .shop_back_svg_container{
          position: fixed;
          // @include wh(100%, 100%);
          width:100%;height:100%;
          img{
              // @include wh(100%, 100%);
              width:100%;height:100%;
          }
      }
      .router-slid-enter-active, .router-slid-leave-active {
          transition: all .4s;
      }
      .router-slid-enter, .router-slid-leave-active {
          transform: translate3d(2rem, 0, 0);
          opacity: 0;
      }
</style>
