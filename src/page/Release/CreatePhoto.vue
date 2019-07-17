<template>
<div class="rating_page">
  <head-top :Title="Title" :Color="Color" :MidType="MidType">
      <div slot="right" class="rightSpanEdit" @click="PublishLoveShow">
        <span>发表</span>
      </div>
  </head-top>
  <div class="Middle" ref="Middle">
    <scroller ref="scroller" lock-x height="-56" scrollbar-y>
        <div>
        <div class="BigPhotoContent">
            <textarea name="" id="" cols="30" v-model="LoveShowPhotoContent" rows="10" placeholder="讲述我和他们的故事">

            </textarea>
            <ul class="ul_Photos">
              <li class="PhotoItem" v-for="(item,index) in AllSelectImg">
                <img :src="item.url" class="Photo" alt="" v-ImgEdit="{ width: 1.7, height: 1.7 }">
                <img src="static/image/png/photodelete.png" alt="" class="Delete" @click="CancelImgItem(item)">
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
import {AddLoveShowPhotos} from '@/service/getdata'
import {convertBase64UrlToBlob,getBase64Image} from '@/config/mUtils'
import Lyric from 'lyric-parser'

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
        LoveShowPhotoContent:'',
        SelectPhotos:[{url:'static/image/user1.jpg',type:1},{url:'static/image/user2.jpg',type:1},{url:'static/image/user3.jpg',type:1},{url:'static/image/mmexport1533180160445.jpg',type:1}],
        // SelectPhotos:[],
        SelectCamera:[{url:'static/image/user4.jpeg',type:2},{url:'static/image/user5.jpeg',type:2}],
        plist:'12,34,56,78',
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
      AllSelectImg:function(){
        var arr=[];
        this.SelectPhotos.forEach((item)=>{
          arr.push(item);
        });
        this.SelectCamera.forEach((item2)=>{
          arr.push(item2);
        })
        return arr;
      }
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
      TaggleSelectShow(){
        this.SelectShow=!this.SelectShow;
      },
      fenge(val){
        var numberArray = val.split(",");
        return numberArray;
      },
      getCamera(){
        this.TaggleSelectShow();
        var cr=plus.camera.getCamera(1);
        cr.captureImage((path)=>{
          // let path2="file:///"+path;
          // this.SelectPhotos.push(path2);
          // alert( "Capture video success: " + path2 );  
          plus.io.resolveLocalFileSystemURL(path,(entry)=>{
            alert("真实路径："+entry.fullPath); 
            var Obj={url:entry.fullPath,type:2}
            this.SelectPhotos.push(Obj);
          },(e)=>{
            outLine('读取文件错误：'+e.message);
          } );
        },
        function( error ) {
          alert( "Capture video failed: " + error.message );
        });
      },
      CancelImgItem(item){//删除一个图片选项
        // this.SelectPhotos.splice(index,1);
        if(item.type==1)
        {
          console.log("类型1");
          var index = this.SelectPhotos.indexOf(item);
          console.log(index);
          this.SelectPhotos.splice(index, 1);
        }
        else if(item.type==2)
        {
          console.log("类型2");
          var index = this.SelectCamera.indexOf(item);
          console.log(index);
          this.SelectCamera.splice(index, 1);
        }
      },
      galleryImg(){
        this.TaggleSelectShow();
        plus.gallery.pick( (e)=>{
          for(var i in e.files){
            var Obj={url:e.files[i],type:1}
            this.SelectPhotos.push(Obj);
            console.log(e.files[i]);
          }
        },(e)=>{
          console.log( "取消选择图片" );
        },{filter:"image",multiple:true,selected:this.SelectPhotos,maximum:9,system:false});
      },
      async InitImg(imglist){
        var img = imglist;
        var list=[];
        img.forEach((item)=>{
          let image = new Image();
          image.crossOrigin = '';
          image.src = item.url;
          console.log(item.url);     
          image.onload =()=>{
            var base64 = getBase64Image(image);
            console.log(base64);
            var img2 = convertBase64UrlToBlob(base64);
            console.log(img2);
            list.push(img2);
            this.bloblist=list;
            console.log(this.bloblist)
          } 
        })
      },
      async PublishLoveShow(){//发布动态
        var fd=new FormData();
        var data={
          LspTitle:this.LoveShowPhotoContent,
          LspCreateUserID:this.userInfo.UserID
        }
        fd.append('LoveShowPhotos',JSON.stringify(data));
        console.log(this.bloblist)
        this.bloblist.forEach((item,index)=>{
          console.log("wenjian")
          fd.append('file'+index,item)
        });
        AddLoveShowPhotos(fd).then(response=>{
          console.log(response);
          this.$router.replace('/petshowIndex/petshowdetails/'+response.LoveShowPhotoID);
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
      AllSelectImg:function(value){
        console.log(value);
        this.InitImg(value);
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
            width:1.7rem;height:1.7rem;float:left;margin:0.1rem;position:relative;margin-top:0.1rem;overflow:hidden;
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
