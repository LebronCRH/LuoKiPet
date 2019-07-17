<template>
	<div class="rating_page">
	<head-top :Title="Service.MShopService.ServiceName" :Color="Color" :MidType="MidType"></head-top>
	<div class="Middle" ref="Middle">
	<scroller ref="scroller" lock-x height="-56" scrollbar-y>
      <div>
        <div class="psd_details">
   <p class="serviceTitle">
    <span>{{Service.MShopService.ServiceName}}</span>
     <img src="static/image/discount.png">
   </p>
   <p class="service_saleNumAndPj"><span class="saleNum">已售0</span><span class="mid">|</span><span class="commentNum">暂无评价</span></p>
   <div class="service_price">
      <span>￥55起</span>
      <div class="buy" @click="BuyService()">购买</div>
   </div>
</div>

<div class="service_Intro">
   <div class="Title"><p>服务详情</p></div>
      <div class="line"></div>
   <div class="Content IntroContent">
     <p class="Bigtitle">凭洛奇网服务券可享受一下内容</p>
     <p class="P_conteng">• 梳理毛发、清理眼部、清洗耳道、拔耳毛、修剪腹底毛、修剪脚底毛、修剪肛门腺周围、挤肛门腺、修剪指甲、美容洗护、吹风拉毛、碳酸SPA
</p>
   </div>
</div>

<div class="service_Intro">
   <div class="Title"><p>购买须知</p></div>
   <div class="line"></div>
   <div class="Content IntroContent">
     <p class="Bigtitle">有效期</p>
     <p class="P_conteng">• 购买之日起30日内有效，过期不予退券</p>
          <p class="Bigtitle">联系电话</p>
     <p class="P_conteng">• 15007932468</p>
          <p class="Bigtitle">预约提醒</p>
     <p class="P_conteng">• 请务必提前1天与商家预约</p>
          <p class="Bigtitle">规则提醒</p>
     <p class="P_conteng">• 本服务券限狗狗使用，详情请咨询商家</p>
      <p class="P_conteng">• 本次服务不可与店内其他优惠同时享受</p>
      <p class="Bigtitle">温馨提示</p>
     <p class="P_conteng">• 以下情况请在购买前与商户沟通</p>
      <p class="P_conteng">• 接种完疫苗一周内的</p>
      <p class="P_conteng">• 有先天性疾病、传染病及皮肤损伤的</p>
      <p class="P_conteng">• 母犬怀孕前后一个月及处于哺乳期间的</p>
      <p class="P_conteng">• 犬只带攻击性或带不稳定情绪的</p>
   </div>
</div>

