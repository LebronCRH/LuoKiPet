<template>
	<div>
<div class="ps_Item">
<router-link :to="{ path: '/petshowIndex/petshowdetails'}">
   <div class="ps_Top">
     <div class="ps_Userimg">
     <img src="../../../assets/image/user1.jpg">
     </div>
     <div class="ps_Userinfo">
       <p class="pt"><span class="ps_username">不良人</span><span class="ps_addr">杭州市</span></p>
       <p class="pb"><img class="ps_petimg" src="../../../assets/image/user2.jpg"><span class="ps_petname">小洛奇</span><span class="ps_petcategory">拉布拉多</span></p>
     </div>
     <div class="ps_gz">
     <button class="ps_bt">+关注</button>
     </div>
   </div>
   </router-link>
   <div class="ps_message">
   <p>哈哈，我的小洛奇
   </p>
   </div>
   <div class="ps_listimg" ui-sref="petshow_details">
   <img src="../../../assets/image/user3.jpg">
   </div>
   <div class="psdiv_Support">
   <ul class="ps_Support">
   <li class="ps_liSupport">
   <img src="../../../assets/image/user1.jpg">
   </li>
      <li class="ps_liSupport">
   <img src="../../../assets/image/user2.jpg">
   </li>
      <li class="ps_liSupport">
   <img src="../../../assets/image/user3.jpg">
   </li>
      <li class="ps_liSupport">
   <img src="../../../assets/image/user1.jpg">
   </li>
      <li class="ps_liSupport">
   <img src="../../../assets/image/user2.jpg">
   </li>
   <li class="ps_liSupport">
   <img src="../../../assets/image/user1.jpg">
   </li>
      <li class="ps_liSupport">
   <img src="../../../assets/image/user2.jpg">
   </li>
      <li class="ps_liSupport">
   <img src="../../../assets/image/user3.jpg">
   </li>
   </ul>
      <div class="ps_SupportNum">
   <span>5</span>
   </div>
   </div>
   <ul class="ps_edit">
   <li class="ps_editLi ps_editLi1" ng-class="select==true?'active':''" ng-click="favorite()">
   <i></i>
   <span>点赞</span>
   </li>
      <li class="ps_editLi ps_editLi2">
         <i></i>
   <span>评论</span>
   </li>
      <li class="ps_editLi ps_editLi3">
         <i></i>
   <span>收藏</span>
   </li>
      <li class="ps_editLi ps_editLi4">
         <i></i>
   <span>分享</span>
   </li>
   </ul>
   <ul class="ps_comment">
   <li class="comment_li">
   <span class="comment_user">可惜没如果</span><span class="mao">:</span><span class="comment_content">好可爱啊</span>
   </li>
   <li class="comment_li">
   <span class="comment_user">不能说的秘密</span><span class="mao">:</span><span class="comment_content">竟然比你还高哦，简直不可思议</span>
   </li>
   </ul>
</div>
<div class="ps_Item">
   <div class="ps_Top">
     <div class="ps_Userimg">
     <img src="../../../assets/image/user2.jpg">
     </div>
     <div class="ps_Userinfo">
       <p class="pt"><span class="ps_username">不良人</span><span class="ps_addr">杭州市</span></p>
       <p class="pb"><img class="ps_petimg" src="../../../assets/image/user3.jpg"><span class="ps_petname">小洛奇</span><span class="ps_petcategory">拉布拉多</span></p>
     </div>
     <div class="ps_gz">
     <button class="ps_bt">+关注</button>
     </div>
   </div>
   <div class="ps_message">
   <p>哈哈，我的小洛奇
   </p>
   </div>
   <div class="ps_listimg" ui-sref="petshow_details">
   <img src="../../../assets/image/user2.jpg">
   </div>
