<template>
<div>
<div class="BigBJ">
  <div class="TopHead">
    <img src="static/image/back2.png" alt="" @click="$router.go(-1)">
  </div>
  <div class="PageTitle">
  <p class="Big">设置新密码</p>
  </div>
  <div class="BigIput">
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
      <img src="static/image/png/RegisterY1.png" alt="">
      <img src="static/image/png/RegisterY1.png" alt="">
      <img src="static/image/png/RegisterY2.png" alt="">
    </div>
    <div class="Right" @click="SubmitUpdate()">
      <span>完成</span>
    </div>
  </div>
</div>
</div>
</template>

<script>
  import axios from 'axios'
  import {mapState, mapMutations} from 'vuex'
  import {UpdateUserPassword} from '../../service/getdata'
  export default{
    data(){
      return{
        PasswordState:true,
        UserPassword:'',
      }
    },

    mounted(){
    },
    computed: {
      ...mapState([
                  'UserRegisterName','UserRegisterPassword','UserRegisterPhone',
              ]),
      UserPhone:function(){
            return this.$route.params.Phone;
         }
    },
    methods:{
      TagglePassword(){
         this.PasswordState=!this.PasswordState;
      },
      SubmitUpdate(){
        // axios.post("user/UpdateUserPassword",{"RegisterPhone":this.UserPhone,"Password":this.UserPassword}).then((response)=>{
        UpdateUserPassword({"RegisterPhone":this.UserPhone,"Password":this.UserPassword}).then(response=>{
          if(response==true)
          {
            this.$vux.toast.text('修改成功!', 'bottom');
            this.$router.push('/login');
          }
          else
          {
            this.$vux.toast.text('修改失败!', 'bottom');
          }
        })
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