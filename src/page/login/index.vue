<template>
<div class="BigBJ">
<div ref="HelperLine"></div>
  <div class="TopHead">
    <img src="static/image/back2.png" alt="" @click="$router.go(-1)">
    <span @click="PushLogin()">登录</span>
  </div>
  <div class="AppName">
    <span>LuoKiPet</span>
  </div>
  <div class="BigLoginWay">
  <router-link :to="'/otherlogin'">
      <div class="LoginWayItem Way1">
        <span>使用第三方账号登录</span>
      </div>
    </router-link>
    <router-link :to="'/createuserfirst'">
      <div class="LoginWayItem Way2">
        <span>创建账号</span>
      </div>
    </router-link>
  </div>
</div>
</template>

<script>
	import {mapState, mapMutations} from 'vuex'
	export default{
		data(){
			return{

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
                'LoginFrontPageUrl','isLogin','userInfo','StatusbarHeight','StatusbarHeightRem',
            ]),
    },
		mounted(){
      this.initHeadHeight();
		},
    methods:{
      PushLogin(){
        this.$router.replace('/login');
      },
      initHeadHeight(){
              if(this.$refs.HelperLine)
              {
                this.$refs.HelperLine.style.height=(this.StatusbarHeightRem)*window.screen.width / 10+"px";
              }
      },
      GetCurrentYear(){
        var date=new Date();
        return date.getFullYear();
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
      a{
        width:100%;
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