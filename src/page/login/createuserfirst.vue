<template>
<div class="BigBJ">
  <div class="TopHead">
    <img src="static/image/back2.png" alt="" @click="$router.go(-1)">
  </div>
  <div class="PageTitle">
  <p>输入用户名和密码</p>
  </div>
  <div class="BigIput">
    <div class="InputItem">
        <input type="text" class="UserName" v-model="UserName" @blur="UserNameChange()" placeholder="输入用户名">
    </div>
    <div class="UserNameYes MessageItem" v-show="UserNameHas==1">
      <span class="Yes">该用户名可用</span>
      <img src="static/image/png/dui.png" alt="">
    </div>
    <div class="UserNameNo MessageItem" v-show="UserNameHas==2">
      <span class="No">该用户名已被注册</span>
      <img src="static/image/png/cuo.png" alt="">
    </div>
    <div class="InputItem">
      <input type="password" v-show="PasswordState" class="UserPassword" v-model="UserPassword" placeholder="输入密码">
      <input type="text" v-show="!PasswordState" class="UserPassword" v-model="UserPassword" placeholder="输入密码">
      <div class="Right">
      <div class="Btn">
      <span v-show="PasswordState" @click="TagglePassword()">显示</span>
      <span v-show="!PasswordState" @click="TagglePassword()">隐藏</span>
      </div>
      </div>
    </div>
  </div>
  <div class="NextPage">
    <div class="Left">
      <img src="static/image/png/RegisterY2.png" alt="">
      <img src="static/image/png/RegisterY1.png" alt="">
      <img src="static/image/png/RegisterY1.png" alt="">
    </div>
<!--     <router-link :to="'/createusersecond'"> -->
    <div class="Right" @click="NextPage()">
      <span>下一步</span>
    </div>
<!--     </router-link> -->
  </div>
</div>
</template>

<script>
	   import axios from 'axios'
     import {mapState, mapMutations} from 'vuex'
     import {JudgeHasUser} from '../../service/getdata'
	export default{
		data(){
			return{
        PasswordState:true,
        UserName:"",
        UserPassword:"",
        UserNameHas:0,
			}
		},

		mounted(){
      this.initData();
		},
    computed: {
    ...mapState([
                'UserRegisterName','UserRegisterPassword','UserRegisterPhone',
            ]),
    },
    methods:{
      initData(){
        if(this.$route.query.UserName)
        {
          console.log("mingz");
          this.UserName=this.$route.query.UserName;
          this.UserNameChange();
        }
      },
      TagglePassword(){
        this.PasswordState=!this.PasswordState;
      },
      UserNameChange(){
        if(this.UserName!="")
        {
          // axios.get("user/JudgeHasUser",{params:{"UserName":this.UserName}}).then((response)=>{
          JudgeHasUser(this.UserName).then(response=>{    
            if(response==0){
              this.UserNameHas=2;
              this.$vux.toast.text('用户名已被注册!', 'bottom');
            }else{
              this.UserNameHas=1;
              this.$vux.toast.text('用户名可用!', 'bottom');
            }
          });
        }
        else
        {
          this.UserNameHas=0;
        }
      },
      NextPage(){
        if(this.UserNameHas==1&&this.UserPassword!="")
        {
          this.$store.state.UserRegisterName=this.UserName;
          this.$store.state.UserRegisterPassword=this.UserPassword;
          if(this.$route.query.CreateByType)
          {
            this.$router.push({ path: '/createusersecond', query: {CreateByType:this.$route.query.CreateByType}});
          }
          else
          {
            this.$router.push('/createusersecond');
          }
        }
        else
        {
          this.$vux.toast.text('请输入正确的信息!', 'bottom');
        }
      }
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
      .MessageItem{
        width:100%;height:0.8rem;display:flex;align-items:center;justify-content:space-between;
        span{
          font-size:0.4rem;
          &.Yes{color:#1afa29;}
          &.No{color:#d81e06;}
        }
        img{
          width:0.4rem;height:0.4rem;
        }
      }
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
      // a{width:40%;height:90%;display:flex;
        .Right{
          width:40%;height:90%;border:solid 1px #fff;border-radius:4px;background-color:none;display:flex;align-items:center;justify-content:center;
          span{
            color:white;font-size:0.55rem;
          }
        }
      // }
    }
  }
</style>