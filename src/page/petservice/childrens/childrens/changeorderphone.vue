<template>
	<div class="rating_page">
	<head-top :Title="Title" :Color="Color" :MidType="MidType"></head-top>
	<div class="Middle">
    <scroller ref="scroller" lock-x height="-56" scrollbar-y>
      <div>
        <div class="Step1" v-show="!Step1OK">
            <div class="Div_Input">
               <div class="BigCurrent">
                 <div class="CurrentMobile">
                    <span>{{UserOrderPhone}}</span>
                 </div>
                 <div class="SendYZM">
                    <span @click="SendMessage(1)" v-show="!YzmIsSend">获取验证码</span>
                    <span v-show="YzmIsSend">重新发送({{YzmDjs}}s)</span>
                 </div>
               </div>
               <div class="TextYZM">
                   <input type="text" name="TZM" v-model="UserYzm" placeholder="请输入验证码">
               </div>
            </div>

            <div class="Confirm">
                  <span class="ConfirmMsg" @click="YzmVerification(1)">确认</span>
            </div>
            <div class="Tishi">
                  <span>通过短信验证码验证</span>
            </div>
        </div>

        <div class="Step2" v-show="Step1OK">
            <div class="Div_Input">
               <div class="BigCurrent">
                 <div class="NewMobile">
                    <p>手机号</p>
                    <input type="text" v-model="NewUserOrderPhone" placeholder="请输入手机号">
                 </div>
                 <div class="SendYZM">
                    <span @click="SendMessage(2)" v-show="!YzmIsSend2">获取验证码</span>
                    <span v-show="YzmIsSend2">重新发送({{YzmDjs2}}s)</span>
                 </div>
               </div>
               <div class="BigCurrent">
               <div class="NewTextYZM">
                   <p>验证码</p>
                   <input type="text" name="TZM" v-model="UserYzm" placeholder="请输入验证码">
               </div>
               <div class="SendYZM"></div>
               </div>
            </div>

            <div class="Confirm">
                  <span class="ConfirmMsg" @click="YzmVerification(2)">绑定</span>
            </div>
        </div>

      </div>
    </scroller>
	</div>
	</div>
</template>

