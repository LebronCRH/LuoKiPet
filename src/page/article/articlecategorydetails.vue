<template>
<div class="rating_page" v-if="MArticle">
    <div class="ShopHead" ref="ShopHead">
       <div class="shopheadback" @click="$router.go(-1)">
         <img src="static/image/back.png">
       </div>
       <div class="shopheadmid" ref="my_shopheadmid">
          <p>{{this.MArticle.MArticle.MArticleTitle}}</p>
       </div>
       <div class="shopheadedit" onclick="onback()">
          <img src="static/image/dian.png">
       </div>
    </div>
  <div class="Middle">
        <scroller ref="scroller" lock-x height="-0" scrollbar-y use-pulldown :use-pullup=true @on-scroll="PageSlide" @on-pullup-loading="UpPagedade" @on-pulldown-loading="DownPageData" v-model="scrollerStaues">
        <div>
          <div class="ArtcleCove">
            <img :src="TestimgPCBaseUrl+MArticle.MArticle.MArticleCoverImage" alt="" v-ImgEdit="{ width:9.6,height:5 }">
          </div>
          <div class="ArticleTitle">
            <p>{{this.MArticle.MArticle.MArticleTitle}}</p>
          </div>
          <div class="SmallTitle">
            <p>{{this.MArticle.MArticle.MArticleSubTitle}}</p>
          </div>
          <div class="Line1"></div>
          <div class="AarticleAuthor">
            <img :src="UserImgFromat(this.MArticle.UserImage)" alt="">
            <span class="AauthorName">{{this.MArticle.MArticleUserName}}</span>
            <span class="Time">2018/04/25</span>
            <span class="Category">{{this.MArticle.MArticleCategory}}</span>
          </div>
          <div class="ArticleHead">
            <div class="Line2"></div>
            <img src="static/image/png/AarticleView.png" alt="">
            <span>正文</span>
            <div class="Line2"></div>
          </div>
          <div class="ArticleContent ql-editor" v-html="MArticle.MArticle.MArticleContent">
          </div>
        </div>
        <div slot="pulldown" class="xs-plugin-pulldown-container xs-plugin-pulldown-down" style="position: absolute; width: 100%; height:1.4rem; line-height:1.4rem; top:-1.4rem; text-align: center;">
          <span v-show="scrollerStaues.pulldownStatus === 'default'"></span>
          <span class="pulldown-arrow" v-show="scrollerStaues.pulldownStatus === 'down' || scrollerStaues.pulldownStatus === 'up'" :class="{'rotate': scrollerStaues.pulldownStatus === 'up'}">↓</span>
          <span v-show="scrollerStaues.pulldownStatus === 'loading'"></span>
        </div>
        <div slot="pullup" class="xs-plugin-pullup-container xs-plugin-pullup-up" style="position: absolute; width: 100%; height:1.4rem; line-height:1.4rem; bottom:-1.4rem; text-align: center;">
          <span v-show="scrollerStaues.pullupStatus === 'default'"></span>
          <span class="pulldown-arrow" v-show="scrollerStaues.pullupStatus === 'down' || scrollerStaues.pullupStatus === 'down'" :class="{'rotate': scrollerStaues.pullupStatus === 'down'}">↑</span>
          <span v-show="scrollerStaues.pullupStatus === 'loading'"></span>
        </div>
        </scroller>
  </div>

</div>
</template>

