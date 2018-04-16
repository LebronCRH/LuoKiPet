<template>
	<div class="rating_page">
	<head-top :Title="Title" :Color="Color" :MidType="MidType"></head-top>
	<div class="Middle">
	<scroller ref="scroller" lock-x height="-56" scrollbar-y use-pulldown :use-pullup=true @on-scroll="PageSlide" @on-pullup-loading="UpPagedade" @on-pulldown-loading="DownPageData" v-model="scrollerStaues">
	<div>
	<div class="ps_Item">

      <div class="ps_Top">

     <div class="ps_Userimg">
     <img src="static/image/user1.jpg">
     </div>

     <div class="ps_Userinfo">
       <p class="pt"><span class="ps_username">不良人</span><span class="ps_addr">杭州市</span></p>
       <p class="pb"><img class="ps_petimg" src="static/image/user2.jpg"><span class="ps_petname">小洛奇</span><span class="ps_petcategory">拉布拉多</span></p>
     </div>

     <div class="ps_gz">
     <button class="ps_bt">+关注</button>
     </div>

      </div>

      <div class="ps_message">
      <p>哈哈，我的小洛奇
      </p>
      </div>

      <div class="ps_listimg">
        <img src="static/image/user3.jpg">
      </div>

      </div>
<div>
<div class="ps_commenttop">
    <p class="left fl">评论</p>
    <p class="right fr" ui-sref="petshow_support">谁赞过</p>
</div>
<ul class="ps_ulcomment">
   <li class="ps_licomment">
   <div class="ps_userimg">
   <img src="static/image/user1.jpg">
   </div>
   <div class="ps_content">
   <p class="ps_username">Chenrenhui~</p>
   <p class="ps_usercontent">啦啦啦啦啦</p>
   </div>
   <div class="ps_time">
   <p>一小时后</p>
   </div>
   </li>
      <li class="ps_licomment">
   <div class="ps_userimg">
   <img src="static/image/user1.jpg">
   </div>
   <div class="ps_content">
   <p class="ps_username">Chenrenhui~</p>
   <p class="ps_usercontent">啦啦啦啦啦</p>
   </div>
   <div class="ps_time">
   <p>一小时后</p>
   </div>
   </li>
      <li class="ps_licomment">
   <div class="ps_userimg">
   <img src="static/image/user1.jpg">
   </div>
   <div class="ps_content">
   <p class="ps_username">Chenrenhui~</p>
   <p class="ps_usercontent">啦啦啦啦啦</p>
   </div>
   <div class="ps_time">
   <p>一小时后</p>
   </div>
   </li>
      <li class="ps_licomment">
   <div class="ps_userimg">
   <img src="static/image/user1.jpg">
   </div>
   <div class="ps_content">
   <p class="ps_username">Chenrenhui~</p>
   <p class="ps_usercontent">啦啦啦啦啦</p>
   </div>
   <div class="ps_time">
   <p>一小时后</p>
   </div>
   </li>
      <li class="ps_licomment">
   <div class="ps_userimg">
   <img src="static/image/user1.jpg">
   </div>
   <div class="ps_content">
   <p class="ps_username">Chenrenhui~</p>
   <p class="ps_usercontent">啦啦啦啦啦</p>
   </div>
   <div class="ps_time">
   <p>一小时后</p>
   </div>
   </li>
      <li class="ps_licomment">
   <div class="ps_userimg">
   <img src="static/image/user1.jpg">
   </div>
   <div class="ps_content">
   <p class="ps_username">Chenrenhui~</p>
   <p class="ps_usercontent">啦啦啦啦啦</p>
   </div>
   <div class="ps_time">
   <p>一小时后</p>
   </div>
   </li>
      <li class="ps_licomment">
   <div class="ps_userimg">
   <img src="static/image/user1.jpg">
   </div>
   <div class="ps_content">
   <p class="ps_username">Chenrenhui~</p>
   <p class="ps_usercontent">啦啦啦啦啦</p>
   </div>
   <div class="ps_time">
   <p>一小时后</p>
   </div>
   </li>