<div class="psd_AllComment">
   <div class="Title"><p>全部评论(0)</p></div>
   <ul class="ul_Comment">
     <li class="li_CommentItem">
     <div class="userImg">
     <img src="static/image/user1.jpg">
     </div>
     <div class="user_content">
       <div class="user_Name">
       <span><i></i>笑吾不良人</span>
       <div class="xinxin"></div>
       </div>
       <p class="Time">06-11 18:32</p>
       <p class="Content">很好，老板狼非常的漂亮！很好，老板狼非常的漂亮！</p>
       <p class="service_cate">狗狗洗澡 标准洗澡</p>
     </div>
     </li>
          <li class="li_CommentItem">
     <div class="userImg">
     <img src="static/image/user1.jpg">
     </div>
     <div class="user_content">
       <div class="user_Name">
       <span><i></i>的萨达是</span>
       <div class="xinxin"></div>
       </div>
       <p class="Time">06-11 18:32</p>
       <p class="Content">他们家的店真的是不错啊</p>
       <p class="service_cate">狗狗洗澡 标准洗澡</p>
     </div>
     </li>
          <li class="li_CommentItem">
     <div class="userImg">
     <img src="static/image/user1.jpg">
     </div>
     <div class="user_content">
       <div class="user_Name">
       <span><i></i>熊大数据</span>
       <div class="xinxin"></div>
       </div>
       <p class="Time">06-11 18:32</p>
       <p class="Content">但是空间和期望打，大叔大婶</p>
       <p class="service_cate">狗狗洗澡 标准洗澡</p>
     </div>
     </li>
          <li class="li_CommentItem">
     <div class="userImg">
     <img src="static/image/user1.jpg">
     </div>
     <div class="user_content">
       <div class="user_Name">
       <span><i></i>突然范德萨</span>
       <div class="xinxin"></div>
       </div>
       <p class="Time">06-11 18:32</p>
       <p class="Content">到低价拿货大的，哦is啊嗯千万个</p>
       <p class="service_cate">狗狗洗澡 标准洗澡</p>
     </div>
     </li>
          <li class="li_CommentItem">
     <div class="userImg">
     <img src="static/image/user1.jpg">
     </div>
     <div class="user_content">
       <div class="user_Name">
       <span><i></i>笑吾不良人</span>
       <div class="xinxin"></div>
       </div>
       <p class="Time">06-11 18:32</p>
       <p class="Content">很好，老板狼非常的漂亮！很好，老板狼非常的漂亮！</p>
       <p class="service_cate">狗狗洗澡 标准洗澡</p>
     </div>
     </li>
          <li class="li_CommentItem">
     <div class="userImg">
     <img src="static/image/user1.jpg">
     </div>
     <div class="user_content">
       <div class="user_Name">
       <span><i></i>都面授机哦我</span>
       <div class="xinxin"></div>
       </div>
       <p class="Time">06-11 18:32</p>
       <p class="Content">UI等哈说HUO局合适的！</p>
       <p class="service_cate">狗狗洗澡 标准洗澡</p>
     </div>
     </li>
          <li class="li_CommentItem">
     <div class="userImg">
     <img src="static/image/user1.jpg">
     </div>
     <div class="user_content">
       <div class="user_Name">
       <span><i></i>OISHH~SAD</span>
       <div class="xinxin"></div>
       </div>
       <p class="Time">06-11 18:32</p>
       <p class="Content">sda大大说的as大撒大声地！</p>
       <p class="service_cate">狗狗洗澡 标准洗澡</p>
     </div>
     </li>
   </ul>
</div>
      </div>
    </scroller>
    </div>
<!-- <div class="ps_ServiceBag">
   <div class="Left">
     <img src="static/image/bag1.png">
     <p>券包为空</p>
   </div>
   <div class="Right">去结算</div>
</div> -->
<transition name="fadePackageList">
<div class="PackageCartList1" v-show="showPackageCartList">
  <div class="Top">
    <p>券包</p>
    <div class="Clear">
      <img src="static/image/Clear.png">
      <span>清空</span>
    </div>
  </div>
  <ul class="ul_packagelist">
    <li class="li_packageitem" v-for="item in ShopPackageCartList">
      <div class="PackageName">
      <span>{{item.ForServiceName}} {{item.PackageName}}</span>
      </div>
      <div class="MiddlePrice">
        <span>￥{{item.PackagePrice}}</span>
      </div>
      <div class="EditPackage">
        <div class="jian" @click="PackageCartJian(item.ForShopId,item.ForServiceID,item.PackageId)">
          <img src="static/image/buyjian.png" alt="">
        </div>
        <div class="buynum">
          <span>{{item.SaleNum}}</span>
        </div>
        <div class="jia" @click="PackageCartJia(item.ForShopId,item.ForServiceID,item.PackageId)">
          <img src="static/image/buyAdd.png" alt="">
        </div>
      </div>
    </li>
  </ul>
</div>
</transition>
<div class="zhemodale" v-show="showPackageCartList" @click="TagglePackageCartList"></div>
<div class="ps_ServiceBag">
   <div class="Left">
   <div class="Img" @click="TagglePackageCartList">
   <img src="static/image/bag1.png">
   <p v-if="CartTotalNum>0" class="Num">{{this.CartTotalNum}}</p>
   </div>
     <p v-if="CartTotalMoney>0" class="TotalMoney">￥{{this.CartTotalMoney}}</p>
     <p v-else>券包为空</p>
   </div>
   <div v-if="CartTotalNum>0" class="Right Active">去结算</div>
   <div v-else class="Right">去结算</div>
</div>
<buyservice :ServiceId='Service.MShopService.ServiceId' ref="buyservice"></buyservice>
<transition name="router-slid" mode="out-in">
            <router-view></router-view>
        </transition>
	</div>
</template>

