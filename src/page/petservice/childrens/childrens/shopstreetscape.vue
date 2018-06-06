<template>
<div class="rating_page">
 <div class="ShopMapBig">
  <div id="panorama" style="width:100vw;height:100vh;overflow:hidden;margin:0;z-index:998;position:absolute;font-family:'微软雅黑';"></div>
<div class="Top">
<div class="back" @click="$router.go(-1)">
  <img src="static/image/Bback.png">
</div>
<div class="middle">
   <span>搜索此处商户</span>
</div>

<div class="jujiao">
  <img src="static/image/jujiao.png">
</div>
</div>
</div>

</div>
</template>

<script>
import {GetPetShopItemByShopId} from '@/service/getdata'  
export default {
    components: {

    },
    data () {
      return {
      	panorama:null,
        CurrentShopInfo:null,
      }
    },
    mounted(){
    	this.initData();
    },
    computed: {
  
    },
    props:[],
    methods: {
    	async initData(){
    		this.InitMap();
        },
       async InitMap(){
        await GetPetShopItemByShopId(this.$route.query.shopid).then(response=>{
          this.CurrentShopInfo=response;
        })
        	  // this.panorama = new BMap.Panorama('panorama');
           //    this.panorama.setPosition(new BMap.Point(116.038336,28.688249));//师大的地图位置
           //    var labelPosition = new BMap.Point(116.038336,28.688249);
           //    var labelOptions = {
           //        position: labelPosition,
           //      altitude:5
           //    };//设置标注点的经纬度位置和高度
            this.panorama = new BMap.Panorama('panorama');
              this.panorama.setPosition(new BMap.Point(this.CurrentShopInfo.lng,this.CurrentShopInfo.lat));//
              var labelPosition = new BMap.Point(this.CurrentShopInfo.lng,this.CurrentShopInfo.lat);
              var labelOptions = {
                  position: labelPosition,
                altitude:5
              };//设置标注点的经纬度位置和高度
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
		z-index: 1100;
        p, span{
            font-family: Helvetica Neue,Tahoma,Arial;
        }
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
  }
}
</style>
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

<!--             map.addEventListener("moveend", function(e){   //获得界面中心坐标 
	document.getElementById("info").innerHTML += "中心坐标:new BMap.Point(" + map.getCenter().lng + "," + map.getCenter().lat + ")</br>"
});  -->