<script>
  import axios from 'axios'
  import headTop from '@/components/Head.vue'
  import { Scroller,XSwitch,Group  } from 'vux'
  import {mapState, mapMutations} from 'vuex'
  import {PhoneSendMessage,YzmVerification} from '@/service/getdata'

  export default {
      components: {
      	headTop,
      	Scroller,
      },
      data () {
        return {
          Title:'身份验证',
          Color:0,
          MidType:1,
          YzmDjs:60,
          YzmDjs2:60,
          YzmIsSend:false,
          YzmIsSend2:false,
          UserYzm:"",
          NewUserOrderPhone:"",
          Step1OK:false,
        }
      },
    beforeCreate(){

    },
    created(){

    },
    beforeMount(){

    },
    // beforeUpdate(){
    //   console.log("beforeUpdate");
    // },
    // updated(){
    //   console.log("updated");
    // },
    activated(){

    },
    deactivated(){

    },
    beforeDestroy(){

    },
    destroyed(){

    },
    mounted(){

    },
    computed: {
      ...mapState([
                  'PackageCartList','userInfo','UserChangeOrderPhone'
      ]),
        UserOrderPhone:function(){
          if(this.UserChangeOrderPhone==null)
          {
            return this.userInfo.RegisterPhone;
          }else{
            return this.UserChangeOrderPhone;
          }
        },
    },
      props:[],
      methods: {
        YzmDjsJian(){
          if (this.YzmIsSend==true&&this.YzmDjs > 0) 
          {
            this.YzmDjs--;
            setTimeout(this.YzmDjsJian, 1000);
          }
          else{
            this.YzmIsSend=false;
            this.YzmDjs=60;
          }
        },
        YzmDjsJian2(){
          if (this.YzmIsSend2==true&&this.YzmDjs2 > 0) 
          {
            this.YzmDjs2--;
            setTimeout(this.YzmDjsJian2, 1000);
          }
          else{
            this.YzmIsSend2=false;
            this.YzmDjs2=60;
          }
        },
        SendMessage(type){
          let SendPhone;
          if(type==1){
            SendPhone=this.UserOrderPhone;
          }else if(type==2){
            SendPhone=this.NewUserOrderPhone;
          }
          PhoneSendMessage(SendPhone).then(response=>{
                if(response==0){
                  this.$vux.toast.text('发送失败!', 'bottom');
                }else if(type==1){
                  this.MessageError=false;
                  this.YzmIsSend=true;
                  this.YzmDjsJian();
                  this.$vux.toast.text('请注意查收!', 'bottom');
                }else if(type==2){
                  this.MessageError=false;
                  this.YzmIsSend2=true;
                  this.YzmDjsJian2();
                  this.$vux.toast.text('请注意查收!', 'bottom');
                }
          });
        },
        YzmVerification(type){
          let SendPhone;
          if(type==1){
            SendPhone=this.UserOrderPhone;
          }else if(type==2){
            SendPhone=this.NewUserOrderPhone;
          }
          YzmVerification(this.UserYzm,SendPhone).then(response=>{
            if(response==1 && type==1)
            {
              this.$vux.toast.text('验证成功！', 'bottom');
              this.Title="更改联系人";
              this.UserYzm="";
              // this.UserOrderPhone="";
              this.Step1OK=true;
            }
            else if(response==1 && type==2)
            {
              this.$vux.toast.text('验证成功', 'bottom');
              this.$store.state.UserChangeOrderPhone=this.NewUserOrderPhone;
              this.$router.back();
            }
            else
            {
              this.$vux.toast.text('验证失败！', 'bottom');
            }
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
      position:absolute;top:1.6rem;left:0rem;bottom:0rem;width:100%;
      .Div_Input{width:100%;height:2.45rem;padding:0rem 0.3rem;background-color:#fff;
        .BigCurrent{width:100%;height:1.25rem;border-bottom:solid 0.05rem #f7f7f7;display:flex;align-items:center;justify-content:center;
        .CurrentMobile{width:5rem;display:flex;align-items:center;
          span{font-size:0.4rem;color:#000;}
        }
        .NewMobile{
          width:5rem;display:flex;align-items:center;justify-content:space-between;
          p{width:2rem;height:100%;font-size:0.45rem;color:#000;}
          input{padding:0rem;margin:0rem;border: none;width:3rem;height:100%;font-size:0.4rem;}
        }
        .NewTextYZM{
            width:5rem;display:flex;align-items:center;justify-content:space-between;
            p{width:2rem;height:100%;font-size:0.45rem;color:#000;line-height:1.2rem;}
            input{padding:0rem;margin:0rem;border:none;width:3rem;height:100%;font-size:0.4rem;color:#b0b0b0;}
        }
        .SendYZM{width:3.6rem;height:100%;display:flex;align-items:center;justify-content:center;
          span{color:#f75952;font-size:0.4rem;}
        }
           }
           .TextYZM{
            width:100%;height:1.2rem;display:flex;align-items:center;justify-content:center;
            input{padding:0rem;margin:0rem;border:none;width:8.6rem;height:100%;font-size:0.4rem;color:#b0b0b0;}
           }
      }
      .Confirm{width:9rem;height:1.1rem;background-color:#f75952;opacity:0.6;border-radius:0.1rem;margin:0rem auto;display:flex;align-items:center;justify-content:center;margin-top:0.7rem;
        .ConfirmMsg{color:#fff;font-size:0.35rem;}
      }
      .Tishi{width:100%;height:1.5rem;padding:0rem 0.3rem;display:flex;align-items:center;justify-content:center;
        span{font-size:0.35rem;color:#676769;}
      }
  }
</style>
