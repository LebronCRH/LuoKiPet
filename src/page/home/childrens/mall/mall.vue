<template>
<div>
<!-- <head-top :Title="Title" :Color="Color" :MidType="MidType"></head-top> -->
<div class="la_luokihead" ref="Head">
   <div class="la_user">
   </div>
   <div class="HeadMiddle">
      <tab :line-width=3 active-color='#fc378c' v-model="InfoActiveIndex">
        <tab-item class="vux-center" v-for="(item, index) in list2" @click="demo2 = item" :key="index">{{item}}</tab-item>
      </tab>
   </div>
   <div class="la_serach">
   </div>
</div>
<div class="Middle">
  <scroller ref="scroller" lock-x height="-44" scrollbar-y>
      <div>
        <div id="taobao-best">
                <swiper :options="swiperOption" id="SwiperList" class="SwiperList show-swiper" ref="mySwiper">
                  <swiper-slide>
                    <div class="CategoryItem">
                        <div class="ItemImg">
                            <img src="static/image/user1.jpg" alt="">
                        </div>
                    </div>
                  </swiper-slide>
                  <swiper-slide>
                    <div class="CategoryItem">
                        <div class="ItemImg">
                            <img src="static/image/user2.jpg" alt="">
                        </div>
                    </div>
                  </swiper-slide>
                  <swiper-slide>
                    <div class="CategoryItem">
                        <div class="ItemImg">
                            <img src="static/image/user3.jpg" alt="">
                        </div>
                    </div>
                  </swiper-slide>
                  <swiper-slide>
                    <div class="CategoryItem">
                        <div class="ItemImg">
                            <img src="static/image/user4.jpeg" alt="">
                        </div>
                    </div>
                  </swiper-slide>
                  <swiper-slide>
                    <div class="CategoryItem">
                          <div class="ItemImg">
                              <img src="static/image/user5.jpeg" alt="">
                          </div>
                    </div>
                  </swiper-slide>
                </swiper>
                <swiper :options="swiperOption2" class="bg-swiper swiper-no-swiping" ref="mySwiper2">
                    <swiper-slide><img src="static/image/user1.jpg"></swiper-slide>
                    <swiper-slide><img src="static/image/user2.jpg"></swiper-slide>
                    <swiper-slide><img src="static/image/user3.jpg"></swiper-slide>
                    <swiper-slide><img src="static/image/user4.jpeg"></swiper-slide>
                    <swiper-slide><img src="static/image/user5.jpeg"></swiper-slide>
                </swiper>
        </div>
      </div>
    </scroller>
</div>
<transition name="router-slid" mode="out-in">
            <router-view></router-view>
</transition>
<section class="animation_opactiy shop_back_svg_container" v-show="showLoading">
           <img src="static/image/shop_back_svg.svg">
    </section>
<loading v-show="showLoading"></loading>
</div>
</template>

