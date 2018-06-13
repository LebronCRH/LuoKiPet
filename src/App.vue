<template>
  <div id="app">
  <transition name="router-slid" mode="in-out">
    <router-view></router-view>
    </transition>
<!--     <fullscreen-img></fullscreen-img> -->
  </div>
</template>

<script>
import cookie from '@/utils/cookie'
import FullscreenImg from '@/components/IMChat/FullscreenImg'
import {setStore, getStore,removeStore,} from '@/config/mUtils'
export default {
  // name: 'app'
  data () {
    return {

    }
  },
  // 所有页面更新都会触发此函数
  updated () {
    // 提交sdk连接请求
    if(getStore('userInfo'))
    {
      console.log("有值")
      this.$store.dispatch('connect')
      this.$store.dispatch('updateRefreshState')
    }
    else{
      console.log("没有值")
    }
  },
  components: {
    FullscreenImg,
  },
  computed: {
    // 是否显示导航条
  }
}
</script>

<style lang="less">
@import '~vux/src/styles/reset.less';

body {
  background-color: #fbf9fe;
}
.router-slid-enter-active, .router-slid-leave-active {
    transition: all .4s;
}
.router-slid-enter, .router-slid-leave-active {
    transform: translate3d(2rem, 0, 0);
    opacity: 0;
}
</style>
