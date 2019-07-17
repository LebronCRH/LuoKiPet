<template>
	<div class="rating_page">
	  <div class="UserBJ" ref="UserBJ" :class="isLogin?'Login':'NoLogin'">
        <ul class="TopMenu">
          <li class="MenuItem">
              <div class="Centent">
                 <p>3</p>
                 <p>赞</p>
              </div>
          </li>
          <li class="MenuItem">
             <div class="Centent">
                 <p>0</p>
                 <p>魅力值</p>
              </div>
          </li>
          <li class="MenuItem">
              <div class="Centent">
                <p>3</p>
                 <p>关注</p>
              </div>
          </li>
          <li class="MenuItem">
              <div class="Centent">
                 <p>3</p>
                 <p>粉丝</p>
              </div>
          </li>
        </ul>
        <div class="UserInfo">
          <div class="UserImg">
             <img v-if="isLogin" :src="UserImgFromat(this.userInfo.UserPhotos)">
             <img v-show="!isLogin" src="static/image/png/userLogin.png" @click="GoLogin()">
          </div>
          <div class="UserName">
            <span class="Level" v-show="isLogin">Lv4</span>
            <span class="Name" v-if="isLogin">{{this.userInfo.UserName}}<i class="man"></i></span>
            <span class="Name" v-show="!isLogin">登录/注册</span>
          </div>
          <div class="UserNode">
             <span v-show="isLogin">浙江 杭州</span>
             <span v-show="!isLogin">登录享受更多的功能</span>
          </div>
        </div>
    </div>
    <div class="Middle">
      <scroller ref="scroller" lock-x height="-230" scrollbar-y @on-scroll="PageSlide">
        <div class="UserContent">
            <div class="SignAndNews">
              <div class="Sign Item">
                 <img src="static/image/qiandao.png">
                 <span>签到</span>
              </div>
              <div class="News Item">
                  <img src="static/image/xiaoxi.png">
                 <span>消息</span>
              </div>
            </div>
            <ul class="CententMenu1">
               <li class="MenuItem">
                  <div class="Centent">
                      <p class="Num">0</p>
                      <p class="Titlemenu1">洛奇豆</p>
                   </div>
               </li>
               <li class="MenuItem">
                   <div class="Centent">
                       <p class="Num">119</p>
                       <p class="Titlemenu1">洛奇币</p>
                    </div>
               </li>
               <li class="MenuItem">
                   <div class="Centent">
                       <p class="Num">3</p>
                      <p class="Titlemenu1">优惠券</p>
                    </div>
               </li>
               <li class="MenuItem">
                   <div class="Centent">
                       <p class="Num">3</p>
                       <p class="Titlemenu1">礼物</p>
                    </div>        
               </li>
            </ul>
            <div class="ContentMenu2">
               <p class="MenuTitle">日常管理</p>
               <ul class="ul_Menu2">
                  <li class="li_Menu2 Item">
                     <p><img src="static/image/usercenter_pet.png"></p>
                     <p>宠物</p>
                     <p class="Rborder"></p>
                  </li>
                  <router-link to="/luokifriend" tag="li" class="li_Menu2 Item">
                     <p><img src="static/image/usercenter_fr.png"></p>
                     <p>宠友</p>
                     <p class="Rborder"></p>
                  </router-link>
                  <li class="li_Menu2 Item">
                    <p><img src="static/image/usercenter_sq.png"></p>
                     <p>社区</p>
                     <p class="Rborder"></p>
                  </li>
                  <li class="li_Menu2">
                    <p><img src="static/image/usercenter_sc.png"></p>
                     <p>收藏</p>
                  </li>
               </ul>
            </div>

            <div class="ContentMenu3">
               <p class="MenuTitle">商城购物</p>
               <ul class="ul_Menu3">
                  <li class="li_Menu3 Item">
                     <p><img src="static/image/cart.png"></p>
                     <p>购物车</p>
                     <p class="Rborder"></p>
                  </li>
                  <router-link :to="{ path: 'myserviceorder',append:true}" tag="li" class="li_Menu3">
                     <p><img src="static/image/order.png"></p>
                     <p>购物订单</p>
                     <p class="Rborder"></p>
                  </router-link>
                  <li class="li_Menu3 Item">
                    <p><img src="static/image/shouhou.png"></p>
                     <p>售后服务</p>
                     <p class="Rborder"></p>
                  </li>
                  <router-link :to="{ path: 'address',append:true}" tag="li" class="li_Menu3">
                    <p><img src="static/image/shouhuonode.png"></p>
                     <p>收获地址</p>
                  </router-link>
               </ul>
            </div>

            <div class="ContentMenu4">
               <p class="MenuTitle">其他</p>
               <ul class="ul_Menu4">
                  <li class="li_Menu4 Item">
                     <p><img src="static/image/AssestDetails.png"></p>
                     <p>账户明细</p>
                     <p class="Rborder"></p>
                  </li>
                  <li class="li_Menu4 Item">
                     <p><img src="static/image/Attire.png"></p>
                     <p>个性装扮</p>
                     <p class="Rborder"></p>
                  </li>
                  <li class="li_Menu4 Item">
                    <p><img src="static/image/games.png"></p>
                     <p>游戏中心</p>
                     <p class="Rborder"></p>
                  </li>
                  <li class="li_Menu4">
                    <p><img src="static/image/Opinion.png"></p>
                     <p>意见反馈</p>
                  </li>
                                  <li class="li_Menu4 Item">
                     <p><img src="static/image/welfare.png"></p>
                     <p>有宠公益</p>
                     <p class="Rborder"></p>
                  </li>
                  <li class="li_Menu4 Item">
                     <p><img src="static/image/Authentication.png"></p>
                     <p>专业认证</p>
                     <p class="Rborder"></p>
                  </li>
                  <li class="li_Menu4 Item">
                    <p><img src="static/image/Settled.png"></p>
                     <p>商户入驻</p>
                     <p class="Rborder"></p>
                  </li>
                   <router-link :to="{ path: 'setting',append:true}" tag="li" class="li_Menu4">
                    <p><img src="static/image/Set.png"></p>
                     <p>洛奇设置</p>
                     </router-link>
               </ul>
            </div>
            <div style="width:100%;height:1rem;background:#fff;"></div>
        </div>
      </scroller>
    </div>

    <transition :name="transitionName" :mode="transitionMode">
