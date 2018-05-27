<template>
<div class="rating_page">
  <head-top :Title="Title" :Color="Color" :MidType="MidType">
      <div slot="right" class="rightSpanEdit" @click="CompleteCreate()">
        <span>发表</span>
      </div>
  </head-top>
  <div class="Middle">
  <div class="BigArticle">
    <div class="ArticleCove">
      <div class="NoSelect">
        <img src="static/image/png/addphoto.png" alt="">
        <span>添加封面</span>
      </div>
    </div>
    <ul class="ul_Title">
      <li class="li_Title">
        <input type="text" class="BigTitle" v-model="ArticleTitle" placeholder="标题">
      </li>
      <li class="li_Title">
        <input type="text" class="SmallTitle" v-model="AarticleSubtitle" placeholder="副标题">
      </li>
    </ul>
    <div class="line"></div>
  </div>
  <div class="ContentTitle">
    <img src="static/image/png/CreateArticle2.png" alt="">
    <span>正文编辑</span>
  </div>
  <vue-html5-editor :content="content" :height="height" :style="{width:'100%'}"
                      @change="updateData"></vue-html5-editor>
  </div>



</div>
</template>

<script>
  import axios from 'axios'
  import {mapState, mapMutations} from 'vuex'
  import headTop from '@/components/Head.vue'
  import { Scroller } from 'vux'
  import selectpackage from '@/page/petservice/components/selectpackage.vue'

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
          content: '请输入文章内容', 
          width: 0, 
          height: 300,
          ArticleTitle:"",
          AarticleSubtitle:"",
          ArticleCove:"static/image/Slides1.jpg",
        }
      },
      mounted(){

      },
      destroyed(){

      },
      computed: {
        ...mapState([
                  'PackageCartList','CreateArticleTest'
              ]),
      },
      props:[],
      methods: {
        ...mapMutations([
                  'UPDATE_PACKAGECART',
              ]),
        updateData(e = ''){
          let c1 = e.replace(/<img width="100%"/g, '<img');
          let c2 = c1.replace(/<img/g, '<img width="100%"');
          this.content = c2;
          // console.log(this.content);
        },
        CompleteCreate(){
          var Data={
            "ArticleTitle":this.ArticleTitle,
            "AarticleSubtitle":this.AarticleSubtitle,
            "ArticleCove":this.ArticleCove,
            "content":this.content,
          }
          console.log(Data);
          this.$store.state.CreateArticleTest=Data;
          this.$router.push('/articleview');
        },
      },
      directives: {
        ImgEdit: {//图片显示按长宽等比居中显示的指令方法
          // 指令的定义
          inserted: function (el,binding) {
            var image=new Image();
            image.src=el.src; //获取图像路径
            var width1=image.width; //获取图像宽度
            var height1=image.height; //获取图像高度
            var RequestW=binding.value.width/10*window.screen.width;
            var RequestH=binding.value.height/10*window.screen.width;
            console.log(window.screen.width);
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
          }
        }
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
    position:absolute;top:1.5rem;left:0rem;bottom:0rem;width:100%;background:#fbfbfc;
    .BigArticle{
      width:100%;padding: 0.2rem;background:#fff;margin-top:0.1rem;
      .ArticleCove{
        width:100%;min-height:3.5rem;border:dotted 2px #eeeeee;
        .NoSelect{
          width:100%;height:3.5rem;display:flex;justify-content:center;align-items:center;
          img{width:0.6rem;height:0.6rem;}
          span{margin-left:0.2rem;line-height:0.7rem;font-size:0.5rem;color:#bfbfbf;}
        }
      }
      .ul_Title{
        width:100%;list-style:none;margin-top:0.2rem;background:none;
        .li_Title{
          width:100%;height:1rem;background:none;
          .BigTitle{
            border:none;padding:0rem;margin:0rem;width:100%;height:0.8rem;line-height:1rem;font-size:0.6rem;color:#b0b0b0;background:none;
          }
          .SmallTitle{
            border:none;padding:0rem;margin:0rem;width:100%;height:0.8rem;line-height:1rem;font-size:0.5rem;color:#b0b0b0;background:none;
          }
        }
      }
      .line{width:100%;height:1px;background:#eeeeee;margin-top:0.2rem;}
    }
    .ContentTitle{
      width:100%;height:2rem;display:flex;justify-content:center;align-items:center;background:#fff;
      img{width:0.7rem;height:0.7rem;}
      span{margin-left:0.2rem;line-height:0.7rem;font-size:0.5rem;color:#bfbfbf;}
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
