<template>
<div class="BigBJ">
  <div class="TopHead">
    <img src="static/image/back2.png" alt="" @click="$router.go(-1)">
    <span @click="$router.push('/forgetpasswordfirst')">忘记密码</span>
  </div>
  <div class="PageTitle">
  <p>登录</p>
  </div>
  <div class="BigIput">
    <div class="InputItem">
        <input type="text" class="UserName" v-model="UserName" placeholder="用户名或手机号">
    </div>
    <div class="InputItem PaswLogin" v-show="PaswLogin">
      <input type="password" v-show="PasswordState" class="UserPassword" v-model="UserPassword" placeholder="输入密码">
      <input type="text" v-show="!PasswordState" class="UserPassword" v-model="UserPassword" placeholder="输入密码">
      <div class="Right">
      <div class="Btn">
      <span v-show="PasswordState" @click="TagglePassword()">显示</span>
      <span v-show="!PasswordState" @click="TagglePassword()">隐藏</span>
      </div>
      </div>
    </div>
    <div class="InputItem YzmLogin" v-show="!PaswLogin">
      <input type="text" class="UserPassword" v-model="MobileYzm" placeholder="验证码">
      <div class="Right">
      <div class="Btn">
      <span v-show="!YzmIsSend" @click="SendYzm()">发送验证码</span>
      <span v-show="YzmIsSend" class="DJS">重新发送({{YzmDjs}}s)</span>
      </div>
      </div>
    </div>
  </div>
  <div class="NextPage">
    <div class="Left">
    <span v-show="PaswLogin" @click="taggleLoginWay()">手机验证登录</span>
    <span v-show="!PaswLogin" @click="taggleLoginWay()">密码登录</span>
    </div>
    <div class="Right" v-show="PaswLogin"  @click="PaswLoginWay()">
      <span>确认</span>
    </div>
    <div class="Right" v-show="!PaswLogin" @click="YzmLoginWay()">
      <span>确认</span>
    </div>
  </div>
</div>
</template>

<script>
	  import axios from 'axios'
    import {mapState, mapMutations} from 'vuex'
    import {userLogin,MessageSend,JudgeHasUser,GetUserInfoByYzm} from '../../service/getdata'
	export default{
		data(){
			return{
        PasswordState:true,
        UserName:"",
        UserPassword:"",
        MobileYzm:"",
        PaswLogin:true,
        // UserInfo:null,
        YzmDjs:60,
        YzmIsSend:false,
			}
		},

		mounted(){
      console.log(this.LoginFrontPageUrl);
		},
    computed: {
    ...mapState([
                'LoginFrontPageUrl','isLogin','userInfo',
            ]),
    },
    methods:{
      ...mapMutations([
          'LOCAL_USER',
      ]),
      TagglePassword(){
        this.PasswordState=!this.PasswordState;
      },
      taggleLoginWay(){
        this.PaswLogin=!this.PaswLogin;
      },
      UserLogin(){
        if(PaswLogin){
          this.PaswLogin();
        }
        else
        {
          this.YzmLogin();
        }
      },
      PaswLoginWay(){
          // axios.get("user/UserLogin",{params:{"UserName":this.UserName,"UserPassword":this.UserPassword}}).then((response)=>{  
          //   this.$store.state.userInfo=response.data;
          //   this.$store.state.isLogin=true;
          //   console.log(this.userInfo.UserName);
          // })
            userLogin(this.UserName, this.UserPassword).then(res => {
              if(res!=null)
              {
                // this.$store.state.userInfo=res;
                // this.$store.state.isLogin=true;
                this.LOCAL_USER(res);
                this.$vux.toast.text('登录成功!', 'bottom')
                this.$router.replace(this.LoginFrontPageUrl.fullPath);
                console.log(res);
              }
              else
              {
                this.$vux.toast.text('用户名或密码错误!', 'bottom')
              }
            });
          // console.log.log(this.$store.state.userInfo);
          console.log("123");
      },
      YzmLoginWay(){
          // axios.get("user/GetUserInfoByYzm",{params:{"Mobile":this.UserName,"PhoneYzm":this.MobileYzm}}).then((response)=>{  
          GetUserInfoByYzm(this.UserName,this.MobileYzm).then(res=>{ 
            if(res!=null)
            {
              this.$store.state.userInfo=res;
              this.$store.state.isLogin=true;
              this.$vux.toast.text('登录成功!', 'bottom')
              this.$router.replace(this.LoginFrontPageUrl.fullPath);
            }
            else
            {
              this.$vux.toast.text('验证码错误!', 'bottom')
            }
          }) 
      },
      YzmLogin(){
        console.log("验证码登录");
      },
      SendYzm(){
        // axios.get("user/JudgeHasUser",{params:{"UserName":this.UserName}}).then((response)=>{ 
        JudgeHasUser(this.UserName).then(res=>{   
          console.log(res);
          if(res==0){
            // axios.get("api/MessageSend",{params:{"Phone":this.UserName}}).then((response)=>{  
            MessageSend(this.UserName).then(res=>{
                if(res==1)
                {
                  this.YzmIsSend=true;
                  this.$vux.toast.text('验证码已发送!', 'bottom')
                  this.YzmDjsJian();
                }
                else
                {
                  this.$vux.toast.text('发送失败!', 'bottom')
                }
              })
          }
          else
          {
            this.$vux.toast.text('该手机号未注册!', 'bottom')
          }
        })
      },
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
      width:100%;height:1.45rem;display:flex;align-items:center;
      p{
        font-size:0.857rem;color:white;
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
      .InputItem.YzmLogin{
        input{
          width:55%;height:100%;border:none;padding:0rem;margin:0rem;color:white;font-size:0.7rem;background:none;padding-left:0.2rem;
        }
        .Right{
          width:45%;height:100%;
          .Btn{
            width:100%;height:100%;display:flex;align-items:center;justify-content:center;
            span{
              color:#71c2b1;font-size:0.5rem;
              &.DJS{
                color:white;
              }
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
        span{
          font-size:0.5rem;color:white;
        }
      }
      // a{width:40%;height:90%;display:flex;
        .Right{
          width:40%;height:90%;border-radius:4px;background-color:rgba(255,255,255,0.7);display:flex;align-items:center;justify-content:center;
          span{
            color:#019a61;font-size:0.55rem;
          }
        }
      // }
    }
  }
</style>