<script>
  import axios from 'axios'
  import {mapState, mapMutations} from 'vuex'
  import headTop from '@/components/Head.vue'
  import { Scroller } from 'vux'
  import 'quill/dist/quill.core.css';
  import 'quill/dist/quill.snow.css';
  import 'quill/dist/quill.bubble.css';
  import selectpackage from '@/page/petservice/components/selectpackage.vue'
  import {imgBaseUrl,H5LuoKiPetUrl,TestimgPCBaseUrl} from '@/config/env'
  import {GetArticleItemByID} from '@/service/getdata' 
  import {UserImgFromat} from '@/config/mUtils'

  export default {
      components: {
        headTop,
        Scroller,
        selectpackage
      },
      data () {
        return {
          msg: 'Hello World!',
          Title:'写点东西',
          Color:0,
          MidType:1,
          EditBtn:true,
          SelectShow:false,
          CurrentParamsArticleId:null,
          scrollerStaues: {
            pulldownStatus: 'default',
            pullupStatus: 'default'
          },
          TestimgPCBaseUrl:TestimgPCBaseUrl,
          ImgHeight:this.JiSuanPx(5),
          HeadHeight:0,
          MArticle:null,
        }
      },
      mounted(){
        console.log("4567890p");
        this.initData();
      },
      updated(){
        this.initHeadHeight();
      },
      destroyed(){

      },
      computed: {
        ...mapState([
                  'PackageCartList','CreateArticleTest','StatusbarHeight','StatusbarHeightRem',
              ]),
      },
      props:[],
      methods: {
        ...mapMutations([
                  'UPDATE_PACKAGECART',
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
        async initData(){ 
          this.GetMArticleInfo();
        },
        GetMArticleInfo()
        {
          this.CurrentParamsArticleId=this.$route.params.articleid;
          GetArticleItemByID(this.$route.params.articleid).then(response=>{
            this.MArticle=response;
          });
        },
        UpPagedade(){
          console.log(666);
          this.$nextTick(() => {
          setTimeout(() => {
            this.$refs.scroller.donePullup()
          }, 1000)
          })
        },
        JiSuanPx(val){
          var Unit=window.screen.width / 10
          return Unit*val;
        },
        DownPageData(){
          console.log("555");
          this.$nextTick(() => {
          setTimeout(() => {
            this.$refs.scroller.donePulldown()
          }, 1000)
         })
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
        }
      },
      watch:{
      '$route':function(){
        if(this.CurrentParamsArticleId!=this.$route.params.articleid){
          console.log("改变");
          this.initData();//用户在地图里面换店铺时候的变换店铺数据
        }
        else
        {
          console.log("没变");
        }
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
    z-index: 200;
        p, span{
            font-family: Helvetica Neue,Tahoma,Arial;
        }
}
.Middle{
    position:absolute;top:0rem;left:0rem;bottom:0rem;width:100%;background:#fff;

}
.ArtcleCove{
  width:100%;height:5rem;
  img{width:100%;height:100%;}
}
.ArticleTitle{
  width:100%;padding:0.5rem 0.2rem;display:flex;justify-content:center;background:#fff;
  p{
    font-size:0.6rem;line-height:0.9rem;color:#53565b;text-align:center
  }
}
.SmallTitle{
  width:100%;padding:0 0.2rem 0.4rem;display:flex;justify-content:center;background:#fff;
  p{
    font-size:0.55rem;line-height:0.8rem;color:#bbbbbb;text-align:center
  }
}
.Line1{
  width:40%;height:1px;margin:0 auto;background:#eee;
}
.AarticleAuthor{
  width:100%;height:1.5rem;display:flex;align-items:center;justify-content:center;background:#fff;
  img{
    width:0.7rem;height:0.7rem;border-radius:0.35rem;overflow:hidden;
  }
  span{font-size:0.35rem;margin-left:0.2rem;color:#ddd}
}
.ArticleHead{
  width:100%;padding:0rem 2rem;height:1.2rem;display:flex;align-items:center;justify-content:center;
  .Line2{width:15%;height:1px;background:#eee;margin:0rem 0.2rem;}
  img{width:0.8rem;height:0.8rem;margin:0rem 0.2rem;}
  span{font-size:0.5rem;color:#c8c7c9;margin:0rem 0.2rem;}
}
.ArticleContent{
  width:100%;padding:0rem 0.3rem;background:#fff;
  /deep/ p{font-size:0.35rem;color:#3f4040;line-height:0.5rem;margin:0.1rem 0rem;
    img{width:100%;}
  }
  /deep/ img{width:100%;}
  /deep/ h3{
    color: #88888d;font-size:15px;height:30px;line-height:30px;display:flex;align-items:center;justify-content:center;background-color:#faf9f9;
    img{
      width:18px;
    }
  }
}
.ShopHead{
    width:10rem;height:1.5rem;padding-top:0.5rem;position:fixed;left:0rem;top:0rem;z-index:99;box-sizing:border-box;
    .shopheadback{
      height:1.5rem;width:1.5rem;text-align:center;padding:0.45rem 0.45rem;position:absolute;left:0rem;bottom:0rem;z-index:99;box-sizing:border-box;
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
      width:1.5rem;height:1.5rem;color:#38dbb0;padding:0.45rem 0.45rem;position:absolute;bottom:0rem;right:0rem;z-index:99;box-sizing:border-box;
      display:flex;justify-content:content;align-items:content;
      img{
        width:0.6rem;height:0.6rem;
      }
    }
  }
.fade-enter-active, .fade-leave-active {
        transition: all .4s;
        transform: translateY(0%);
}
.fade-enter, .fade-leave-active {
        transform: translateY(100%);
}
</style>
