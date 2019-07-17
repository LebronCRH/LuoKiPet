<template>
<div class="rating_page">
  <head-top :Title="Title" :Color="Color" :MidType="MidType">
  </head-top>
  <div class="Middle" ref="Middle">
    <scroller ref="scroller" lock-x height="-56" scrollbar-y>
      <div>
        <div class="ps_serach">
           <div class="ps_divserach">
             <img src="../../assets/image/serach2.png">
             <input type="text" placeholder="请输入宠物种类名称" name="serachName">
           </div>
        </div>
        <div class="ps_topcate">
          <ul class="ps_ulcate">
            <li :class="ActegoryActiveIndex==0?'active':''" @click="SelectCategorySwiper(0)">狗类</li>
            <li :class="ActegoryActiveIndex==1?'active':''" @click="SelectCategorySwiper(1)">猫类</li>
            <li>兔类</li>
           </ul>
        </div> 
        <swiper ref="swiperCategory" :show-dots="false" v-model="ActegoryActiveIndex" @on-index-change="ActegorySwiperChange" @on-get-height="CateUpdateHeight">
          <swiper-item>
            <div class="SwiperCategory" id="DogSwiperCategory">
              <div class="CategoryEnList">
                  <p class="FirstEn">热门</p>
                  <ul class="ul_HotCategory">
                      <li class="HotCategoryItem">
                          <span>西伯利亚狼</span>
                      </li>
                      <li class="HotCategoryItem">
                          <span>金毛寻回犬</span>
                      </li>
                      <li class="HotCategoryItem">
                          <span>阿拉斯加雪橇犬</span>
                      </li>
                      <li class="HotCategoryItem">
                          <span>西伯利亚狼</span>
                      </li>
                      <li class="HotCategoryItem">
                          <span>金毛寻回犬</span>
                      </li>
                      <li class="HotCategoryItem">
                          <span>阿拉斯加雪橇犬</span>
                      </li>
                      <li class="HotCategoryItem">
                          <span>西伯利亚狼</span>
                      </li>
                      <li class="HotCategoryItem">
                          <span>金毛寻回犬</span>
                      </li>
                      <li class="HotCategoryItem">
                          <span>阿拉斯加雪橇犬</span>
                      </li>
                  </ul>
              </div>
              <div class="CategoryEnList">
                  <p class="FirstEn">A</p>
                  <ul class="ul_Category">
                      <li class="CategoryItem">
                          <span>西伯利亚狼</span>
                          <img src="static/image/yes.png">
                      </li>
                      <li class="CategoryItem">
                          <span>金毛寻回犬</span>
                          <img src="static/image/yes.png">
                      </li>
                      <li class="CategoryItem">
                          <span>阿拉斯加雪橇犬</span>
                          <img src="static/image/yes.png">
                      </li>
                  </ul>
              </div>
              <div class="CategoryEnList">
                  <p class="FirstEn">B</p>
                  <ul class="ul_Category">
                      <li class="CategoryItem">
                          <span>西伯利亚狼</span>
                          <img src="static/image/yes.png">
                      </li>
                      <li class="CategoryItem">
                          <span>金毛寻回犬</span>
                          <img src="static/image/yes.png">
                      </li>
                      <li class="CategoryItem">
                          <span>阿拉斯加雪橇犬</span>
                          <img src="static/image/yes.png">
                      </li>
                  </ul>
              </div>
              <div class="CategoryEnList">
                  <p class="FirstEn">C</p>
                  <ul class="ul_Category">
                      <li class="CategoryItem">
                          <span>西伯利亚狼</span>
                          <img src="static/image/yes.png">
                      </li>
                      <li class="CategoryItem">
                          <span>金毛寻回犬</span>
                          <img src="static/image/yes.png">
                      </li>
                      <li class="CategoryItem">
                          <span>阿拉斯加雪橇犬</span>
                          <img src="static/image/yes.png">
                      </li>
                  </ul>
              </div>
              <div class="CategoryEnList">
                  <p class="FirstEn">D</p>
                  <ul class="ul_Category">
                      <li class="CategoryItem">
                          <span>西伯利亚狼</span>
                          <img src="static/image/yes.png">
                      </li>
                      <li class="CategoryItem">
                          <span>金毛寻回犬</span>
                          <img src="static/image/yes.png">
                      </li>
                      <li class="CategoryItem">
                          <span>阿拉斯加雪橇犬</span>
                          <img src="static/image/yes.png">
                      </li>
                  </ul>
              </div>
            </div>
          </swiper-item>
          <swiper-item>
            <div class="SwiperCategory" id="CatSwiperCategory">
              <div class="CategoryEnList">
                  <p class="FirstEn">热门</p>
                  <ul class="ul_HotCategory">
                      <li class="HotCategoryItem">
                          <span>西伯利亚狼</span>
                      </li>
                      <li class="HotCategoryItem">
                          <span>金毛寻回犬</span>
                      </li>
                      <li class="HotCategoryItem">
                          <span>阿拉斯加雪橇犬</span>
                      </li>
                      <li class="HotCategoryItem">
                          <span>西伯利亚狼</span>
                      </li>
                      <li class="HotCategoryItem">
                          <span>金毛寻回犬</span>
                      </li>
                      <li class="HotCategoryItem">
                          <span>阿拉斯加雪橇犬</span>
                      </li>
                      <li class="HotCategoryItem">
                          <span>西伯利亚狼</span>
                      </li>
                      <li class="HotCategoryItem">
                          <span>金毛寻回犬</span>
                      </li>
                      <li class="HotCategoryItem">
                          <span>阿拉斯加雪橇犬</span>
                      </li>
                  </ul>
              </div>
              <div class="CategoryEnList">
                  <p class="FirstEn">A</p>
                  <ul class="ul_Category">
                      <li class="CategoryItem">
                          <span>西伯利亚狼</span>
                          <img src="static/image/yes.png">
                      </li>
                      <li class="CategoryItem">
                          <span>金毛寻回犬</span>
                          <img src="static/image/yes.png">
                      </li>
                      <li class="CategoryItem">
                          <span>阿拉斯加雪橇犬</span>
                          <img src="static/image/yes.png">
                      </li>
                  </ul>
              </div>
              <div class="CategoryEnList">
                  <p class="FirstEn">B</p>
                  <ul class="ul_Category">
                      <li class="CategoryItem">
                          <span>西伯利亚狼</span>
                          <img src="static/image/yes.png">
                      </li>
                      <li class="CategoryItem">
                          <span>金毛寻回犬</span>
                          <img src="static/image/yes.png">
                      </li>
                      <li class="CategoryItem">
                          <span>阿拉斯加雪橇犬</span>
                          <img src="static/image/yes.png">
                      </li>
                  </ul>
              </div>
              <div class="CategoryEnList">
                  <p class="FirstEn">C</p>
                  <ul class="ul_Category">
                      <li class="CategoryItem">
                          <span>西伯利亚狼</span>
                          <img src="static/image/yes.png">
                      </li>
                      <li class="CategoryItem">
                          <span>金毛寻回犬</span>
                          <img src="static/image/yes.png">
                      </li>
                      <li class="CategoryItem">
                          <span>阿拉斯加雪橇犬</span>
                          <img src="static/image/yes.png">
                      </li>
                  </ul>
              </div>
            </div>
          </swiper-item>
        </swiper>
      </div>
    </scroller>
  </div>
