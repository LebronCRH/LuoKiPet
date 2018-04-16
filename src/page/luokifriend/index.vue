<template>
	<div class="rating_page">
	  <div class="la_luokihead">
         <div class="la_user" @click="$router.go(-1)">
         <img src="static/image/Bback.png">
         </div>
         <div class="HeadMiddle">
            <tab :line-width=3 active-color='#fc378c' v-model="InfoActiveIndex">
              <tab-item class="vux-center" v-for="(item, index) in list2" @click="demo2 = item" :key="index">{{item}}</tab-item>
            </tab>
         </div>
         <div class="la_serach">
         <img src="static/image/png/Baddfriend.png">
         </div>
      </div>
      <div class="Middle">
        <scroller ref="scroller" lock-x height="-57" scrollbar-y use-pulldown :use-pullup=true @on-pullup-loading="UpPagedade" @on-pulldown-loading="DownPageData" v-model="scrollerStaues">
          <div>
              <swiper ref="swiperBigArticle" height="100vh" :show-dots="false" v-model="InfoActiveIndex" @on-index-change="InfoSwiperChange">
                <swiper-item>
                  <div class="swiperArticle" ref="swiperArticle">
                    <div class="Serach">
                      <div class="content">
                        <img src="static/image/search.png" alt="">
                        <span>搜索我的关注</span>
                      </div>
                    </div>
                    <ul class="ul_friend">
                      <router-link :to="{ name: 'friendchat',query:{userid:20}}" tag="li" class="lifriendItem">
                        <img src="static/image/user1.jpg" alt="">
                        <p><span>爱陌生时尚</span></p>
                      </router-link>
                      <router-link :to="{ name: 'friendchat',query:{userid:1}}" tag="li" class="lifriendItem">
                        <img src="static/image/user2.jpg" alt="">
                        <p><span>笑吾不良人</span></p>
                      </router-link>
                      <li class="lifriendItem">
                        <img src="static/image/user3.jpg" alt="">
                        <p><span>邪魅君子阐</span></p>
                      </li>
                    </ul>
                    <p class="Num"><span>4个关注</span></p>
                  </div>
                </swiper-item>
                <swiper-item>
                  <div class="swiperArticle" ref="swiperArticle2">
                    <div class="Serach">
                      <div class="content">
                        <img src="static/image/search.png" alt="">
                        <span>搜索我的关注</span>
                      </div>
                    </div>
                    <ul class="ul_friend">
                      <li class="lifriendItem">
                        <img src="static/image/user1.jpg" alt="">
                        <p><span>爱陌生时尚</span></p>
                      </li>
                      <li class="lifriendItem">
                        <img src="static/image/user2.jpg" alt="">
                        <p><span>笑吾不良人</span></p>
                      </li>
                      <li class="lifriendItem">
                        <img src="static/image/user3.jpg" alt="">
                        <p><span>邪魅君子阐</span></p>
                      </li>
                    </ul>
                  </div>
                </swiper-item>
                <swiper-item>
                  <div class="swiperArticle" ref="swiperArticle3">
                    <div class="Serach">
                      <div class="content">
                        <img src="static/image/search.png" alt="">
                        <span>搜索我的关注</span>
                      </div>
                    </div>
                    <ul class="ul_friend">
                      <li class="lifriendItem">
                        <img src="static/image/user1.jpg" alt="">
                        <p><span>爱陌生时尚</span></p>
                      </li>
                      <li class="lifriendItem">
                        <img src="static/image/user2.jpg" alt="">
                        <p><span>笑吾不良人</span></p>
                      </li>
                      <li class="lifriendItem">
                        <img src="static/image/user3.jpg" alt="">
                        <p><span>邪魅君子阐</span></p>
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
import { Swiper, Scroller, Spinner,SwiperItem,Tab, TabItem, } from 'vux'
const list = () => ['好友', '关注', '粉丝']
export default {
    components: {
		serviceshoplist,
        Swiper,
        Scroller,
        Spinner,
        SwiperItem,
        Tab,
        TabItem,
    },
    data () {
      return {
        scrollerStaues: {
          pulldownStatus: 'default',
          pullupStatus: 'default'
        },
        list2: list(),
        demo2: '美食',
        index: 0,
        Swiper_index: 0,
        swiperHeight:0,
        InfoActiveIndex:0,
        swiperArticleHeight:0,
      }
    },
    mounted(){
      this.getCamera();
      console.log("打开照相机");
    },
    computed: {
  
    },
    props:[],
    methods: {
      DownPageData () {
        console.log("555");
        this.$nextTick(() => {
        setTimeout(() => {
          this.$refs.scroller.donePulldown()
        }, 1000)
       })
      },
      getCamera(){
        var cr=plus.camera.getCamera(1);
        cr.captureImage();
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
      UpPagedade () {
        this.$nextTick(() => {
        setTimeout(() => {
          this.$refs.scroller.donePullup()
        }, 1000)
        })
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
  .Middle{
     position:absolute;top:1.5rem;left:0rem;bottom:0rem;width:100%;background: #fff;
  }
  .la_luokihead{width:10rem;height:1.5rem;background-color: #fff;position:fixed;left:0rem;top:0rem;z-index: 99;display:flex;justify-content: space-between;align-items:center;
  	.la_user{
  		height:100%;width:2rem;float:left;text-align:center;padding:0.4rem 0.4rem;
  		display:flex;justify-content:content;align-items:content;box-sizing: border-box;
  		img{
        width:0.6rem;height:0.6rem;
      }
  	}
    .HeadMiddle{
      width:6rem;float:left;margin:0;padding: 0;text-align:center;
      // .vux-tab-warp{
      //   .vux-tab-container{
      //     height:1.5rem;
      //     .vue-tab{
      //       height:1.5rem;
      //       .vux-tab-item{
      //         line-height:1.5rem;
      //       }
      //     }
      //   }
      // }
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
  .ul_friend{
    list-style:none;width:10rem;padding:0.25rem 0rem;
    .lifriendItem{
      width:100%;height:1.5rem;border-bottom:solid 1px #f3f3f3;display:flex;align-items:center;justify-content:flex-star;padding-left:0.25rem;
      img{
        width:1.2rem;height:1.2rem;border-radius:0.6rem;overflow:hidden;;
      }
      p{
        font-size:0.45rem;color:#000;margin-left:0.3rem;
      }
    }
  }
  .Serach{
    width:10rem;height:1rem;background:#f3f3f3;display:flex;align-items:center;justify-content:center;
    .content{
      width:9.5rem;height:0.8rem;background:#fff;display:flex;justify-content:center;align-items:center;border-radius:0.1rem;
      img{
        width:0.6rem;height:0.6rem;
      }
      span{
        font-size:0.4rem;color:#f3f3f3;margin-left:0.2rem;
      }
    }
  }
  .Num{
    width:10rem;height:1rem;text-align:center;line-height:1rem;font-size:0.4rem;color:#f3f3f3;
  }
</style>