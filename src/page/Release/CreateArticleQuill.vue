<template>
<div class="rating_page">
  <head-top :Title="Title" :Color="Color" :MidType="MidType">
      <div slot="right" class="rightSpanEdit" @click="TaggleArticleNextOperationShow()">
        <img src="static/image/Bdian2.png">
      </div>
  </head-top>
  <div class="Middle" ref="mainWrapper">
<!--     <scroller ref="scroller" lock-x height="-54" scrollbar-y> -->
      <div>
        <div class="BigArticle">
          <div class="ArticleCove">
            <div v-show="!ArticleCove" class="NoSelect" @click="SelectCoverImage()"> 
              <img v-if="!ArticleCove" src="static/image/png/addphoto.png" alt="">
              <span >添加封面</span>
            </div>
            <div v-show="ArticleCove" class="HasSelect">
              <img v-if="ArticleCove" :src="ArticleCove" alt="" v-ImgEdit="{ width:9.6,height:5.5 }">
              <img src="static/image/changecover.png" class="changecover" alt="" @click="SelectCoverImage()">
              <img src="static/image/png/cuo.png" class="clearcover" alt="" @click="ClearArticleCover()">
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
        <quill-editor 
                  v-model="content"
                  :class="'needsclick'" 
                  ref="myQuillEditor" 
                  :options="editorOption" 
                  @blur="onEditorBlur($event)" @focus="onEditorFocus($event)"
                  @change="onEditorChange($event)">
        </quill-editor>
      </div>
    <!-- </scroller> -->
  </div>
  <div class="zhe" v-show="SelectShow" @click="TaggleSelectShow()"></div>
  <transition name="fade">
    <ul class="SelectModel" v-show="SelectShow">
      <li class="SelectItem" @click="ImageCompress()">
        <span>从手机相册中选择</span>
      </li>
      <li class="SelectItem">
        <span>拍照/摄像</span>
      </li>
      <li class="SelectItem">
        <span>链接地址</span>
      </li>
      <li class="SelectCancel" @click="TaggleSelectShow()">
        <span>取消</span>
      </li>
    </ul>
  </transition>
  <div class="zhe" v-show="ArticleNextOperationShow" @click="TaggleArticleNextOperationShow()"></div>
  <transition name="fade">
    <ul class="SelectModel" v-show="ArticleNextOperationShow">
      <li class="SelectItem" @click="PreviewArticle()">
        <span>预览</span>
      </li>
      <li class="SelectItem" @click="CompleteCreate()">
        <span>发布</span>
      </li>
      <li class="SelectItem">
        <span>保存</span>
      </li>
      <li class="SelectCancel" @click="TaggleArticleNextOperationShow()">
        <span>取消</span>
      </li>
    </ul>
  </transition>
  <transition name="fade">  
    <div class="croppertest" v-if="imagecroppershow&&option.img">
      <vueCropper
        ref="cropper"
        :img="option.img"
        :outputSize="option.size"
        :outputType="option.outputType"
        :info="true"
        :full="option.full"
        :canMove="option.canMove"
        :canMoveBox="option.canMoveBox"
        :fixedBox="option.fixedBox"
        :original="option.original"
        :autoCrop="option.autoCrop"
        :autoCropWidth="option.autoCropWidth"
        :autoCropHeight="option.autoCropHeight"
        :centerBox="option.centerBox"
        :high="option.high"
        :infoTrue="option.infoTrue"
        :enlarge="option.enlarge"
      ></vueCropper>
      <div class="EditButton">
        <img src="static/image/tccj.png" alt="" @click="closecropper()">
        <img src="static/image/fdcj.png" alt="" @click="changeScale(1)">
        <img src="static/image/sxcj.png" alt="" @click="changeScale(-1)">
        <img src="static/image/leftxz.png" alt="" @click="rotateLeft()">
        <img src="static/image/rightxz.png" alt="" @click="rotateRight()">
        <img src="static/image/duigou.png" alt="" @click="croppercomplete()">
      </div>  
    </div>
  </transition>
</div>
</template>