<!--       <router-view></router-view> -->
      <div>
        <keep-alive>  <router-view v-if="$route.meta.keepAlive"></router-view> </keep-alive> 
        <router-view v-if="!$route.meta.keepAlive"></router-view> 
      </div>
    </transition>
	</div>
</template>

<script>
  import axios from 'axios'
  import {mapState, mapMutations} from 'vuex'
  import { Scroller,XSwitch,Group  } from 'vux'
  import {UserRegisterPhoneHas,UserRegister,CeShi,UserQQRegister} from '@/service/getdata'
  import {imgPCBaseUrl} from '@/config/env'
  import {UserImgFromat} from '@/config/mUtils'

  export default {
      components: {
      	Scroller,
      	XSwitch,
      	Group
      },
      beforeRouteEnter (to, from, next) {
        next()
      },
      beforeRouteLeave (to, from, next) {
        next();
      },
      beforeRouteUpdate (to, from, next) {
            // 如果isBack为true时，证明是用户点击了回退，执行slide-right动画
            console.log(to);
            console.log(from);
             let isBack = this.$router.isBack
             if (isBack) {
                this.transitionName = 'slide-right'
                this.transitionMode='';
                console.log("后退");
             } else {
                this.transitionName = 'router-slid'
                this.transitionMode='in-out';
             }
             // 做完回退动画后，要设置成前进动画，否则下次打开页面动画将还是回退
             // this.$router.isBack = false
             next()
      },
      data () {
        return {
        	UserBJH:0,
        	UserBJW:0, 
        	FirstGetUserBJH:true,
          transitionName:'router-slid',
          transitionMode:'in-out',
          imgPCBaseUrl:imgPCBaseUrl,
          // isLogin:false,
        }
      },
      mounted(){

      },
      computed: {
      ...mapState([
                  'LoginFrontPageUrl','isLogin','userInfo',
              ]),
      },
      props:[],
      methods: {
      	PageSlide(pos){
      		if(this.FirstGetUserBJH)
      		{
      			this.FirstGetUserBJH=false;
      			this.UserBJH=this.$refs.UserBJ.offsetHeight;
      			this.UserBJW=this.$refs.UserBJ.offsetWidth;
      		}
      		if(pos.top<0)
      		{
      		  // let UserBJH=this.$refs.UserBJ.offsetHeight;
      		  let TotalH=this.UserBJH+Math.abs(pos.top);
      		  // console.log(TotalH);
      		  this.$refs.UserBJ.style.height=TotalH+"px";
      		  if(TotalH>this.UserBJW){
      		  	this.$refs.UserBJ.style.width=TotalH+"px";
      		  	this.$refs.UserBJ.style.backgroundSize="auto "+TotalH+"px";
      		  	let PosX=-(TotalH-this.UserBJW)/2;
                  // $(".UserBJ").css("background-position-x",PosX+"px"); 
                  // console.log(this.$refs.UserBJ.style);
                  this.$refs.UserBJ.style.backgroundPositionX=PosX+"px";
      		  }
      		  else{
      		  	this.$refs.UserBJ.style.width=this.UserBJW+"px";
      		  	this.$refs.UserBJ.style.backgroundPositionX="0px";
      		  	this.$refs.UserBJ.style.backgroundSize="10rem auto";
      		  }
      	    }
      	},
        GoLogin(){
          this.$store.state.LoginFrontPageUrl=this.$route;
          console.log(this.$route);
          this.$router.push('/loginIndex');
        },
        UserImgFromat(userimg){
           return UserImgFromat(userimg);
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
      z-index:98;
          p, span{
              font-family: Helvetica Neue,Tahoma,Arial;
          }
  }

  .UserBJ{width:10rem;height:6rem;z-index:100;position:relative; 
  }
  .Login{background:url(../../../../../static/image/UserBJ.png) center center no-repeat;background-size:10rem auto;}
  .NoLogin{background:url(../../../../../static/image/CommonUserBJ.png) center center no-repeat;background-size:10rem auto;}

  .UserInfo{
    position:absolute;width:10rem;height:2.86rem;left:0rem;bottom:1.5rem;
    .UserImg{width:1.46rem;height:1.46rem;background:#fff;border-radius:0.73rem;overflow:hidden;border:solid 2px #fff;margin:0 auto;box-sizing: border-box;
      img{width:1.4rem;height:1.4rem;}
    }
    .UserName{
      width:10rem;height:1rem;display:flex;justify-content:center;align-items:center;
      .Level{padding:0rem 0.1rem;background:#fff;font-size:0.15rem;line-height:0.3rem;height:0.3rem;border-radius:0.12rem;color:#9b8077;}
      .Name{height:1rem;line-height:1rem;font-size:0.48rem;color:#fff;
        i.man{display:inline-block;width:0.3rem;height:0.3rem;margin-left:0.1rem;background:url(../../../../../static/image/man.png);background-size:0.3rem 0.3rem;}
      }
    }
    .UserNode{width:10rem;height:0.4rem;display:flex;justify-content:center;align-items:center;
      span{font-size:0.4rem;color:#fff;}
    }
  }
   .TopMenu{
    position:absolute;width:9.4rem;height:1.62rem;left:0.3rem;bottom:-0.81rem;border-radius:0.2rem;background:#fff;list-style:none;display:flex;align-items:center;justify-content:center;
        .MenuItem{
          width:25%;height:100%;align-items:center;justify-content:center;
          .Centent{
            height:100%;width:100%;padding:0.11rem 0rem;
            p{width:100%;height:50%;margin:0rem;text-align:center;line-height:0.7rem;font-size: 0.37rem;
      color: #8f8f94;}
            p.Title{font-size:0.32rem;color:#5f605f;}
            p.Num{font-size:0.34rem;color:#5a6166;}
          }
        }   
   }
   .Middle{
      position:absolute;top:6rem;left:0rem;bottom:0rem;width:100%;
  }
   .UserContent{width:10rem;background:#f7f3f7;padding:1.2rem 0rem 0rem 0rem;overflow:hidden;
      .SignAndNews{
        width:100%;height:1.85rem;background:#fff;border-bottom:solid 0.05px #f7f3f7;padding:0.5rem 0rem;    box-sizing: border-box;
        .Sign{
          border-right:solid 0.05px #f7f3f7;box-sizing: border-box;
        }
        .Item{
          width:50%;height:100%;float:left;display:flex;align-items:center;justify-content:center;
          img{
            width:0.5rem;height:0.5rem;
          }
          span{
            font-size:0.35rem;margin-left:0.2rem;
          }
        }
      }
      .CententMenu1{
        width:100%;height:2rem;background:#fff;list-style:none;
         .MenuItem{
          width:25%;height:100%;align-items:center;justify-content:center;float:left;
          .Centent{
            height:100%;width:100%;padding:0.2rem 0rem;
            p{width:100%;height:50%;margin:0rem;text-align:center;line-height:0.8rem;}
            p.Titlemenu1{font-size:0.32rem;color:#5f605f;text-align:center;}
            p.Num{font-size:0.34rem;color:#6443b5;}
          } 
        }  
      }
      .ContentMenu2{
        width:100%;height:3.5rem;margin-top:0.3rem;background:#fff;
        .MenuTitle{width:100%;height:1rem;line-height:1rem;font-size:0.36rem;padding-left:0.4rem;margin:0rem;color:#6443b5;}
        .ul_Menu2{
          width:100%;height:2.3rem;list-style:none;border-top:solid 0.05px #f7f3f7;
          .li_Menu2{
            width:25%;height:100%;float:left;padding:0.35rem 0rem;
            p{width:100%;height:0.8rem;margin:0rem;display:flex;align-items:center;justify-content:center;font-size:0.32rem;color:#5f605f;
              img{width:0.6rem;height:0.6rem;}
            }
          }
          .Item{position:relative;
            .Rborder{position:absolute;margin:0rem;width:100%;height:0.7rem;left:0rem;top:0.8rem;border-right:solid 0.05px #f1f1f1;}
          }
        }
      }

      .ContentMenu3{
        width:100%;height:3.5rem;margin-top:0.3rem;background:#fff;
        .MenuTitle{width:100%;height:1rem;line-height:1rem;font-size:0.36rem;padding-left:0.4rem;margin:0rem;color:#6443b5;float: left;}
        .ul_Menu3{
          width:100%;height:2.3rem;list-style:none;border-top:solid 0.05px #f7f3f7;
          .li_Menu3{
            width:25%;height:100%;float:left;padding:0.35rem 0rem;    box-sizing: border-box;
            p{width:100%;height:0.8rem;margin:0rem;display:flex;align-items:center;justify-content:center;font-size:0.32rem;color:#5f605f;
              img{width:0.6rem;height:0.6rem;}
            }
          }
          .Item{position:relative;
            .Rborder{position:absolute;margin:0rem;width:100%;height:0.7rem;left:0rem;top:0.8rem;border-right:solid 0.05px #f1f1f1;}
          }
        }
      }

      .ContentMenu4{
        width:100%;height:5.8rem;margin-top:0.3rem;background:#fff;
        .MenuTitle{width:100%;height:1rem;line-height:1rem;font-size:0.36rem;padding-left:0.4rem;margin:0rem;color:#6443b5;}
        .ul_Menu4{
          width:100%;height:4.6rem;list-style:none;border-top:solid 0.05px #f7f3f7;
          .li_Menu4{
            width:25%;height:50%;float:left;padding:0.35rem 0rem;
            p{width:100%;height:0.8rem;margin:0rem;display:flex;align-items:center;justify-content:center;font-size:0.32rem;color:#5f605f;
              img{width:0.6rem;height:0.6rem;}
            }
          }
          .Item{position:relative;
            .Rborder{position:absolute;margin:0rem;width:100%;height:0.7rem;left:0rem;top:0.8rem;border-right:solid 0.05px #f1f1f1;}
          }
        }
      }

   }

    .router-slid-enter-active, .router-slid-leave-active {
        transition: all .4s;
    }
    .router-slid-enter, .router-slid-leave-active {
        transform: translate3d(2rem, 0, 0);
        opacity: 0;
    }
    .slide-right-enter-active,.slide-right-leave-active{
      transition: all .4s;
    }
    .slide-right-leave-to {
        transform: translate3d(2rem, 0, 0);
        opacity: 0;
    }
    .slide-right-enter{
      opacity: 0;
    }
    .slide-right-enter-to{
      opacity: 1;
    }
</style>