<script>
import axios from 'axios'
import {mapState, mapMutations} from 'vuex'
import headTop from '@/components/Head.vue'
import { Scroller,Tab,TabItem } from 'vux'
import selectpackage from '@/page/petservice/components/selectpackage.vue'
import {GetPetCategoryAll} from '@/service/getdata' 
import {imgBaseUrl,imgPCBaseUrl} from '@/config/env'
import loading from '@/components/common/loading.vue'
const list = () => ['精选', '最新']
export default {
    components: {
      headTop,
      Scroller,
      selectpackage,
      loading,
      Tab,
      TabItem
    },
    data () {
      return {
        Title:'帮助圈',
        Color:1,
        MidType:0,
        EditBtn:false,
        sortBy:'',
        petcategorylist:[],
        list2:list(),
        InfoActiveIndex:0,
        imgPCBaseUrl:imgPCBaseUrl,
        showLoading:false,
        swiperOption: {
          slidesPerView: 'auto',
          watchSlidesProgress: true,
          loop: true,
          slidesOffsetBefore:0,
          spaceBetween:20,
          resistanceRatio: 1,
          // control:[this.swiper2],
          onClick:()=>{
            console.log("dianji");
          },
          onProgress:(swiper, progress)=>{
            for (var i = 0;i < swiper.slides.length; i++) {
              var slide = swiper.slides.eq(i);
              var slideProgress = swiper.slides[i].progress;
              var prevIndent,scale;

              if (Math.abs(slideProgress) < 1) {
                scale = (1 - Math.abs(slideProgress)) * 0.2 + 0.9
              } else {
                scale = 0.9;
              }
              slide.find('.CategoryItem').transform('scale3d(' + scale + ',' + scale + ',1)');
            }
          },
          onTouchEnd:(swiper)=> {
            if(swiper.isEnd)
            {
                this.$router.push({name:'petadopt'});
            }
          }
        },
        swiperOption2: {//swiper3
          effect: 'fade',
          loop: true,
          fadeEffect: {
            crossFade: true,
          },
        },
        swiperOption4: {
          slidesPerView: 'auto',
          watchSlidesProgress: true,
          loop: true,
          slidesOffsetBefore:0,
          spaceBetween:15,
          resistanceRatio: 1,
          pagination: '#pagination2',
          onProgress:(swiper, progress)=>{

          },
        },
      }
    },
    mounted(){
        this.$nextTick(function () {
          if(this.$refs.mySwiper2.swiper)
          {
              console.log(this.$refs.mySwiper2.swiper);
              this.swiper.params.control=this.$refs.mySwiper2.swiper;
          }
        });
        this.initPaddingLeft();
        this.initHeadHeight();
    },
    destroyed(){

    },
    computed: {
      ...mapState([
                'PackageCartList','StatusbarHeight','StatusbarHeightRem',
            ]),
        swiper() {
            return this.$refs.mySwiper.swiper
        },
        swiper2() {
            return this.$refs.mySwiper2.swiper
        }
    },
    props:[],
    methods: {
      ...mapMutations([
                'UPDATE_PACKAGECART',
            ]),
        hideLoading(){
          this.showLoading = false;
        },
        initPaddingLeft(){
            var left=(document.body.clientWidth-(document.body.clientWidth/10*5))/2;
            document.getElementById("SwiperList").style.paddingLeft=left+"px";
        },
        initHeadHeight(){
          if(this.$refs.TopBack)
          {
            console.log(this.$refs.TopBack.style.height);
            this.$refs.TopBack.style.height=(1.5+this.StatusbarHeightRem)*window.screen.width / 10+"px";
            console.log(this.$refs.TopBack.style.height);
            this.$refs.my_shopheadmid.style.marginTop=(this.StatusbarHeightRem)*window.screen.width / 10+"px";
          }
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
    background-color: #FFFCFD;
    z-index: 200;
        p, span{
            font-family: Helvetica Neue,Tahoma,Arial;
        }
}
.shop_back_svg_container {
    position: fixed;
    top: 0rem;
    z-index: 999;
    width: 100%;
    height: 100%;
    img{width:100vw;height:100vh;}
}
.router-slid-enter-active, .router-slid-leave-active {
          transition: all .4s;
}
.router-slid-enter, .router-slid-leave-active {
          transform: translate3d(2rem, 0, 0);
          opacity: 0;
}
.la_luokihead{width:10rem;background-color:#38dbb0;position:fixed;left:0rem;top:0rem;z-index: 99;display:flex;justify-content: space-between;align-items:center;
    .la_user{
      height:100%;width:2rem;float:left;text-align:center;padding:0.4rem 0.4rem;
      display:flex;justify-content:center;align-items:center;box-sizing: border-box;
      img{
        width:0.6rem;height:0.6rem;
      }
    }
    .HeadMiddle{
      width:6rem;float:left;margin:0;padding: 0;text-align:center;
    }
    .la_menu{
      width:6rem;height:0.7rem;list-style: none;float:left;margin:0;padding: 0;text-align:center;display:flex;justify-content: center;align-items:center;
      border:solid 0.03rem #fff;border-radius:0.1rem;
      .la_menuitem{
        width:33.3%;height:100%;float:left;
        span{
        line-height:0.7rem;height:0.7rem;width:2rem;color:#fff;display:inline-block;font-size:0.3rem;float: left;}
      }
      .la_menuitem.Mid{border-left:solid 0.03rem #fff;border-right:solid 0.03rem #fff;box-sizing:border-box;}
      .la_menuitem.select{
        background-color:#fff;
        span{color:#38dbb0;}
      }  
    }
    .la_serach{
      width:2rem;height:100%;float:left;color:#38dbb0;padding:0.35rem 0.35rem;
      display:flex;justify-content:center;align-items:center;text-align:center;box-sizing: border-box;
      img{
        width:0.8rem;height:0.8rem;margin-left:0.25rem;float:left;
      }
    }
    /deep/ .vux-tab-wrap{
      .vux-tab-container{
        .vux-tab{
          background-color:#38dbb0;
          .vux-tab-item{
            background:none;color:#fff;font-size:"华文楷体";
          }
        }
      }
    }
  }
.Middle{
    position:absolute;top:44px;left:0rem;bottom:0rem;width:100%;
}
.SwiperList{
    img{
        width:100%;
    }
}
#taobao-best {
    position: relative;
    height: 6.5rem;
}
.show-swiper {
    z-index: 3;
    top: 1rem;
    .swiper-slide {
        width:5rem;
        .CategoryItem {
            width: 5rem;
            padding:2px;
            height: 3.7rem;
            margin: 20px 0;
            box-sizing: content-box;
            border-radius: 4px;box-sizing:border-box;-moz-box-shadow:0px 2px 3px #ddd; -webkit-box-shadow:0px 2px 3px #ddd; box-shadow:0px 2px 3px #ddd;background-color:#fff;
            .ItemImg{
                position:relative;height:100%;
                img{
                    width:100%;height:100%;
                }
            }
        }
    }
}

.bg-swiper {
    position: absolute;
    width: 100%;
    height:6.5rem;
    top: 0;
    z-index: 1;
    .swiper-slide {
        background: #000;
        img {
        /* filter: blur(5px);性能太卡*/
            width: 100%;height:100%;
            opacity: .5;
        }
    }
}
</style>
