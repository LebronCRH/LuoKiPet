<template>
  <div class="rating_page">
    <div class="ShopHead">
       <div class="shopheadback" @click="$router.goBack()">
         <img src="static/image/back.png">
       </div>
       <div class="shopheadmid" ref="my_shopheadmid">
          <p>{{PetCategoryInfo.PetCategoryName}}</p>
       </div>
       <div class="shopheadedit" ui-sref="zx_article" onclick="onback()">
          <img src="static/image/dian.png">
       </div>
    </div>
    <div class="Middle">
      <scroller ref="scroller" lock-x height="-0" scrollbar-y @on-scroll="PageSlide">
        <div>
          <div class="PetTopInfo" ref="PetTopInfo">
            <div class="BJ" ref="BJ">
              <img :src="this.imgPCBaseUrl+PetCategoryInfo.PetCategory_Photos" alt="">
            </div>
            <div class="PetImg">
              <div class="Img">
                <img :src="this.imgPCBaseUrl+PetCategoryInfo.PetCategory_Photos" alt="">
                <div class="lab BM">
                  <span class="IC">
                  <img src="static/image/png/maozi.png" alt="">
                  </span>
                  <span class="span1">名称:</span><span class="span2">{{PetCategoryInfo.PetCategoryName}}</span>
                </div>
                <div class="lab ENM"><span class="IC"><img src="static/image/png/lovepetcate.png" alt=""></span><span class="span1">人气值:</span><span class="span2">23</span></div>
              </div>
              <p class="PetName">{{PetCategoryInfo.PetCategoryName}}</p>
              <p class="PetIntro">{{PetCategoryInfo.PetCategory_Introduce}}</p>
            </div>
          </div>
          <div class="PetMidderInfo">
            <div class="PetInfoTab">
              <div class="Information" :class="CurrentShowPetIntro=='Information'?'active':''" @click="SelectShowPetIntro('Information')">
                <img v-if="CurrentShowPetIntro=='Information'" src="static/image/png/liebiaoA.png" alt="">
                <img v-if="CurrentShowPetIntro=='Features'" src="static/image/png/liebiao.png" alt="">
                <span>基本信息</span>
              </div>
              <div class="Features" :class="CurrentShowPetIntro=='Features'?'active':''" @click="SelectShowPetIntro('Features')">
                <img v-if="CurrentShowPetIntro=='Information'" src="static/image/png/liebiao.png" alt="">
                <img v-if="CurrentShowPetIntro=='Features'" src="static/image/png/liebiaoA.png" alt="">
                <span>基本特征</span>
              </div>
            </div>
            <div class="InformationDetails">
              <ul class="ul_Information" v-show="CurrentShowPetIntro=='Information'">
                <li class="li_InformationItem">
                  <span class="Title">中文名:</span>
                  <span class="Value">{{PetCategoryInfo.PetCategoryName}}</span>
                </li>
                <li class="li_InformationItem">
                  <span class="Title">别名:</span>
                  <span class="Value">{{PetCategoryInfo.Alias}}</span>
                </li>
                <li class="li_InformationItem">
                  <span class="Title">体型:</span>
                  <span class="Value">{{PetCategoryInfo.Shape}}</span>
                </li>
                <li class="li_InformationItem">
                  <span class="Title">毛长:</span>
                  <span class="Value">{{PetCategoryInfo.Hair}}</span>
                </li>
                <li class="li_InformationItem">
                  <span class="Title">英文名:</span>
                  <span class="Value">{{PetCategoryInfo.EnName}}</span>
                </li>
                <li class="li_InformationItem">
                  <span class="Title">智商:</span>
                  <span class="Value">{{PetCategoryInfo.Intelligence}}</span>
                </li>
                <li class="li_InformationItem">
                  <span class="Title">原厂地:</span>
                  <span class="Value">{{PetCategoryInfo.Origin}}</span>
                </li>
                <li class="li_InformationItem">
                  <span class="Title">体重:</span>
                  <span class="Value">{{PetCategoryInfo.Weight}}</span>
                </li>
                <li class="li_InformationItem">
                  <span class="Title">价格:</span>
                  <span class="Value">{{PetCategoryInfo.Price}}</span>
                </li>
                <li class="li_InformationItem">
                  <span class="Title">肩高:</span>
                  <span class="Value">{{PetCategoryInfo.Height}}</span>
                </li>
                <li class="li_InformationItem">
                  <span class="Title">毛色:</span>
                  <span class="Value">{{PetCategoryInfo.HairColor}}</span>
                </li>
                <li class="li_InformationItem">
                  <span class="Title">功能:</span>
                  <span class="Value">{{PetCategoryInfo.Function}}</span>
                </li>
              </ul>
              <ul class="ul_Features" v-show="CurrentShowPetIntro=='Features'">
                <li class="li_FeaturesItem">
                    <span class="Title">体味程度:</span>
                    <span class="Value">
                    <i :class="JiSuanStar(PetCategoryInfo.Taste_Level)"></i>
                    </span>
                </li>
                <li class="li_FeaturesItem">
                    <span class="Title">运动程度:</span>
                    <span class="Value">
                    <i :class="JiSuanStar(PetCategoryInfo.Exercise_Level)"></i>
                    </span>
                </li>
                <li class="li_FeaturesItem">
                    <span class="Title">耐热程度:</span>
                    <span class="Value">
                    <i :class="JiSuanStar(PetCategoryInfo.Heat_resistance)"></i>
                    </span>
                </li>
                <li class="li_FeaturesItem">
                    <span class="Title">护家程度:</span>
                    <span class="Value">
                    <i :class="JiSuanStar(PetCategoryInfo.GuJia_Level)"></i>
                    </span>
                </li>
                <li class="li_FeaturesItem">
                    <span class="Title">耐寒程度:</span>
                    <span class="Value">
                    <i :class="JiSuanStar(PetCategoryInfo.Cold_resistance)"></i>
                    </span>
                </li>
                <li class="li_FeaturesItem">
                    <span class="Title">美容程度:</span>
                    <span class="Value">
                    <i :class="JiSuanStar(PetCategoryInfo.Appearance_Level)"></i>
                    </span>
                </li>
                <li class="li_FeaturesItem">
                    <span class="Title">友善程度:</span>
                    <span class="Value">
                    <i :class="JiSuanStar(PetCategoryInfo.Friendly_Level)"></i>
                    </span>
                </li>
                <li class="li_FeaturesItem">
                    <span class="Title">口水程度:</span>
                    <span class="Value">
                    <i :class="JiSuanStar(PetCategoryInfo.Gluttonous_Level)"></i>
                    </span>
                </li>
                <li class="li_FeaturesItem">
                    <span class="Title">粘人程度:</span>
                    <span class="Value">
                    <i :class="JiSuanStar(PetCategoryInfo.Sticky_Level)"></i>
                    </span>
                </li>
                <li class="li_FeaturesItem">
                    <span class="Title">掉毛程度:</span>
                    <span class="Value">
                    <i :class="JiSuanStar(PetCategoryInfo.Hairfalling_Level)"></i>
                    </span>
                </li>
                <li class="li_FeaturesItem">
                    <span class="Title">喜叫程度:</span>
                    <span class="Value">
                    <i :class="JiSuanStar(PetCategoryInfo.Call_Level)"></i>
                    </span>
                </li>
                <li class="li_FeaturesItem">
                    <span class="Title">可训程度:</span>
                    <span class="Value">
                    <i :class="JiSuanStar(PetCategoryInfo.CanTrain_Level)"></i>
                    </span>
                </li>
                <li class="li_FeaturesItem">
                    <span class="Title">饲养程度:</span>
                    <span class="Value">
                    <i :class="JiSuanStar(PetCategoryInfo.Feed_difficulty)"></i>
                    </span>
                </li>
                <li class="li_FeaturesItem">
                    <span class="Title">关爱需求:</span>
                    <span class="Value">
                    <i :class="JiSuanStar(PetCategoryInfo.Care_needs)"></i>
                    </span>
                </li>
              </ul>
            </div>
          </div>
          <div class="BottomIntro">
            <img src="static/image/png/jianjie.png" alt="">
            <span>详细介绍</span>
          </div>
          <div class="SlideOrderState">
            <tab bar-active-color="#f55b50" :scroll-threshold="4" :line-width="3" active-color='#fc378c' v-model="InfoActiveIndex">
                <tab-item class="vux-center" active-class="active-tab" v-for="(item, index) in list2" @click="demo2 = item" :key="index">{{item}}</tab-item>
            </tab>
        </div>
        <div class="BigInfoHelp" id="BigInfoHelp">
        <swiper ref="swiperBigArticle" height="100vh" :show-dots="false" v-model="InfoActiveIndex" @on-index-change="InfoSwiperChange">
                <swiper-item>
                <div class="BottomItem" id="BottomItem1" ref="swiperArticle" v-html="PetCategoryInfo.Base_Info">{{PetCategoryInfo.Base_Info}}</div>
                </swiper-item>
                <swiper-item>
                <div class="BottomItem" id="BottomItem2" ref="swiperArticle1" v-html="PetCategoryInfo.Variety_charact">{{PetCategoryInfo.Variety_charact}}</div>
                </swiper-item>
                <swiper-item>
                <div class="BottomItem" id="BottomItem3" ref="swiperArticle2" v-html="PetCategoryInfo.Nurs_knowledge">{{PetCategoryInfo.Nurs_knowledge}}</div>
                </swiper-item>
                <swiper-item>
                <div class="BottomItem" id="BottomItem4" ref="swiperArticle3" v-html="PetCategoryInfo.Need_Care">{{PetCategoryInfo.Need_Care}}</div>
                </swiper-item>
        </swiper>
        </div>
        </div>
      </scroller>
    </div>
    <section class="animation_opactiy shop_back_svg_container" v-show="showLoading">
           <img src="static/image/shop_back_svg.svg">
    </section>
    <loading v-show="showLoading"></loading>
  </div>
