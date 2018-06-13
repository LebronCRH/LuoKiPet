<template>
  <div @click="hideRobotList" class="IM-chat-editor">
    <chat-emoji
          v-bind:type="type"
          v-bind:scene="scene"
          v-bind:to="to"
          v-show="isEmojiShown"
          v-on:add-emoji="addEmoji"
          v-on:hide-emoji="hideEmoji">
    </chat-emoji>
  <div class="Bottom">
        <div class="Voice ImgItem">
          <img src="static/image/png/Voice.png" alt="">
        </div>
        <div class="Input">
          <input type="text" v-model="msgToSent">
        </div>
        <div class="ImgItem" @click.stop="showEmoji">
          <img src="static/image/png/biaoqing.png" alt="">
        </div>
        <div class="ImgItem FileInputItem" v-show="!SendShow" @change="sendFileMsg">
          <img src="static/image/png/addfile.png" alt="">
          <input type="file" ref="fileToSent">
        </div>
        <div class="MessageSend" v-show="SendShow" @click="sendTextMsg()">
          <span>发送</span>
        </div>
      </div>
      </div>
</template>

<script>
  import ChatEmoji from './ChatEmoji'
  import util from '../../utils'
  import config from '../../config'
  import { Scroller,Group,XSwitch,Cell} from 'vux'
  // import pageUtil from '../../utils/page'

  export default {
    components: {
      ChatEmoji,
      Group,
      Cell,
    },
    updated () {
      window.document.body.addEventListener('click', () => {
        this.isEmojiShown = false
      })
    },
    props: {
      type: String,
      scene: String,
      to: String,
      isRobot: {
        type: Boolean,
        default () {
          return false
        }
      },
      invalid: {
        type: Boolean,
        default: false
      },
      invalidHint: {
        type: String,
        default: '您无权限发送消息'
      },
      advancedTeam: {
        type: Boolean,
        default: false
      }
    },
    watch: {
      continueRobotAccid (curVal, oldVal) {
        if (curVal && this.robotInfos[curVal]) {
          this.msgToSent = `@${this.robotInfos[curVal].nick} `
        }
        // 重置
        this.$store.dispatch('continueRobotMsg', '')
      },
      msgToSent (curVal, oldVal) {
        if (this.isRobot) {
          return
        }
        let indexAt = this.msgToSent.indexOf('@')
        if (indexAt >= 0 && (indexAt === this.msgToSent.length - 1)) {
          if (this.robotslist && this.robotslist.length > 0) {
            this.isRobotListShown = true
          }
        } else if (this.isRobotListShown === true) {
          this.isRobotListShown = false
        }
      }
    },
    data () {
      return {
        isEmojiShown: false,
        isRobotListShown: false,
        msgToSent: '',
        icon1: `${config.resourceUrl}/im/chat-editor-1.png`,
        icon2: `${config.resourceUrl}/im/chat-editor-2.png`,
        icon3: `${config.resourceUrl}/im/chat-editor-3.png`,
      }
    },
    computed: {
      continueRobotAccid () {
        return this.$store.state.continueRobotAccid
      },
      robotslist () {
        return this.$store.state.robotslist
      },
      robotInfos () {
        return this.$store.state.robotInfos
      },
      robotInfosByNick () {
        return this.$store.state.robotInfosByNick
      },
      SendShow:function(){
        if(this.msgToSent==""){
          return false;
        }
        else
        {
          return true;
        }
      }
    },
    methods: {
      sendTextMsg () {
        if (this.invalid) {
          this.$toast(this.invalidHint)
          return
        }
        if (/^\s*$/.test(this.msgToSent)) {
          this.$vux.alert.show({
            title: '请不要发送空消息'
          })
          return
        } else if (this.msgToSent.length > 800) {
          this.$vux.alert.show({
            title: '请不要超过800个字'
          })
          return
        }
        this.msgToSent = this.msgToSent.trim()
        if (this.type === 'session') {
          // 如果是机器人
          if (this.isRobot) {
            this.$store.dispatch('sendRobotMsg', {
              type: 'text',
              scene: this.scene,
              to: this.to,
              robotAccid: this.to,
              // 机器人后台消息
              content: this.msgToSent,
              // 显示的文本消息
              body: this.msgToSent
            })
          } else {
            let robotAccid = ''
            let robotText = ''

            let atUsers = this.msgToSent.match(/@[^\s@$]+/g)
            if (atUsers) {
              for (let i = 0; i < atUsers.length; i++) {
                let item = atUsers[i].replace('@', '')
                if (this.robotInfosByNick[item]) {
                  robotAccid = this.robotInfosByNick[item].account
                  robotText = (this.msgToSent + '').replace(atUsers[i], '').trim()
                  break
                }
              }
            }
            if (robotAccid) {
              if (robotText) {
                this.$store.dispatch('sendRobotMsg', {
                  type: 'text',
                  scene: this.scene,
                  to: this.to,
                  robotAccid,
                  // 机器人后台消息
                  content: robotText,
                  // 显示的文本消息
                  body: this.msgToSent
                })
              } else {
                this.$store.dispatch('sendRobotMsg', {
                  type: 'welcome',
                  scene: this.scene,
                  to: this.to,
                  robotAccid,
                  // 显示的文本消息
                  body: this.msgToSent
                })
              }
            } else {
              this.$store.dispatch('sendMsg', {
                type: 'text',
                scene: this.scene,
                to: this.to,
                text: this.msgToSent
              })
            }
          }
        } else if (this.type === 'chatroom') {
          let robotAccid = ''
          let robotText = ''

          let atUsers = this.msgToSent.match(/@[^\s@$]+/g)
          if (atUsers) {
            for (let i = 0; i < atUsers.length; i++) {
              let item = atUsers[i].replace('@', '')
              if (this.robotInfosByNick[item]) {
                robotAccid = this.robotInfosByNick[item].account
                robotText = (this.msgToSent + '').replace(atUsers[i], '').trim()
                break
              }
            }
          }
          if (robotAccid) {
            if (robotText) {
              this.$store.dispatch('sendChatroomRobotMsg', {
                type: 'text',
                robotAccid,
                // 机器人后台消息
                content: robotText,
                // 显示的文本消息
                body: this.msgToSent
              })
            } else {
              this.$store.dispatch('sendChatroomRobotMsg', {
                type: 'welcome',
                robotAccid,
                // 显示的文本消息
                body: this.msgToSent
              })
            }
          } else {
            this.$store.dispatch('sendChatroomMsg', {
              type: 'text',
              text: this.msgToSent
            })
          }
        }
        this.msgToSent = ''
      },
      sendPlayMsg () {
        if (this.invalid) {
          this.$toast(this.invalidHint)
          return
        }
        // 发送猜拳消息
        if (this.type === 'session') {
          this.$store.dispatch('sendMsg', {
            type: 'custom',
            scene: this.scene,
            to: this.to,
            pushContent: '[猜拳]',
            content: {
              type: 1,
              data: {
                value: Math.ceil(Math.random()*3)
              }
            }
          })
        } else if (this.type === 'chatroom') {
          this.$store.dispatch('sendChatroomMsg', {
            type: 'custom',
            pushContent: '[猜拳]',
            content: {
              type: 1,
              data: {
                value: Math.ceil(Math.random()*3)
              }
            }
          })
        }
      },
      sendFileMsg () {
        if (this.invalid) {
          this.$toast(this.invalidHint)
          return
        }
        let ipt = this.$refs.fileToSent
        if (ipt.value) {
          if (this.type === 'session') {
            this.$store.dispatch('sendFileMsg', {
              scene: this.scene,
              to: this.to,
              fileInput: ipt
            })
          } else if (this.type === 'chatroom') {
            this.$store.dispatch('sendChatroomFileMsg', {
              fileInput: ipt
            })
          }
        }
      },
      showEmoji () {
        this.isEmojiShown = true
      },
      hideEmoji () {
        this.isEmojiShown = false
      },
      addEmoji (emojiName) {
        this.msgToSent += emojiName
        this.hideEmoji()
      },
      chooseRobot (robot) {
        if (robot && robot.account) {
          let len = this.msgToSent.length
          if (len === 0 || this.msgToSent[len-1] !== '@') {
            this.msgToSent += '@' + robot.nick + ' '
          } {
            this.msgToSent += robot.nick + ' '
          }
        }
      },
      hideRobotList () {
        this.isRobotListShown = false
      },
      onInputFocus(e) {
        setTimeout(() => {
          // todo fixme 解决iOS输入框被遮挡问题，但会存在空白缝隙
          e.target.scrollIntoView()
          // pageUtil.scrollChatListDown()
        }, 200)
      },
      turnToMsgReceipt() {
        if (this.invalid) {
          this.$toast(this.invalidHint)
          return
        }
        location = `#/teamSendMsgReceipt/${this.to}`
      }
    }
  }
