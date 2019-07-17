<template>
<div class="rating_page">
<head-top :Title="Title" :Color="Color" :MidType="MidType"></head-top>
<div class="PetShopScreen" ref="PetShopScreen">
     <ul class="ul_Screen">
        <li class="ScreenItem" :class="sortBy=='EreaSelect'?'active':''" @click="chooseType('EreaSelect')" ng-click="CurrentScreen=1">
          <span>区域 <i></i></span>
        </li>
        <li class="ScreenItem" :class="sortBy=='CategorySelect'?'active':''" @click="chooseType('CategorySelect')" ng-click="CurrentScreen=2">
                <span>分类 <i></i></span>
        </li>
        <li class="ScreenItem ScreenSort" :class="sortBy=='SortSelect'?'active':''" @click="chooseType('SortSelect')" ng-click="CurrentScreen=3">
                <span>排序 <i></i></span>
        </li>
        <li class="ScreenItem" :class="sortBy=='ScreenSelect'?'active':''" @click="chooseType('ScreenSelect')" ng-click="CurrentScreen=4">
                <span>筛选 <i></i></span>
        </li>
     </ul>
</div>
<div class="Middle" ref="Middle">
	<scroller ref="scroller" lock-x height="-90" scrollbar-y>
      <div>
        <ul class="ul_Pet">
            <li class="li_PetItem">
                <div class="ItemLeft">
                    <img src="static/image/user1.jpg" alt="">
                </div>
                <div class="ItemRight">
                    <div class="Top"><p class="left"><span class="cate">品种：</span><span class="value">金毛寻回犬</span></p><p class="right"><span class="value">一周前</span></p></div>
                    <div class="ItemMiddle"><p class="left"><span class="cate">性别：</span><span class="value">男孩子</span></p><p class="left" style="
                    margin-left:15px;"><span class="cate">年龄：</span><span class="value">五个月大</span></p></div>
                    <p class="Node"><img src="static/image/png/nodeReds.png" alt="">西湖区文化广场</p>
                </div>
                <div class="State">未领</div>
            </li>
            <li class="li_PetItem">
                <div class="ItemLeft">
                    <img src="static/image/user1.jpg" alt="">
                </div>
                <div class="ItemRight">
                    <div class="Top"><p class="left"><span class="cate">品种：</span><span class="value">金毛寻回犬</span></p><p class="right"><span class="value">一周前</span></p></div>
                    <div class="ItemMiddle"><p class="left"><span class="cate">性别：</span><span class="value">男孩子</span></p><p class="left" style="
                    margin-left:15px;"><span class="cate">年龄：</span><span class="value">五个月大</span></p></div>
                    <p class="Node"><img src="static/image/png/nodeReds.png" alt="">西湖区文化广场</p>
                </div>
                <div class="State">未领</div>
            </li>
            <li class="li_PetItem">
                <div class="ItemLeft">
                    <img src="static/image/user1.jpg" alt="">
                </div>
                <div class="ItemRight">
                    <div class="Top"><p class="left"><span class="cate">品种：</span><span class="value">金毛寻回犬</span></p><p class="right"><span class="value">一周前</span></p></div>
                    <div class="ItemMiddle"><p class="left"><span class="cate">性别：</span><span class="value">男孩子</span></p><p class="left" style="
                    margin-left:15px;"><span class="cate">年龄：</span><span class="value">五个月大</span></p></div>
                    <p class="Node"><img src="static/image/png/nodeReds.png" alt="">西湖区文化广场</p>
                </div>
                <div class="State">未领</div>
            </li>
            <li class="li_PetItem">
                <div class="ItemLeft">
                    <img src="static/image/user1.jpg" alt="">
                </div>
                <div class="ItemRight">
                    <div class="Top"><p class="left"><span class="cate">品种：</span><span class="value">金毛寻回犬</span></p><p class="right"><span class="value">一周前</span></p></div>
                    <div class="ItemMiddle"><p class="left"><span class="cate">性别：</span><span class="value">男孩子</span></p><p class="left" style="
                    margin-left:15px;"><span class="cate">年龄：</span><span class="value">五个月大</span></p></div>
                    <p class="Node"><img src="static/image/png/nodeReds.png" alt="">西湖区文化广场</p>
                </div>
                <div class="State">未领</div>
            </li>
            <li class="li_PetItem">
                <div class="ItemLeft">
                    <img src="static/image/user1.jpg" alt="">
                </div>
                <div class="ItemRight">
                    <div class="Top"><p class="left"><span class="cate">品种：</span><span class="value">金毛寻回犬</span></p><p class="right"><span class="value">一周前</span></p></div>
                    <div class="ItemMiddle"><p class="left"><span class="cate">性别：</span><span class="value">男孩子</span></p><p class="left" style="
                    margin-left:15px;"><span class="cate">年龄：</span><span class="value">五个月大</span></p></div>
                    <p class="Node"><img src="static/image/png/nodeReds.png" alt="">西湖区文化广场</p>
                </div>
                <div class="State">未领</div>
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
        Title:'寻宠启示',
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
              this.$refs.Middle.style.top=(2.5+this.StatusbarHeightRem)*window.screen.width / 10+"px";
              this.$refs.PetShopScreen.style.marginTop=(1.5+this.StatusbarHeightRem)*window.screen.width / 10+"px";
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
    position:absolute;top:2.5rem;left:0rem;bottom:0rem;width:100%;
}
.PetShopScreen{
    width:100%;height:1.14rem;position:relative;z-index:100;background:#fff;margin-top:1.5rem;
    .ul_Screen{
        width:100%;height:100%;list-style:none;display:flex;align-items:center;justify-content:center;z-index:100;
        .ScreenItem{
            width:25%;height:center;display:flex;justify-content:center;align-items:center;position:relative;
            span{
                line-height:1rem;font-size:0.43rem;padding:0rem 0.1rem 0rem 0.15rem;border-bottom:solid 0.1rem  #fff;box-sizing:border-box;
                i{display:inline-block;background:url(../../../static/image/sjDown.png) center center no-repeat;background-size:0.3rem 0.3rem;width:0.3rem;height:0.3rem;}
                i.active{display:inline-block;background:url(../../../static/image/sjTop.png) center center no-repeat;background-size:0.3rem 0.3rem;width:0.3rem;height:0.3rem;}
            }           
        }
        .ScreenItem.active{
            span{
                line-height:1rem;font-size:0.43rem;color:#f44236;padding:0rem 0.1rem 0rem 0.15rem;border-bottom:solid 0.1rem #f44236;box-sizing:border-box;
                i{display:inline-block;background:url(../../../static/image/sjTop.png) center center no-repeat;background-size:0.3rem 0.3rem;width:0.3rem;height:0.3rem;}
            }       
        }
    }
    .AreaList{
        width:100%;position:absolute;left:0rem;top:1.1rem;background:#fff;display:flex;height:12rem;z-index:99;padding-bottom:0.5rem;
        .Left{
            width:30%;height:100%;float:left;background:#f2f3f4;
            .BigArea{
                width:100%;height:100%;overflow-y:auto;list-style:none;
                .BigAreaItem{
                    width:100%;height:1.28rem;display:flex;align-items:center;justify-content:center;
                    span{line-height:1.28rem;font-size:0.36rem;}
                }
                .BigAreaItem.active{
                    width:100%;height:1.28rem;display:flex;align-items:center;justify-content:center;background:#fff;
                    span{line-height:1.28rem;font-size:0.36rem;}
                }
            }
        }
        .Right{
             width:70%;height:100%;background:#fff;float:left;overflow-y:auto;
          .ul_AreaItem{width:100%;overflow:hidden;
            .FirstEn{
                  width:100%;height:0.8rem;padding-left:0.4rem;line-height:0.8rem;font-size:0.4rem;background:#f2f3f4;margin:0rem;color:#000;
                }
            .SmallArea{
                width:100%;list-style:none;overflow:hidden;
                .SmallAreaItem{
                    width:100%;height:1.28rem;display:flex;align-items:center;box-sizing:border-box;border-bottom:solid 0.5px #f2f3f4;padding-left:0.7rem;
                    span{line-height:1.28rem;font-size:0.36rem;width:5.5rem;}
                    img{width:0.4rem;height:0.4rem;}
                }
                .SmallAreaItem.active{
                    width:100%;height:1.28rem;display:flex;align-items:center;box-sizing:border-box;border-bottom:solid 0.5px #f2f3f4;padding-left:0.7rem;
                    span{line-height:1.28rem;font-size:0.36rem;width:5.5rem;color:#f44236;}
                    img{width:0.4rem;height:0.4rem;}
                }
            }
          }
        }
       }
       .CategorySelect{
        width:100%;position:absolute;left:0rem;top:1.1rem;background:#fff;display:flex;height:10rem;z-index:99;padding-bottom:0.5rem;
        .Left{
            width:30%;height:100%;float:left;background:#f2f3f4;
            .BigCategory{
                width:100%;height:100%;overflow-y:auto;list-style:none;
                .BigCateItem{
                    width:100%;height:1.28rem;display:flex;align-items:center;justify-content:center;
                    span{line-height:1.28rem;font-size:0.36rem;}
                }
            }
        }
        .Right{
             width:70%;height:100%;background:#fff;float:left;
            .SmallCategory{
                width:100%;height:100%;overflow-y:auto;list-style:none;
                .SmallCateItem{
                    width:100%;height:1.28rem;display:flex;align-items:center;box-sizing:border-box;border-bottom:solid 0.5px #f2f3f4;padding-left:0.7rem;
                    span{line-height:1.28rem;font-size:0.36rem;}
                }
            }
        }
       }

        .CategorySelect.ng-hide-add,.CategorySelect.ng-hide-remove{
       -webkit-transition:0.2s linear all;transition:0.2s linear all;display:block !important;
         }
         .CategorySelect.ng-hide-add{opacity:1;transform:scale(1);}
         .CategorySelect.ng-hide-add.ng-hide-add-active{opacity:0;transform:scale(0);}
         .CategorySelect.ng-hide-remove{opacity:0;transform:scale(0);}
         .CategorySelect.ng-hide-remove.ng-hide-remove-active{opacity:1;transform:scale(1);}
      .SortSelect{
                width:100%;position:absolute;left:0rem;top:1.1rem;list-style:none;background:#fff;z-index:99;padding-bottom:0.5rem;
                .SortItem{
                    width:100%;height:1.28rem;margin-top:1px;background:#fff;padding-left:0.8rem;display:flex;align-items:center;
                    span{line-height:1.28rem;font-size:0.357rem;width:8rem;
                    }
                    span.active{
                        color:#f44236;
                    }
                    img{
                        width:0.42rem;height:0.42rem;
                    }
                }
            }
    .CharactSelect{
        width:10rem;position:absolute;left:0rem;top:1.1rem;background:#f2f3f4;height:11rem;z-index:99;overflow-y:auto;
        .CharacgTitle{
            width:10rem;height:0.8rem;line-height:0.8rem;font-size:0.38rem;margin:0rem;padding:0rem 0.3rem;box-sizing: border-box;
        }
        .ul_Cooperation{
            width:10rem;background:#fff;list-style:none;overflow:hidden;padding:0.12rem 0rem;
            .cooperationItem{
                width:2.83rem;float:left;height:1.2rem;display:flex;align-items:center;justify-content:center;margin:0.12rem 0.25rem;border:solid 0.02rem #bbbbbb;border-radius:0.1rem;padding:0rem 0.3rem;box-sizing: border-box;
                span{
                    font-size:0.36rem;text-align:center;color:#bbbbbb;
                }
            }
            .cooperationItem.active{
                width:2.83rem;float:left;height:1.2rem;display:flex;align-items:center;justify-content:center;margin:0.12rem 0.25rem;border:solid 0.02rem #f44236;border-radius:0.1rem;padding:0rem 0.3rem;box-sizing: border-box;
                span{
                    font-size:0.36rem;text-align:center;color:#f44236;
                }
            }
        }
        .ul_Special{
            width:10rem;background:#fff;list-style:none;overflow:hidden;padding:0.12rem 0rem;
            .specialItem{
                width:2.83rem;float:left;height:1.2rem;display:flex;align-items:center;justify-content:center;margin:0.12rem 0.25rem;border:solid 0.02rem #bbbbbb;border-radius:0.1rem;padding:0rem 0.3rem;box-sizing: border-box;
                span{
                    font-size:0.36rem;text-align:center;color:#bbbbbb;
                }
            }
            .specialItem.active{
                width:2.83rem;float:left;height:1.2rem;display:flex;align-items:center;justify-content:center;margin:0.12rem 0.25rem;border:solid 0.02rem #f44236;border-radius:0.1rem;padding:0rem 0.3rem;box-sizing: border-box;
                span{
                    font-size:0.36rem;text-align:center;color:#f44236;
                }
            }
        }

        .ul_Discount{
            width:10rem;background:#fff;list-style:none;overflow:hidden;padding:0rem 0.3rem;box-sizing: border-box;
            .DiscountItem{
                width:100%;height:1.1rem;display:flex;align-items:center;border-bottom:solid 0.05px #f2f3f4;
                .ItemImg{width:0.55rem;height:0.55rem;}
                .ItemContent{width:8rem;padding-left:0.3rem;color:#878686;font-size: 0.35rem;}
                .ItemYes{width:0.4rem;height:0.4rem;}
            }
        }

        .SelectEdit{
            width:100%;height:1.7rem;display:flex;align-items:center;justify-content:space-around;position:fixed;left:0rem;top:13.25rem;background:#fff;border-top:solid 0.05px #f2f3f4;
            .EditClear{
                width:4.5rem;height:1.2rem;border:solid 0.05px #ddd;line-height:1.2rem;text-align:center;color:#878686;border-radius:0.1rem;font-size: 0.4rem;
            }
            .EditSubmit{ 
                width:4.5rem;height:1.2rem;border:solid 0.05px #f44236;background:#f44236;color:#fff;line-height:1.2rem;text-align:center;border-radius:0.1rem;font-size: 0.4rem;
            }
        }
      }
  }
.ps_Img{width:10rem;height:5rem;
    img{width:100%;height:100%;}
  }
.ul_Pet{
    width:100%;list-style:none;
    .li_PetItem{
        background:#fff;width:95%;overflow:hidden;margin:0.2rem 0rem;-moz-box-shadow:0px 2px 6px #a3a3a3; -webkit-box-shadow:0px 2px 6px #a3a3a3; box-shadow:0px 2px 6px #a3a3a3;margin:0px auto;border-radius:5px;position:relative;margin-top:10px;
        .ItemLeft{
            width:2.5rem;height:2.8rem;display:flex;align-items:center;justify-content:center;float:left;
            img{width:2rem;height:2rem;border-radius:1rem;}
        }
        .ItemRight{
            width:7rem;height:2.8rem;float:left;padding:10px 10px;
            .Top{
                display:flex;align-items:center;justify-content:space-between;
                .left{
                    .cate{
                        color:#707070;font-weight:550;font-family:'微软雅黑';font-size:15px;
                    }
                    .value{
                        font-size:15px;color:#848484;
                    }
                }
            }
            .ItemMiddle{
                display:flex;align-items:center;justify-content:left;
                .left{
                    .cate{
                        color:#707070;font-weight:550;font-family:'微软雅黑';
                    }
                    .value{
                        font-size:15px;color:#848484;
                    }
                }
            }
            .Node{height:1rem;width:100%;font-size:0.3rem;line-height:1rem;padding:0rem;margin:0rem;font-family:'微软雅黑';
                display:flex;align-items:center;font-size:15px;color:#848484;
                img{width:0.7rem;margin-right:0.2rem;}
            }
        }
        .ThankMoney{
            width:100%;height:0.7rem;background:#eee;float:left;padding:0 0.3rem;display:flex;justify-content:center;
            span{font-size:0.4rem;line-height:0.7rem;padding:0rem;margin:0rem;font-family:'微软雅黑';color:#8f8f94;}
        }
        .State{
            position:absolute;bottom:0.1rem;right:-0.4rem;width:2rem;height:0.5rem;background-color:#38dbb0;text-align:center;font-size:13px;color:#fff;
            transform:rotate(-45deg);transform-origin:50% 0%;font-weight:200;
        }
    }
}
.SwiperList{
    img{
        width:100%;
    }
}
</style>
