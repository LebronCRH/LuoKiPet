<template>
<div class="rating_page">
<!-- <head-top :Title="Title" :Color="Color" :MidType="MidType"></head-top> -->
<div class="ShopHead" ref="TopBack">
    <div class="Back" @click="$router.goBack()" ref="my_shopheadmid">
        <img src="static/image/back.png" alt="">
    </div>
</div>
<div class="Middle">
	<scroller ref="scroller" lock-x height="-0" scrollbar-y>
      <div>
        <div id="taobao-best">
                <swiper :options="swiperOption" id="SwiperList" class="SwiperList show-swiper" ref="mySwiper">
                  <swiper-slide>
                      <div class="goods">
                      <div class="ItemImg">
                          <img src="static/image/user1.jpg" alt="">
                          <div class="distance">6km</div>
                      </div>
                      <div class="Content">
                          <p class="BigTop"><span>发起人：</span><span>陈仁辉</span></p>
                          <p class="BigTop"><span>地点：</span><span>杭州市-西湖区</span></p>
                          <p class="info">描述：狗贩子手中买下的，但是家里不方便手养，希望能找一个爱护宠物的人来领养照顾它。</p>
                      </div>
                      </div>
                  </swiper-slide>
                  <swiper-slide>
                      <div class="goods">
                      <div class="ItemImg">
                          <img src="static/image/user2.jpg" alt="">
                          <div class="distance">6km</div>
                      </div>
                      <div class="Content">
                          <p class="BigTop"><span>发起人：</span><span>陈仁辉</span></p>
                          <p class="BigTop"><span>地点：</span><span>杭州市-西湖区</span></p>
                          <p class="info">描述：狗贩子手中买下的，但是家里不方便手养，希望能找一个爱护宠物的人来领养照顾它。</p>
                      </div>
                      </div>
                  </swiper-slide>
                  <swiper-slide>
                      <div class="goods">
                      <div class="ItemImg">
                          <img src="static/image/user3.jpg" alt="">
                          <div class="distance">6km</div>
                      </div>
                      <div class="Content">
                          <p class="BigTop"><span>发起人：</span><span>陈仁辉</span></p>
                          <p class="BigTop"><span>地点：</span><span>杭州市-西湖区</span></p>
                          <p class="info">描述：狗贩子手中买下的，但是家里不方便手养，希望能找一个爱护宠物的人来领养照顾它。</p>
                      </div>
                      </div>
                  </swiper-slide>
                  <swiper-slide>
                      <div class="goods">
                      <div class="ItemImg">
                          <img src="static/image/user4.jpeg" alt="">
                          <div class="distance">6km</div>
                      </div>
                      <div class="Content">
                          <p class="BigTop"><span>发起人：</span><span>陈仁辉</span></p>
                          <p class="BigTop"><span>地点：</span><span>杭州市-西湖区</span></p>
                          <p class="info">描述：狗贩子手中买下的，但是家里不方便手养，希望能找一个爱护宠物的人来领养照顾它。</p>
                      </div>
                      </div>
                  </swiper-slide>
                  <swiper-slide>
                      <div class="goods">
                      <div class="ItemImg">
                          <img src="static/image/user5.jpeg" alt="">
                          <div class="distance">6km</div>
                      </div>
                      <div class="Content">
                          <p class="BigTop"><span>发起人：</span><span>陈仁辉</span></p>
                          <p class="BigTop"><span>地点：</span><span>杭州市-西湖区</span></p>
                          <p class="info">描述：狗贩子手中买下的，但是家里不方便手养，希望能找一个爱护宠物的人来领养照顾它。</p>
                      </div>
                      </div>
                  </swiper-slide>
                  <swiper-slide class="last-slide">
                      <span class="icon"></span>
                      <p class="text">左滑查看更多</p>
                  </swiper-slide>
                </swiper>
                <div class="mask"></div>
                <swiper :options="swiperOption2" class="bg-swiper swiper-no-swiping" ref="mySwiper2">
                    <swiper-slide><img src="static/image/user1.jpg"></swiper-slide>
                    <swiper-slide><img src="static/image/user2.jpg"></swiper-slide>
                    <swiper-slide><img src="static/image/user3.jpg"></swiper-slide>
                    <swiper-slide><img src="static/image/user4.jpeg"></swiper-slide>
                    <swiper-slide><img src="static/image/user5.jpeg"></swiper-slide>
                </swiper>
        </div>
        <div class="JYZM">
            <img src="static/image/zmjy.png" alt="">
            <img src="static/image/youwant.png" alt="">
        </div>
        <div class="SlectHelpCategory">
            <div class="CateItem">
                <div style="width:100%;"><img src="static/image/png/jytb.png" alt=""></div>
                <p>宠物寄养</p>
            </div>
            <router-link :to="{ path: '/petadopt'}" tag="div" class="CateItem">
                <div><img src="static/image/png/lytb.png" alt=""></div>
                <p>宠物领养</p>
            </router-link>
            <router-link :to="{ path: '/petseek'}" tag="div" class="CateItem">
                <div><img src="static/image/png/dstb.png" alt=""></div>
                <p>宠物丢失</p>
            </router-link>

        </div>
        <div class="TiShi">
            <img src="static/image/tishi/helperts1.png" alt="">
        </div>
        <div class="SwiperJY">
            <div class="background">
              <img src="static/image/images/background.jpg" alt="">
            </div>
            <div class="item-bg"></div>
            <swiper :options="swiperOption3" id="SwiperList2" class="SwiperList2 show-swiper" ref="mySwiper3">
              <swiper-slide>
                <div class="JYItem">
                    <a href="#" class="news__item">
                      <div class="news-date">
                        <span class="news-date__title">28</span>
                        <span class="news-date__txt">八月</span>
                      </div>
                      <div class="news__title">
                        盛夏好声音
                      </div>
                      <div class="news__txt">
                        <span>
                        《盛夏好声音》是SNH482015年发行的第八张E
                      </span>
                      </div>
                      <p class="news__img">
                        <img src="static/image/images/girl4.jpg" alt="news">
                      </p>
                    </a>
                </div>
              </swiper-slide>
              <swiper-slide>
                <div class="JYItem">
                    <a href="#" class="news__item">
                      <div class="news-date">
                        <span class="news-date__title">28</span>
                        <span class="news-date__txt">八月</span>
                      </div>
                      <div class="news__title">
                        盛夏好声音
                      </div>
                      <div class="news__txt">
                        <span>
                        《盛夏好声音》是SNH482015年发行的第八张E
                      </span>
                      </div>
                      <p class="news__img">
                        <img src="static/image/images/girl1.jpg" alt="news">
                      </p>
                    </a>
                </div>
              </swiper-slide>
              <swiper-slide>
                <div class="JYItem">
                    <a href="#" class="news__item">
                      <div class="news-date">
                        <span class="news-date__title">28</span>
                        <span class="news-date__txt">八月</span>
                      </div>
                      <div class="news__title">
                        盛夏好声音
                      </div>
                      <div class="news__txt">
                        <span>
                        《盛夏好声音》是SNH482015年发行的第八张E
                      </span>
                      </div>
                      <p class="news__img">
                        <img src="static/image/images/girl2.jpg" alt="news">
                      </p>
                    </a>
                </div>
              </swiper-slide>
              <swiper-slide>
                <div class="JYItem">
                    <a href="#" class="news__item">
                      <div class="news-date">
                        <span class="news-date__title">28</span>
                        <span class="news-date__txt">八月</span>
                      </div>
                      <div class="news__title">
                        盛夏好声音
                      </div>
                      <div class="news__txt">
                        <span>
                        《盛夏好声音》是SNH482015年发行的第八张E
                      </span>
                      </div>
                      <p class="news__img">
                        <img src="static/image/images/girl3.jpg" alt="news">
                      </p>
                    </a>
                </div>
              </swiper-slide>
              <swiper-slide>
                <div class="JYItem">
                    <a href="#" class="news__item">
                      <div class="news-date">
                        <span class="news-date__title">28</span>
                        <span class="news-date__txt">八月</span>
                      </div>
                      <div class="news__title">
                        盛夏好声音
                      </div>
                      <div class="news__txt">
                        <span>
                        《盛夏好声音》是SNH482015年发行的第八张E
                      </span>
                      </div>
                      <p class="news__img">
                        <img src="static/image/images/girl5.jpg" alt="news">
                      </p>
                    </a>
                </div>
              </swiper-slide>
              <div class="swiper-pagination" id="pagination" slot="pagination"></div>
            </swiper>
          </div>
          <div class="TiShi">
            <img src="static/image/tishi/helperts2.png" alt="">
        </div>
        <div class="BigSwiperJY">
          <swiper :options="swiperOption4" id="SwiperDS" class="SwiperDS show-swiper" ref="mySwiperJY">
              <swiper-slide>
                <div class="DsItem">
                  <img src="static/image/slide1.png" alt="">
                  <p class="Title">小狗在家年度超有爱家庭</p>
                  <p class="Content">这是一群提供安心有美好寄养体验的家庭</p>
                </div>
              </swiper-slide>
              <swiper-slide>
                <div class="DsItem">
                  <img src="static/image/slide2.png" alt="">
                  <p class="Title">小狗在家年度超有爱家庭</p>
                  <p class="Content">这是一群提供安心有美好寄养体验的家庭</p>
                </div>
              </swiper-slide>
              <swiper-slide>
                <div class="DsItem">
                  <img src="static/image/slide3.png" alt="">
                  <p class="Title">小狗在家年度超有爱家庭</p>
                  <p class="Content">这是一群提供安心有美好寄养体验的家庭</p>
                </div>
              </swiper-slide>
              <swiper-slide>
                <div class="DsItem">
                  <img src="static/image/slide4.png" alt="">
                  <p class="Title">小狗在家年度超有爱家庭</p>
                  <p class="Content">这是一群提供安心有美好寄养体验的家庭</p>
                </div>
              </swiper-slide>
              <div class="swiper-pagination" id="pagination2" slot="pagination"></div>
          </swiper>
        </div>
        <div style="height:1rem;"></div>
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
import { Scroller } from 'vux'
import selectpackage from '@/page/petservice/components/selectpackage.vue'
import {GetPetCategoryAll} from '@/service/getdata' 
import {imgBaseUrl,imgPCBaseUrl} from '@/config/env'
import loading from '@/components/common/loading.vue'
export default {
    components: {
    	headTop,
    	Scroller,
    	selectpackage,
        loading
    },
    data () {
      return {
        Title:'帮助圈',
        Color:1,
        MidType:0,
        EditBtn:false,
        sortBy:'',
        petcategorylist:[],
        imgPCBaseUrl:imgPCBaseUrl,
        showLoading:false,
        swiperOption: {
          slidesPerView: 'auto',
          watchSlidesProgress: true,
          slidesOffsetBefore:0,
          spaceBetween:20,
          resistanceRatio: 1,
          control:[this.swiper2],
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
              slide.find('.goods').transform('scale3d(' + scale + ',' + scale + ',1)');
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
          fadeEffect: {
            crossFade: false,
          },
        },
        swiperOption3: {
          slidesPerView: 'auto',
          watchSlidesProgress: true,
          loop: true,
          slidesOffsetBefore:0,
          spaceBetween:20,
          resistanceRatio: 1,
          pagination: '.swiper-pagination',
          onProgress:(swiper, progress)=>{

          },
          onTouchEnd:(swiper)=> {
          },
          onSlideChangeStart:(swiper)=>{
            var sliderItem = document.querySelectorAll('.JYItem');
            sliderItem.forEach((item,index)=>{
              item.classList.remove("active");
            })
          },
          onSlideChangeEnd:(swiper)=>{
            var activeItem = document.querySelector('.SwiperList2 .swiper-slide-active');
            var sliderItem = activeItem.querySelector('.JYItem');
            sliderItem.classList.add("active");
          }
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
            var left=(document.body.clientWidth-(document.body.clientWidth/10*5))/2;
            document.getElementById("SwiperList2").style.paddingLeft=left+"px";
            var left2=(document.body.clientWidth-(document.body.clientWidth/10*8))/2;
            document.getElementById("SwiperDS").style.paddingLeft=left2+"px";
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
  .Back{
      height:1.5rem;
      width: 1.5rem;
      text-align: center;
      padding: 0.45rem 0.45rem;
      position: absolute;
      left: 0rem;
      z-index: 99;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-pack: center;
      -ms-flex-pack: center;
      justify-content: center;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      img{    width: 0.6rem;
      height: 0.6rem;}
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
  .Middle{
      position:absolute;top:0rem;left:0rem;bottom:0rem;width:100%;
  }
  .ps_Img{width:10rem;height:5rem;
      img{width:100%;height:100%;}
    }
  .SwiperList{
      img{
          width:100%;
      }
  }
  #taobao-best {
      position: relative;
      height: 10rem;
  }
  .show-swiper {
      z-index: 3;
      top: 1rem;
  }

  .show-swiper .swiper-slide {
      width:5rem;
  }

  .show-swiper .swiper-slide:last-child {
      width: 50px;
      color: #fff;
  }

  .show-swiper .swiper-slide:last-child .icon {
      width: 16px;
      height: 16px;
      background: url(../../../static/image/swiperceshi/more-icon.png) no-repeat center 50%/100% 100%;
      display: block;
      float: left;
      margin-top: 130px;
      margin-left: 5px;
  }

  .show-swiper .swiper-slide:last-child .text {
      width: 11px;
      font-size: 11px;
      margin-top: 90px;
      margin-left: 5px;
      line-height: 1.5;
      float: left;
  }

  .show-swiper .swiper-slide .goods {
      width: 5rem;
      padding:2px;
      height: 7.5rem;
      margin: 20px 0;
      box-sizing: content-box;
      border-radius: 4px;box-sizing:border-box;-moz-box-shadow:0px 2px 3px #ddd; -webkit-box-shadow:0px 2px 3px #ddd; box-shadow:0px 2px 3px #ddd;background-color:#fff;
      .pt1{
          width:100%;height:100%;
      }
      .pt2{
          width:100%;height:3rem;
      }
      .ItemImg{
          position:relative;height:3.7rem;
          img{
              width:100%;height:100%;
          }
          .distance{
              position:absolute;width:1.2rem;height:1.2rem;border-radius:0.6rem;border:solid 0.075rem #38dbb0;bottom:-0.6rem;right:0.1rem;background-color:#fff;line-height:1.05rem;
              font-size:14px;text-align:center;box-sizing:border-box;color:#38dbb0;
          }
      }
      .Content{
          padding:0px 3px;
          p.BigTop{
              font-size:14px;color:#38dbb0;
          }
          p.info{
              font-size:13px;color:#848484;
          }
      }
  }

  .bg-swiper {
      position: absolute;
      width: 100%;
      height:10rem;
      top: 0;
      z-index: 1;
  }

  .bg-swiper .swiper-slide {
      background: #000;
  }

  .bg-swiper .swiper-slide img {
  /* filter: blur(5px);性能太卡*/
      width: 100%;
      opacity: .5;
  }
  .mask {
      background: url(../../../static/image/swiperceshi/mask2.png) no-repeat center bottom/100% auto;
      position: absolute;
      bottom: 0;
      z-index: 2;
      width: 100%;
      height: 100px;
  }
  .JYZM{
      width:100%;
      img{width:100%;}
  }
  .SlectHelpCategory{
      width:10rem;display:flex;justify-content:center;
      .CateItem{
          width:33.3%;text-align:center;
          img{
              width:1.5rem;
          }
          p{
              width:100%;display:block;font-size:15px;font-weight:500;color:#000;
          }
      }
  }
  .SwiperJY{
    position:relative;width:10rem;height:8.5rem;
    .item-bg {
      width:5.5rem;
      height:7.3rem;
      position: absolute;
      top:0.1rem;
      background: #fff;
      border-radius: 10px;
      box-shadow: 0 6px 26px 6px rgba(0, 0, 0, 0.25);
      opacity:.3;
      transition: all .3s;
      left:85px;
    }
    .swiper-container {
        width: 100%;
        .swiper-pagination {
          text-align: center;
          margin-top: 10px;
        }
        .swiper-pagination-bullets{
            /deep/ .swiper-pagination-bullet {
            width: 13px;
            height: 10px;
            display: inline-block;
            background: #fff;
            opacity: .2;
            margin: 0 5px;
            border-radius: 20px;
            transition: opacity .5s, background-color .5s, width .5s;
            transition-delay: .5s, .5s, 0s;
          }
            /deep/ .swiper-pagination-bullet-active {
            opacity: 1;
            background: #ffffff;
            width: 100px;
            transition-delay: 0s;
          }
        }
      }
  }
  .background {
    position:absolute;
    width:10rem;
    height:8.5rem;
    left: 0;
    top: 0;overflow:hidden;
    img{width:100%;height:100%;}
  }
  .background:after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-image: linear-gradient(30deg, rgba(255, 255, 255, .9) 0%, #0E5DC4 100%);
      opacity: 0.9;
  }
  .show-swiper .swiper-slide {
      width:5rem;
  }
  .SwiperList2{
    height:8.5rem;
    /deep/.show-swiper {
          z-index: 3;
          top: 0rem;
      }
  }
  .JYItem{
    height:7rem;margin-top:0.25rem;color:#fff;
    &.active{
      .news__item{
        color:#222222;
      }
    }
    .news__item {
        padding:5px;
        color: #fff;
        border-radius:10px;
        display: block;width:100%;
        transition: all .3s;box-sizing:border-box;
        .news-date {
            padding-bottom:5px;
            margin-bottom: 5px;
            border-bottom: 2px solid;
            display: inline-block;
            opacity: .7;
            transition: opacity .3s;
            .news-date__title {
                display: block;
                font-size: 17px;
                font-weight: 500;
            }
            .news-date__txt {
                font-size: 15px;
            }
        }
        .news__title {
            font-size:15px;
            font-weight: 500;
            opacity: .7;
            // margin-top:5px;
            // margin-bottom:5px;
            transition: opacity .3s;
        }
        .news__txt {
            line-height:18px;
            font-size: 14px;
            opacity: .7;
            transition: opacity .3s;
        }
        .news__img {
            border-radius:10px;margin-top:10px;
            box-shadow: 0 6px 26px 6px rgba(0, 0, 0, 0.25);
            width: 100%;height:3rem;
            transition: all .3s;
            transform-origin: 0% 0%;
            img {
                max-width: 100%;
                border-radius: 10px;
                height: 100%;
                width: 100%;
            }
        }
    }
  }
  .swiper-pagination {
    text-align: center;
    margin-top: 10px;
  }
  .TiShi{
      width:100%;height:2.3rem;
      img{
          width:100%;height:100%;
      }
  }
  .BigSwiperJY{
    height:8rem;background-color:#fafafa;
    .swiper-container {
        width: 100%;
        .swiper-pagination {
          text-align: center;
          margin-top: 10px;
        }
        .swiper-pagination-bullets{
            /deep/ .swiper-pagination-bullet {
            width: 13px;
            height: 10px;
            display: inline-block;
            background: #fddb87;
            opacity: .2;
            margin: 0 5px;
            border-radius: 20px;
            transition: opacity .5s, background-color .5s, width .5s;
            transition-delay: .5s, .5s, 0s;
          }
            /deep/ .swiper-pagination-bullet-active {
            opacity: 1;
            background: #fbc02d;
            width: 100px;
            transition-delay: 0s;
          }
        }
    }
    .SwiperDS{
        width:100%;height:7rem;
        /deep/.show-swiper .swiper-slide {
            width:8rem;
        }
        .DsItem{
          width:8rem;background-color:#fff;border-radius:10px;overflow:hidden;box-sizing:border-box;height:6rem;border:solid 1px #ddd;
          img{
            width:100%;height:4rem;
          }
          p{
            line-height:0.8rem;padding-left:10px;
            &.Title{
              color:#000;font-size:15px;font-weight:500;
            }
            &.Content{
              font-size:13px;color:#767678;
            }
          }
        }
      }
  }
</style>