</ul>
	</div>
	</div>
	    <div slot="pulldown" class="xs-plugin-pulldown-container xs-plugin-pulldown-down" style="position: absolute; width: 100%; height:1.4rem; line-height:1.4rem; top:-1.4rem; text-align: center;">
        <span v-show="scrollerStaues.pulldownStatus === 'default'"></span>
        <span class="pulldown-arrow" v-show="scrollerStaues.pulldownStatus === 'down' || scrollerStaues.pulldownStatus === 'up'" :class="{'rotate': scrollerStaues.pulldownStatus === 'up'}">↓</span>
        <span v-show="scrollerStaues.pulldownStatus === 'loading'"><spinner type="ios-small"></spinner></span>
      </div>
      <div slot="pullup" class="xs-plugin-pullup-container xs-plugin-pullup-up" style="position: absolute; width: 100%; height:1.4rem; line-height:1.4rem; bottom:-1.4rem; text-align: center;">
        <span v-show="scrollerStaues.pullupStatus === 'default'"></span>
        <span class="pulldown-arrow" v-show="scrollerStaues.pullupStatus === 'down' || scrollerStaues.pullupStatus === 'down'" :class="{'rotate': scrollerStaues.pullupStatus === 'down'}">↑</span>
        <span v-show="scrollerStaues.pullupStatus === 'loading'"><spinner type="ios-small"></spinner></span>
      </div>
	</scroller>
	</div>
	</div>
</template>

<script>
import axios from 'axios'
import headTop from '@/components/Head.vue'
import { Scroller,XSwitch,Group,Spinner  } from 'vux'

