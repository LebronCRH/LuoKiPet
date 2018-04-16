<template>
<div class="rating_page">
    <div class="psAll_serach">
        <div class="back" @click="$router.go(-1)">
          <img src="static/image/Left1.png">
        </div>
          <div class="ps_divserach">
             <img src="static/image/serach2.png">
             <input type="text" name="serachName">
          </div>
         <div class="currentNode">
          <img src="static/image/currentNode.png">
        </div>
    </div>
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
    <transition name="showlist">
      <div v-show="sortBy=='EreaSelect'" class="AreaList">
             <div class="Left">
               <ul class="BigArea">
                  <li class="BigAreaItem" :class="Area==0?'active':''" @click="ChangeAreaAll()"><span>全部商圈</span></li>
                  <li class="BigAreaItem" v-for="area in Arealist" :class="Area==area.AreaId?'active':''" @click="ChangeArea(area)"><span>{{area.AreaName}}</span></li>
               </ul>
         </div>
         <div class="Right">
             <div class="ul_AreaItem" v-for="item in CurrentNodeList">
               <p class="FirstEn">{{item.FirstEN}}</p>
               <ul class="SmallArea">
                  <li class="SmallAreaItem" :class="CurrentNode==node.NodeId?'active':''" v-for="node in item.NodeList" @click="SelectNode(node)">
                  <span>{{node.NodeName}}</span>
                  <img v-show="CurrentNode==node.NodeId" src="static/image/yes.png">
                  </li>
               </ul>
               </div>
         </div>
      </div>
    </transition>
    <transition name="showlist">
      <div v-show="sortBy=='CategorySelect'" class="CategorySelect">
            <div class="Left">
               <ul class="BigCategory">
                  <li class="BigCateItem"><span>全部分类</span></li>
                  <li class="BigCateItem"><span>狗狗服务</span></li>
                  <li class="BigCateItem"><span>猫咪服务</span></li>
                  <li class="BigCateItem"><span>鼠类服务</span></li>
                  <li class="BigCateItem"><span>兔类服务</span></li>
               </ul>
            </div>
            <div class="Right">
               <ul class="SmallCategory">
                  <li class="SmallCateItem"><span>狗狗洗澡</span></li>
                  <li class="SmallCateItem"><span>狗狗造型</span></li>
                  <li class="SmallCateItem"><span>狗狗寄养</span></li>
                  <li class="SmallCateItem"><span>狗狗绝育</span></li>
                  <li class="SmallCateItem"><span>狗狗体验</span></li>
                  <li class="SmallCateItem"><span>狗狗医疗</span></li>
                  <li class="SmallCateItem"><span>狗狗摄影</span></li>
                  <li class="SmallCateItem"><span>狗狗联姻</span></li>
                  <li class="SmallCateItem"><span>狗狗出游</span></li>
                  <li class="SmallCateItem"><span>狗狗互换</span></li>
               </ul>
            </div>
      </div>
    </transition>
    <transition name="showlist">
          <ul v-show="sortBy=='SortSelect'" class="SortSelect">
             <li class="SortItem" v-for="sort in ShopSort" @click="SelectSort(sort)">
                <span :class="CurrentSort==sort.SortId?'active':''">{{sort.SortName}}</span>
                <img v-show="CurrentSort==sort.SortId" src="static/image/yes.png">
             </li>
          </ul>
    </transition>
    <transition name="showlist">
      <div class="CharactSelect" v-show="sortBy=='ScreenSelect'">
         <p class="CharacgTitle">合作商户</p>
         <ul class="ul_Cooperation">
            <li class="cooperationItem" :class="CurrentMerchant==item.CategoryId?'active':''" v-for="item in MerchantCategoryList" @click="SelectMerchant(item)">
                <span>{{item.CategoryName}}</span>
            </li>
         </ul>
         <p class="CharacgTitle">特殊商户</p>
         <ul class="ul_Special">
            <li class="specialItem" :class="IsArray(item.CategoryId)?'active':''" v-for="item in SpecialShopCategoryList" @click="SelectSpecialShop(item)">
            <span>{{item.CategoryName}}</span>
            </li>
         </ul>
         <p class="CharacgTitle">优惠活动</p>
         <ul class="ul_Discount">
            <li class="DiscountItem" v-for="item in YouHuiActiveCategoryList" @click="SelectDiscount(item)">
            <img class="ItemImg" :src="item.CategoryImg">
            <span class="ItemContent">{{item.CategoryName}}</span>
            <img v-show="CurrentYouHuiActive==item.CategoryId" class="ItemYes" src="static/image/yes.png">
            </li>
         </ul>
         <div class="SelectEdit">
            <div class="EditClear" @click="CleanCurrentSpreen">
                清空
            </div>
            <div class="EditSubmit" @click="ConfirmCurrentSpreen">
              确定
            </div>
         </div>
      </div>
    </transition>
    </div>
