<template>
<div class="rating_page">
<head-top :Title="Title" :Color="Color" :MidType="MidType"></head-top>
<div class="Middle">
  <scroller ref="scroller" lock-x height="-45" scrollbar-y>
      <div>
        <div class="SwiperJY">
          <div class="background">
            <img src="static/image/images/background.jpg" alt="">
          </div>
          <div class="item-bg"></div>
          <swiper :options="swiperOption" id="SwiperList" class="SwiperList show-swiper" ref="mySwiper">
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
                      <img src="static/image/images/girl4.jpg" alt="news">
                    </p>
                  </a>
              </div>
            </swiper-slide>
            <div class="swiper-pagination" id="pagination" slot="pagination"></div>
          </swiper>
        </div>
        <div class="BigSwiperJY">
          <swiper :options="swiperOption2" id="SwiperDS" class="SwiperDS show-swiper" ref="mySwiper">
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
        <div style="width:100%;height:10rem;"></div>
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
            var activeItem = document.querySelector('.swiper-slide-active');
            var sliderItem = activeItem.querySelector('.JYItem');
            sliderItem.classList.add("active");
          }
        },
        swiperOption2: {
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
      this.initPaddingLeft();
    },
    destroyed(){

    },
    computed: {
      ...mapState([
                'PackageCartList'
            ]),
    },
    props:[],
    methods: {
      ...mapMutations([
                'UPDATE_PACKAGECART',
            ]),
        hideLoading(){
          this.showLoading = false;
        },
        initPaddingLeft()
        {
            var left=(document.body.clientWidth-(document.body.clientWidth/10*5))/2;
            document.getElementById("SwiperList").style.paddingLeft=left+"px";
            var left2=(document.body.clientWidth-(document.body.clientWidth/10*8))/2;
            document.getElementById("SwiperDS").style.paddingLeft=left2+"px";
        }
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
    position:absolute;top:1.5rem;left:0rem;bottom:0rem;width:100%;
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
    opacity:.9;
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
    background-image: linear-gradient(30deg, rgba(255, 255, 255, 0.6) 0%, #0E5DC4 100%);
    opacity: 0.9;
}
.SwiperList{
  height:8.5rem;
  /deep/.show-swiper .swiper-slide {
      width:5rem;
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
.SwiperDS{
  width:100%;margin-top:0.5rem;height:7.5rem;
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
.BigSwiperJY{
  height:8rem;background-color:#fafafa;display:flex;align-items:center;
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
</style>
