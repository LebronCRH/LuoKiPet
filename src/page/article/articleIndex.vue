<template>
	<div class="rating_page">
	  <div class="la_luokihead" ref="HeadTop">
         <div class="la_user" @click="$router.go(-1)">
         <img src="static/image/back.png">
         </div>
         <ul class="la_menu">
           <li class="la_menuitem" :class="InfoActiveIndex==0?'select':''" @click="SelectInfoSwiper(0)">
           <span>精选资讯</span>
           </li>
              <li class="la_menuitem Mid" :class="InfoActiveIndex==1?'select':''" @click="SelectInfoSwiper(1)">
           <span>养宠课堂</span>
           </li>
              <li class="la_menuitem" :class="InfoActiveIndex==2?'select':''" @click="SelectInfoSwiper(2)">
           <span>常见问题</span>
           </li>
         </ul>
         <div class="la_serach">
         <img src="static/image/serach.png">
         </div>
      </div>
      <div class="Middle" ref="Middle">
        <scroller ref="scroller" lock-x height="-57" scrollbar-y use-pulldown :use-pullup=true @on-scroll="PageSlide" @on-pullup-loading="UpPagedade" @on-pulldown-loading="DownPageData" v-model="scrollerStaues">
        <div>
              <swiper :list="SlideList" auto  v-model="Swiper_index" dots-position="center"></swiper>
              <swiper ref="swiperBigArticle" height="500px" :show-dots="false" v-model="InfoActiveIndex" @on-index-change="InfoSwiperChange">
                <swiper-item>
                  <div class="swiperArticle" ref="swiperArticle">
                    <ul class="ha_ul">
                       <li class="ha_li">
                       <img src="static/image/user1.jpg">
                       </li>
                          <li class="ha_li">
                         <img src="static/image/user2.jpg">
                       </li>
                          <li class="ha_li">
                            <img src="static/image/user3.jpg">
                       </li>
                    </ul>
                    <ul class="nar_ul">
                        <li class="nar_li">
                           <div class="div_img">
                           <img src="static/image/user1.jpg">
                           </div>
                           <div class="div_content">
                             <p class="p_title">大揭秘-猫的祖先到底是谁</p>
                             <p class="p_intro">其实猫猫和很多家畜都是一样的，都是通过野生驯化出来的，不过根据研究已经证实了，猫猫其实和狗的祖先都是一样的……</p>
                           </div>
                        </li>
                            <li class="nar_li">
                           <div class="div_img">
                           <img src="static/image/user1.jpg">
                           </div>
                           <div class="div_content">
                             <p class="p_title">大揭秘-猫的祖先到底是谁</p>
                             <p class="p_intro">其实猫猫和很多家畜都是一样的，都是通过野生驯化出来的，不过根据研究已经证实了，猫猫其实和狗的祖先都是一样的……</p>
                           </div>
                        </li>
                            <li class="nar_li">
                           <div class="div_img">
                           <img src="static/image/user1.jpg">
                           </div>
                           <div class="div_content">
                             <p class="p_title">大揭秘-猫的祖先到底是谁</p>
                             <p class="p_intro">其实猫猫和很多家畜都是一样的，都是通过野生驯化出来的，不过根据研究已经证实了，猫猫其实和狗的祖先都是一样的……</p>
                           </div>
                        </li>
                            <li class="nar_li">
                           <div class="div_img">
                           <img src="static/image/user1.jpg">
                           </div>
                           <div class="div_content">
                             <p class="p_title">大揭秘-猫的祖先到底是谁</p>
                             <p class="p_intro">其实猫猫和很多家畜都是一样的，都是通过野生驯化出来的，不过根据研究已经证实了，猫猫其实和狗的祖先都是一样的……</p>
                           </div>
                        </li>
                            <li class="nar_li">
                           <div class="div_img">
                           <img src="static/image/user1.jpg">
                           </div>
                           <div class="div_content">
                             <p class="p_title">大揭秘-猫的祖先到底是谁</p>
                             <p class="p_intro">其实猫猫和很多家畜都是一样的，都是通过野生驯化出来的，不过根据研究已经证实了，猫猫其实和狗的祖先都是一样的……</p>
                           </div>
                        </li>
                            <li class="nar_li">
                           <div class="div_img">
                           <img src="static/image/user1.jpg">
                           </div>
                           <div class="div_content">
                             <p class="p_title">大揭秘-猫的祖先到底是谁</p>
                             <p class="p_intro">其实猫猫和很多家畜都是一样的，都是通过野生驯化出来的，不过根据研究已经证实了，猫猫其实和狗的祖先都是一样的……</p>
                           </div>
                        </li>
                            <li class="nar_li">
                           <div class="div_img">
                           <img src="static/image/user1.jpg">
                           </div>
                           <div class="div_content">
                             <p class="p_title">大揭秘-猫的祖先到底是谁</p>
                             <p class="p_intro">其实猫猫和很多家畜都是一样的，都是通过野生驯化出来的，不过根据研究已经证实了，猫猫其实和狗的祖先都是一样的……</p>
                           </div>
                        </li>
                            <li class="nar_li">
                           <div class="div_img">
                           <img src="static/image/user1.jpg">
                           </div>
                           <div class="div_content">
                             <p class="p_title">大揭秘-猫的祖先到底是谁</p>
                             <p class="p_intro">其实猫猫和很多家畜都是一样的，都是通过野生驯化出来的，不过根据研究已经证实了，猫猫其实和狗的祖先都是一样的……</p>
                           </div>
                        </li>
                            <li class="nar_li">
                           <div class="div_img">
                           <img src="static/image/user1.jpg">
                           </div>
                           <div class="div_content">
                             <p class="p_title">大揭秘-猫的祖先到底是谁</p>
                             <p class="p_intro">其实猫猫和很多家畜都是一样的，都是通过野生驯化出来的，不过根据研究已经证实了，猫猫其实和狗的祖先都是一样的……</p>
                           </div>
                        </li>
                            <li class="nar_li">
                           <div class="div_img">
                           <img src="static/image/user1.jpg">
                           </div>
                           <div class="div_content">
                             <p class="p_title">大揭秘-猫的祖先到底是谁</p>
                             <p class="p_intro">其实猫猫和很多家畜都是一样的，都是通过野生驯化出来的，不过根据研究已经证实了，猫猫其实和狗的祖先都是一样的……</p>
                           </div>
                        </li>
                            <li class="nar_li">
                           <div class="div_img">
                           <img src="static/image/user1.jpg">
                           </div>
                           <div class="div_content">
                             <p class="p_title">大揭秘-猫的祖先到底是谁</p>
                             <p class="p_intro">其实猫猫和很多家畜都是一样的，都是通过野生驯化出来的，不过根据研究已经证实了，猫猫其实和狗的祖先都是一样的……</p>
                           </div>
                        </li>
                            <li class="nar_li">
                           <div class="div_img">
                           <img src="static/image/user1.jpg">
                           </div>
                           <div class="div_content">
                             <p class="p_title">大揭秘-猫的祖先到底是谁</p>
                             <p class="p_intro">其实猫猫和很多家畜都是一样的，都是通过野生驯化出来的，不过根据研究已经证实了，猫猫其实和狗的祖先都是一样的……</p>
                           </div>
                        </li>
                    </ul>
                  </div>
                </swiper-item>
                <swiper-item>
                  <div class="swiperArticle" ref="swiperArticle2">
                    <ul class="ha_ul">
                       <li class="ha_li">
                       <img src="static/image/user1.jpg">
                       </li>
                          <li class="ha_li">
                         <img src="static/image/user2.jpg">
                       </li>
                          <li class="ha_li">
                            <img src="static/image/user3.jpg">
                       </li>
                    </ul>
                    <ul class="nar_ul">
                        <li class="nar_li">
                           <div class="div_img">
                           <img src="static/image/user1.jpg">
                           </div>
                           <div class="div_content">
                             <p class="p_title">大揭秘-猫的祖先到底是谁</p>
                             <p class="p_intro">其实猫猫和很多家畜都是一样的，都是通过野生驯化出来的，不过根据研究已经证实了，猫猫其实和狗的祖先都是一样的……</p>
                           </div>
                        </li>
                            <li class="nar_li">
                           <div class="div_img">
                           <img src="static/image/user1.jpg">
                           </div>
                           <div class="div_content">
                             <p class="p_title">大揭秘-猫的祖先到底是谁</p>
                             <p class="p_intro">其实猫猫和很多家畜都是一样的，都是通过野生驯化出来的，不过根据研究已经证实了，猫猫其实和狗的祖先都是一样的……</p>
                           </div>
                        </li>
                            <li class="nar_li">
                           <div class="div_img">
                           <img src="static/image/user1.jpg">
                           </div>
                           <div class="div_content">
                             <p class="p_title">大揭秘-猫的祖先到底是谁</p>
                             <p class="p_intro">其实猫猫和很多家畜都是一样的，都是通过野生驯化出来的，不过根据研究已经证实了，猫猫其实和狗的祖先都是一样的……</p>
                           </div>
                        </li>
                            <li class="nar_li">
                           <div class="div_img">
                           <img src="static/image/user1.jpg">
                           </div>
                           <div class="div_content">
                             <p class="p_title">大揭秘-猫的祖先到底是谁</p>
                             <p class="p_intro">其实猫猫和很多家畜都是一样的，都是通过野生驯化出来的，不过根据研究已经证实了，猫猫其实和狗的祖先都是一样的……</p>
                           </div>
                        </li>
                            <li class="nar_li">
                           <div class="div_img">
                           <img src="static/image/user1.jpg">
                           </div>
                           <div class="div_content">
                             <p class="p_title">大揭秘-猫的祖先到底是谁</p>
                             <p class="p_intro">其实猫猫和很多家畜都是一样的，都是通过野生驯化出来的，不过根据研究已经证实了，猫猫其实和狗的祖先都是一样的……</p>
                           </div>
                        </li>
                            <li class="nar_li">
                           <div class="div_img">
                           <img src="static/image/user1.jpg">
                           </div>
                           <div class="div_content">
                             <p class="p_title">大揭秘-猫的祖先到底是谁</p>
                             <p class="p_intro">其实猫猫和很多家畜都是一样的，都是通过野生驯化出来的，不过根据研究已经证实了，猫猫其实和狗的祖先都是一样的……</p>
                           </div>
                        </li>
                            <li class="nar_li">
                           <div class="div_img">
                           <img src="static/image/user1.jpg">
                           </div>
                           <div class="div_content">
                             <p class="p_title">大揭秘-猫的祖先到底是谁</p>
                             <p class="p_intro">其实猫猫和很多家畜都是一样的，都是通过野生驯化出来的，不过根据研究已经证实了，猫猫其实和狗的祖先都是一样的……</p>
                           </div>
                        </li>
                            <li class="nar_li">
                           <div class="div_img">
                           <img src="static/image/user1.jpg">
                           </div>
                           <div class="div_content">
                             <p class="p_title">大揭秘-猫的祖先到底是谁</p>
                             <p class="p_intro">其实猫猫和很多家畜都是一样的，都是通过野生驯化出来的，不过根据研究已经证实了，猫猫其实和狗的祖先都是一样的……</p>
                           </div>
                        </li>
                            <li class="nar_li">
                           <div class="div_img">
                           <img src="static/image/user1.jpg">
                           </div>
                           <div class="div_content">
                             <p class="p_title">大揭秘-猫的祖先到底是谁</p>
                             <p class="p_intro">其实猫猫和很多家畜都是一样的，都是通过野生驯化出来的，不过根据研究已经证实了，猫猫其实和狗的祖先都是一样的……</p>
                           </div>
                        </li>
                    </ul>
                  </div>
                </swiper-item>
                <swiper-item>
                  <div class="swiperArticle" ref="swiperArticle3">
                    <ul class="ha_ul">
                       <li class="ha_li">
                       <img src="static/image/user1.jpg">
                       </li>
                          <li class="ha_li">
                         <img src="static/image/user2.jpg">
                       </li>
                          <li class="ha_li">
                            <img src="static/image/user3.jpg">
                       </li>
                    </ul>
                    <ul class="nar_ul">
                        <li class="nar_li">
                           <div class="div_img">
                           <img src="static/image/user1.jpg">
                           </div>
                           <div class="div_content">
                             <p class="p_title">大揭秘-猫的祖先到底是谁</p>
                             <p class="p_intro">其实猫猫和很多家畜都是一样的，都是通过野生驯化出来的，不过根据研究已经证实了，猫猫其实和狗的祖先都是一样的……</p>
                           </div>
                        </li>
                            <li class="nar_li">
                           <div class="div_img">
                           <img src="static/image/user1.jpg">
                           </div>
                           <div class="div_content">
                             <p class="p_title">大揭秘-猫的祖先到底是谁</p>
                             <p class="p_intro">其实猫猫和很多家畜都是一样的，都是通过野生驯化出来的，不过根据研究已经证实了，猫猫其实和狗的祖先都是一样的……</p>
                           </div>
                        </li>
                            <li class="nar_li">
                           <div class="div_img">
                           <img src="static/image/user1.jpg">
                           </div>
                           <div class="div_content">
                             <p class="p_title">大揭秘-猫的祖先到底是谁</p>
                             <p class="p_intro">其实猫猫和很多家畜都是一样的，都是通过野生驯化出来的，不过根据研究已经证实了，猫猫其实和狗的祖先都是一样的……</p>
                           </div>
                        </li>
                            <li class="nar_li">
                           <div class="div_img">
                           <img src="static/image/user1.jpg">
                           </div>
                           <div class="div_content">
                             <p class="p_title">大揭秘-猫的祖先到底是谁</p>
                             <p class="p_intro">其实猫猫和很多家畜都是一样的，都是通过野生驯化出来的，不过根据研究已经证实了，猫猫其实和狗的祖先都是一样的……</p>
                           </div>
                        </li>
                            <li class="nar_li">
                           <div class="div_img">
                           <img src="static/image/user1.jpg">
                           </div>
                           <div class="div_content">
                             <p class="p_title">大揭秘-猫的祖先到底是谁</p>
                             <p class="p_intro">其实猫猫和很多家畜都是一样的，都是通过野生驯化出来的，不过根据研究已经证实了，猫猫其实和狗的祖先都是一样的……</p>
                           </div>
                        </li>
                            <li class="nar_li">
                           <div class="div_img">
                           <img src="static/image/user1.jpg">
                           </div>
                           <div class="div_content">
                             <p class="p_title">大揭秘-猫的祖先到底是谁</p>
                             <p class="p_intro">其实猫猫和很多家畜都是一样的，都是通过野生驯化出来的，不过根据研究已经证实了，猫猫其实和狗的祖先都是一样的……</p>
                           </div>
                        </li>
                            <li class="nar_li">
                           <div class="div_img">
                           <img src="static/image/user1.jpg">
                           </div>
                           <div class="div_content">
                             <p class="p_title">大揭秘-猫的祖先到底是谁</p>
                             <p class="p_intro">其实猫猫和很多家畜都是一样的，都是通过野生驯化出来的，不过根据研究已经证实了，猫猫其实和狗的祖先都是一样的……</p>
                           </div>
                        </li>
                            <li class="nar_li">
                           <div class="div_img">
                           <img src="static/image/user1.jpg">
                           </div>
                           <div class="div_content">
                             <p class="p_title">大揭秘-猫的祖先到底是谁</p>
                             <p class="p_intro">其实猫猫和很多家畜都是一样的，都是通过野生驯化出来的，不过根据研究已经证实了，猫猫其实和狗的祖先都是一样的……</p>
                           </div>
                        </li>
                            <li class="nar_li">
                           <div class="div_img">
                           <img src="static/image/user1.jpg">
                           </div>
                           <div class="div_content">
                             <p class="p_title">大揭秘-猫的祖先到底是谁</p>
                             <p class="p_intro">其实猫猫和很多家畜都是一样的，都是通过野生驯化出来的，不过根据研究已经证实了，猫猫其实和狗的祖先都是一样的……</p>
                           </div>
                        </li>
                            <li class="nar_li">
                           <div class="div_img">
                           <img src="static/image/user1.jpg">
                           </div>
                           <div class="div_content">
                             <p class="p_title">大揭秘-猫的祖先到底是谁</p>
                             <p class="p_intro">其实猫猫和很多家畜都是一样的，都是通过野生驯化出来的，不过根据研究已经证实了，猫猫其实和狗的祖先都是一样的……</p>
                           </div>
                        </li>
                            <li class="nar_li">
                           <div class="div_img">
                           <img src="static/image/user1.jpg">
                           </div>
                           <div class="div_content">
                             <p class="p_title">大揭秘-猫的祖先到底是谁</p>
                             <p class="p_intro">其实猫猫和很多家畜都是一样的，都是通过野生驯化出来的，不过根据研究已经证实了，猫猫其实和狗的祖先都是一样的……</p>
                           </div>
                        </li>
                            <li class="nar_li">
                           <div class="div_img">
                           <img src="static/image/user1.jpg">
                           </div>
                           <div class="div_content">
                             <p class="p_title">大揭秘-猫的祖先到底是谁</p>
                             <p class="p_intro">其实猫猫和很多家畜都是一样的，都是通过野生驯化出来的，不过根据研究已经证实了，猫猫其实和狗的祖先都是一样的……</p>
                           </div>
                        </li>
                    </ul>
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
	</div>
