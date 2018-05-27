<template>
<div>
  <div class="home_Middle">
  	  <router-view name="Conter"></router-view>
  </div>
  <div class="Footer" v-if="FooterShow">
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
             <div class="Midimg" @click="ShowCreate()"></div>
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

<div class="CreateProject" v-show="CreateProjectshow" @click="ShowCreate()">
  <ul class="ul_Create">
    <li class="CreateItem Photo bounceInUp animated">
      <div class="img">
         <div class="ImgItem Photo yui" @click="GoCreate()">
           <img src="static/image/png/CreatePhoto.png" alt="">
         </div>
      </div>
      <p>拍照</p>
    </li>
    <li class="CreateItem Article bounceInUp animated">
      <div class="img">
         <div class="ImgItem Article">
           <img src="static/image/png/CreateArticle.png" alt="">
         </div>
      </div>
      <p>文章</p>
    </li>
    <li class="CreateItem Video bounceInUp animated">
      <div class="img">
         <div class="ImgItem Video">
           <img src="static/image/png/CreateVideo.png" alt="">
         </div>
      </div>
      <p>视频</p>
    </li>
  </ul>
</div>

</div>

</template>

<script>
	import {mapState, mapMutations} from 'vuex'

	export default{
		data(){
			return{
        CreateProjectshow:false,
			}
		},

		mounted(){

		},
    computed: {
      ...mapState([
                  'LoginFrontPageUrl','isLogin','userInfo','FooterShow',
              ]),
      // Footer:function(){
      //   return this.FooterShow;
      // }
    },
    methods:{
      ShowCreate:function(){
        this.CreateProjectshow=!this.CreateProjectshow;
      },
      GoCreate:function(){
        this.$router.push('/createphoto');
      }
    },
	}
</script>

<style lang="scss" scoped>
  .home_Middle{
  	position:absolute;left:0rem;bottom:0rem;width:100%;top:0rem;
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
  .CreateProject{
    position:absolute;top:0rem;left:0rem;width:100vw;height:100vh;background:rgba(0,0,0,0.9);z-index:10000;display:flex;align-items:center;justify-content:center;
    .ul_Create{
      list-style:none;width:100%;height:3.2rem;
      .CreateItem{
        width:33.3%;height:100%;float:left;
        &.Photo{animation-delay:0.1s;}
        &.Article{animation-delay:0.2s;}
        &.Video{animation-delay:0.3s;}
        .img{
          width:100%;height:2rem;display:flex;align-items:center;justify-content:center;
          .ImgItem{
            width:2rem;height:2rem;border-radius:1rem;overflow:hidden;display:flex;align-items:center;justify-content:center;
            &.Photo{background:#50c3dc;}
            &.Article{background:#fecc4b;}
            &.Video{background:#fba2a8;}
            img{
              width:1rem;height:1rem;
            }
          }
        }
        p{
          font-size:0.5rem;line-height:1.2rem;width:100%;height:1.2rem;text-align:center;
        }
      }
    }
  }
</style>