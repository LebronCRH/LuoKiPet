<template>
<div class="Big" ref="swiperBigPage" style="width:100vw;height:100vh;">
<swiper :list="SlideList" height="100vh" ref="swiperBig" :show-dots="false"  dots-position="center"></swiper>
</div>

</template>

<script>
import { Swiper, Scroller, Spinner } from 'vux'
const baseList = [{
  url: 'javascript:',
  img: './static/image/guide1.jpg'
}, {
  url: 'javascript:',
  img: './static/image/guide2.jpg'
}, {
  url: 'javascript:',
  img: './static/image/guide3.jpg'
}, {
  url: '/home/community',
  img: './static/image/guide4.jpg'
}]
	export default{
		data(){
			return{
        SlideList:baseList,
        swiperHeight:0,
			}
		},
    components: {
      Swiper,
      Scroller,
      Spinner,
        },
		mounted(){

		},
    methods:{
      // initHeight(){
      //   let swiperArticletH=this.$refs.swiperBigPage.offsetHeight;
      //   this.swiperArticleHeight=swiperArticletH;
      //   // this.$refs.swiperBig.$el.style.height=this.swiperArticleHeight+"px";
      //   this.$refs.swiperBig.$el.children[0].style.height="100vh";
      //   console.log(this.$refs.swiperBig.$el.children[0].style.height);
      // }
    }
	}
</script>

<style lang="scss" scoped>
  
</style>