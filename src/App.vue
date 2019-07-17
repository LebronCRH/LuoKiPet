<template>
  <div id="app">
  <transition :name="transitionName" :mode="transitionMode">
<!--   <keep-alive> -->
    <router-view></router-view>
<!--     </keep-alive> -->
    </transition>
<!--     <fullscreen-img></fullscreen-img> -->
  </div>
</template>

<script>
import cookie from '@/utils/cookie'
import {mapState, mapMutations} from 'vuex'
import FullscreenImg from '@/components/IMChat/FullscreenImg'
import {setStore, getStore,removeStore,} from '@/config/mUtils'
export default {
  beforeRouteEnter (to, from, next) {
        // console.log("进入zhu路由")  //undefined，不能用this来获取vue实例
        // console.log(from)
        // console.log(to)
        next()
      },
  beforeRouteLeave (to, from, next) {
        console.log('离开zhu路由')
        next()
  },
  beforeRouteUpdate (to, from, next) {
        // 如果isBack为true时，证明是用户点击了回退，执行slide-right动画
        // console.log(this.$router.PriveUrl);
         let isBack = this.$router.isBack
         if (isBack) {
            this.transitionName = 'slide-right'
            this.transitionMode='';
            // console.log("后退")
         } else {
            this.transitionName = 'router-slid'
            this.transitionMode='in-out';
         }
         // console.log("zhu路由")
         // 做完回退动画后，要设置成前进动画，否则下次打开页面动画将还是回退
         // this.$router.isBack = false
         next()
  },
  data () {
    return {
      transitionName:'router-slid',
      transitionMode:'in-out',
    }
  },
  // 所有页面更新都会触发此函数
  updated () {
    // 提交sdk连接请求
    if(getStore('userInfo'))
    {
      // console.log("有值")
      this.$store.dispatch('connect')
      this.$store.dispatch('updateRefreshState')
    }
    else{
      // console.log("没有值")
    }
  },
  components: {
    FullscreenImg,
  },
  computed: {
    ...mapState([
                  'ShareServices','OtherAuths','StatusbarHeight','StatusbarHeightRem',
              ]),
  },
  mounted(){
      this.initOtherService();
  },
  methods:{
    initOtherService(){
      var that=this;
      document.addEventListener("plusready", function(){
          that.$store.state.StatusbarHeight= plus.navigator.getStatusbarHeight();//获取设备的状态栏高度
          that.$store.state.StatusbarHeightRem=plus.navigator.getStatusbarHeight()*10/window.screen.width;//获取设备的状态栏高度Rem值
          if(window.plus)
          {
            plus.share.getServices((services)=>{
              for(var i in services){
                var service=services[i];
                console.log(service.id+": "+service.description);
                that.$store.state.ShareServices[service.id]=service;
              }
            }, function(e){
              alert( "获取分享服务列表失败："+e.message );
            } );
            plus.oauth.getServices((services)=>{
              console.log(services);
              for(var i in services){
                var service=services[i];
                console.log(service.id+": "+service.description);
                that.$store.state.OtherAuths[service.id]=service;
              }
            },function(e){
              outLine("获取登录认证失败："+e.message);
            });
          }
        },false);
    },
  }
}
</script>

<style lang="less">
@import '~vux/src/styles/reset.less';

body {
  background-color: #fbf9fe;
}
p{margin:0px;padding:0px;}
.router-slid-enter-active, .router-slid-leave-active {
    transition: all .4s;
}
.router-slid-enter, .router-slid-leave-to {
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
