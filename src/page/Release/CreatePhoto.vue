<template>
<div class="rating_page">
  <head-top :Title="Title" :Color="Color" :MidType="MidType">
      <div slot="right" class="rightSpanEdit">
        <span>发表</span>
      </div>
  </head-top>
  <div class="Middle">
    <scroller ref="scroller" lock-x height="-56" scrollbar-y>
        <div>
        <div class="BigPhotoContent">
            <textarea name="" id="" cols="30" rows="10" placeholder="讲述我和他们的故事">

            </textarea>
            <ul class="ul_Photos">
              <li class="PhotoItem" v-for="(item,index) in SelectPhotos">
                <img :src="item" class="Photo" alt="">
                <img src="static/image/png/photodelete.png" alt="" class="Delete" @click="CancelImgItem(index)">
              </li>
              <li class="AddItem PhotoItem" @click="TaggleSelectShow()">
                <img src="static/image/png/addphoto.png" alt="">
              </li>
            </ul>
        </div>

        <ul class="ul_Middle">
          <li class="CategoryItem">
            <div class="Left"><img src="static/image/png/node.png" alt=""></div>
            <div class="Middle2"><span>所在位置</span><span>杭州印象城购物中心</span></div>
            <div class="Right"><img src="static/image/png/xiangyou.png" alt=""></div>
          </li>
          <li class="CategoryItem">
            <div class="Left"><img src="static/image/png/category.png" alt=""></div>
            <div class="Middle2"><span>发布到频道</span></div>
            <div class="Right"><img src="static/image/png/xiangyou.png" alt=""></div>
          </li>
          <li class="CategoryItem">
            <div class="Left"><img src="static/image/png/book.png" alt=""></div>
            <div class="Middle2"><span>添加到宠物故事</span><span>不添加</span></div>
            <div class="Right"><img src="static/image/png/xiangyou.png" alt=""></div>
          </li>
        </ul>

        <div class="bottom">
          <div class="lf"><span>分享到</span></div>
          <ul class="ulShare">
            <li class="ShareItem">
              <img src="static/image/png/qq.png" alt="">
            </li>
            <li class="ShareItem">
              <img src="static/image/png/weixin.png" alt="">
            </li>
            <li class="ShareItem">
              <img src="static/image/png/weibo.png" alt="">
            </li>
          </ul>
          <div class="rt"></div>
        </div>

        </div>
      </scroller>
  </div>

<div class="zhe" v-show="SelectShow" @click="TaggleSelectShow()"></div>
<transition name="fade">
  <ul class="SelectModel" v-show="SelectShow">
    <li class="SelectItem" @click="galleryImg()">
      <span>从手机相册中选择</span>
    </li>
    <li class="SelectItem">
      <span>精美配图</span>
    </li>
    <li class="SelectItem" @click="getCamera()">
      <span>拍照</span>
    </li>
    <li class="SelectCancel" @click="TaggleSelectShow()">
      <span>取消</span>
    </li>
  </ul>
</transition>
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
        Title:'添加动态',
        Color:0,
        MidType:1,
        EditBtn:true,
        SelectShow:false,
        SelectPhotos:['static/image/user1.jpg','static/image/user2.jpg','static/image/user3.jpg','static/image/user1.jpg','static/image/user2.jpg','static/image/user3.jpg'],
      }
    },
    mounted(){

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
      TaggleSelectShow(){
        this.SelectShow=!this.SelectShow;
      },
      getCamera(){
        var cr=plus.camera.getCamera(1);
        cr.captureImage(function( path ){
          // this.SelectPhotos.push()
          alert( "Capture video success: " + path );  
        },
        function( error ) {
          alert( "Capture video failed: " + error.message );
        });
      },
      CancelImgItem(index){//删除一个图片选项
        this.SelectPhotos.splice(index,1);
      },
      galleryImg(){
        plus.gallery.pick( function(e){
          for(var i in e.files){
            this.SelectPhotos=e.files;
            console.log(e.files[i]);
          }
        }, function (e){
          console.log( "取消选择图片" );
        },{filter:"image",multiple:true,selected:this.SelectPhotos,maximum:9,system:false});
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
    position:absolute;top:1.5rem;left:0rem;bottom:0rem;width:100%;
    .BigPhotoContent{
      width:100%;min-height:6rem;border-top:solid 1px #dfdfdf;border-bottom:solid 1px #dfdfdf;background:#fbfbfc;padding:0.25rem;
      textarea{
        width:100%;height:3.5rem;border:none;padding:0rem;margin:0rem;background:#fbfbfc;font-size: 0.4rem;color:#c9c9c9;
      }
      .ul_Photos{
        width:100%;list-style:none;overflow:hidden;
        .PhotoItem{
          width:1.7rem;height:1.7rem;float:left;margin:0.1rem;position:relative;margin-top:0.1rem;
          img.Photo{width:1.7rem;height:1.7rem;}
          img.Delete{width:0.5rem;height:0.5rem;position:absolute;top:0rem;right:0rem;background:#fff;border-radius:0.25rem;}
          &.AddItem{
            border:solid 1px #c9c9c9;display:flex;align-items:center;justify-content:center;
            img{width:0.8rem;height:0.8rem;}
          }
        }
      }
    }
    .ul_Middle{
      width:100%;list-style:none;margin-top:0.3rem;background:#fbfbfc;
      .CategoryItem{
        width:100%;height:1.3rem;border-top:solid 1px #dfdfdf;display:flex;justify-content:center;
        .Left{width:1.3rem;height:1.3rem;display:flex;align-items:center;justify-content:center;
          img{width:0.6rem;height:0.6rem;}
        }
        .Middle2{width:7.4rem;height:1.3rem;display:flex;align-items:center;justify-content:space-between;
          span{font-size:0.42rem;color:#5a5a62;}
        }
        .Right{width:1.3rem;height:1.3rem;display:flex;align-items:center;justify-content:center;
          img{width:0.5rem;height:0.5rem;}
        }
      }
    }
    .bottom{
      width:100%;height:1.5rem;display:flex;align-items:center;justify-content:center;background:#f9f9fa;border-top:solid 1px #dfdfdf;
      .lf{width:2.3rem;height:100%;display:flex;align-items:center;justify-content:center;
        span{font-size:0.47rem;}
      }
      .ulShare{
        width:5rem;height:100%;list-style:none;display:flex;justify-content:flex-start;
        .ShareItem{width:1.2rem;height:100%;display:flex;align-items:center;justify-content:center;
          img{width:0.6rem;height:0.6rem;}
        }
      }
      .rt{width:2.7rem;height:100%;}
    }
}

.zhe{position:absolute;width:100%;height:100%;top:0rem;left:0rem;z-index:98;background-color: rgba(0,0,0,0.7);}
.SelectModel{
  width:100%;list-style:none;position:absolute;left:0rem;bottom:0rem;background:#e5e3e4;z-index:99;
  .SelectItem{
    width:100%;height:1.4rem;display:flex;align-items:center;justify-content:center;background:#ffffff;border-bottom:solid 1px #e5e3e4;
    span{font-size:0.5rem;}
  }
  .SelectCancel{
    width:100%;height:1.4rem;display:flex;align-items:center;justify-content:center;background:#ffffff;margin-top:0.2rem;
    span{font-size:0.5rem;}
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
