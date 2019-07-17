<template>
  <div class="rating_page g-window">
    <div class="ShopHead" ref="HeadTop">
    <slot name="left">
       <div class="shopheadback" @click="$router.go(-1)">
         <img src="static/image/back.png">
       </div>
       </slot>
       <div class="shopheadmid1" ref="my_shopheadmid">
       <p>{{ToUserName}}</p>
       </div>
       <div class="shopheadedit" ui-sref="zx_article" onclick="onback()">
       <img src="static/image/dian.png">
       </div>
      </div>

      <div class="m-chat-main" ref="chatmain">
        <chat-list
          type="session"
          :msglist="msglist"
          :userInfos="userInfos"
          :myInfo="myInfo"
          :isRobot="isRobot"
          @msgs-loaded="msgsLoaded" ref="chatlist">
        </chat-list>
      </div>
        <chat-editor
          type="session"
          :scene="scene"
          :to="to"
          :isRobot="isRobot"
          :invalid="teamInvalid || muteInTeam"
          :invalidHint="sendInvalidHint"
          :advancedTeam="teamInfo && teamInfo.type === 'advanced'">
        </chat-editor>
  </div>
</template>

<script>
import {mapState, mapMutations} from 'vuex'
import axios from 'axios'
import { Swiper, Scroller, Spinner,SwiperItem,Tab, TabItem, } from 'vux'
import io from 'socket.io-client'
import {imgBaseUrl,socketBaseUrl} from '@/config/env'
import {GetUserInfoByUserID} from '@/service/getdata'
import util from '@/utils' 
import ChatList from '@/components/IMChat/ChatList'
import ChatEditor from '@/components/IMChat/ChatEditor'
import pageUtil from '@/utils/page'

