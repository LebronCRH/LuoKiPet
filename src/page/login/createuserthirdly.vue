<template>
<div class="BigBJ">
<!-- <div> -->
<div ref="HelperLine"></div>
  <div class="TopHead">
    <img src="static/image/back2.png" alt="" @click="$router.go(-1)">
    <span @click="TaggleMessageError()">没有收到？</span>
  </div>
  <div class="PageTitle">
    <p class="Big">输入验证码</p>
    <p class="Small">已向{{UserRegisterPhone}}发送了验证码。</p>
  </div>
  <div class="BigIput">
    <div class="InputItem">
        <input type="text" class="UserName" v-model="UserYzm" placeholder="验证码">
    </div>
  </div>
  <div class="NextPage">
    <div class="Left">
      <img src="static/image/png/RegisterY1.png" alt="">
      <img src="static/image/png/RegisterY1.png" alt="">
      <img src="static/image/png/RegisterY2.png" alt="">
    </div>
    <div class="Right" @click="SubmitRegisterUser()">
      <span>完成</span>
    </div>
  </div>
<!-- </div> -->
  <transition name="fade">
    <div class="BigModel" v-show="MessageError">
    <div class="zhe" @click="TaggleMessageError()"></div>
    <div class="BigMenu">
      <div class="Item Top" v-show="YzmIsSend"><span>重新发送({{YzmDjs}}s)</span></div>
      <div class="Item Active" @click="AgainSend()" v-show="!YzmIsSend"><span>重新发送</span></div>
      <div class="Item"><span>取消</span></div>
    </div>
    </div>
  </transition>
</div>
</template>

<script>
	import axios from 'axios'
  import {mapState, mapMutations} from 'vuex'
  import {UserRegisterPhoneHas,UserRegister,CeShi,UserQQRegister} from '../../service/getdata'
	export default{
		data(){
			return{
        MessageError:false,
        YzmDjs:15,
        YzmIsSend:true,
        UserYzm:"",
			}
		},

		mounted(){
      this.YzmDjsJian();
      ths.initHeadHeight();
		},
    computed: {
    ...mapState([
                'UserRegisterName','UserRegisterPassword','UserRegisterPhone','OthenLoginInfo','isLogin','userInfo','LoginFrontPageUrl','StatusbarHeight','StatusbarHeightRem',
            ]),
    },
    methods:{
      TaggleMessageError(){
        this.MessageError=!this.MessageError;
      },
      initHeadHeight(){
              if(this.$refs.HelperLine)
              {
                this.$refs.HelperLine.style.height=(this.StatusbarHeightRem)*window.screen.width / 10+"px";
              }
      },
      YzmDjsJian(){
        if (this.YzmIsSend==true&&this.YzmDjs > 0) 
        {
          this.YzmDjs--;
          setTimeout(this.YzmDjsJian, 1000);
        }
        else{
          this.YzmIsSend=false;
          this.YzmDjs=15;
        }
      },
      AgainSend(){
        // axios.get("user/UserRegisterPhoneHas",{params:{"Phone":this.UserRegisterPhone}}).then((response)=>{  
          UserRegisterPhoneHas(this.UserRegisterPhone).then(response=>{
              if(response==0){
                this.$vux.toast.text('该手机号已被使用!', 'bottom');
              }else{
                this.MessageError=false;
                this.YzmIsSend=true;
                this.YzmDjsJian();
                this.$vux.toast.text('请注意查收!', 'bottom');
              }
        });
      },
      GetCurrentYear(){
        var date=new Date();
        return date.getFullYear();
      },
      SubmitRegisterUser(){
        if(this.UserYzm!="")
          {
            // axios.post("user/UserRegister",{"UserName":this.UserRegisterName,"Password":this.UserRegisterPassword,"RPassword":this.UserRegisterPassword,"RegisterPhone":this.UserRegisterPhone,"Expertise":this.UserYzm}).then((response)=>{
            // var Obj={"UserName":this.UserRegisterName,"Password":this.UserRegisterPassword,"RPassword":this.UserRegisterPassword,"RegisterPhone":this.UserRegisterPhone,"Expertise":this.UserYzm};
            // var Obj={"UserName":"yingjiayu","Password":"123456","RPassword":"123456","RegisterPhone":"15007932468"};
            if(this.$route.query.CreateByType)
            {
              console.log("注册的方式为"+this.$route.query.CreateByType);
              UserQQRegister({"UserName":this.UserRegisterName,"Password":this.UserRegisterPassword,"RPassword":this.UserRegisterPassword,"RegisterPhone":this.UserRegisterPhone,"Expertise":this.UserYzm,"Age":this.GetCurrentYear()-this.$store.state.OthenLoginInfo.userInfo.year,"Sex":this.$store.state.OthenLoginInfo.userInfo.gender,"UserPhotos":this.$store.state.OthenLoginInfo.userInfo.figureurl_2,"QQAccess_Token":this.$store.state.OthenLoginInfo.authResult.access_token,"QQOpenId":this.$store.state.OthenLoginInfo.authResult.openid}).then(response=>{
                if(response==null){
                  this.$vux.toast.text('验证码错误!', 'bottom');
                }
                else
                {
                  this.$vux.toast.text('登录成功!', 'bottom');
                  console.log(this.LoginFrontPageUrl)
                  this.$store.state.userInfo=response;
                  this.$store.state.isLogin=true;
                  this.$router.replace(this.LoginFrontPageUrl.fullPath);
                }
              })
              //执行以下更具第三方登录没有注册过的注册用户信息后台操作
              // this.$router.replace(this.LoginFrontPageUrl.fullPath);//执行本要前往的网页但由于未登录的原因
            }
            else
            {
              UserRegister({"UserName":this.UserRegisterName,"Password":this.UserRegisterPassword,"RPassword":this.UserRegisterPassword,"RegisterPhone":this.UserRegisterPhone,"Expertise":this.UserYzm}).then(response=>{
              if(response==0){
                this.$vux.toast.text('验证码错误!', 'bottom');
              }
              else
              {
                this.$vux.toast.text('注册成功!', 'bottom');
                this.$router.push('/login');
              }
            })
            }
          }
          else
          {
            this.$vux.toast.text('请输入正确的格式!', 'bottom');
          }
      },
    }
	}