<div class="psdiv_Support">
   <ul class="ps_Support">
   <li class="ps_liSupport">
   <img src="../../../assets/image/user1.jpg">
   </li>
      <li class="ps_liSupport">
   <img src="../../../assets/image/user2.jpg">
   </li>
      <li class="ps_liSupport">
   <img src="../../../assets/image/user3.jpg">
   </li>
      <li class="ps_liSupport">
   <img src="../../../assets/image/user1.jpg">
   </li>
      <li class="ps_liSupport">
   <img src="../../../assets/image/user2.jpg">
   </li>
   <li class="ps_liSupport">
   <img src="../../../assets/image/user1.jpg">
   </li>
      <li class="ps_liSupport">
   <img src="../../../assets/image/user2.jpg">
   </li>
      <li class="ps_liSupport">
   <img src="../../../assets/image/user3.jpg">
   </li>
   </ul>
   <div class="ps_SupportNum">
   <span>5</span>
   </div>
   </div>
      <ul class="ps_edit">
   <li class="ps_editLi ps_editLi1" ng-class="select==true?'active':''" ng-click="favorite()">
   <i></i>
   <span>点赞</span>
   </li>
      <li class="ps_editLi ps_editLi2">
         <i></i>
   <span>评论</span>
   </li>
      <li class="ps_editLi ps_editLi3">
         <i></i>
   <span>收藏</span>
   </li>
      <li class="ps_editLi ps_editLi4">
         <i></i>
   <span>分享</span>
   </li>
   </ul>
   <ul class="ps_comment">
   <li class="comment_li">
   <span class="comment_user">可惜没如果</span><span class="mao">:</span><span class="comment_content">好可爱啊</span>
   </li>
   <li class="comment_li">
   <span class="comment_user">不能说的秘密</span><span class="mao">:</span><span class="comment_content">竟然比你还高哦，简直不可思议</span>
   </li>
   </ul>
</div>
<div class="ps_Item">
   <router-link :to="{ path: '/petshowIndex/petshowdetails'}">
   <div class="ps_Top">
     <div class="ps_Userimg">
     <img src="../../../assets/image/user2.jpg">
     </div>
     <div class="ps_Userinfo">
       <p class="pt"><span class="ps_username">不良人</span><span class="ps_addr">杭州市</span></p>
       <p class="pb"><img class="ps_petimg" src="../../../assets/image/user3.jpg"><span class="ps_petname">小洛奇</span><span class="ps_petcategory">拉布拉多</span></p>
     </div>
     <div class="ps_gz">
     <button class="ps_bt">+关注</button>
     </div>
   </div>
   </router-link>
   <div class="ps_message">
   <p>哈哈，我的小洛奇
   </p>
   </div>
   <div class="ps_listimg" ui-sref="petshow_details">
   <img src="../../../assets/image/user1.jpg">
   </div>
<div class="psdiv_Support">
   <ul class="ps_Support">
   <li class="ps_liSupport">
   <img src="../../../assets/image/user1.jpg">
   </li>
      <li class="ps_liSupport">
   <img src="../../../assets/image/user2.jpg">
   </li>
      <li class="ps_liSupport">
   <img src="../../../assets/image/user3.jpg">
   </li>
      <li class="ps_liSupport">
   <img src="../../../assets/image/user1.jpg">
   </li>
      <li class="ps_liSupport">
   <img src="../../../assets/image/user2.jpg">
   </li>
   <li class="ps_liSupport">
   <img src="../../../assets/image/user1.jpg">
   </li>
      <li class="ps_liSupport">
   <img src="../../../assets/image/user2.jpg">
   </li>
      <li class="ps_liSupport">
   <img src="../../../assets/image/user3.jpg">
   </li>
   </ul>
      <div class="ps_SupportNum">
   <span>5</span>
   </div>
   </div>
      <ul class="ps_edit">
   <li class="ps_editLi ps_editLi1" ng-class="select==true?'active':''" ng-click="favorite()">
   <i></i>
   <span>点赞</span>
   </li>
      <li class="ps_editLi ps_editLi2">
         <i></i>
   <span>评论</span>
   </li>
      <li class="ps_editLi ps_editLi3">
         <i></i>
   <span>收藏</span>
   </li>
      <li class="ps_editLi ps_editLi4">
         <i></i>
   <span>分享</span>
   </li>
   </ul>
   <ul class="ps_comment">
   <li class="comment_li">
   <span class="comment_user">可惜没如果</span><span class="mao">:</span><span class="comment_content">好可爱啊</span>
   </li>
   <li class="comment_li">
   <span class="comment_user">不能说的秘密</span><span class="mao">:</span><span class="comment_content">竟然比你还高哦，简直不可思议</span>
   </li>
   </ul>
</div>
</div>
</template>

<script>
	export default{
		data(){
			return{

			}
		},

		mounted(){

		},
	    methods: {
     
  }
	}
</script>

<style lang="scss" scoped="">
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
</style>
