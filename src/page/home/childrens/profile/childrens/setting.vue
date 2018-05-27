<template>
<div class="rating_page">
<head-top :Title="Title" :Color="Color" :MidType="MidType"></head-top>
<div class="Middle">
	<scroller ref="scroller" lock-x height="-56" scrollbar-y>
      <div>
      <div class="TopData" style="margin-top:0.2rem;">
        <line-menu v-for="(item, idx) in TopData" :MenuLeft="item.MenuLeft" :MenuRight="item.MenuRight" :UrlPath="item.UrlPath" :key="idx"></line-menu>
      </div>
      <div class="MiddleData" style="margin-top:0.5rem;">
        <line-menu v-for="(item, idx) in MiddleData" :MenuLeft="item.MenuLeft" :MenuRight="item.MenuRight" :UrlPath="item.UrlPath" :key="idx"></line-menu>
      </div>
      <div class="BottomData" style="margin-top:0.5rem;">
        <line-menu v-for="(item, idx) in BottomData" :MenuLeft="item.MenuLeft" :MenuRight="item.MenuRight" :UrlPath="item.UrlPath" :key="idx"></line-menu>
      </div>
      <div class="OutLogin" @click="OutLogin()">
          <span>退出登录</span>
      </div>
            <div style="width:100%;height:0.5 rem;">
      </div>
      </div>
    </scroller>
</div>
</div>
</template>

<script>
import axios from 'axios'
import {mapState, mapMutations} from 'vuex'
import headTop from '@/components/Head.vue'
import lineMenu from '@/components/common/LineMenu.vue'
import {setStore,getStore,removeStore} from '@/config/mUtils.js'
import { Scroller } from 'vux'
export default {
    components: {
    	headTop,
    	Scroller,
        lineMenu
    },
    data () {
      return {
        Title:'设置',
        Color:0,
        MidType:0,
        MenuLeft:'个人资料',
        MenuRight:'',
        TopData:[
            {
                MenuLeft:'个人资料',
                MenuRight:'',
                UrlPath:'',
            },{
                MenuLeft:'账号安全',
                MenuRight:'',
                UrlPath:'',
            }],
            MiddleData:[{
                MenuLeft:'消息提醒',
                MenuRight:'',
                UrlPath:'',
            },{
                MenuLeft:'视频播放设置',
                MenuRight:'',
                UrlPath:'',
            },{
                MenuLeft:'黑名单',
                MenuRight:'',
                UrlPath:'',
            },{
                MenuLeft:'通用',
                MenuRight:'',
                UrlPath:'',
            }],
            BottomData:[{
                MenuLeft:'小技巧',
                MenuRight:'',
                UrlPath:'',
            },{
                MenuLeft:'打个分呗',
                MenuRight:'',
                UrlPath:'',
            },{
                MenuLeft:'检测新版本',
                MenuRight:'当前版本4.2.0',
                UrlPath:'',
            },{
                MenuLeft:'清楚缓存(11.11MB)',
                MenuRight:'',
                UrlPath:'',
            },{
                MenuLeft:'关于有宠',
                MenuRight:'',
                UrlPath:'',
            }
        ],
      }
    },
    mounted(){

    },
    destroyed(){

    },
    computed: {
    	...mapState([
                'PackageCartList','userInfo','isLogin'
            ]),
    },
    props:[],
    methods: {
    	...mapMutations([
                'UPDATE_PACKAGECART',
            ]),
        OutLogin(){
            removeStore('userInfo');
            this.$store.state.userInfo=null;
            this.$store.state.isLogin=false;
            this.$router.back(-1);
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
		z-index: 200;
        p, span{
            font-family: Helvetica Neue,Tahoma,Arial;
        }
}
.Middle{
    position:absolute;top:1.5rem;left:0rem;bottom:0rem;width:100%;
}
.ShopTop{width:10rem;height:1.2rem;padding:0rem 0.25rem;box-sizing:border-box;background-color:#faf8f8;display:flex;align-items:center;
	.Left{width:90%;height:100%;display:flex;align-items:center;
		.img1{width:0.7rem;height:0.7rem;}
	.img2{width:0.6rem;height:0.5rem;margin-left:0.3rem;}
	span{margin-left:0.3rem;font-size:0.4rem;}
	}
	.Right{width:10%;height:100%;display:flex;align-items:center;
		span{font-size:0.4rem;color:#bcbcbc;}
	}
}
.OutLogin{
    width:100%;height:1.4rem;background:#fff;display:flex;align-items:center;justify-content:center;margin:0.5rem 0rem;font-size:0.45rem;
}
</style>
