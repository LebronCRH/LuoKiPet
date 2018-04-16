<template>
<div>
  <div class="home_Middle">
  	  <router-view name="Conter"></router-view>
  </div>
  <div class="Footer">
  <div class="LuoKiFoot">
   <div class="MenuItem">
<router-link :to="{ path: '/home/community'}">
   <div class="Content">
         <div class="menuimg1"></div>
      <p>社区</p>
   </div>
</router-link>
   </div>
   <div class="MenuItem">
<router-link :to="{ path: '/home/mall'}">
   <div class="Content">
      <div class="menuimg2"></div>
      <p>商城</p>
      </div>
      </router-link>
   </div>
   <div class="MenuItem">
   <div class="MidContent">
   <div class="Midimg"></div>
   </div>
   </div>
   <div class="MenuItem">
<router-link :to="{ path: '/home/petservice'}">
   <div class="Content">
      <div class="menuimg3"></div>
      <p>服务</p>
      </div>
      </router-link>
   </div>
   <div class="MenuItem">
<router-link :to="{ path: '/home/profile'}">
   <div class="Content">
      <div class="menuimg4"></div>
      <p>我的</p>
      </div>
      </router-link>
   </div>
</div>
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

		}
	}
</script>

<style lang="scss" scoped>
  .home_Middle{
  	position:absolute;left:0rem;bottom:1.3rem;width:100%;top:0rem;
  }
  .Footer{
  	position: fixed;bottom:0px;left: 0px;z-index:99;width:100%;height:1.3rem;
  	.LuoKiFoot{position:fixed;bottom:0px;left:0px;width:10rem;height:1.307rem;background:url(../../assets/image/foot.png);padding:0px;background-size: cover;z-index:100;
	.MenuItem{
		width:20%;height:100%;float: left;display:flex;
		justify-content: center;
		a{
			text-decoration: none;
        .Content{
        	width:1rem;height:1.2rem;margin:0 auto;text-align:center;
        	div.menuimg1{width:0.8rem;height:0.8rem;margin:0rem auto;background:url(../../assets/image/Community2.png);background-size:0.8rem 0.8rem;}
        	div.menuimg2{width:0.8rem;height:0.8rem;margin:0rem auto;background:url(../../assets/image/shop2.png);background-size:0.8rem 0.8rem;}
        	div.menuimg3{width:0.8rem;height:0.8rem;margin:0rem auto;background:url(../../assets/image/service2.png);background-size:0.8rem 0.8rem;}
        	div.menuimg4{width:0.8rem;height:0.8rem;margin:0rem auto;background:url(../../assets/image/mycore2.png);background-size:0.8rem 0.8rem;}
        	span{line-height:0.4rem;font-size:0.2rem;height:0.4rem;}
        	p{line-height:0.2rem;font-size:0.1rem;height:0.2rem;color:#fff;margin-top:0.1rem;}
        }
    }
    a.router-link-active
    {
    				text-decoration: none;
    	        .Content{
        	width:1rem;height:1.2rem;margin:0 auto;text-align:center;background-color:#ffffff;border-radius:0rem 0rem 0.2rem 0.2rem;
        	div.menuimg1{width:0.8rem;height:0.8rem;margin:0rem auto;background:url(../../assets/image/Community.png);background-size:0.8rem 0.8rem;}
        	div.menuimg2{width:0.8rem;height:0.8rem;margin:0rem auto;background:url(../../assets/image/shop.png);background-size:0.8rem 0.8rem;}
        	div.menuimg3{width:0.8rem;height:0.8rem;margin:0rem auto;background:url(../../assets/image/service.png);background-size:0.8rem 0.8rem;}
        	div.menuimg4{width:0.8rem;height:0.8rem;margin:0rem auto;background:url(../../assets/image/mycore.png);background-size:0.8rem 0.8rem;}
        	span{line-height:0.4rem;font-size:0.2rem;height:0.4rem;}
        	p{line-height:0.2rem;font-size:0.1rem;height:0.2rem;color:#38dbb0;margin-top:0.1rem;}
        }
    }
         .MidContent{
         	width:100%;height:100%;margin:0 auto;text-align:center;
        	div.Midimg{width:1.7rem;height:1.7rem;margin:-0.6rem auto;border-radius:0.85rem;background:url(../../assets/image/add.png);background-size:1.7rem 1.7rem;background-color:#fff;}
        }
	}

}

  }
</style>