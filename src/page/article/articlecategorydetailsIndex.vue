<template>
  <div class="rating_page">
    <div class="ShopHead" ref="ShopHead">
       <div class="shopheadback" @click="$router.go(-1)">
         <img src="static/image/back.png">
       </div>
       <div class="shopheadmid" ref="my_shopheadmid">
          <p>宠物日常</p>
       </div>
       <div class="shopheadedit">
          <img src="static/image/dian.png">
       </div>
    </div>
    <div>
      <scroller ref="scroller" lock-x height="-0" scrollbar-y use-pulldown :use-pullup=true @on-scroll="PageSlide" @on-pullup-loading="UpPagedade" @on-pulldown-loading="DownPageData" v-model="scrollerStaues">
        <div>
           <div class="TopSlideImg">
            <img class="TopSlideImgItem" src="http://192.168.0.166:8085\Images\文章发布\文章封面\cwrc.gif">
            <div class="CategoryIntroduce">
              <div class="CategoryImg"><img src="http://192.168.0.166:8085\Images\文章发布\文章封面\cwrcicon.jpg" alt=""></div>
              <p class="CategoryTitle">为它取名的那一天</p>
              <p class="CategorySubTitle">我与你相遇的第一天</p>
              <div class="AddGZ">关注</div>
              <p class="ArticleNum"><img src="static/image/png/articleren.png" alt="">&nbsp<span>998</span>&nbsp&nbsp&nbsp&nbsp<img src="static/image/png/articlenum.png" alt="">&nbsp<span>1000</span></p>
            </div>
           </div>
           <ul class="ulTop">
             <li class="TopItem">
               <div class="LeftImg"></div>
               <div class="MiddleTitle">【新晋寄养家庭】 如何让宠物中意自己</div>
               <div class="RightImg"><img src="static/image/png/xiangyou.png" alt=""></div>
             </li>
             <li class="TopItem">
               <div class="LeftImg"></div>
               <div class="MiddleTitle">【每周都有最佳日记奖】</div>
               <div class="RightImg"><img src="static/image/png/xiangyou.png" alt=""></div>
             </li>
           </ul>
           <div class="ArticleStatusSelect">
             <ul class="la_menu">
                <li class="la_menuitem" :class="StatusActiveIndex==0?'select':''" @click="SelectStatusActive(0)">
                   <span>精选资讯</span>
                </li>
                <li class="la_menuitem" :class="StatusActiveIndex==1?'select':''" @click="SelectStatusActive(1)">
                 <span>养宠课堂</span>
                </li>
             </ul>
           </div>
           <ul class="ul_ArticleList" v-show="StatusActiveIndex==0">
             <router-link class="ArticleItem" v-for="(item,index) in ArticleList" :to="'/articlecategorydetails/'+item.MArticle.MArticleID" :key="index" tag="li">
               <div class="TopBigImg">
                 <div class="BigImg">
                   <img :src="TestimgPCBaseUrl+item.MArticle.MArticleCoverImage" alt="" v-ImgEdit="{ width:10,height:4.5 }">
                 </div>
                 <div class="Title">{{item.MArticle.MArticleTitle}}</div>
                 <div class="UserImg">
                   <img :src="UserImgFromat(item.UserImage)" alt="">
                 </div>
               </div>
               <div class="ArticleCategory">
                 <p class="PCategory"><img src="static/image/png/articlecate.png" alt="">{{item.MArticleCategory}}</p>
                 <p class="PUserName">{{item.MArticleUserName}}</p>
               </div>
               <div class="ArticleBigContent">
                 <p class="ArticleTitle">{{item.MArticle.MArticleSubTitle}}</p>
                 <div class="ArticleContent ql-editor" v-html="item.MArticleIntroduce"></div>
               </div>
               <div class="ArticleLoveorBrowse">
                 <p class="Love">浏览  {{item.MArticle.MArticleLoveNumber}}</p>
                 <p class="Browse">点赞  {{item.MArticle.MArticleBrowse}}</p>
               </div>
             </router-link>
           </ul>
           <ul class="ul_ArticleList" v-show="StatusActiveIndex==1">
           </ul>
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
  import axios from 'axios'
  import {mapState, mapMutations} from 'vuex'
  import { Swiper,Scroller,Spinner,SwiperItem,Previewer,TransferDom} from 'vux'
  import buyservice from '@/page/petservice/components/buyservice.vue'
  import {GetAllArticleByCategory} from '@/service/getdata' 
  import loading from '@/components/common/loading.vue'
  import {imgBaseUrl,H5LuoKiPetUrl,TestimgPCBaseUrl} from '@/config/env'
  import {UserImgFromat} from '@/config/mUtils'


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
        msg: 'Hello World!',
        scrollerStaues: {
            pulldownStatus: 'default',
            pullupStatus: 'default'
        },
        x:0,
        y:0,
        imgBaseUrl:"./static/image/",
        ShopimgBaseUrl:imgBaseUrl,
        TestimgPCBaseUrl:TestimgPCBaseUrl, 
        ImgHeight:180,
        HeadHeight:0,
        windowHeight: null, //屏幕的高度
        showLoading:true,
        swiperHeight:0,
        swiper:null,
        ArticleList:null,
        StatusActiveIndex:0,
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
                  'PackageCartList','UserNode','UserSelectNode','ShareServices','StatusbarHeight','StatusbarHeightRem',
              ]),
    },
    mounted() {
        this.initData();
    },
    updated(){
      this.initHeadHeight();
    },
    methods:{
      ...mapMutations([
                  'ADD_PACKAGECART','JIA_PACKAGECART','JIAN_PACKAGECART'
              ]),
        initHeadHeight(){
          if(this.$refs.ShopHead)
          {
            this.$refs.ShopHead.style.height=(1.5+this.StatusbarHeightRem)*window.screen.width / 10+"px";
            this.$refs.my_shopheadmid.style.paddingTop=(this.StatusbarHeightRem)*window.screen.width / 10+"px";
          }
        },
        UserImgFromat(userimg){
             return UserImgFromat(userimg);
        },
        async initData(){ 
          this.GetAllArticle();
        },
        GetAllArticle()
        {
          GetAllArticleByCategory(1).then(response=>{
            this.ArticleList=response;
          })
        },
        SelectStatusActive(val)
        {
          this.StatusActiveIndex=val;
        },
        PageSlide(pos){
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
        }
    },
    watch:{
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
    width:10rem;height:1.5rem;position:fixed;left:0rem;top:0rem;z-index:99;box-sizing:border-box;
    .shopheadback{
      height:1.5rem;width:1.5rem;text-align:center;padding:0.45rem 0.45rem;position:absolute;left:0rem;z-index:99;box-sizing:border-box;bottom:0rem;
      display:flex;justify-content:content;align-items:content;
      img{
        width:0.6rem;height:0.6rem;
      }
    }
    .shopheadmid{
      width:10rem;height:100%;list-style:none;margin:0;padding: 0;text-align:center;position:absolute;left:0rem;background:#38dbb0;z-index:98;opacity:0;
      p{line-height:1.5rem;color:#fff;font-size:0.5rem;}
    }
    .shopheadedit{
      width:1.5rem;height:1.5rem;color:#38dbb0;padding:0.45rem 0.45rem;position:absolute;right:0rem;z-index:99;box-sizing:border-box;bottom:0rem;
      display:flex;justify-content:content;align-items:content;
      img{
        width:0.6rem;height:0.6rem;
      }
    }
  }
  .router-slid-enter-active, .router-slid-leave-active {
      transition: all .4s;
  }
  .router-slid-enter, .router-slid-leave-active {
      transform: translate3d(2rem, 0, 0);
      opacity: 0;
  }
  .ArticleStatusSelect{
    width:10rem;height:1.5rem;margin-top:0.3rem;background-color:#fff;display:flex;justify-content:center;align-items:center;
    .la_menu{
      width:6rem;height:0.7rem;list-style: none;float:left;margin:0;padding: 0;text-align:center;display:flex;justify-content: center;align-items:center;
      border:solid 0.03rem #fbc02d;border-radius:0.1rem;
      .la_menuitem{
        width:50%;height:100%;float:left;
        span{
        line-height:0.7rem;height:0.7rem;width:3rem;color:#fbc02d;display:inline-block;font-size:0.3rem;float: left;}
      }
      .la_menuitem.Mid{border-left:solid 0.03rem #fff;border-right:solid 0.03rem #fff;box-sizing:border-box;}
      .la_menuitem.select{
        background-color:#fbc02d;
        span{color:#fff;}
      }    
    }
  }
  .TopSlideImg{
    width:10rem;height:5rem;position:relative;
    img{
      width:10rem;height:5rem;
    }
    .CategoryIntroduce{
      width:100%;height:1.8rem;position:absolute;left:0rem;bottom:0rem;background-color:rgba(251,175,85,0.5);
      .CategoryImg{
        position:absolute;width:1.6rem;height:1.6rem;left:0.2rem;top:0.1rem;
        img{
          width:100%;height:100%;
        }
      }
      .CategoryTitle{
        height:0.8rem;line-height:0.8rem;font-size:0.5rem;color:#fff;position:absolute;left:2rem;top:0.1rem;
      }
      .CategorySubTitle{
        height:1rem;line-height:1rem;font-size:0.3rem;color:#fff;position:absolute;left:2rem;bottom:0rem;
      }
      .AddGZ{
        width:1.6rem;height:0.6rem;background-color:#fbc02d;position:absolute;right:0.2rem;top:0.3rem;border-radius:5px;text-align:center;font-size:0.3rem;line-height:0.6rem;color:#fff;
      }
      .ArticleNum{
        height:0.5rem;line-height:0.5rem;font-size:0.3rem;color:#fff;position:absolute;right:0.2rem;bottom:0rem;display:flex;align-items:center;
        img{
          width:0.4rem;height:0.4rem;
        }
      }
    }
  }
  .ulTop{
    width:10rem;list-style:none;background-color:#fff;
    .TopItem{
      width:100%;height:1.2rem;display:flex;border-bottom:solid #ddd 1px;
      .LeftImg{
        width:1.3rem;height:1.2rem;
      }
      .MiddleTitle{
        width:7.5rem;height:1.2rem;line-height:1.2rem;font-size:0.35rem;
      }
      .RightImg{
        width:1.2rem;height:1.2rem;display:flex;justify-content:center;align-items:center;
        img{width:0.4rem;height:0.4rem;}
      }
    }
  }
  .ul_ArticleList{
    width:10rem;
    .ArticleItem{
      width:10rem;background-color:#fff;padding-bottom:0.2rem;margin-bottom:0.3rem;
      .TopBigImg{
        width:100%;height:4.5rem;position:relative;
        .BigImg{
          width:100%;height:4.5rem;overflow:hidden;
          img{
            width:100%;
          }
        }
        .Title{
          position:absolute;bottom:0rem;left:0rem;width:100%;height:1.2rem;line-height:1.2rem;background-color:#fff;opacity:0.5;font-size:0.5rem;font-weight:550;padding-left:0.5rem;
        }
        .UserImg{
          position:absolute;right:0.5rem;width:1.8rem;height:1.8rem;border-radius:0.9rem;background-color:#eff1f2;bottom:-0.9rem;display:flex;justify-content:center;align-items:center;
          img{
            width:1.6rem;height:1.6rem;border-radius:0.8rem;
          }
        }
      }
      .ArticleCategory{
        width:7.5rem;height:0.6rem;display:flex;line-height:0.6rem;justify-content:space-between;padding:0rem 0rem 0rem 0.4rem;
        .PCategory{
          font-size:5px;color:#fdc54f;
          img{width:0.35rem;margin-right:0.1rem;}
        }
        .PUserName{
          font-size:0.3rem;color:black;font-weight:bold;
        }
      }
      .ArticleBigContent{
        width:100%;padding:0rem 0.4rem;
        .ArticleTitle{
          font-size:0.3rem;color:#5d5d5d;line-height:0.7rem;
        }
        .ArticleContent{
          font-size:0.3rem;color:black;margin-top:0.1rem;padding:0rem;max-height:1.35rem;overflow:hidden;
          /deep/ p{
            font-size:0.3rem;color:black;line-height:0.45rem;
          }
        }
      }
      .ArticleLoveorBrowse{
        width:100%;height:0.6rem;display:flex;line-height:0.6rem;justify-content:flex-end;padding:0rem 0.4rem;
        p{margin-right:0.2rem;font-size:0.3rem;color:#b5b5b5;}
      }
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
