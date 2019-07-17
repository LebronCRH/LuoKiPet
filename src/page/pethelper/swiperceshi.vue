<template>
<div class="rating_page">
<div class="Middle">
	<scroller ref="scroller" lock-x scrollbar-y>
      <div>
          <div id="taobao-best">
                <swiper :options="swiperOption" class="SwiperList show-swiper" ref="mySwiper">
                  <swiper-slide>
                      <div class="goods">
                      <img class="pt1" src="static/image/swiperceshi/pt3.png" alt="">
                      </div>
                  </swiper-slide>
                  <swiper-slide>
                      <div class="goods">
                       <img class="pt1" src="static/image/swiperceshi/pt3.png" alt="">
                      </div>
                  </swiper-slide>
                  <swiper-slide>
                      <div class="goods">
                       <img class="pt1" src="static/image/swiperceshi/pt3.png" alt="">
                      </div>
                  </swiper-slide>
                  <swiper-slide>
                      <div class="goods">
                       <img class="pt1" src="static/image/swiperceshi/pt3.png" alt="">
                      </div>
                  </swiper-slide>
                  <swiper-slide>
                      <div class="goods">
                       <img class="pt1" src="static/image/swiperceshi/pt3.png" alt="">
                      </div>
                  </swiper-slide>
                  <swiper-slide class="last-slide">
                      <span class="icon"></span>
                      <p class="text">右滑查看更多</p>
                  </swiper-slide>
                </swiper>
                <div class="mask"></div>
                <swiper :options="swiperOption2" class="bg-swiper swiper-no-swiping" ref="mySwiper2">
                    <swiper-slide><img src="static/image/swiperceshi/uploads/blur001.jpg"></swiper-slide>
                    <swiper-slide><img src="static/image/swiperceshi/uploads/blur002.jpg"></swiper-slide>
                    <swiper-slide><img src="static/image/swiperceshi/uploads/blur003.jpg"></swiper-slide>
                    <swiper-slide><img src="static/image/swiperceshi/uploads/blur004.jpg"></swiper-slide>
                    <swiper-slide><img src="static/image/swiperceshi/uploads/blur005.jpg"></swiper-slide>
                </swiper>
          </div>
          <div><img src="static/image/swiperceshi/uploads/goods.jpg" width="100%"></div>
          <div class="bottom"><img src="static/image/swiperceshi/bottom.png" width="100%"></div>
      </div>
    </scroller>
</div>
<transition name="router-slid" mode="out-in">
            <router-view></router-view>
</transition>
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
        swiperOption: {
          slidesPerView: 'auto',
          watchSlidesProgress: true,
          slidesOffsetBefore: 37,
          spaceBetween: 17,
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
              if (i == 4) {
                prevIndent = 0.3228;
              } else {
                prevIndent = 0.0898;
              }

              if (Math.abs(slideProgress + prevIndent) < 1) {
                scale = (1 - Math.abs(slideProgress + prevIndent)) * 0.1 + 1
              } else {
                scale = 1;
              }

              slide.find('.goods').transform('scale3d(' + scale + ',' + scale + ',1)');
            }
          },
        },
        swiperOption2: {//swiper3
          effect: 'fade',
          fadeEffect: {
            crossFade: false,
          },
        }
      }
    },
    mounted(){
       this.$nextTick(function () {
          if(this.$refs.mySwiper2.swiper)
          {
              console.log(this.$refs.mySwiper2.swiper);
              this.swiper.params.control=this.$refs.mySwiper2.swiper;
          }
        })
    },
    destroyed(){

    },
    computed: {
      swiper() {
        return this.$refs.mySwiper.swiper
      },
      swiper2() {
        return this.$refs.mySwiper2.swiper
      }
    },
    props:[],
    methods: {

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
    .Middle{
        position:absolute;top:0rem;left:0rem;bottom:0rem;width:100%;
    }

    .SwiperList{
        img{
            width:100%;
        }
    }

    #taobao-best {
        position: relative;
        height: 11rem;
    }

    .show-swiper {
        z-index: 3;
        top: 1rem;
    }

    .show-swiper .swiper-slide {
        width: 7rem;
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
        width: 7rem;
        padding: 5px;
        height: 9rem;
        margin: 20px 0;
        box-sizing: content-box;
        border-radius: 4px;
        .pt1{
            width:100%;height:100%;
        }
        .pt2{
            width:100%;height:3rem;
        }
    }

    .bg-swiper {
        position: absolute;
        width: 100%;
        height: 10rem;
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
        /*clip-path: polygon(0px 80px, 640px 0px, 640px 170px,0px 170px);兼容性差
        background:#fff;*/
        background: url(../../../static/image/swiperceshi/mask.png) no-repeat center bottom/100% auto;
        position: absolute;
        bottom: 0;
        z-index: 2;
        width: 100%;
        height: 90px;
    }

    .bottom {
        position: fixed;
        bottom: 0;
        width: 320px;
    }

    .bottom img {
        display: block;
    }           

</style>
