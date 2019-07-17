<template>
<div class="rating_page">
<head-top :Title="Title" :Color="Color" :MidType="MidType"></head-top>
<div class="Middle" ref=Middle>
	<scroller ref="scroller" lock-x height="-45" scrollbar-y>
      <div>
        <ul class="ul_active">
            <li class="li_activeItem">
                <div class="ItemTop">
                    <span class="Title">广州首届宠物嘉年华</span>
                    <span class="Date">2018-06-18</span>
                </div>
                <div class="ActiveImg">
                    <img src="../../assets/image/slide1.png" alt="">
                </div>
                <div class="Introduce">
                    2018年广州举办首届宠物嘉年华活动萨达。
                </div>
                <div class="Edit">
                    点击查看详情
                </div>
            </li>
            <li class="li_activeItem">
                <div class="ItemTop">
                    <span class="Title">广州首届宠物嘉年华</span>
                    <span class="Date">2018-06-18</span>
                </div>
                <div class="ActiveImg">
                    <img src="../../assets/image/slide2.png" alt="">
                </div>
                <div class="Introduce">
                    2018年广州举办首届宠物嘉年华活动萨达。
                </div>
                <div class="Edit">
                    点击查看详情
                </div>
            </li>
            <li class="li_activeItem">
                <div class="ItemTop">
                    <span class="Title">广州首届宠物嘉年华</span>
                    <span class="Date">2018-06-18</span>
                </div>
                <div class="ActiveImg">
                    <img src="../../assets/image/slide3.png" alt="">
                </div>
                <div class="Introduce">
                    2018年广州举办首届宠物嘉年华活动萨达。
                </div>
                <div class="Edit">
                    点击查看详情
                </div>
            </li>
            <li class="li_activeItem">
                <div class="ItemTop">
                    <span class="Title">广州首届宠物嘉年华</span>
                    <span class="Date">2018-06-18</span>
                </div>
                <div class="ActiveImg">
                    <img src="../../assets/image/slide1.png" alt="">
                </div>
                <div class="Introduce">
                    2018年广州举办首届宠物嘉年华活动萨达。
                </div>
                <div class="Edit">
                    点击查看详情
                </div>
            </li>
            <li class="li_activeItem">
                <div class="ItemTop">
                    <span class="Title">广州首届宠物嘉年华</span>
                    <span class="Date">2018-06-18</span>
                </div>
                <div class="ActiveImg">
                    <img src="../../assets/image/slide2.png" alt="">
                </div>
                <div class="Introduce">
                    2018年广州举办首届宠物嘉年华活动萨达。
                </div>
                <div class="Edit">
                    点击查看详情
                </div>
            </li>
            <li class="li_activeItem">
                <div class="ItemTop">
                    <span class="Title">广州首届宠物嘉年华</span>
                    <span class="Date">2018-06-18</span>
                </div>
                <div class="ActiveImg">
                    <img src="../../assets/image/slide3.png" alt="">
                </div>
                <div class="Introduce">
                    2018年广州举办首届宠物嘉年华活动萨达。
                </div>
                <div class="Edit">
                    点击查看详情
                </div>
            </li>
        </ul>
      </div>
    </scroller>
</div>
<transition name="router-slid" mode="out-in">
            <router-view></router-view>
</transition>
<section class="animation_opactiy shop_back_svg_container" v-show="showLoading">
           <img src="static/image/shop_back_svg.svg">
    </section>
<loading v-show="showLoading"></loading>
</div>
</template>

<script>
import axios from 'axios'
import {mapState, mapMutations} from 'vuex'
import headTop from '@/components/Head.vue'
import { Scroller } from 'vux'
import selectpackage from '@/page/petservice/components/selectpackage.vue'
import {GetPetCategoryAll} from '@/service/getdata' 
import {imgBaseUrl,imgPCBaseUrl} from '@/config/env'
import loading from '@/components/common/loading.vue'
export default {
    components: {
    	headTop,
    	Scroller,
    	selectpackage,
        loading
    },
    data () {
      return {
        Title:'宠物活动',
        Color:1,
        MidType:0,
        EditBtn:false,
        sortBy:'',
        petcategorylist:[],
        imgPCBaseUrl:imgPCBaseUrl,
        showLoading:false,
        swiperOption: {//swiper3
          autoplay: 3000,
          speed: 1000,
          slidesOffsetBefore: 0,
          spaceBetween: 17,
        }
      }
    },
    mounted(){
        this.initHeadHeight();
    },
    destroyed(){

    },
    computed: {
    	...mapState([
                'PackageCartList','StatusbarHeight','StatusbarHeightRem',
            ]),
    },
    props:[],
    methods: {
    	...mapMutations([
                'UPDATE_PACKAGECART',
            ]),
        hideLoading(){
          this.showLoading = false;
        },
        initHeadHeight(){
          if(this.$refs.Middle)
            {
              this.$refs.Middle.style.top=(1.5+this.StatusbarHeightRem)*window.screen.width / 10+"px";
            }
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
		background-color: #FFFCFD;
		z-index: 200;
        p, span{
            font-family: Helvetica Neue,Tahoma,Arial;
        }
}
.shop_back_svg_container {
    position: fixed;
    top: 0rem;
    z-index: 999;
    width: 100%;
    height: 100%;
    img{width:100vw;height:100vh;}
}
.router-slid-enter-active, .router-slid-leave-active {
          transition: all .4s;
}
.router-slid-enter, .router-slid-leave-active {
          transform: translate3d(2rem, 0, 0);
          opacity: 0;
}
.Middle{
    position:absolute;top:1.5rem;left:0rem;bottom:0rem;width:100%;
}
.ul_active{
    width:100%;list-style:none;padding:0rem 0.3rem;
    .li_activeItem{
        width:100%;border-radius:0.1rem;-moz-box-shadow:0px 0px 5px #C4C4C4; -webkit-box-shadow:0px 0px 5px #C4C4C4; box-shadow:0px 0px 5px #C4C4C4;padding:0.2rem 0.4rem;background:#fff;margin:0.4rem 0rem;
        .ItemTop{
            width:100%;height:1rem;display:flex;align-items:center;justify-content:space-between;
            .Title{font-size:0.45rem;color:#000;font-family:'微软雅黑';}
            .Date{font-size:0.4rem;color:#000;font-family:'微软雅黑';}
        }
        .ActiveImg{
            width:100%;
            img{width:100%;}
        }
        .Introduce{
            font-family:'微软雅黑';width:100%;height:0.7rem;line-height:0.7rem;font-size:0.4rem;border-bottom:solid 1px #ddd;
        }
        .Edit{
            font-family:'华文楷体';width:100%;height:0.7rem;line-height:0.7rem;font-size:0.4rem;
        }
    }
}
.SwiperList{
    img{
        width:100%;
    }
}
</style>