</div>
</template>

<script>
import axios from 'axios'
import {mapState, mapMutations} from 'vuex'
import headTop from '@/components/Head.vue'
import { Scroller,Swiper,SwiperItem, } from 'vux'
import selectpackage from '@/page/petservice/components/selectpackage.vue'
import {AddLoveShowPhotos} from '@/service/getdata'
import {convertBase64UrlToBlob,getBase64Image} from '@/config/mUtils'

export default {
    components: {
      headTop,
      Scroller,
      selectpackage,
      Swiper,
      SwiperItem,
    },
    data () {
      return {
        msg: 'Hello World!',
        Title:'宠物品种',
        Color:0,
        MidType:1,
        EditBtn:true,
        ActegoryActiveIndex:0,
      }
    },
    // beforeRouteEnter (to, from, next) {

    // },
    beforeCreate(){
      
    },
    created(){
      if(this.userInfo==null){
        console.log("去登录");
        this.$router.replace('/loginIndex');
      }
    },
    mounted(){
      this.initHeadHeight();
    },
    destroyed(){

    },
    computed: {
      ...mapState([
                'PackageCartList','userInfo','StatusbarHeight','StatusbarHeightRem',
            ]),
    },
    props:[],
    methods: {
      ...mapMutations([
                'UPDATE_PACKAGECART',
            ]),
      initHeadHeight(){
        if(this.$refs.Middle)
        {
          console.log("top"+this.$refs.Middle.offsetTop);
          this.$refs.Middle.style.top=(1.5+this.StatusbarHeightRem)*window.screen.width / 10+"px";
        }
      },
      SelectCategorySwiper(index){
        this.ActegoryActiveIndex=index;
      },
      ActegorySwiperChange(index){
        this.ActegoryActiveIndex=index;
        var nextH;
        if(index==0)
        {
          nextH=document.getElementById('DogSwiperCategory').offsetHeight;
        }
        else
        {
          nextH=document.getElementById('CatSwiperCategory').offsetHeight;
        }
        this.$refs.swiperCategory.xheight=nextH+"px";
      },
      CateUpdateHeight(e){
        console.log("0000");
        var h=document.getElementById('DogSwiperCategory').offsetHeight;
        this.$nextTick(()=>{
          this.$refs.swiperCategory.xheight=h+"px";
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
      z-index: 200;
          p, span{
              font-family: Helvetica Neue,Tahoma,Arial;
          }
  }
  .ps_serach{height:1.2rem;width:10rem;padding:0rem 0.2rem 0rem 0.5rem;background-color:#fff;display:flex;align-items:center;
    .ps_divserach{width:100%;height:1rem;border-radius:0.2rem;background-color:#f7f7ff;
      img{height:1rem;width:1rem;float:left;padding:0.2rem;box-sizing: border-box;}
      input{width:8rem;height:1rem;padding:0rem;margin:0rem;float:left;border:none;color:#e0e0e0;background-color:#f7f7ff;font-size:13px;}
    }
  }
  .ps_topcate{width:10rem;height:1.2rem;background-color:#fff;margin-top:0.2rem;margin-bottom:0.1rem;
    .ps_ulcate{height:1.2rem;width:100%;list-style:none;display:flex;
      li{height:1.2rem;float:left;line-height:1.2rem;font-size:15px;color:#000;box-sizing:padding-box;border-bottom:solid 0.1rem #fff;text-align:center;flex:1;
        &.active{border-bottom:solid 2px #f6443c;color:#f6443c;}
      }
    }
  }
  .Middle{
      position:absolute;top:1.5rem;left:0rem;bottom:0rem;width:100%;
      .CategoryEnList{
        width:10rem;overflow:hidden;background-color:#fff;
        .FirstEn{
            width:100%;height:0.8rem;padding-left:0.4rem;line-height:0.8rem;font-size:0.4rem;background:#f2f3f4;margin:0rem;color:#000;
        }
        .ul_Category{
          width:100%;list-style:none;overflow:hidden;
          .CategoryItem{
            width:100%;height:1.28rem;display:flex;align-items:center;box-sizing:border-box;border-bottom:solid 0.5px #f2f3f4;padding:0px 0.7rem;
            justify-content:space-between;
            span{line-height:1.28rem;font-size:0.36rem;width:5.5rem;}
            img{width:0.4rem;height:0.4rem;}
          }
          .CategoryItem.active{
            width:100%;height:1.28rem;display:flex;align-items:center;box-sizing:border-box;border-bottom:solid 0.5px #f2f3f4;padding-left:0.7rem;
            span{line-height:1.28rem;font-size:0.36rem;width:5.5rem;color:#f44236;}
            img{width:0.4rem;height:0.4rem;}
          }
        }
        .ul_HotCategory{
          width:9.3rem;list-style:none;overflow:hidden;margin:0px auto;
          .HotCategoryItem{
            width:3.1rem;height:1rem;float:left;border:1px solid #eee;line-height:1rem;text-align:center;font-size:14px;color:#444444;
          }
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