export default {
    components: {
    	headTop,
    	Scroller,
    	XSwitch,
    	Group,
    	Spinner
    },
    data () {
      return {
        Title:'动态详情',
        Color:0,
        MidType:0,
        scrollerStaues: {
          pulldownStatus: 'default',
          pullupStatus: 'default'
        },
        Service:{
        	serviceName:null,
        	Category:null,
        	ForServiceID:null,
        	Category:null
        },
        servicelistdata:[],
        Title2:"可用30洛奇豆抵扣￥3",
        BuyNum:2,
        PackagePrice:35,
        UseLuokiBean:false,
        LuokiBean:3,
        Discount:10,
        UseDiscount:true,
        BuyPackage:{
        	name:null,
        	sprice:0,
        	oldprice:0
        }
      }
    },
    mounted(){

    },
    computed: {

    },
    props:[],
    methods: {
    	UpPagedade () {
        console.log(66);
        this.$nextTick(() => {
        setTimeout(() => {
          this.$refs.scroller.donePullup()
        }, 1000)
        })
      },
      DownPageData () {
        console.log("555");
        this.$nextTick(() => {
        setTimeout(() => {
          this.$refs.scroller.donePulldown()
        }, 1000)
       })
      },
      PageSlide (pos) {

      },
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
		z-index: 100;
        p, span{
            font-family: Helvetica Neue,Tahoma,Arial;
        }
}
.Middle{
    position:absolute;top:1.3rem;left:0rem;bottom:0rem;width:100%;
}
	.ps_Item{
	width:10rem;margin-top:0.3rem; background-color:#fff;
	.ps_Top{
		width:100%;height:1.5rem;background-color:#fff;
		.ps_Userimg{
			width:1.5rem;height:1.5rem;padding:0.2rem;float:left;box-sizing: border-box;
			img{
				width:1.1rem;height:1.1rem;border-radius:0.55rem;
			}
		}
		.ps_Userinfo{
			width:6.5rem;height:1.5rem;float:left;padding-top:0.15rem;padding-bottom:0.15rem;
			.pt{
				width:100%;height:0.65rem;line-height:0.65rem;margin:0rem;display: flex;
    align-items: center;
				.ps_username{
					color:#38dbb0;font-size:0.35rem;line-height:0.65rem;margin-right: 0.2rem;padding:0rem;
				}
				.ps_addr{
					color:#ddd;font-size:0.15rem;line-height:0.85rem;padding:0rem;
				}
			}
			.pb{
				 height:0.55rem;line-height:0.55rem;margin:0rem;padding:0rem;display:flex;align-items:center;
				.ps_petimg{width:0.4rem;height:0.4rem;border-radius:0.2rem;}
				.ps_petname{color:#000;font-size:0.25rem;line-height:0.65rem;margin-right:0.2rem;margin-left:0.2rem;padding:0rem;}
				.ps_petcategory{color:#ddd;font-size:0.15rem;line-height:0.65rem;padding:0rem;}
			}
		}
		.ps_gz{
			width:2rem;height:1.5rem;float:left;text-align:center;display:flex;align-items: center;
			.ps_bt{width:1.5rem;height:0.6rem;padding:0rem;border:none;margin-top:0.45rem;color:red;border:solid 1px #ddd;border-radius:0.15rem;font-size:0.15rem; }
		}
	}
	.ps_message{width:100%;padding-left:0.3rem;display:flex;
    align-items: center;
		p{line-height:0.8rem;font-size:0.4rem;color:#000;padding:0rem;margin:0rem;}
	}
	.ps_listimg{
		img{width:10rem;}
	}
	.psdiv_Support{width:100%;overflow:hidden;
				.ps_SupportNum{
			float:left;width:0.7rem;height:0.7rem;border-radius:0.35rem;text-align:center;border:solid 0.05rem #ddd;box-sizing:border-box;margin:0.2rem 0.1rem;
			span{line-height:0.7rem;color:#ddd;font-size:0.35rem;}
		}
	}
	.ps_Support{width:90%;padding:0.15rem 0.25rem;height:1.1rem;list-style:none;margin:0rem;box-sizing:border-box;float:left;
		.ps_liSupport{float:left;margin-right:0.25rem;width:0.8rem;height:0.8rem;display: flex;
    align-items: center;
			img{width:0.8rem;height:0.8rem;border-radius:0.4rem;}
		}
	}
	.ps_edit{
		width:10rem;height:0.95rem;list-style:none;padding:0.15rem 0.25rem;box-sizing:border-box;margin:0rem;
		.ps_editLi{width:1.35rem;height:100%;padding:0rem 0.1rem;background-color:#eeeeee;border-radius:2px;margin-right:0.5rem;float:left;display:flex;justify-content:space-around;align-items:center;
			span{display:inline-block;color:#707070;line-height:0.75rem;font-size:0.25rem;height:100%;
			}
			&.active{span{color:#d81e06;}}
			i{width:0.35rem;height:0.35rem;display:inline-block;background-size:0.35rem 0.35rem;}
		}
		.ps_editLi.ps_editLi1{
			i{background:url(../../../assets/image/love.png);background-size:0.35rem 0.35rem;
			}
			&.active{
				i{background:url(../../../assets/image/loveA.png);background-size:0.35rem 0.35rem;}
			}
		}
				.ps_editLi.ps_editLi2{
			i{background:url(../../../assets/image/comment.png);background-size:0.35rem 0.35rem;}
			&active{background:url(../../../assets/image/commentA.png);background-size:0.35rem 0.35rem;}
		}
				.ps_editLi.ps_editLi3{
			i{background:url(../../../assets/image/Collection.png);background-size:0.35rem 0.35rem;}
			&active{background:url(../../../assets/image/CollectionA.png);background-size:0.35rem 0.35rem;}
		}
				.ps_editLi.ps_editLi4{
			i{background:url(../../../assets/image/share.png);background-size:0.35rem 0.35rem;}
			&active{background:url(../../../assets/image/shareA.png);background-size:0.35rem 0.35rem;}
		}
	}
	.ps_comment{
		width:10rem;list-style:none;padding:0.15rem 0.25rem;box-sizing:border-box;margin:0rem;
		.comment_li{
			height:0.5rem;margin:0rem;padding:0rem;display: flex;
    align-items: center;
			.comment_user{color:#69c0f6;line-height:0.5rem;font-size:0.3rem;}
			.mao{color:#6f6f6f;line-height:0.5rem;font-size:0.3rem;}
			.comment_content{color:#6f6f6f;line-height:0.5rem;font-size:0.3rem;margin-left:0.2rem;}
		}
	}
}
.ps_commenttop{
	width:10rem;height:1.1rem;padding:0.25rem 0.2rem;margin:0rem;background-color:#fff;
	display:flex;align-items:center;
	.left{height:0.6rem;line-height:0.6rem;font-size:0.3rem;float:left;margin:0rem;width:2rem;}
	.right{height:0.6rem;padding:0rem 0.2rem;font-size:0.3rem;float:right;margin:0rem;margin-left:6.2rem;background-color:#efeff4;border-radius:0.15rem;}
}
.ps_ulcomment{width:10rem;list-style:none;padding:0rem;background-color:#fff;
	.ps_licomment{
		width:10rem;height:1.37rem;padding:0.25rem 0.2rem;margin:0rem;
		.ps_userimg{width:0.87rem;height:0.87rem;margin-right:0.15rem;float:left;border-radius:0.435rem;overflow:hidden;
			img{width:0.87rem;height:0.87rem;border-radius:0.435rem;float: left;}
		}
	}
	.ps_content{
		width:6.3rem;height:0.87rem;float:left;
		.ps_username{width:7.9rem;height:0.43rem;line-height:0.43rem;font-size:0.35rem;color:#3d6fa7;margin:0rem;}
		.ps_usercontent{width:7.9rem;height:0.34rem;line-height:0.44rem;font-size:0.33rem;color:#000;margin:0rem;margin-top:0.1rem}
	}
	.ps_time{
		width:1.87rem;height:0.87rem;margin-left:0.3rem;float:left;text-align:right;
		p{height:0.87rem;line-height:0.87rem;font-size:0.25rem;margin:0rem;}
	}
}
</style>