export default {
    components: {
        Swiper,
        Scroller,
        Spinner,
        SwiperItem,
        Tab,
        TabItem,
        ChatList,
        ChatEditor,
    },
    data () {
      return {
        scrollerStaues: {
          pulldownStatus: 'default',
          pullupStatus: 'default'
        },
        scrollTimer:null,
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
        ToUserName:'',
      }
    },
    created(){

    },
    updated () {
      pageUtil.scrollChatListDown();
    },
    mounted(){
      this.InitToUserInfo();
      this.initHeadHeight();
      this.$store.dispatch('setCurrSession', this.sessionId);
    },
    computed: {
      ...mapState([
          'PackageCartList','UserNode','UserSelectNode','userInfo','StatusbarHeight','StatusbarHeightRem',
      ]),
      SendShow:function(){
        if(this.MessageContent==""){
          return false;
        }
        else
        {
          return true;
        }
      },
      sessionId () {
      let sessionId = this.$route.params.sessionId
      return sessionId
      },
      sessionName () {
        let sessionId = this.sessionId
        let user = null
        if (/^p2p-/.test(sessionId)) {
          user = sessionId.replace(/^p2p-/, '')
          if (user === this.$store.state.userUID) {
            return '我的手机'
          } else if (this.isRobot) {
            return this.robotInfos[user].nick
          } else {
            let userInfo = this.userInfos[user] || {}
            return util.getFriendAlias(userInfo)
          }
        } else if (/^team-/.test(sessionId)) {
          if (this.teamInfo) {
            // teamInfo中的人数为初始获取的值，在人员增减后不会及时更新，而teamMembers在人员增减后同步维护的人员信息
            var members = this.$store.state.teamMembers && this.$store.state.teamMembers[this.teamInfo.teamId]
            var memberCount = members && members.length
            return this.teamInfo.name + (memberCount ? `(${memberCount})` : '')
          } else {
            return  '群'
          }
        }
      },
      scene () {
        console.log("开始");
        console.log(util.parseSession(this.sessionId).scene);
        return util.parseSession(this.sessionId).scene
      },
      to () {
        return util.parseSession(this.sessionId).to
      },
      // 判断是否是机器人
      isRobot () {
        let sessionId = this.sessionId
        let user = null
        if (/^p2p-/.test(sessionId)) {
          user = sessionId.replace(/^p2p-/, '')
          if (this.robotInfos[user]) {
            return true
          }
        }
        return false
      },
      myInfo () {
        console.log("我的信息");
        console.log(this.$store.state.myInfo);
        return this.$store.state.myInfo
      },
      userInfos () {
        return this.$store.state.userInfos
      },
      robotInfos () {
        console.log("机器人");
        console.log(this.$store.state.robotInfos);
        return this.$store.state.robotInfos
      },
      msglist () {
        let msgs = this.$store.state.currSessionMsgs
        console.log("消息列表");
        console.log(msgs);
        return msgs
      },
      teamInfo() {
        if (this.scene==='team') {
          var teamId =  this.sessionId.replace('team-','')
          return this.$store.state.teamlist.find(team=>{
            return team.teamId === teamId
          })
        } 
        return undefined
      },
      muteInTeam(){
        if(this.scene!=='team') return false
        var teamMembers = this.$store.state.teamMembers 
        var Members = teamMembers && teamMembers[this.teamInfo.teamId]
        var selfInTeam = Members && Members.find(item=>{
          return item.account === this.$store.state.userUID
        })
        return selfInTeam && selfInTeam.mute || false
      },
      teamInvalid() {
        if (this.scene==='team') {
          return !(this.teamInfo && this.teamInfo.validToCurrentUser)
        }
        return false
      }, 
      sendInvalidHint() {
        if (this.scene==='team' && this.teamInvalid) {
          return `您已不在该${this.teamInfo && this.teamInfo.type==='normal'? '讨论组':'群'}，不能发送消息`
        } else if (this.muteInTeam) {
          return '您已被禁言'
        }
        return '无权限发送消息'
      }
    },
    destroyed(){

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
      initHeadHeight(){
          if(this.$refs.HeadTop)
          {
            this.$refs.HeadTop.style.height=(1.5+this.StatusbarHeightRem)*window.screen.width / 10+"px";
            this.$refs.my_shopheadmid.style.paddingTop=(this.StatusbarHeightRem)*window.screen.width / 10+"px";
            this.$refs.chatmain.style.paddingTop=(1.5+this.StatusbarHeightRem)*window.screen.width / 10+"px";
          }
      },
      UpPagedade () {
        this.$nextTick(() => {
        setTimeout(() => {
          this.$refs.scroller.donePullup()
        }, 1000)
        })
      },
      msgsLoaded () {
        pageUtil.scrollChatListDown()
      },
      async InitToUserInfo(){
        await GetUserInfoByUserID(this.$route.query.userId).then(response=>{
          this.$store.state.PToPImUserInfo=response;//更改当前store中存的P2P聊天对象用户信息
          this.ToUserName=response.UserName;
        })
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
        // background-color: #f7f3f7;
        z-index: 100;
            p, span{
                font-family: Helvetica Neue,Tahoma,Arial;
            }
    }
    .Middle{
       position:absolute;top:1.5rem;left:0rem;bottom:0rem;width:100%;background:#f3f3f3;
    }
  .ShopHead{
    width:10rem;height:1.5rem;position:fixed;left:0rem;top:0rem;z-index:99;box-sizing:border-box;
    .shopheadback{
      height:1.5rem;width:1.5rem;text-align:center;padding:0.45rem 0.45rem;position:absolute;left:0rem;bottom:0rem;z-index:99;box-sizing:border-box;
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
      width:1.5rem;height:1.5rem;color:#38dbb0;padding:0.45rem 0.45rem;position:absolute;bottom:0rem;right:0rem;z-index:99;box-sizing:border-box;
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
 .m-chat-main {
      padding: 1.5rem 0 1.5rem 0;
  }
  .m-chat-main {
      position: relative;
      display: -webkit-box;
      display: -webkit-flex;
      display: -moz-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-orient: vertical;
      -webkit-box-direction: normal;
      -webkit-flex-direction: column;
      -moz-box-orient: vertical;
      -moz-box-direction: normal;
      -ms-flex-direction: column;
      flex-direction: column;
      -moz-box-sizing: border-box;
      box-sizing: border-box;
      width: 100%;
      height: 100%;
      overflow: hidden;
  }
</style>