<template>
<div>
  <div class="lh_luokihead">
   <div class="lh_user">
     <img src="../../../../assets/image/user.png">
   </div>
   <ul class="lh_menu">
   <li class="lh_menuitem">
   <span ui-sref-active="select" ui-sref="main">精选</span>
   </li>
      <li class="lh_menuitem">
   <span ui-sref-active="select" ui-sref="search">动态</span>
   </li>
      <li class="lh_menuitem">
   <span ui-sref-active="select" ui-sref="me">频道</span>
   </li>
   </ul>
   <div class="lh_serach" ui-sref="zx_article">
   <img src="../../../../assets/image/serach.png">
   </div>
   </div>
<div class="Middle">
<scroller ref="scroller" lock-x height="-110" scrollbar-y use-pulldown :use-pullup=true @on-scroll="PageSlide" @on-pullup-loading="UpPagedade" @on-pulldown-loading="DownPageData" v-model="scrollerStaues">
<div>
	<swiper :list="SlideList" auto  v-model="Swiper_index" dots-position="center"></swiper>
<ul class="ul_IndexCategory">
   <li class="li_IndexCategory">
   <router-link :to="{ path: '/articleIndex'}">
      <div>
      <div class="div_Icon">
      <img class="Icon" src="../../../../assets/image/PetCategoryIcon2.png">
      </div>
      <p>分类</p>
      </div>
      </router-link>
   </li>
      <li class="li_IndexCategory" ui-sref="zx_article">
      <router-link :to="{ path: '/articleIndex'}">
      <div>
      <div class="div_Icon">
      <img class="Icon" src="../../../../assets/image/ArticleIcon.png">
      </div>
      <p>文章</p>
      </div>
      </router-link>
   </li>
      <li class="li_IndexCategory">
      <router-link :to="{ path: '/articleIndex'}">
      <div>
      <div class="div_Icon">
      <img class="Icon" src="../../../../assets/image/expertIcon2.png">
      </div>
      <p>专家</p>
      </div>
      </router-link>
   </li>
      <li class="li_IndexCategory">
      <router-link :to="{ path: '/articleIndex'}">
      <div>
      <div class="div_Icon">
      <img class="Icon" src="../../../../assets/image/DoctorIcon2.png">
      </div>
      <p>疾病</p>
      </div>
      </router-link>
   </li>
</ul>
<petshowlist></petshowlist>
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
import petshowlist from '@/page/petshow/components/petshowlist'
import { Swiper, Scroller, Spinner,XImg} from 'vux'
import axios from 'axios'

const baseList = [{
  url: 'javascript:',
  img: './static/image/Slides.jpg'
}, {
  url: 'javascript:',
  img: './static/image/Slides1.jpg'
}, {
  url: 'javascript:',
  img: './static/image/Slides2.jpg'
}, {
  url: 'javascript:',
  img: './static/image/Slides3.jpg'
}]


export default{
		data(){
			return{
        SlideList:baseList,
        Swiper_index: 0,
        scrollerStaues: {
          pulldownStatus: 'default',
          pullupStatus: 'default'
        }
			}
		},
		 components: {
		 	petshowlist,
      Swiper,
      Scroller,
      Spinner,
        },
		mounted(){
      // this.MessageSend();
		},
	    methods: {
      onRefresh(done) {
          done()
      },
      MessageSend(){
              axios.get("api/MessageSend?Phone=15007932468").then(res=>{
                var res = res.data;
                console.log(res);
              });
      },
      onInfinite(done) {
          done()
      },
      PageSlide(pos){

      },
      UpPagedade(){
        console.log(666);
        this.$nextTick(() => {
        setTimeout(() => {
          this.$refs.scroller.donePullup()
        }, 1000)
        })
      },
      DownPageData(){
        console.log("555");
        this.$nextTick(() => {
        setTimeout(() => {
          this.$refs.scroller.donePulldown()
        }, 1000)
       })
      }
  }
	}
</script>

<style lang="scss" scoped>
    .Middle{
    	position:absolute;top:1.5rem;left:0rem;bottom:0rem;width:100%;
    }
	.lh_luokihead{width:10rem;height:1.5rem;background-color: #38dbb0;position:fixed;left:0rem;top:0rem;z-index: 99;
	.lh_user{
		height:100%;width:1.5rem;float:left;text-align:center;padding:0.35rem 0.35rem;box-sizing: border-box;
		display:flex;justify-content:content;align-items:content;
		img{
			width:0.8rem;height:0.8rem;
		}
	}

	.lh_menu{
		width:7rem;height:100%;list-style: none;float:left;margin:0;padding: 0;text-align:center;
		.lh_menuitem{
			width:33.3%;height:100%;float:left;display: flex;align-items: center;justify-content: center;
			span{
			line-height:1.5rem;height:1.5rem;width:1.5rem;color:#fff;display:inline-block;font-size:0.5rem;}
			span.select{color:#000;}
		}
		
	}

	.lh_serach{
		width:1.5rem;height:100%;float:left;color:#38dbb0;padding:0.35rem 0.35rem;
		display:flex;justify-content:content;align-items:content;box-sizing: border-box;
		img{
			width:0.8rem;height:0.8rem;
		}
	}
}
	.ul_IndexCategory{list-style:none;width:100%;padding:0rem;margin:0rem;height:2.8rem;background-color:#fff;margin-bottom:0.2rem;
	.li_IndexCategory{width:2.5rem;height:100%;float:left;display:flex;align-items:center;
    a{color:black;width:100%;height:100%;display:flex;align-items:center;
      div{width:2.5rem;height:2.5rem;margin-top:0.2rem;
      .div_Icon{width:2.5rem;height:1.2rem;display:flex;justify-content:center;
        .Icon{width:1.2rem;height:1.2rem;}
      }
      p{width:100%;height:0.4rem;line-height:0.4rem;font-size:0.33rem;margin:0rem;text-align:center;margin-top:0.4rem;}
    }
    }
	}
}

.Slide_Img{
	width:10rem;height:5.5rem;
	a{
		img{width:10rem;height:5.5rem;}
	}
}
.rotate {
  transform: rotate(-180deg);
}
.pulldown-arrow {
  display: inline-block;
  transition: all linear 0.2s;
  color: #666;
  font-size: 0.5rem;
}
</style>