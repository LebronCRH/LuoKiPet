<template>
<div class="rating_page">
<head-top :Title="Title" :Color="Color" :MidType="MidType"></head-top>
<div class="PetShopScreen">
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
<div class="Middle">
	<scroller ref="scroller" lock-x height="-90" scrollbar-y>
      <div>
        <ul class="ul_Pet">
            <!-- <li class="li_PetItem" v-for="item in petcategorylist"> -->
            <router-link v-for="item in petcategorylist" class="li_PetItem" :key="item.PetCategoryID" :to="'petcategoryIndex/petcategoryDetails/'+item.PetCategoryID" tag="li">
                <div class="PetImg">
                  <img :src="imgPCBaseUrl+item.PetCategory_Photos" alt="">
                </div>
                <div class="PetInfo">
                  <p class="PetName">{{item.PetCategoryName}}</p>
                  <div class="Line">
                    <p class="Left"><span class="Title">智商:</span><span class="Value">{{item.Intelligence}}</span></p>
                    <p class="Right"><span class="Title">肩高:</span><span class="Value">{{item.Height}}</span></p>
                  </div>
                  <div class="Line">
                    <p class="Left"><span class="Title">体型:</span><span class="Value">{{item.Shape}}</span></p>
                    <p class="Right"><span class="Title">体重:</span><span class="Value">{{item.Weight}}</span></p>
                  </div>
                  <div class="Introduce">
                    <img src="static/image/png/jianjie.png" alt="">
                    <span>学名西伯利亚雪橇犬…</span>
                  </div>
                </div>
                </router-link>
           <!--  </li> -->
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
        Title:'宠物种类',
        Color:1,
        MidType:0,
        EditBtn:false,
        sortBy:'',
        petcategorylist:[],
        imgPCBaseUrl:imgPCBaseUrl,
        showLoading:true,
      }
    },
    mounted(){
        this.initData();
    },
    destroyed(){

    },
    computed: {
    	...mapState([
                'PackageCartList'
            ]),
    },
    props:[],
    methods: {
    	...mapMutations([
                'UPDATE_PACKAGECART',
            ]),
        async initData(){
            await GetPetCategoryAll().then(response=>{
                this.petcategorylist=response;
            });
            this.hideLoading();
        },
        hideLoading(){
          this.showLoading = false;
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

.ul_Pet{
    width:100%;list-style:none;padding:0.2rem;box-sizing:border-box;
    .li_PetItem{
        width:100%;height:3rem;background:#fff;border-radius:10px;margin-bottom: 0.3rem;
        -moz-box-shadow:0px 5px 10px #ddd; -webkit-box-shadow:0px 5px 10px #ddd; box-shadow:0px 5px 10px #ddd;
        display:flex;align-items:center;justify-content:center;
        .PetImg{
            width:3rem;height:100%;border-radius:10px;overflow: hidden;
            img{width:100%;height:100%;}
        }
        .PetInfo{
            width:6.6rem;height:100%;padding:0rem 0.2rem;
            .PetName{font-size:0.5rem;font-family:"微软楷体";color: #000;height:0.8rem;line-height:0.8rem;}
            .Line{width:100%;height:0.7rem;font-size:0.4rem;display:flex;align-items:center;justify-content:space-between;
                .Title{
                    font-size:0.43rem;color:#a1a1a1;font-family:"微软楷体";
                }
                .Value{
                    font-size:0.45rem;color:#000;font-family:"微软楷体";
                }
            }
            .Introduce{width:100%;height:0.8rem;font-size:0.4rem;display:flex;align-items:center;
                img{width:0.5rem;height:0.5rem;margin-right:0.2rem;}
            }
        }
    }
}
</style>