<div class="ModalZhe" v-show="ModalZhe" @click="CloseModal"></div>
<div class="Middle">
    <scroller ref="scroller" lock-x height="-90" scrollbar-y use-pulldown :use-pullup=true @on-scroll="PageSlide" @on-pullup-loading="UpPagedade" @on-pulldown-loading="DownPageData" v-model="scrollerStaues">
    <div>
        <serviceshoplist :shoplistdata="shoplistdata"></serviceshoplist>
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
       <section class="animation_opactiy shop_back_svg_container" v-show="showLoading">
           <img src="static/image/shop_back_svg.svg">
       </section>
       <loading v-show="showLoading"></loading>
	    <transition name="router-slid" mode="out-in">
            <router-view></router-view>
        </transition>
</div>
</template>

<script>
  import serviceshoplist from '@/page/petservice/components/serviceshoplist'
  import axios from 'axios'
  import loading from '@/components/common/loading.vue'
  import { Swiper, Scroller, Spinner } from 'vux'
  import {GetAllPetServiceShop,GetAllShopScreen,GetAllCityArea} from '../../service/getdata'  

  export default {
      components: {
  		    serviceshoplist,
          Swiper,
          Scroller,
          Spinner,
          loading,
      },
      data () {
        return {
          shoplistdata:[],
          Area:0,
          showLoading: true, //显示加载动画
          scrollerStaues: {
            pulldownStatus: 'default',
            pullupStatus: 'default'
          },
          sortBy:'',
          Arealist:[],
          CurrentAllNodeList:[{
             "FirstEN":"#",
             "NodeList":[{
             "NodeName":"全部"
          }]
      }],
          CurrentNodeList:[],
          ShopSort:[],
          ModalZhe:false,
          CurrentNode:null,
          CurrentSort:null,
          CurrentYouHuiActive:null,
          CurrentMerchant:null,
          CurrentSpecialShopList:[],
          MerchantCategoryList:[],
          SpecialShopCategoryList:[],
          YouHuiActiveCategoryList:[],
        }
      },
      mounted(){
        this.initData();
      },
      computed: {
    
      },
      props:[],
      methods: {
      	onRefresh (done) {
            done()
        },
        //隐藏动画
        hideLoading(){
          this.showLoading = false;
        },
        async initData(){
          await GetAllPetServiceShop().then(response=>{
            this.shoplistdata=response;
            console.log(response[0].ShopName);
          });
          await GetAllCityArea().then(response=>{
              this.Arealist=response.AreaList; 
              this.Arealist.forEach((item,index)=>{
                item.AreaList.forEach((item2,index)=>{
                  var flag=0;
                  this.CurrentAllNodeList.forEach((item3,index)=>{
                    if(item3.FirstEN==item2.FirstEN){
                      flag=1;
                      item2.NodeList.forEach((item4,index)=>{
                        item3.NodeList.push(item4);
                      })
                    }
                  })
                  if(flag==0){
                    this.CurrentAllNodeList.push(item2);
                  }
                })
                this.CurrentNodeList=this.CurrentAllNodeList;
              })
          });
          await GetAllShopScreen().then(response=>{
            this.MerchantCategoryList=response.MerchantCategory;
            this.SpecialShopCategoryList=response.SpecialShopCategory;
            this.YouHuiActiveCategoryList=response.YouHuiActiveCategory;
            this.ShopSort=response.SortMode;
          });
          this.hideLoading();
        },
        taggle(){
        	this.sortBy=!this.sortBy;
        },
        onInfinite (done) {
            done()
        },
        ChangeArea(area){
        	this.Arealist.forEach((item,index)=>{
        		if(item.AreaId==area.AreaId){
        			this.CurrentNodeList=item.AreaList;
        			this.Area=item.AreaId;
        		}
        	})
        },
        SelectNode(node){
        	this.CurrentNode=node.NodeId;
        	this.sortBy='';
        	this.ModalZhe=false;
        },
        SelectSpecialShop(item){
        	let Flag=false;
        	let Index=0;
        	this.CurrentSpecialShopList.forEach((item2,index)=>{
        		if(item2==item.CategoryId){
        			Flag=true;
        			Index=index;
        		}
        	})
        	if(Flag){
        		this.CurrentSpecialShopList.splice(Index,1);
        	}
        	else{
        		this.CurrentSpecialShopList.push(item.CategoryId);
        	}
        },
        CleanCurrentSpreen(){
        	this.CurrentYouHuiActive=null;
          this.CurrentMerchant=null;
          this.CurrentSpecialShopList=[];
        },
        ConfirmCurrentSpreen(){
        	this.sortBy='';
        	this.ModalZhe=false;
        },
        IsArray(Id){
        	let Flag=false;
        	this.CurrentSpecialShopList.forEach((item,index)=>{
        		if(item==Id){
        			Flag=true;
        		}
        	})
        	return Flag;
        },
        SelectSort(sort){
        	this.CurrentSort=sort.SortId;
        	this.sortBy='';
        	this.ModalZhe=false;
        },
        SelectDiscount(item){
        	this.CurrentYouHuiActive=item.CategoryId;
        },
        SelectMerchant(item){
        	this.CurrentMerchant=item.CategoryId;
        },
        ChangeAreaAll(){
        	this.CurrentNodeList=this.CurrentAllNodeList;
        },
        PageSlide (pos) {

        },
        async chooseType(type){
      		if (this.sortBy !== type) {
      			this.sortBy = type;
      			this.ModalZhe=true;
      		}else{
      			//再次点击相同选项时收回列表
      			this.sortBy = '';
      			this.ModalZhe=false;
      		}
      	},
        CloseModal(){
        	this.ModalZhe=false;
        	this.sortBy='';
        },
        UpPagedade () {
          console.log(66);
          this.$nextTick(() => {
          setTimeout(() => {
            this.$refs.scroller.donePullup()
          }, 1000)
          })
        },
        DownPageData () {
          console.log("555");
          this.$nextTick(() => {
          setTimeout(() => {
            this.$refs.scroller.donePulldown()
          }, 1000)
         })
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
  .shop_back_svg_container{
          position: fixed;top:0rem;z-index:999;
          // @include wh(100%, 100%);
          width:100%;height:100%;
          img{
              // @include wh(100%, 100%);
              width:100%;height:100%;
          }
      }
  .router-slid-enter-active, .router-slid-leave-active {
          transition: all .4s;
      }
      .router-slid-enter, .router-slid-leave-active {
          transform: translate3d(2rem, 0, 0);
          opacity: 0;
  }
  .Middle{
     position:absolute;top:2.4rem;left:0rem;bottom:0rem;width:100%;
  }
  .psAll_serach{height:1.2rem;width:10rem;padding:0rem 0rem;background-color:#fff;display:flex;align-items:center;z-index:101;position:relative;
      .back{
      	width:1rem;height:1rem;display:flex;align-items:center;justify-content:center;
  		img{width:0.6rem;height:0.6rem;}
  	}
  	.ps_divserach{width:8rem;height:1rem;border-radius:0.2rem;background-color:#f7f7ff;
  		img{height:1rem;width:1rem;float:left;padding:0.2rem;box-sizing: border-box;}
  		input{width:6rem;height:1rem;padding:0rem;margin:0rem;float:left;border:none;color:#e0e0e0;background-color:#f7f7ff;}
  	}
      .currentNode{
  		width:1rem;height:1rem;display:flex;align-items:center;justify-content:center;
  		img{
  			width:0.6rem;height:0.6rem;
  		}
  	}
  }
  .ModalZhe{position:absolute;top:2.35rem;left:0rem;bottom:0rem;background-color:rgba(0,0,0,0.7);width:10rem;z-index:99;}
  .PetShopScreen{
  	width:100%;height:1.14rem;position:relative;z-index:100;background:#fff;
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
  .showlist-enter-active, .showlist-leave-active {
  	transition: all .4s;
  	transform: translateY(0);
  }
  .showlist-enter, .showlist-leave-active {
  	opacity: 0;
  	transform: translateY(-100%);
  }
  // .AreaList{
  // 	position:absolute;top:2.35rem;left:0rem;width:10rem;height:10rem;background:red;z-index:99;
  // }
  .AreaList1{
  	position:absolute;top:2.35rem;left:0rem;width:10rem;height:10rem;background:yellow;z-index:99;
  }
  .AreaList2{
  	position:absolute;top:2.35rem;left:0rem;width:10rem;height:10rem;background:white;z-index:99;
  }
  .AreaList3{
  	position:absolute;top:2.35rem;left:0rem;width:10rem;height:10rem;background:black;z-index:99;
  }

</style>