</template>

<script>
  import axios from 'axios'
  import {mapState, mapMutations} from 'vuex'
  import { Swiper, Scroller, Spinner,SwiperItem,Tab, TabItem, } from 'vux'
  import buyservice from '@/page/petservice/components/buyservice.vue'
  import {GetPetServiceShopByID,cityGuess,GetPetShopByShopId} from '@/service/getdata' 
  import loading from '@/components/common/loading.vue'
  import {imgBaseUrl,imgPCUrl,imgPCBaseUrl} from '@/config/env'
  import {GetPetCategoryAll,GetPetCategoryById} from '@/service/getdata'
  const list = () => ['基本信息', '品种特点', '养宠知识', '注意事项']

  export default {
    components: {
        Scroller,
        Tab,
        TabItem,
        Swiper,
        SwiperItem,
        loading
    },
    data () {
      return {
        Swiper_index: 0,
        ShowBigImg:false,
        x:0,
        y:0,
        list2: list(),
        imgBaseUrl:"./static/image/",
        ShopimgBaseUrl:imgBaseUrl, 
        imgPCUrl:imgPCUrl,
        imgPCBaseUrl:imgPCBaseUrl,
        ImgHeight:180,
        HeadHeight:0,
        CurrentShowPetIntro:'Information',
        InfoActiveIndex:0,
        PetCategoryInfo:{},
        showLoading:true,
      }
    },
    beforeRouteEnter: (to, from, next) => {
      next(vm => {
        console.log('组件路由勾子beforeRouteEnter的next')
      })
    },
    computed:{
      ...mapState([
                  'PackageCartList','UserNode','UserSelectNode',
              ]),
    },
    mounted() {
      this.initData();
      // this.hideLoading();
    },
    methods:{
      ...mapMutations([
                  'ADD_PACKAGECART','JIA_PACKAGECART','JIAN_PACKAGECART'
              ]),
        PageSlide(pos){
          this.HeadHeight=this.$refs.my_shopheadmid.offsetHeight;
          this.ImgHeight=this.$refs.PetTopInfo.offsetHeight;
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
          this.$nextTick(() => {
          setTimeout(() => {
            this.$refs.scroller.donePulldown()
          }, 1000)
         })
        },
        hideLoading(){
          this.showLoading = false;
        },
        SelectShowPetIntro(val){
          this.CurrentShowPetIntro=val;
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
              // console.log(this.$refs.swiperBigArticle.$el.children[0].style.height);
          }
          else if(index==1){
            let swiperArticletH=this.$refs.swiperArticle1.offsetHeight;
              this.swiperArticleHeight=swiperArticletH;
              this.$refs.swiperBigArticle.$el.children[0].style.height=this.swiperArticleHeight+"px";
          }
          else if(index==2){
            let swiperArticletH=this.$refs.swiperArticle2.offsetHeight;
              this.swiperArticleHeight=swiperArticletH;
            this.$refs.swiperBigArticle.$el.children[0].style.height=this.swiperArticleHeight+"px";
          }
          else if(index==3){
            let swiperArticletH=this.$refs.swiperArticle3.offsetHeight;
              this.swiperArticleHeight=swiperArticletH;
            this.$refs.swiperBigArticle.$el.children[0].style.height=this.swiperArticleHeight+"px";
          }
          else if(index==4){
            let swiperArticletH=this.$refs.swiperArticle4.offsetHeight;
              this.swiperArticleHeight=swiperArticletH;
            this.$refs.swiperBigArticle.$el.children[0].style.height=this.swiperArticleHeight+"px";
          }
        },
        async initData(){
          await GetPetCategoryById(this.$route.params.petcateid).then(response=>{
            this.PetCategoryInfo=response;
            this.$nextTick(() => {
              // this.$refs.BJ.ele.style.backgroundImage=response.PetCategory_Photos;
              console.log(this.$refs.BJ.style);
              var obj=document.getElementById("BigInfoHelp");
              var imgs=obj.getElementsByTagName("img");
              console.log(imgs);
              for(var i=0;i<imgs.length;i++){
                var index=imgs[i].src.indexOf('ueditor');
                imgs[i].src=this.imgPCUrl+'/'+imgs[i].src.substr(index);
                imgs[i].style.width="100%";
              }
            })
            this.hideLoading();
          })
        },
        JiSuanStar(val){
          if(val==1)
          {
            return 'XX-1';
          }else if(val==2)
          {
            return 'XX-2';
          }
          else if(val==3)
          {
            return 'XX-3';
          }
          else if(val==4)
          {
            return 'XX-4';
          }
          else if(val==5)
          {
            return 'XX-5';
          }
          else if(val==6)
          {
            return 'XX-6';
          }
          else if(val==7)
          {
            return 'XX-7';
          }
          else if(val==8)
          {
            return 'XX-8';
          }
          else if(val==9)
          {
            return 'XX-9';
          }else if(val==10)
          {
            return 'XX-10';
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
    }
  }
  .Middle{
      position:absolute;top:0rem;left:0rem;bottom:0rem;width:100%;
  }
  .router-slid-enter-active, .router-slid-leave-active {
      transition: all .4s;
  }
  .router-slid-enter, .router-slid-leave-active {
      transform: translate3d(2rem, 0, 0);
      opacity: 0;
  }
.PetTopInfo{width:100%;height:6rem;position:relative;
  .BJ{
    width:100%;height:100%;position:absolute;left: 0rem;top: 0rem;
    -webkit-filter: blur(3px);
      -moz-filter: blur(3px);
      -o-filter: blur(3px);
      -ms-filter: blur(3px);
      filter: blur(3px);
      img{width:10rem;height:6rem;}
  }
  .PetImg{width:100%;height:100%;position:absolute;top:0rem;left:0rem;
    .Img{width:2rem;height:2rem;position:relative;margin:0.2rem auto;}
    img{width:2rem;height:2rem;display:block;border-radius:1rem;}
    .PetName{width:100%;height:1rem;font-size:0.6rem;font-family:KaiTi;margin:0rem auto;line-height:1rem;text-align:center;color:#fff;}
    .PetIntro{width:85%;margin:0rem auto;font-size:0.4rem;text-align:center;line-height:0.6rem;color: #fff;font-family:KaiTi;}
  }
}
.lab.BM {
    position: absolute;
    right: -90px;
    bottom: 35px;
    background-color: #dab02e;
    height: 22px;
    border-radius: 11px;
    // width: 100px;
    display:flex;align-items:center;
}
.lab .IC {
    display: block;
    height: 18px;
    width: 18px;
    float: left;
    background: #fff;
    border-radius: 9px;
    margin-top: 2px;
    margin-left: 2px;
    margin-right: 5px;
    text-align: center;
    line-height: 14px;
    img {
        width:18px;height:18px;
    }
}
.span1 {
    font-family: KaiTi;
    font-size: 11px;
    color: white;
}
.span2 {
    font-family: KaiTi;
    font-size: 11px;
    color: #b200ff;
}
.lab.ENM {
    position: absolute;
    right: -75px;
    bottom: 5px;
    background-color: #2a9ebd;
    height: 22px;
    border-radius: 11px;
    width: 100px;
    display:flex;align-items:center;
}
.PetMidderInfo{width:100%;background:#fff;
   .PetInfoTab{width:100%;height:1.2rem;display:flex;justify-content:center;
    .Information{width:50%;height:100%;display:flex;align-items:center;justify-content:center;
      img{width:0.5rem;height:0.5rem;margin-right:0.2rem;}
      span{font-size:0.5rem;font-family:KaiTi;}
      &.active{
        span{color:#38dbb0;}
      }
    }
    .Features{width:50%;height:100%;display:flex;align-items:center;justify-content:center;
      img{width:0.5rem;height:0.5rem;margin-right:0.2rem;}
      span{font-size:0.5rem;font-family:KaiTi;}
      &.active{
        span{color:#38dbb0;}
      }
    }
  }
}
.InformationDetails{
  width:100%;
  .ul_Information{
    width:100%;list-style:none;padding:0rem 0.2rem;box-sizing:border-box;overflow:hidden;
    .li_InformationItem{
      min-width:50%;height:1rem;float:left;display:flex;align-items:center;
      .Title{
        font-size:0.45rem;font-family:KaiTi;color:#000;
      }
      .Value{
        font-size:0.45rem;font-family:KaiTi;color:#808080;
      }
    }
  }
  .ul_Features{
    width:100%;list-style:none;padding:0rem 0.2rem;box-sizing:border-box;overflow:hidden;
    .li_FeaturesItem{
      min-width:50%;height:1rem;float:left;display:flex;align-items:center;
      .Title{
        font-size:0.45rem;font-family:KaiTi;color:#000;
      }
      .Value{
        font-size:0.45rem;font-family:KaiTi;color:#808080;
        i {
            width: 80px;
            height: 12px;
            display: inline-block;
            background: url(../../../../static/image/png/star.png);
        }
        .XX-1 {
            background-position: 0 -0px;
        }
        .XX-2 {
            background-position: 0 -12px;
        }
        .Value .XX-3 {
            background-position: 0 -24px;
        }
        .XX-4 {
            background-position: 0 -36px;
        }
        .XX-5 {
            background-position: 0 -48px;
        } 
        .XX-6 {
            background-position: 0 -60px;
        }
        .XX-7 {
            background-position: 0 -72px;
        }
        .XX-8 {
            background-position: 0 -84px;
        }
        .XX-9 {
            background-position: 0 -96px;
        }
        .XX-10 {
            background-position: 0 -108px;
        } 
      }
    }
  }
}
.BottomIntro{width:100%;height:1.2rem;display:flex;align-items:center;justify-content:center;background:#fff;margin-top:0.2rem;
  img{width:0.5rem;height:0.5rem;margin-right:0.2rem;}
  span{font-size:0.5rem;font-family:KaiTi;color:#38dbac;}
}
.BottomItem{width:100%;padding:0.2rem;box-sizing:border-box;background:#fff;}
.SlideOrderState{
    width:100%;
    .vux-tab-container {
        height:1.5rem;
        top: 0;
        left: 0;
        right: 0;
        overflow: hidden;
        position: absolute;
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
</style>