<script>
  import axios from 'axios'
  import lrz from 'lrz'
  import {mapState, mapMutations} from 'vuex'
  import headTop from '@/components/Head.vue'
  import { Scroller } from 'vux'
  import BScroll from 'better-scroll'
  import { quillEditor } from "vue-quill-editor"; //调用编辑器
  import { VueCropper } from "vue-cropper";
  import * as Quill from 'quill'    // 引入编辑器
  import 'quill/dist/quill.core.css';
  import 'quill/dist/quill.snow.css';
  import 'quill/dist/quill.bubble.css';
  import quillConfig from '@/common/quill-config.js'
  import {PostImages,AddMArticle} from '@/service/getdata'
  import {convertBase64UrlToBlob,getBase64Image,cropperBase64UrlToBlob} from '@/config/mUtils'

  export default {
      components: {
        headTop,
        Scroller,
        quillEditor,
        VueCropper
      },
      data () {
        return {
          msg: 'Hello World!',
          Title:'写点东西',
          Color:0,
          MidType:1,
          EditBtn:true,
          SelectShow:false,
          ArticleNextOperationShow:false,
          content: '', 
          width: 0, 
          height: 400,
          ArticleTitle:"",
          AarticleSubtitle:"",
          ArticleCove:null,
          SelectShow:false,
          editorOption: quillConfig,
          imagelist:["static/image/png/CreateArticle2.png","static/image/png/ALiPay.png"],
          bloblist:[],
          imagecompressstatus:false,
          imagecroppershow:false,
          option:{
            // img:null,
            img:'static/image/UserBJ.png',
            outputSize:1, //剪切后的图片质量（0.1-1）
            full: false,//输出原图比例截图 props名full
            outputType: 'png',//输出图片格式
            canMove: true,//能否拖动图片
            original: false,//上传图片是否显示原始宽高 (针对大图 可以铺满)
            canMoveBox: true,//能否拖动截图框 
            autoCrop: true,//是否自动生成截图框 
            autoCropWidth: window.screen.width,//自动生成截图框的宽度 
            autoCropHeight: window.screen.width/9.6*5.5,//自动生成截图框的高度 
            fixedBox: true,//截图框固定大小
            centerBox:true,//截图框是否限制在图片里(只有在自动生成截图框时才能生效)
            high:true,//是否根据dpr生成适合屏幕的高清图片
            infoTrue:true,//截图信息展示是否是真实的输出宽高
            enlarge:1,//是否按照截图框比例输出 默认为1
          }
        }
      },
      beforeCreate(){
        
      },
      created(){
        // console.log("created")
        // if(this.userInfo==null){
        //   console.log("去登录");
        //   this.$router.replace('/loginIndex');
        // }
        // else
        // {
        //   console.log("已登录");
        // }
        // this.$nextTick(()=>{
        //   console.log("143444");
        //   this._initScroll();
        // })
      },
      mounted() {
          this.initHeadHeight();
          this._initScroll();
          // 为图片ICON绑定事件  getModule 为编辑器的内部属性
          this.$refs.myQuillEditor.quill.getModule('toolbar').addHandler('image', this.imgHandler);
          this.editor.container.style.minHeight = `${this.height}px`;
         // this.ImageCompress();
      },
      destroyed(){

      },
      computed: {
        ...mapState([
                  'PackageCartList','CreateArticleTest','userInfo','StatusbarHeight','StatusbarHeightRem',
              ]),
        editor () {
          return this.$refs.myQuillEditor.quill
        },
        editorheight(){
          return document.body.clientHeight-(document.body.clientWidth/10*9.2)-45;
        },
        MArticleModel(){
          return{
            MArticleID:1,
            MArticleTitle:this.ArticleTitle,
            MArticleSubTitle:this.AarticleSubtitle,
            MArticleCoverImage:'',
            MArticleContent:this.content,
            MArticleOrigin:1,//1代表用户发布，0代表管理者发布
            CreateUserID:1,
            MArticleCategory:1,
          }
        },
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
        initHeadHeight(){
          if(this.$refs.Middle)
          {
            console.log("top"+this.$refs.Middle.offsetTop);
            this.$refs.Middle.style.top=(1.5+this.StatusbarHeightRem)*window.screen.width / 10+"px";
          }
        },
        _initScroll(){
            this.mainScroll=new BScroll(this.$refs.mainWrapper,{
            // click: true,
            // bounce: false,
            scrollbar: true,
            preventDefault: false,
            tap: true,
            mouseWheel: true
        });
        },
        async CompleteCreate(){
          var Articlemodel=this.ArticleTesting();
          if(Articlemodel.status)
          {
            lrz(this.ArticleCove,{
                width: 1600,
                height: 1600,
                quality: 0.2
            }).then((rst) => {
                console.log(rst.file);
                var fd=new FormData();
                var ImageCategory="0";//代表封面图片类型
                fd.append('ImageCategory',ImageCategory);
                fd.append('file',rst.file);
                PostImages(fd).then(response=>{
                  console.log(response[0]);
                  this.MArticleModel.MArticleCoverImage=response[0];
                  AddMArticle(this.MArticleModel).then(response=>{
                    console.log(response);
                  })
            });
            }).catch((err) => {
                console.log("压缩出现异常");
                console.log(err);
            });
          }
          else{
            this.TaggleArticleNextOperationShow();
            this.$vux.toast.text(Articlemodel.message,'bottom');
          }
        },
        PreviewArticle(){
          var Articlemodel=this.ArticleTesting();
          if(Articlemodel.status)
          {
            var Data={
              "ArticleTitle":this.ArticleTitle,
              "AarticleSubtitle":this.AarticleSubtitle,
              "ArticleCove":this.ArticleCove,
              "content":this.content,
            }
            console.log(Data);
            this.$store.state.CreateArticleTest=Data;
            this.TaggleArticleNextOperationShow();
            this.$router.push('/articleview');
          }
          else{
            this.TaggleArticleNextOperationShow();
            this.$vux.toast.text(Articlemodel.message,'bottom');
          }
        },
        ArticleTesting(){
          if(!this.ArticleCove){
            return{status:false,message:"请选择封面图"};
          }else if(this.ArticleTitle.length<1||this.AarticleSubtitle.length<1||this.ArticleTitle.length<1){
            return{status:false,message:"请输入相关标题和内容"};
          }else if(this.ArticleTitle.length>10||this.AarticleSubtitle.length>10){
            return{status:false,message:"标题或子标题不能超过10个字符"};
          }else{
            return{status:true};
          }
        },
        TaggleArticleNextOperationShow(){
          this.ArticleNextOperationShow=!this.ArticleNextOperationShow;
        },
        TaggleSelectShow(){
          this.SelectShow=!this.SelectShow;
        },
        InsertIMG(files){
          // plus.gallery.pick((e)=>{
          //   this.$refs.myQuillEditor.quill.focus();
          //   for(var i=0;i<e.files.length;i++){
          //     console.log(e.files[i]);
          //     this.addRange = this.$refs.myQuillEditor.quill.getSelection();
          //     console.log(this.addRange);
          //     console.log(this.addRange.index);
          //     let src="file:///storage/emulated/0/youku/YoukuScreenShot/Danmaku-share.png";
          //     this.$refs.myQuillEditor.quill.insertEmbed(this.addRange !== null ? this.addRange.index : 0, 'image',src, Quill.sources.silent);
          //     this.$refs.myQuillEditor.quill.setSelection(this.addRange !== null ? this.addRange.index+1: 0);
          //   }
          // },(e)=>{
          //   console.log( "取消选择图片" );
          // },{filter:"image",multiple:true,maximum:9,system:false});
          
          // this.addRange = this.$refs.myQuillEditor.quill.getSelection();
          // this.$refs.myQuillEditor.quill.insertEmbed(this.addRange !== null ? this.addRange.index : 0, 'image', 'http://www.joingp.com:8085/Images/萌宠秀图/799b1473239989.jpg', Quill.sources.USER);
          // this.$refs.myQuillEditor.quill.setSelection(this.addRange !== null ? this.addRange.index+1: 0);
          this.$refs.myQuillEditor.quill.focus();
          files.forEach((item,index)=>{
            console.log(item);
            this.addRange = this.$refs.myQuillEditor.quill.getSelection();
            console.log(this.addRange);
            console.log(this.addRange.index);
            let src="http://192.168.0.166:8085"+item;
            this.$refs.myQuillEditor.quill.insertEmbed(this.addRange !== null ? this.addRange.index : 0, 'image',src, Quill.sources.silent);
            this.$refs.myQuillEditor.quill.setSelection(this.addRange !== null ? this.addRange.index+1: 0);
          })
          this.TaggleSelectShow();
        },
        onEditorReady(editor) { // 准备编辑器
 
        },
        onEditorBlur(){}, // 失去焦点事件
        onEditorFocus(){}, // 获得焦点事件
        onEditorChange({ editor, html, text }) {

        }, // 内容改变事件
        imgHandler(){
          this.$refs.myQuillEditor.quill.blur();
          this.TaggleSelectShow();
        },
        SelectCoverImage(){
          this.imagecroppershow=true;//Web测试使用
          // plus.gallery.pick((path)=>{
          //   this.imagecroppershow=true;
          //   this.option.img=path;
          //   console.log(path);
          // },(e)=>{
          //   console.log( "取消选择图片" );
          // },{filter:"image",multiple:false,system:false});
        },
        async PublishLoveShow(){//发布动态
          var fd=new FormData();
          var ImageCategory="1";
          fd.append('ImageCategory',ImageCategory);
          console.log("好了");
          console.log(this.bloblist);
          this.bloblist.forEach((item,index)=>{
            console.log("wenjian")
            fd.append('file'+index,item)
          });
          PostImages(fd).then(response=>{
            console.log(response);
            this.bloblist=[];
            this.imagecompressstatus=false;
            this.InsertIMG(response);
          });
        },
        async ImageCompress(){
          var compressOkCount=0;
          // plus.gallery.pick((e)=>{
          //   e.files.forEach((item,index)=>{
          //   lrz(item,{
          //         width: 1600,
          //         height: 1600,
          //         quality: 0.3
          //     }).then((rst) => {
          //           console.log(rst.file);
          //           this.bloblist.push(rst.file);
          //           // console.log(index);
          //           // console.log(this.imagelist.length);
          //           compressOkCount+=1;
          //           if(compressOkCount>=e.files.length){
          //             console.log("全部完成");
          //             this.imagecompressstatus=true;
          //           };
          //   }).catch((err) => {
          //       console.log("压缩出现异常");
          //       console.log(err);
          //   })
          // });
          // },(e)=>{
          //   console.log( "取消选择图片" );
          // },{filter:"image",multiple:true,maximum:9,system:false});
          this.imagelist.forEach((item,index)=>{
            lrz(item,{
                  width: 1600,
                  height: 1600,
                  quality: 0.2
              }).then((rst) => {
                    console.log(rst.file);
                    this.bloblist.push(rst.file);
                    // console.log(index);
                    // console.log(this.imagelist.length);
                    compressOkCount+=1;
                    if(compressOkCount>=this.imagelist.length){
                      console.log("全部完成");
                      this.imagecompressstatus=true;
                    };
            }).catch((err) => {
                console.log("压缩出现异常");
                console.log(err);
            })
          });
        },
        closecropper(){
          this.imagecroppershow=false;
        },
        changeScale(num) { 
          console.log('changeScale')
          num = num || 1; 
          this.$refs.cropper.changeScale(num); 
        }, 
        //坐旋转
        rotateLeft() { 
          console.log('rotateLeft')
          this.$refs.cropper.rotateLeft(); 
        }, 
        //右旋转
        rotateRight() { 
          console.log('rotateRight')
          this.$refs.cropper.rotateRight(); 
        },
        croppercomplete(){
          this.$refs.cropper.getCropData((data) => { 
            this.ArticleCove=data;
          }) 
          this.imagecroppershow=false;
        },
        ClearArticleCover(){
          this.ArticleCove=null;
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
        imagecompressstatus:function(value){
          if(value){
            this.PublishLoveShow();
          }else{
            console.log("为false了");
          }
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
          .HasSelect{
            width:100%;height:5.5rem;overflow:hidden;position:relative;
            img{
              width:100%;
              &.changecover{
                width:1.2rem;position:absolute;right:0.2rem;bottom:0.2rem;
              }
              &.clearcover{
                width:0.6rem;position:absolute;right:0.2rem;top:0.2rem;
              }
            }
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
  .zhe{position:absolute;width:100%;height:100%;top:0rem;left:0rem;z-index:1002;background-color: rgba(0,0,0,0.7);}
  .SelectModel{
    width:100%;list-style:none;position:absolute;left:0rem;bottom:0rem;background:#e5e3e4;z-index:1003;
    .SelectItem{
      width:100%;height:1.4rem;display:flex;align-items:center;justify-content:center;background:#ffffff;border-bottom:solid 1px #e5e3e4;
      span{font-size:0.5rem;}
    }
    .SelectCancel{
      width:100%;height:1.4rem;display:flex;align-items:center;justify-content:center;background:#ffffff;margin-top:0.2rem;
      span{font-size:0.5rem;}
    }
  }
  .croppertest{
    width:100%;height:100%;position:absolute;top:0rem;left:0rem;z-index:1000;
    .EditButton{
      width:100%;height:2rem;position:absolute;bottom:0rem;left:0rem;display:flex;justify-content:space-around;align-items:center;
      img{
        width:1.2rem;
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
