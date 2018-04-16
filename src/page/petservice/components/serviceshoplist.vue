<template>
	<ul class="ps_ulshop">
   <li class="ps_lishop" v-for="item in shoplistdata">
   <router-link :to="'/petserviceIndex/serviceshopdetails/'+item.Shop_id">
   <div class="ps_liInfo">
     <div class="shop_img">
       <img :src="imgBaseUrl + item.ShopImg[0]">
     </div>
   <div class="ps_Right">
   <p class="shoptitle">{{item.ShopName}}</p>
     <div class="ps_m">
       <i></i><span class="xinji">0.0</span>
       <span class="price">￥{{item.MinPrice}}起</span>
     </div>
     <div class="ps_b">
       <span class="s1">{{item.Node}}</span><span class="s2">{{item.Distance}}</span><span class="s3">已售{{item.SaleNum}}</span>
     </div>
   </div>
   </div>
   <div class="ps_liInfoBt">
     <img src="../../../assets/image/discount.png">
     <span>全场服务86折优惠</span>
   </div>
      </router-link>
   </li>
</ul>
</template>

<script>
import {imgBaseUrl} from '@/config/env'
	    export default {
    	data(){
            return{
            	// imgBaseUrl:"./static/image/",
              imgBaseUrl:imgBaseUrl, 
            }
        },
        created(){

        },
        components: {
        },
        props: ['shoplistdata'],
        methods: {
            
        }
    }
</script>

<style lang="scss" scoped="">
	.ps_ulshop{width:10rem;list-style:none;
	.ps_lishop{width:10rem;height:4.3rem;background-color:#fff;margin-bottom:0.25rem;padding:0rem 0.25rem;
		.ps_liInfo{
			width:9.5rem;height:2.9rem;border-bottom:dotted 0.1rem #e3e3e3;padding:0.25rem 0rem;box-sizing: border-box;
			.shop_img{width:3.2rem;height:2.4rem;float:left;
				img{width:100%;height:100%;}
			}
			.ps_Right{width:6.3rem;height:2.4rem;float:left;padding-left:0.25rem;box-sizing: border-box;
				p.shoptitle{
					height:0.6rem;line-height:0.6rem;width:100%;font-size:0.39rem;color:#2a2a2a;
				}
				.ps_m{
					height:0.5rem;width:100%;display:flex;justify-content:space-between;align-items:center;    margin-top: 0.3rem;
					i{
						width:3rem;height:0.5rem;display:inline-block;background:url(../../../assets/image/star1.png);background-size:3rem 0.5rem;
					}
					.xinji{line-height:0.5rem;font-size:0.3rem;color:#f6443c;}
					.price{line-height:0.5rem;font-size:0.35rem;color:#f6443c;}
				}
				.ps_b{width:100%;height:1.1rem;display:block;
					.s1{line-height:1.1rem;font-size:0.3rem;color:#8f8f8f;float:left;}
					.s2{line-height:1.1rem;font-size:0.3rem;color:#8f8f8f;margin-left:0.2rem;float:left;}
					.s3{line-height:1.1rem;font-size:0.3rem;color:#8f8f8f;float:right;}
				}
			}
		}
		.ps_liInfoBt{
			width:100%;height:1.2rem;padding:0.35rem 0.25rem;display:flex;align-items:center;box-sizing: border-box;
			img{width:0.5rem;height:0.5rem;margin-right:0.3rem;}
			span{line-height:0.5rem;font-size:0.4rem;color:#1c1c1c;height:0.5rem;}
		}
	}
}
</style>