</template>

<script>
import serviceshoplist from '@/page/petservice/components/serviceshoplist'
import axios from 'axios'
import { Swiper, Scroller, Spinner,SwiperItem } from 'vux'
import {mapState, mapMutations} from 'vuex'
const baseList = [{
      url: 'javascript:',
      img: './static/image/Slides.jpg'
    }, {
      url: 'javascript:',
      img: './static/image/Slides1.jpg'
    }, {
      url: 'javascript:',
      img: './static/image/Slides2.jpg'
    }, {
      url: 'javascript:',
      img: './static/image/Slides3.jpg'
}]

export default {
    components: {
		serviceshoplist,
        Swiper,
        Scroller,
        Spinner,
        SwiperItem
    },
    data () {
      return {
        scrollerStaues: {
          pulldownStatus: 'default',
          pullupStatus: 'default'
        },
        SlideList:baseList,
        Swiper_index: 0,
        swiperHeight:0,
        InfoActiveIndex:0,
        swiperArticleHeight:0,
      }
    },
    mounted(){
      this.initHeadHeight();
    },
    computed: {
      ...mapState([
                'StatusbarHeight','StatusbarHeightRem',
            ]),
    },
    props:[],
    methods: {
      PageSlide (pos) {
      	this.SlideChangeSwiperHeight(this.InfoActiveIndex);
      },
      initHeadHeight(){
          if(this.$refs.Middle)
          {
            this.$refs.HeadTop.style.height=(1.5+this.StatusbarHeightRem)*window.screen.width / 10+"px";
            this.$refs.Middle.style.top=(1.5+this.StatusbarHeightRem)*window.screen.width / 10+"px";
          }
      },
      UpPagedade () {
        this.$nextTick(() => {
        setTimeout(() => {
          this.$refs.scroller.donePullup()
        }, 1000)
        })
      },
      SelectInfoSwiper(index){
        this.InfoActiveIndex=index;
        this.SlideChangeSwiperHeight(index);
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
      	}
      	else if(index==1){
      		let swiperArticletH=this.$refs.swiperArticle2.offsetHeight;
      	    this.swiperArticleHeight=swiperArticletH;
      	    this.$refs.swiperBigArticle.$el.children[0].style.height=this.swiperArticleHeight+"px";
      	}
      	else if(index==2){
      		let swiperArticletH=this.$refs.swiperArticle3.offsetHeight;
      	    this.swiperArticleHeight=swiperArticletH;
         	this.$refs.swiperBigArticle.$el.children[0].style.height=this.swiperArticleHeight+"px";
      	}
      },
      DownPageData () {
        console.log("555");
        this.$nextTick(() => {
        setTimeout(() => {
          this.$refs.scroller.donePulldown()
        }, 1000)
       })
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
  		background-color: #f7f3f7;
  		z-index: 100;
          p, span{
              font-family: Helvetica Neue,Tahoma,Arial;
          }
  }
  .Middle{
     position:absolute;top:1.5rem;left:0rem;bottom:0rem;width:100%;
  }
  .la_luokihead{width:10rem;height:1.5rem;background-color: #38dbb0;position:fixed;left:0rem;top:0rem;z-index: 99;display:flex;justify-content: center;align-items:center;
  	.la_user{
  		height:1.5rem;width:2rem;float:left;text-align:center;padding:0.4rem 0.4rem;
  		display:flex;justify-content:content;align-items:content;box-sizing: border-box;
  		img{
        width:0.6rem;height:0.6rem;
      }
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
  		width:2rem;height:1.5rem;float:left;color:#38dbb0;padding:0.35rem 0.35rem;
  		display:flex;justify-content:content;align-items:content;text-align:center;box-sizing: border-box;
  		img{
  			width:0.8rem;height:0.8rem;margin-left:0.25rem;float:left;
  		}
  	}
  }
  .ha_ul{
  	width:10rem;height:3.5rem;padding:0.25rem 0.125rem;list-style:none;margin:0rem;box-sizing:border-box;background-color:#fff;margin-top:0.2rem;
  	.ha_li{
  		width:33.3%;height:100%;padding:0.125rem;float:left;box-sizing:border-box;
  		img{width:100%;height:100%;}
  	}

  }
  .nar_ul{width:10rem;overflow:hidden;list-style:none;padding:0rem;margin:0rem;
  	.nar_li{
  		width:100%;height:2.5rem;padding:0.25rem;box-sizing:border-box;background-color:#fff;margin-top:0.2rem;
  		.div_img{width:2rem;height:2rem;float:left;
  			img{width:100%;height:100%;}
  		}
  		.div_content{width:7.5rem;height:2rem;padding-left:0.1rem;padding-right: 0.1rem;float:left;    box-sizing: border-box;
  			.p_title{width:100%;height:0.65rem;line-height:0.65rem;font-size:0.4rem;margin:0rem;padding:0rem;color:#000;}
  			.p_intro{width:100%;height:1.35rem;margin:0rem;padding:0rem;line-height:0.45rem;font-size:0.3rem;}
  		}
  	}
  }
</style>