</script>

<style lang="scss" scoped>
  .BigBJ{
    position:absolute;top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index:101;
    width:100vw;height:100vh;background:url(../../../static/image/LoginBg2.png) center center no-repeat;background-size:100vw 100vh;padding:0rem 0.4rem 0.4rem 0.4rem;
    .TopHead{
      width:100%;height:1.5rem;display:flex;align-items:center;justify-content:space-between;
      img{
        width:0.6rem;height:0.6rem;
      }
      span{
        font-size:0.5rem;color:white;
      }
    }
    .AppName{
      width:100%;height:2rem;display:flex;align-items:center;justify-content:center;margin-top:1rem;
      span{
        font-size:1.5rem;color:white;font-weight:500;;
      }
    }
    .BigLoginWay{
      width:100%;margin-top:7rem;
      .LoginWayItem{
        width:100%;height:1.4rem;border-radius:0.7rem;display:flex;align-items:center;justify-content:center;margin-top:0.5rem;
        &.Way1{
          background-color:white;
          span{
            color:#04ba78;font-size:0.6rem;
          }
        }
        &.Way2{
          background-color:none;border:solid 2px #fff;
          span{
            color:white;font-size:0.6rem;
          }
        }
      }
    }
    .PageTitle{
      width:100%;min-height:1.45rem;
      p.Big{
        font-size:0.857rem;color:white;line-height:1.2rem;
      }
      p.Small{
        font-size:0.56rem;color:white;line-height:0.8rem;
      }
    }
    .BigIput{
      width:100%;margin-top:0.4rem;
      .InputItem{
        width:100%;height:2rem;padding:0rem;margin:0rem;border-bottom:solid 2px #61bfab;display:flex;align-items:center;
        input{
          width:70%;height:100%;border:none;padding:0rem;margin:0rem;color:white;font-size:0.7rem;background:none;padding-left:0.2rem;
        }
        input::-webkit-input-placeholder, textarea::-webkit-input-placeholder { /* WebKit*/  
            color:    #61bfab;  
        }  
        input:-moz-placeholder, textarea:-moz-placeholder { /* Mozilla Firefox 4 to 18 */  
            color:    #61bfab;  
        }  
        input::-moz-placeholder, textarea::-moz-placeholder { /* Mozilla Firefox 19+ */  
            color:    #61bfab;  
        }  
        input:-ms-input-placeholder, textarea:-ms-input-placeholder { /* IE 10+ */  
            color:    #61bfab;  
        }  
        .Right{
          width:30%;height:100%;
          .Btn{
            width:100%;height:100%;display:flex;align-items:center;justify-content:center;
            span{
              color:#71c2b1;font-size:0.5rem;
            }
          }
        }
      }
    }
    .BigEdit{
      width:100%;height:1.5rem;display:flex;align-items:center;justify-content:space-between;margin-top:1rem;
      .EditItem{
        width:4.5rem;height:1.5rem;background-color:rgba(255,255,255,0.6);border-radius:0.2rem;display:flex;align-items:center;justify-content:center;
        span{
          color:#019a61;font-size:0.55rem;
        }
      }
    }
    .NextPage{
      width:100%;height:1.4rem;position:fixed;left:0rem;bottom:0.2rem;padding:0rem 0.4rem;display:flex;justify-content:space-between;
      .Left{
        width:40%;height:90%;display:flex;align-items:center;justify-content:flex-star;
        img{
          width:0.4rem;height:0.4rem;margin-left:0.2rem;
        }
      }
      .Right{
        width:40%;height:90%;border:solid 1px #fff;border-radius:4px;background-color:none;display:flex;align-items:center;justify-content:center;
        span{
          color:white;font-size:0.55rem;
        }
      }
    }
  }
  .BigModel
  {
    width:100%;height:100%;z-index:999;position:absolute;top:0rem;left:0rem;padding:0rem 0.3rem;box-sizing: border-box;
    .zhe{position:absolute;left:0rem;top:0rem;right:0rem;bottom:0rem;background-color: rgba(0,0,0,0.5);}
    .BigMenu{
      position:absolute;bottom:0rem;left:0rem;width:100%;background:#fff;
      .Item{
        width:100%;height:1.3rem;display:flex;align-items:center;padding:0rem 0.3rem;
        &.Top{border-bottom:solid 1px #e7e2e2;
          span{
            color:#5d5656;font-size:0.45rem;
          }
        }
        &.Active{border-bottom:solid 1px #e7e2e2;}
        span{
          color:#1a9b3b;font-size:0.45rem;
        }
      }
    }
  }
</style>