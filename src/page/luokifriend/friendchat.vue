<template>
	<div class="rating_page">
    <div class="ShopHead" ref="HeadTop">
    <slot name="left">
       <div class="shopheadback" @click="$router.go(-1)">
         <img src="static/image/back.png">
       </div>
       </slot>
       <div class="shopheadmid1" ref="my_shopheadmid">
       <p>爱陌生时尚</p>
       </div>
       <div class="shopheadedit" ui-sref="zx_article" onclick="onback()">
       <img src="static/image/dian.png">
       </div>
      </div>

      <div class="Middle">
        <scroller ref="scroller" lock-x height="-57" scrollbar-y use-pulldown :use-pullup=true @on-pullup-loading="UpPagedade" @on-pulldown-loading="DownPageData" v-model="scrollerStaues">
          <div>

             <ul class="chat-thread"> 
               <li v-for="item in MessageInfo" :class="item.UserInfo.UserID==userInfo.UserID?'MyInfo':'OtherInfo'">
                  <div class="UserImg" v-if="item.UserInfo.UserID!=userInfo.UserID">
                    <img :src="imgBaseUrl2 + ToUserInfo.UserPhotos" alt="">
                  </div>
                 <div class="Message">
                    <span>{{item.Message}}</span>
                 </div>
                  <div class="UserImg" v-if="item.UserInfo.UserID==userInfo.UserID">
                    <img :src="imgBaseUrl2 + userInfo.UserPhotos" alt="">
                  </div>
               </li>

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

      <div class="Bottom">
        <div class="Voice ImgItem">
          <img src="static/image/png/Voice.png" alt="">
        </div>
        <div class="Input">
          <input type="text" v-model="MessageContent">
        </div>
        <div class="ImgItem">
          <img src="static/image/png/biaoqing.png" alt="">
        </div>
        <div class="ImgItem" v-show="!SendShow">
          <img src="static/image/png/addfile.png" alt="">
        </div>
        <div class="MessageSend" v-show="SendShow" @click="SendMessage()">
          <span>发送</span>
        </div>
      </div>
	</div>
</template>