<script>
import axios from 'axios'
import headTop from '@/components/Head.vue'
import {mapState, mapMutations} from 'vuex'
import { Scroller } from 'vux'
import {GetShopServiceDetail} from '@/service/getdata' 
import buyservice from '@/page/petservice/components/buyservice.vue'
export default {
    components: {
    	headTop,
    	Scroller,
    	buyservice
    },
    data () {
      return {
        msg: 'Hello World!',
        Title:'详情页',
        Color:0,
        MidType:1,
        Service:{
        	// serviceName:null,
        	// Category:null,
        	// ForServiceID:null,
        	// Category:null
          MShopService:null,
          MServicePackageList:[], 
        },
        servicelistdata:[],
        ShopPackageCartList:[],
        showPackageCartList:false,
        CurrentShopId:null,
      }
    },
    mounted(){
      console.log("来来来 挂载一次");
      console.log(this.$route.params.serviceid);
    	this.initData();
    },
    updated(){
      this.initHeadHeight();
    },
    computed:{
      ...mapState([
                  'PackageCartList','StatusbarHeight','StatusbarHeightRem',
              ]),
      //当前商店券包信息
              shopPackageCart: function (){
                  return {...this.PackageCartList[this.CurrentShopId]};
              },
              CartTotalNum: function (){
                  let num = 0;
                  this.ShopPackageCartList.forEach(item => {
                      num += item.SaleNum
                  })
                  return num
              },
              CartTotalMoney:function(){
                let totalmoney=0;
                this.ShopPackageCartList.forEach(item => {
                      totalmoney += item.SaleNum*item.PackagePrice
                  })
                return totalmoney.toFixed(2);
              },
    },
    props:[],
    methods: {
      ...mapMutations([
                  'ADD_PACKAGECART','JIA_PACKAGECART','JIAN_PACKAGECART'
              ]),
    	async initData(){
        this.CurrentShopId=this.$route.params.shopid;
        this.GetShopList();
        },
        initHeadHeight(){
          if(this.$refs.Middle)
          {
            this.$refs.Middle.style.top=(1.5+this.StatusbarHeightRem)*window.screen.width / 10+"px";
          }
        },
        BuyService(){
        this.$refs.buyservice.modalTaggle();
        },
        PackageCartJia(shopid,serviceid,packageid){
          this.JIA_PACKAGECART({shopid,serviceid,packageid});
        },
        PackageCartJian(shopid,serviceid,packageid,){
          this.JIAN_PACKAGECART({shopid,serviceid,packageid});
        },
    	  async GetShopList(){
          // await GetShopServiceInfoByServiceID(this.$route.params.serviceid).then(response=>{
          //   this.Service=response;
          // })
          await GetShopServiceDetail(this.$route.params.serviceid).then(response=>{
              this.Service=response;
              console.log(response);
          })
        },
        TagglePackageCartList(){
          if(this.ShopPackageCartList.length==0)
          {
            this.$vux.toast.text('请添加商户服务券','middle');
          }
          else
          {
            this.showPackageCartList=!this.showPackageCartList;
          }
        },
        initPackageCartList(){
          this.ShopPackageCartList=[];
          console.log("初始化券包数据");
          console.log(this.shopPackageCart.ServiceList);
          Object.keys(this.shopPackageCart.ServiceList).forEach(serviceid=>{
            console.log(serviceid);
            Object.keys(this.shopPackageCart.ServiceList[serviceid]).forEach(packageid=>{
              console.log(packageid);
              this.ShopPackageCartList.push(this.shopPackageCart.ServiceList[serviceid][packageid]);
              console.log("66");
            })
          })
        },
    },
    watch:{
      shopPackageCart:function (value){
        if(value.ShopName!=undefined)
        {
          this.initPackageCartList();
        }else{
          this.ShopPackageCartList=[];
          this.showPackageCartList=false;
        }
      },
    },
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
  .Middle{
      position:absolute;top:1.5rem;left:0rem;bottom:0rem;width:100%;
  }
  .router-slid-enter-active, .router-slid-leave-active {
      transition: all .4s;
  }
  .router-slid-enter, .router-slid-leave-active {
      transform: translate3d(2rem, 0, 0);
      opacity: 0;
  }
  .psd_details{
  	width:10rem;height:3rem;padding:0rem 0.3rem;margin-top:0.05rem;background-color:#fff;
  	.serviceTitle{
  		width:100%;height:1.15rem;display:flex;align-items:center;padding:0rem;margin:0rem;
  		span{font-size:0.5rem;color:#0f0f0f;margin-right:0.3rem;}
  		img{width:0.5rem;height:0.5rem;}
  	}
  	.service_saleNumAndPj{width:100%;height:0.55rem;display:flex;align-items:center;padding:0rem;margin:0rem;
  		.saleNum{font-size:0.35rem;color:#8e8e8e;padding-right:0.1rem;}
  		.mid{font-size:0.35rem;color:#8e8e8e;}
  		.commentNum{font-size:0.35rem;color:#8e8e8e;padding-left:0.1rem;}
  	}
  	.service_price{
  		width:100%;height:1.25rem;margin-top:0.05rem;position:relative;display:flex;align-items:center;
  		span{color:#f75952;font-size:0.55rem;}
  		.buy{position:absolute;right:0.5rem;height:0.7rem;padding:0rem 0.2rem;border:solid 0.03rem #f75952;border-radius:0.35rem;display:flex;align-items:center;justify-content:cursor;color:#f75952;    font-size: 0.4rem;}
  	}
  }
  .service_Intro{width:10rem;margin-top:0.3rem;padding:0rem 0.3rem;background-color:#fff;box-sizing: border-box;
  	.Title{width:100%;height:1.1rem;display:flex;align-items:center;background-color:#fff;
  		p{font-size:0.4rem;color:#8e8e8e;padding:0rem;margin:0rem;}
  	}
  	.line{background-color:#f7f3f7;width:100%;height:0.01rem;}
  	.IntroContent{width:100%;background-color:#fff;
  		.Bigtitle{width:100%;height:0.8rem;line-height:0.8rem;font-size:0.47rem;color:#000;margin-bottom:0.26rem;}
  		.P_conteng{width:100%;line-height:0.45rem;font-size:0.37rem;color:#0f0f0f;margin-bottom:0.26rem;}
  	}
  }
  .Title{width:100%;height:1.1rem;display:flex;align-items:center;background-color:#fff;
  		p{font-size:0.4rem;color:#8e8e8e;padding:0rem;margin:0rem;}
  	}
  .psd_AllComment{width:10rem;margin-top:0.3rem;padding:0rem 0.3rem;background-color:#fff;
  	.ul_Comment{list-style:none;width:10rem;padding:0rem;margin:0rem;width:100%;
  		.li_CommentItem{width:100%;overflow:hidden;padding-top:0.35rem;
  			.userImg{width:1rem;float:left;
  				img{width:1rem;height:1rem;border-radius:0.5rem;overflow:hidden;}
  			}
  			.user_content{width:8.4rem;float:left;padding-left:0.3rem;
  				.user_Name{width:100%;height:0.63rem;position:relative;display:flex;align-items:center;
  					span{font-size:0.4rem;color:#0f0f0f;
  						i{background:url(../../../../../static/image/bag1.png);background-size:0.4rem 0.4rem;display:inline-block;margin-right:0.2rem;width:0.4rem;height:0.4rem;}
  					}
  					.xinxin{background:url(../../../../../static/image/star1.png) no-repeat center center;width:2rem;height:0.32rem;background-size:2rem 0.32rem;position:absolute;right:0.05rem;}
  				}
  				.Time{width:100%;height:0.7rem;line-height:0.7rem;margin:0rem;font-size:0.23rem;color:#8e8e8e;}
  				.Content{width:80%;line-height:0.62rem;margin:0.2rem 0rem;color:#0f0f0f;font-size:0.38rem;}
  				.service_cate{width:100%;height:0.6rem;line-height:0.6rem;font-size:0.35rem;color:#8e8e8e;}
  			}
  		}
  	}
  }
  .zhe{position:absolute;width:100%;height:100%;top:0rem;left:0rem;background-color:#000;opacity:0.6;z-index:999;}
  .Buy_ServiceSelect{width:100%;height:100%;z-index:999;position:absolute;top:0rem;left:0rem;padding:0rem 0.3rem;
  	.zhe2{position:absolute;width:100%;height:100%;top:0rem;left:0rem;z-index:98;}
  	  .Buy_ServiceContent{width:100%;margin-top:0.8rem;background-color:#fff;position:absolute;left:0rem;bottom:0rem;padding:0rem 0.3rem;z-index:99;
  	  	p{margin:0rem;}
  	  	.Close{position:absolute;top:0.3rem;right:0rem;width:0.57rem;height:0.57rem;right:0.3rem;
  	  		img{width:0.57rem;height:0.57rem;}
  	  	}
  	  	.Top{
  	  		padding-bottom:0.3rem;border-bottom:solid 0.03rem #f4f4f9;
  	  		.p_title{width:100%;height:0.9rem;line-height:0.9rem;font-size:0.5rem;color:#0f0f0f;margin-top:0.7rem;}
  	  	.p_price{width:100%;height:0.9rem;line-height:0.9rem;margin:0rem;
  	  		.new_price{line-height:0.9rem;font-size:0.4rem;color:#f75952;margin-right:1rem;}
  	  		.old_price{line-height:0.9rem;font-size:0.3rem;color:#8e8e8e;}
  	  	}
  	  	.p_discount{width:100%;height:0.9rem;display:flex;align-items:center;
  	  		img{width:0.5rem;height:0.5rem;margin-right:0.3rem;}
  	  		span{font-size:0.35rem;color:#0f0f0f;}
  	        }
  	  	}
  	  	.Mid_Category{
  	  		.Title{width:100%;height:1rem;line-height:1rem;font-size:0.38rem;color:#0f0f0f;}
  	  		.ul_serviceCate{list-style:none;width:100%;border-bottom:solid 0.03rem #f4f4f9;overflow:hidden;
  	  			.li_serviceCate{height:1.1rem;padding:0rem 0.25rem;border-radius:0.2rem;background-color:#f5f5f5;display:flex;align-items:center;float:left;margin-right:0.3rem;margin-bottom:0.3rem;
  	  				span{font-size:0.35rem;color:#0f0f0f;}
  	  			}
  	  			.li_serviceCate.active{background-color:#f55b50;
  	  				span{color:#fff;}
  	  			}
  	  		}
  	  		.BuyNum{width:100%;height:2.5rem;padding-bottom:1rem;border-bottom:solid 0.03rem #f4f4f9;display:flex;align-items:center;
  	  			.message{width:6.4rem;height:1.5rem;line-height:1.5rem;font-size:0.45rem;color:#0f0f0f;float:left;}
  	  			.Edit{width:3.1rem;float:left;height:0.9rem;
  	  				div{float:left;display:flex;align-items:center;justify-content:center;}
  	  				.jian{width:0.9rem;height:0.9rem;border-radius:0.03rem;background-color:#f5f5f5;color:#0f0f0f;font-size:0.4rem;margin-right:0.05rem;}
  	  				.num{width:1.1rem;height:0.9rem;background-color:#f5f5f5;color:#000;font-size:0.4rem;margin-right:0.05rem;}
  	  				.Add{width:0.9rem;height:0.9rem;border-radius:0.03rem;background-color:#f5f5f5;color:#0f0f0f;font-size:0.4rem;}
  	  			}
  	  		}
  	  	}
  	  	.Service_Edit{width:100%;height:1.6rem;display:flex;align-items:center;
  	  		.AddBag{width:4.5rem;float:left;height:1.14rem;margin-right:0.4rem;display:flex;align-items:center;justify-content:center;
  	  			border:solid 0.03rem #b4b4b4;border-radius:0.1rem;color:#000;
  	  		}
  	  		.Buy_Service{width:4.5rem;float:left;height:1.14rem;display:flex;align-items:center;justify-content:center;
  	  			border:solid 0.03rem #f55b50;border-radius:0.1rem;color:#fff;background-color:#f55b50;
  	  		}
  	  	}
  	  }
  } 
  // .ps_ServiceBag{width:100%;height:1.2rem;position:fixed;bottom:0rem;left:0rem;background-color:#fff;border-top:solid 1px #f9f9ff;
  //   .Left{width:6.5rem;height:100%;float:left;
  //     img{width:1.2rem;height:1.2rem;padding:0.3rem;float:left;margin-left:0.3rem;box-sizing: border-box;}
  //     p{width:5rem;padding:0rem;margin:0rem;padding-left:0rem;line-height:1.2rem;font-size:0.4rem;color:#5b5c5b;float:left;}
  //   }
  //   .Right{width:3.5rem;height:100%;background-color:#adaaad;color:#fff;line-height:1.2rem;text-align:center;font-size:0.4rem;float:left;}
  // }
  .fadePackageList-enter-active, .fadePackageList-leave-active {
          transition: all .2s;
          transform: translateY(0%);
  }
  .fadePackageList-enter, .fadePackageList-leave-active {
          transform: translateY(100%);
  }
  .PackageCartList1{
    width:100%;position:fixed;bottom:1.2rem;left:0rem;background-color:#fff;border-top:solid 1px #f9f9ff;z-index:98;
    .Top{width:100%;height:1.1rem;display:flex;align-items:center;justify-content:space-between;padding:0rem 0.3rem;box-sizing:border-box;
      p{font-size:0.4rem;color:#707070;}
      .Clear{height:1.1rem;display:flex;align-items:center;justify-content:center;
        img{width:0.5rem;height:0.5rem;}
        span{font-size:0.4rem;color:#707070;margin-left:0.1rem;}
      }background-color:#f6f6f6;
    }
    .ul_packagelist{
      list-style:none;width:10rem;padding:0rem 0.5rem;box-sizing:border-box;
      .li_packageitem{
        width:100%;height:1.58rem;padding:0.3rem 0rem;box-sizing:border-box;display:flex;align-items:center;justify-content:center;border-bottom:solid 1px #ebe7e7;
        .PackageName{
          width:4.3rem;height:100%;
          span{font-size:0.43rem;line-height:0.49rem;height:0.98rem;float:left;}
        }
        .MiddlePrice{
          width:2rem;height:100%;display:flex;align-items:center;
          span{font-size:0.45rem;line-height:0.49rem;float:left;color:#f3572d;}
        }
        .EditPackage{
          width:2.7rem;height:100%;display:flex;justify-content:center;align-items:center;
          .jian{width:0.6;height:0.6rem;
            img{width:0.6rem;height:0.6rem;float:left;}
          }
          .buynum{
            width:1.5rem;height:0.6rem;display:flex;text-align:center;
            span{font-size:0.3rem;line-height:0.6rem;width:1.5rem;text-align:center;}
          }
          .jia{width:0.6;height:0.6rem;
            img{width:0.6rem;height:0.6rem;float:left;}
          }
        }
      }
    }
  }
  .zhemodale{position:absolute;left:0rem;top:0rem;bottom:0rem;right:0rem;background-color:rgba(0, 0, 0, 0.5);z-index:97;}
  .ps_ServiceBag{width:100%;height:1.2rem;position:fixed;bottom:0rem;left:0rem;background-color:#fff;border-top:solid 1px #f9f9ff;z-index:99;
    .Left{width:6.5rem;height:100%;float:left;
      .Img{
        width:1.2rem;height:1.2rem;float:left;margin-left:0.3rem;position:relative;
        img{width:1.2rem;height:1.2rem;padding:0.3rem;float:left;box-sizing: border-box;} 
        .Num{position:absolute;width:0.4rem;height:0.4rem;border-radius:0.2rem;top:0.15rem;right:0.15rem;background-color:#f75952;color:#fff;display:flex;align-items:center;justify-content:center;font-size:0.2rem;line-height:0.4rem;}
      }
      p{width:5rem;padding:0rem;margin:0rem;padding-left:0rem;line-height:1.2rem;font-size:0.4rem;color:#5b5c5b;float:left;}
      p.TotalMoney{width:5rem;padding:0rem;margin:0rem;padding-left:0rem;line-height:1.2rem;font-size:0.4rem;color:#f75952;float:left;}
    }
    .Right{width:3.5rem;height:100%;background-color:#adaaad;color:#fff;line-height:1.2rem;text-align:center;font-size:0.4rem;float:left;}
    .Right.Active{width:3.5rem;height:100%;background-color:#f75952;color:#fff;line-height:1.2rem;text-align:center;font-size:0.4rem;float:left;}
  }
</style>
