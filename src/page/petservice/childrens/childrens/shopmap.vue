<template>
<div class="rating_page">
<div class="ShopMapBig">
<div id="allmap" style="width:100vw;height:100vh;overflow:hidden;margin:0;z-index:998;position:absolute;font-family:'微软雅黑';">	
</div>
<div class="Top">
<div class="back" @click="$router.go(-1)">
  <img src="static/image/Bback.png">
</div>
<div class="middle" @click="ShowMoreShop">
   <span>查看此处商户</span>
</div>

<div class="jujiao" @click="TaggleShopInfo()">
  <img src="static/image/jujiao.png">
</div>
</div>

<transition name="showlist">
<div class="MapShopInfo" v-show="showShopInfo">
<router-link :to="'/petserviceIndex/serviceshopdetails/'+CurrentShopInfo.Shop_id">
    <div class="ShopImg" ui-sref="service_shopdetails({id:ShopInfo.Shop_id})">
      <img :src="imgBaseUrl+CurrentShopInfo.ShopImg[0]">
    </div>
    </router-link>
    <div class="ShopContent">
    <p class="ShopName" ui-sref="service_shopdetails({id:ShopInfo.Shop_id})">{{CurrentShopInfo.ShopName}}</p>  <div class="ShopCommeng">
       <img src="static/image/star1.png">
       <span>3人点评</span>
    </div>
    <p class="ShopNode">{{CurrentShopInfo.Address}}</p>
        </div>
        <router-link :to="{ path: 'ShopStreetscape',append:true}">
    <div class="daohang" ui-sref="ShopStreetscape">
      <img src="static/image/daohang.png">
      <span>导航</span>
    </div>
    </router-link>
</div>
</transition>

<!-- <transition name="showlist">
<div class="MapShopInfo" v-show="showShopInfo">
    <div class="ShopImg" ui-sref="service_shopdetails({id:ShopInfo.Shop_id})">
      <img :src="'static/image/'+CurrentShopInfo.ShopImg[0]">
    </div>
    <div class="ShopContent">
    <p class="ShopName" ui-sref="service_shopdetails({id:ShopInfo.Shop_id})">{{CurrentShopInfo.ShopName}}</p>  <div class="ShopCommeng">
       <img src="static/image/star1.png">
       <span>3人点评</span>
    </div>
    <p class="ShopNode">{{CurrentShopInfo.Address}}</p>
        </div>
    <div class="daohang" ui-sref="ShopStreetscape">
      <img src="static/image/daohang.png">
      <span>导航</span>
    </div>
</div>
</transition> -->

</div>
<transition name="router-slid" mode="out-in">
            <router-view></router-view>
        </transition>
</div>
</template>