<script>
import serviceshoplist from '@/page/petservice/components/serviceshoplist'
import {mapState, mapMutations} from 'vuex'
import axios from 'axios'
import { Swiper, Scroller, Spinner,SwiperItem,Tab, TabItem, } from 'vux'
import io from 'socket.io-client'
import {imgBaseUrl,socketBaseUrl} from '@/config/env'
import {GetUserInfoByUserID} from '@/service/getdata' 

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
        imgBaseUrl:imgBaseUrl, 
        imgBaseUrl2:"http://120.78.183.108", 
        index: 0,
        Swiper_index: 0,
        swiperHeight:0,
        InfoActiveIndex:0,
        swiperArticleHeight:0,
        MessageContent:"",
        ToUserInfo:null,
        MessageInfo:[],
      }
    },
    created(){
      this.GetToUserInfo();//获得私聊用户的信息
    },
    mounted(){
            this.socket=io.connect(socketBaseUrl);
            const obj={
              UserInfo:this.userInfo,
            }
            this.socket.emit('UserLogin',obj);
            this.socket.on('UserToUser',(data)=>{
              this.MessageInfo.push(data);
            });
    },
    computed: {
              ...mapState([
                    'PackageCartList','UserNode','UserSelectNode','userInfo'
                ]),
      SendShow:function(){
        if(this.MessageContent==""){
          return false;
        }
        else
        {
          return true;
        }
      }
    },
    destroyed(){
      console.log("退出");
      var obj="4567";
      this.socket.emit('Userdisconnect',obj);
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
      GetToUserInfo(){
        GetUserInfoByUserID(this.$route.query.userid).then(response=>{
          this.ToUserInfo=response;
          console.log(this.ToUserInfo.UserID+this.ToUserInfo.UserName);
        });
      },
      SendMessage(){
        const obj={
          UserInfo:this.userInfo,
          ToUserInfo:this.ToUserInfo,
          Message:this.MessageContent
        }
        this.socket.emit('UserToUser',obj);
        this.MessageContent="";
      },
      InfoSwiperChange(index){
        this.InfoActiveIndex=index;
        this.SlideChangeSwiperHeight(index);
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
     position:absolute;top:1.5rem;left:0rem;bottom:0rem;width:100%;background:#f3f3f3;
  }
.ShopHead{
  width:10rem;height:1.5rem;padding-top:0.5rem;position:fixed;left:0rem;top:0rem;z-index:99;box-sizing:border-box;
  .shopheadback{
    height:100%;width:1.5rem;text-align:center;padding:0.45rem 0.45rem;position:absolute;left:0rem;top:0rem;z-index:99;box-sizing:border-box;
    display:flex;justify-content:center;align-items:center;
    img{
      width:0.6rem;height:0.6rem;
    }
  }
  .shopheadmid1{
    width:10rem;height:100%;list-style:none;margin:0;padding: 0;text-align:center;position:absolute;top:0rem;left:0rem;background:#38dbb0;z-index:98;opacity:1;
    p{line-height:1.5rem;color:#fff;font-size:0.5rem;}
  }
  .shopheadmid2{
    width:10rem;height:100%;list-style:none;margin:0;padding: 0;text-align:center;position:absolute;top:0rem;left:0rem;background:#fff;z-index:98;opacity:1;
    p{line-height:1.5rem;color:#000;font-size:0.5rem;}
  }
  .shopheadedit{
    width:1.5rem;height:100%;color:#38dbb0;padding:0.45rem 0.45rem;position:absolute;top:0rem;right:0rem;z-index:99;box-sizing:border-box;
    display:flex;justify-content:content;align-items:content;
    img{
      width:0.6rem;height:0.6rem;
    }
  }
}
.Bottom{
  position:fixed;bottom:0rem;left:0rem;width:10rem;height:1.3rem;background:#fff;display:flex;justify-content:space-between;align-items:center;
  .ImgItem{
    width:1rem;height:1.3rem;display:flex;justify-content:center;align-items:center;
    img{width:0.7rem;height:0.7rem;}
  }
  .MessageSend{
    width:1.3rem;height:1rem;background:#38dbb0;border-radius:0.1rem;display:flex;justify-content:center;align-items:center;
    span{
      color:#fff;font-size:0.5rem;
    }
  }
  .Input{
    width:6.5rem;height:1rem;border:solid 1px #ddd;border-radius:0.1rem;background:#f3f3f3;padding:0rem 0.2rem;
    input{
      padding:0rem;margin:0rem;border:none;font-size:0.4rem;background:none;
    }
  }
}
.AllMessage{
  list-style:none;width:100%;
  .MessageItem{
    width:100%;
    p{
      line-height:1rem;font-size:0.4rem;color:red;
    }
    &.MyInfo{
      display:flex;justify-content:flex-end;
    }
    &.OtherInfo{
      display:flex;justify-content:flex-star;
    }
  }
}

.chat-thread {margin:0.5rem auto 0 auto;padding: 0 0.2rem;list-style:none;overflow-y: scroll;overflow-x: hidden;}
.chat-thread li{
  display:flex;
  &.OtherInfo{justify-content:flex-star;}
  &.MyInfo{justify-content:flex-end;}
  .UserImg{
    width:1.5rem;height:1.5rem;display:flex;align-items:center;justify-content:center;
  }
  img{
    width:1.2rem;height:1.2rem;border-radius:0.6rem;overflow:hidden;
  }
}
.chat-thread li{
  &.OtherInfo{
    div.Message{position:relative;clear:both;display: inline-block;padding:0.3rem;margin:0.2rem 0rem;font: 16px/20px 'Noto Sans', sans-serif;border-radius: 10px;background-color:#fff;max-width:6rem;
        span{
          color:#000;
        }
    }
  }
  &.MyInfo{
    div.Message{position:relative;clear:both;display: inline-block;padding:0.3rem;margin:0.2rem 0rem;font: 16px/20px 'Noto Sans', sans-serif;border-radius: 10px;background-color: rgba(25, 147, 147, 0.2);max-width:6rem;
        span{
          color:#fff;
        }
     }
  }
}
.chat-thread li.MyInfo div.Message:after {position: absolute;top: 0.3rem;content: '';width: 0;height: 0;border-top: 0.4rem solid rgba(25, 147, 147, 0.2);}
.chat-thread li.OtherInfo div.Message:after {position: absolute;top: 0.3rem;content: '';width: 0;height: 0;border-top: 0.4rem solid #fff;}
.chat-thread li.MyInfo div.Message{animation: show-chat-odd 0.15s 1 ease-in;-moz-animation: show-chat-odd 0.15s 1 ease-in;-webkit-animation: show-chat-odd 0.15s 1 ease-in;float: right;color: #0AD5C1; margin-right:0.3rem;}
.chat-thread li.MyInfo div.Message:after {border-right: 0.4rem solid transparent;right: -0.4rem;}
.chat-thread li.OtherInfo div.Message{animation: show-chat-even 0.15s 1 ease-in;-moz-animation: show-chat-even 0.15s 1 ease-in;-webkit-animation: show-chat-even 0.15s 1 ease-in;float: left;color: #0EC879;margin-left:0.3rem;}
.chat-thread li.OtherInfo div.Message:after {border-left: 0.4rem solid transparent;left: -0.4rem;}
</style>