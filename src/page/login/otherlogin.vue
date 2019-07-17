<template>
<div class="BigBJ">
<div ref="HelperLine"></div>
  <div class="TopHead">
    <img src="static/image/back2.png" alt="" @click="$router.go(-1)">
  </div>
  <div class="AppName">
    <span>LuoKiPet</span>
  </div>
  <div class="BigLoginWay">
      <div class="LoginWayItem Way1">
      <img src="static/image/png/WXLogin.png" alt="">
        <span>微信登录</span>
      </div>
      <div class="LoginWayItem Way1" @click="OtherLogin('qq')">
      <img src="static/image/png/QQLogin.png" alt="">
        <span>QQ登录</span>
      </div>
      <div class="LoginWayItem Way1">
      <img src="static/image/png/WBLogin.png" alt="">
        <span>微博登录</span>
      </div>
<!--       <div class="LoginWayItem Way1" @click="GetauthUserInfo()">
      <img src="static/image/png/WBLogin.png" alt="">
        <span>获取登录信息</span>
      </div>
      <div class="LoginWayItem Way1" @click="OutLogin()">
      <img src="static/image/png/WBLogin.png" alt="">
        <span>注销登录</span>
      </div> -->
  </div>
</div>
</template>

<script>
	import {mapState, mapMutations} from 'vuex'
  import {UserQQLogin} from '@/service/getdata' 
	export default{
		data(){
			return{
        auths:{},
			}
		},
    beforeRouteEnter: (to, from, next) => {
      // console.log(this)  //undefined，不能用this来获取vue实例;但其实是可以获取到this的
      console.log(to);
      console.log(from);
      // console.log('组件路由勾子：beforeRouteEnter')
      next(vm => {
        // vm.$store.state.LoginFrontPageUrl=from;
        // console.log(vm.LoginFrontPageUrl)  //vm为vue的实例
        console.log('组件路由勾子beforeRouteEnter的next')
      })
    },
    computed: {
    ...mapState([
                'LoginFrontPageUrl','isLogin','userInfo','OthenLoginInfo','OtherAuths','StatusbarHeight','StatusbarHeightRem',
            ]),
    },
		mounted(){
      this.initHeadHeight();
		},
    methods:{
      ...mapMutations([
                'OUTLOGIN_OTHER',
            ]),
      PushLogin(){
        this.$router.replace('/login');
      },
      initHeadHeight(){
              if(this.$refs.HelperLine)
              {
                this.$refs.HelperLine.style.height=(this.StatusbarHeightRem)*window.screen.width / 10+"px";
              }
      },
      OtherLogin(id){
          var auth=this.OtherAuths[id];
          var that=this;
          if(auth){
            auth.login(function(){
              that.$store.state.OthenLoginInfo=auth;
              console.log("登录认证成功：");
              console.log(auth);
              console.log(JSON.stringify(auth.authResult));
              if(id=="qq")
              {
                UserQQLogin(auth.authResult.access_token,auth.authResult.openid).then(response=>{
                  if(response==null)
                  {
                    console.log("该QQ用户没有注册过");
                    that.$router.push({ path: '/createuserfirst', query: { UserName:auth.userInfo.nickname,CreateByType:auth.description}});
                  }
                  else
                  {
                    that.$vux.toast.text('登录成功!', 'bottom')
                    that.$store.state.userInfo=response;
                    that.$store.state.isLogin=true;
                    console.log(response);
                    that.$router.replace(that.LoginFrontPageUrl.fullPath);
                  }
                })
              }
            },function(e){
              console.log("登录认证失败：");
              console.log("["+e.code+"]："+e.message);
            });
          }else{
            console.log("无效的登录认证通道！");
          }
      },
      GetauthUserInfo(){
        Object.keys(this.OtherAuths).forEach(s=>{
          console.log(this.OtherAuths[s]);
          if ( !this.OtherAuths[s].authResult ) {
          console.log("未登录授权！");
        } else {
          this.OtherAuths[s].getUserInfo( function(e){
            console.log( "获取用户信息成功："+JSON.stringify(this.OtherAuths[s].userInfo) );
          }, function(e){
            console.log( "获取用户信息失败："+e.message+" - "+e.code );
          } );
        }
        })
      },
      OutLogin(){
        // Object.keys(this.OtherAuths).forEach(s=>{
        //   if (this.OtherAuths[s].authResult ) {
        //     this.OtherAuths[s].logout(function(e){
        //       alert( "注销登录认证成功！" );
        //     }, function(e){
        //       alert( "注销登录认证失败！" );
        //     });
        //   }
        // })
        this.OUTLOGIN_OTHER();
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
      width:100%;margin-top:4rem;
      // a{
      //   width:100%;
        .LoginWayItem{
          width:100%;height:1.4rem;border-radius:0.7rem;display:flex;align-items:center;justify-content:center;margin-top:0.5rem;
          &.Way1{
            background-color:white;
            img{
              width:0.9rem;margin-right: 0.2rem;
            }
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
      // }
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
  }
</style>