</script>

<style lang="scss" scoped="">
  .robot.m-chat-editor-main {
    /*.u-editor-input {
      padding-right: 4.5rem;
    }
    .u-editor-icons {
      width: 4rem;
    }*/
  }
  .IM-chat-editor{
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 1.3rem;
    background-color: #e5f4ff;
  }
  .m-chat-robot {
    overflow-y: scroll;
    .weui-cells {
      .weui-cell__hd {
        margin-right: 0.5rem;
      }
    }
  }
  .u-editor-send.u-editor-receipt {
    background-color: #fefefe;
    border: #ccc solid 1px;
    color: black;
    padding: 0.1rem;
    margin-left: .1rem;
  }
    .Bottom{
    position:fixed;bottom:0rem;left:0rem;width:10rem;height:1.3rem;background:#fff;display:flex;justify-content:space-between;align-items:center;
    .ImgItem{
      width:1rem;height:1.3rem;display:flex;justify-content:center;align-items:center;
      img{width:0.7rem;height:0.7rem;}
      &.FileInputItem{
        position:relative;vertical-align:middle;
        input{
          position: absolute;
          display: inline-block;
          left: 0;
          top: 0;
          width: inherit;
          height: inherit;
          opacity: 0;
          font-size: 1rem;
        }
      }
    }
    .MessageSend{
      width:1.3rem;height:1rem;background:#38dbb0;border-radius:0.1rem;display:flex;justify-content:center;align-items:center;
      span{
        color:#fff;font-size:0.5rem;
      }
    }
    .Input{
      width:6.5rem;height:1rem;border:solid 1px #ddd;border-radius:0.1rem;background:#f3f3f3;padding:0rem 0.2rem;display:flex;align-items:center;
      input{
        padding:0rem;margin:0rem;border:none;font-size:0.4rem;background:none;
      }
    }
  }
</style>