<script>
import axios from 'axios'
import {GetAllPetServiceShop,GetAllShopScreen,GetAllCityArea} from '@/service/getdata'  
import {imgBaseUrl} from '@/config/env'
export default {
    components: {

    },
    data () {
      return {
        msg: 'Hello World!',
        Title:'详情页',
        Color:0,
        MidType:1,
        Service:{
        	serviceName:null,
        	Category:null,
        	ForServiceID:null,
        	Category:null
        },
        shoplistdata:[],
        marker2:null,
        CurrentShop:null,
        CurrentShopInfo:{
        	Shop_id:0,
        	ShopImg:[],
        	ShopName:"",
        	Address:"",
        },
        NearAllShop:[],
        map:null,
        MoreShop:[],
        myIcon:null,
        myIcon9:null,
        showShopInfo:true,
        imgBaseUrl:imgBaseUrl, 
      }
    },
    beforeDestroy(){
    	console.log("beforeDestroy");
    },
    destroyed(){
    	console.log("destroyed");
    },
    mounted(){
    	console.log("mounted");
    	this.initData();
    },
    computed: {
  
    },
    props:[],
    methods: {
    	async initData(){
    		this.InitMap();
        this.GetShopList();
        },
        async GetShopList(){
          // axios.get("./static/data/PetServiceShopList.json").then((response)=>{
          await GetAllPetServiceShop().then(response=>{
            this.NearAllShop=response;
            this.NearAllShop.forEach((item,index)=>{
            	if(item.Shop_id==this.$route.query.shopid){
            		this.CurrentShopInfo=item;
            		var point = new BMap.Point(this.CurrentShopInfo.lng, this.CurrentShopInfo.lat);
            		this.map.centerAndZoom(point, 16);
                     //创建点标
                    var pt = new BMap.Point(this.CurrentShopInfo.lng, this.CurrentShopInfo.lat);
                    var myIcon = new BMap.Icon("static/image/Node.png", new BMap.Size(50,50));
                    this.marker2 = new BMap.Marker(pt,{icon:myIcon});  // 创建标注
                    this.map.addOverlay(this.marker2);              // 将标注添加到地图中
                    this.marker2.setAnimation(BMAP_ANIMATION_BOUNCE);
            	}
            })
          })
        },
        InitMap(){
        	this.map = new BMap.Map("allmap");
            this.myIcon = new BMap.Icon("static/image/Node2.png", new BMap.Size(40,40));
            this.myIcon9 = new BMap.Icon("static/image/Node.png", new BMap.Size(40,40));
            this.marker2=new BMap.Marker(new BMap.Point(116.404, 39.915));
            this.CurrentShop=this.marker2;
            console.log(this.CurrentShop);
            this.map.addEventListener("touchmove", ()=>{ 
            	if(this.showShopInfo==true)
            	{
            		this.showShopInfo=false;
            	}
            	
            })
        },
        ShowMoreShop(){
        	this.marker2.remove();
              this.NearAllShop.forEach((item,index)=>{
                if(index==1)
                {
                  var point = new BMap.Point(item.lng, item.lat);
                  this.map.centerAndZoom(point, 16);
                }
                 //创建点标
                var pt = new BMap.Point(item.lng, item.lat);
                var marker = new BMap.Marker(pt,{icon:this.myIcon});
                this.map.addOverlay(marker); 
                var label = new BMap.Label(item.ShopName,{offset:new BMap.Size(-30,-20)});
                label.setStyle({
                       color : "#e2dede",
                       fontSize : "12px",
                       height : "20px",
                       width:"100px",
                       overflow:"hidden",
                       "text-align":"center",
                       lineHeight : "20px",
                       fontFamily:"微软雅黑",
                       border:"solid 1px #e2dede",
                       background:"#b6b2b2",
                       "border-radius":"2px"
                });
                marker.setLabel(label);
                console.log(marker);
                this.MoreShop.push(marker);
                marker.addEventListener("click",(marker)=>{
                  	console.log(this.myIcon9);
                     if(this.CurrentShop!=null)
                     {
                        this.CurrentShop.setIcon(this.myIcon);
                     }         
                     marker.target.setIcon(this.myIcon9);
                     this.map.panTo(marker.target.point, 16);
                     this.CurrentShop=marker.target;
                     console.log(this.CurrentShop);


                     this.NearAllShop.forEach((item,index)=>{
                        if(item.lng==marker.target.point.lng && item.lat==marker.target.point.lat)
                        {
                          this.CurrentShopInfo=item;
                        }
                     });
                     this.MapClick();
                     this.ShowShopInfo();
                  });           
              })
        },
        MapClick(){
        	console.log("游泳");
        },
        TaggleShopInfo(){
        	this.showShopInfo=!this.showShopInfo;
        },
        HideShopInfo(){
        	this.showShopInfo=false;
        },
        ShowShopInfo(){
        	this.showShopInfo=true;
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
		z-index: 101;
        p, span{
            font-family: Helvetica Neue,Tahoma,Arial;
        }
}
.router-slid-enter-active, .router-slid-leave-active {
    transition: all .4s;
}
.router-slid-enter, .router-slid-leave-active {
    transform: translate3d(2rem, 0, 0);
    opacity: 0;
}
.showlist-enter-active, .showlist-leave-active {
	transition: all .4s;
	transform: translateY(0);
}
.showlist-enter, .showlist-leave-active {
	opacity: 0;
	transform: translateY(100%);
}
.ShopMapBig{
	width:100vw;height:100vh;position:relative;
	.Top{
		width:100%;height:1rem;position:absolute;left:0rem;top:1rem;display:flex;justify-content:space-around;align-items:center;z-index:999;
	.back{width:1rem;height:0.9rem;display:flex;align-items:center;justify-content:center;background:#fff;border-radius:0.1rem;
-moz-box-shadow:2px 2px 5px #858585; -webkit-box-shadow:2px 2px 5px #858585; box-shadow:2px 2px 5px #858585;
		img{width:0.55rem;height:0.55rem;}
	}
	.middle{
		width:3.5rem;height:0.9rem;display:flex;align-items:center;justify-content:center;background:#fff;border-radius:0.1rem;
		span{color:#000;font-size:0.4rem;}
	}
		.jujiao{width:1rem;height:0.9rem;display:flex;align-items:center;justify-content:center;background:#fff;border-radius:0.1rem;
-moz-box-shadow:2px 2px 5px #858585; -webkit-box-shadow:2px 2px 5px #858585; box-shadow:2px 2px 5px #858585;
		img{width:0.55rem;height:0.55rem;}
	}
	.allmap{
		width:100vw;height:100vh;overflow:hidden;margin:0;font-family:"微软雅黑";z-index:998;position:absolute;
	}
  }
  .zheShonInfo{
  	width:100%;height:100%;position:absolute;left:0rem;bottom:0rem;z-index:999;background:#000;opacity:0.2;
  }
  .MapShopInfo{width:100%;height:3.3rem;position:absolute;left:0rem;bottom:0rem;padding:0.34rem 0.2rem;z-index:1000;background:#fff;box-sizing: border-box;
  	.ShopImg{
  		height:2.2rem;width:2.5rem;float:left;margin-top:0.15rem;
  		img{width:100%;height:100%;}
  	}
  .ShopContent{
  	float:left;width:6.9rem;height:100%;margin-left:0.2rem;
  	.ShopName{width:100%;font-size:0.38rem;color:#000;line-height:0.67rem;}
  	.ShopCommeng{
  		width:100%;height:0.6rem;display:flex;align-items:center;
  		img{height:0.32rem;}
  		span{font-size:0.32rem;color:#7b7979;}
  	}
  	.ShopNode{font-size:0.372rem;line-height:1.35rem;color:#7b7979;max-width:6.9rem;overflow:hidden;}
    }
  	.daohang{
  		width:1rem;height:1.5rem;position:absolute;right:0.4rem;top:0.7rem;text-align:center;
  		img{width:0.8rem;height:0.8rem;float:left;}
  		span{line-height:0.6rem;font-size:0.45rem;margin-top:0.1rem;color:#d81e06;float:left;}
  	}
  }
}
.MapShopInfo.ng-hide-add,.MapShopInfo.ng-hide-remove{
	-webkit-transition:0.4s linear all;transition:0.4s linear all;display:block !important;
}
.MapShopInfo.ng-hide-add{transform: translateY(0%);}
.MapShopInfo.ng-hide-add.ng-hide-add-active{transform: translateY(100%);}
.MapShopInfo.ng-hide-remove{transform: translateY(100%);}
.MapShopInfo.ng-hide-remove.ng-hide-remove-active{transform: translateY(0%);}
</style>
