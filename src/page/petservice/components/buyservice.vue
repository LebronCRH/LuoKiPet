<template>
  <div>
  <transition name="fade">
     <div class="Buy_ServiceSelect" v-show="modal" v-if="currentservice.MShopService">
       <div class="zhe2" @click="modalTaggle()"></div>
       <div class="Buy_ServiceContent">

         <div class="Close" @click="modalTaggle()">
           <img src="static/image/Close1.png">
         </div>

         <div class="Top">
           <p class="p_title">{{currentservice.MShopService.ServiceName}}  {{selectPackage.name}}</p>
           <p class="p_price"><span class="new_price">￥{{selectPackage.sprice || currentservice.MShopService.MinPrice}}</span><span class="old_price"><del>￥{{selectPackage.Oldprice || currentservice.MShopService.OldPrice}}</del></span></p>
           <p class="p_discount"><img src="static/image/discount.png"><span>全场服务85折优惠(最高优惠50元)</span></p>
         </div>

         <div class="Mid_MServicePackageList">
           <p class="Title">服务类型</p>
           <ul class="ul_serviceCate">
             <li class="li_serviceCate" v-for="(item,index) in currentservice.MServicePackageList" :class="{active:selectPackId==index}" @click="selectPack(item,index)">
             <span>{{item.name}}</span>
             </li>
           </ul>
           <div class="BuyNum">
             <p class="message">购买数量</p>
             <div class="Edit">
             <div class="jian" @click="ReduceNum">-</div>
             <div class="num">{{BuyNum}}</div>
             <div class="Add" @click="AddNum">+</div>
             </div>
           </div>
         </div>

         <div class="Service_Edit">
            <div class="AddBagActive" v-show="HasselectPack" @click="AddPackageCart(ShopId,ShopName,ServiceId,currentservice.MShopService.ServiceName,selectPackage.PackageId,selectPackage.name,BuyNum,selectPackage.sprice || ServicePackage[0].sprice,selectPackage.Oldprice || ServicePackage[0].Oldprice)">加入券包</div>
            <div class="AddBag" v-show="!HasselectPack">加入券包</div>
            <router-link v-show="HasselectPack" :to="{ path: 'confirmorder',query:{Type:1,ServiceId:currentservice.MShopService.ServiceId,PackageId:selectPackage.PackageId,BuyNum:BuyNum},append:true}">
            <div class="Buy_ServiceActive" v-show="HasselectPack" @click="GoConfirmOrder">立即购买</div>
            </router-link>
            <div class="Buy_Service" v-show="!HasselectPack">立即购买</div>
         </div> 

       </div>
     </div>
   </transition>
</div>
</template>

<script>
  import axios from 'axios'
  import {mapState, mapMutations} from 'vuex'
  import {GetShopServiceDetail} from '@/service/getdata' 

    export default {
      data(){
            return{
              servicelistdata:[],
              currentservice:{
                // serviceName:null,
                // ForServiceID:null,
                MShopService:null,
                MServicePackageList:[],
              },
              selectPackage:{
                name:null,
                sprice:null,
                oldprice:null
              },
              ServicePackage:null,
              modal:false,
              selectPackId:null,
              BuyNum:1,
              HasselectPack:false,
            }
        },
        mounted(){
          console.log("购买页面初始化"+this.ServiceId+"  "+this.ShopId+"  "+this.ShopName);
            this.GetServiceList();
        },
        computed: {
          ...mapState([
                'PackageCartList'
            ]),
        },
        props:['ServiceId','ShopId','ShopName'],
        methods: {
          ...mapMutations([
                'ADD_PACKAGECART',
            ]),
          async GetServiceList(){
            // axios.get("./static/data/ServiceCategory.json").then((response)=>{
            //   this.servicelistdata=response.data;
            //   let Curservice=null;
            //   this.servicelistdata.forEach((item,index,list)=>{
            //      if(item.ForServiceID==10001){
            //       this.currentservice=item;
            //       console.log(this.currentservice.serviceName);
            //     }
            //   });

            //   // this.currentservice=Curservice;
            //   // this.GetServicePackageList();//获得当前服务项目的服务类型数据
            //   // this.selectPackage=this.currentservice.MServicePackageList[0];
            // });
            await GetShopServiceDetail(this.ServiceId).then(response=>{
              this.currentservice=response;
              console.log(response);
            })
          },
          GetCurrentService(){
            this.servicelistdata.forEach(function(item,index,list){
              if(item.ForServiceID==10001){
                this.currentservice=item;
              }
            })
          },
          ReduceNum(){
            if(this.BuyNum==1) return;
            else{
              this.BuyNum=this.BuyNum-1;
            }
          },
          // GetServicePackageList(){
          //   this.ServicePackage=this.currentservice.MServicePackageList;
          //   console.log(this.ServicePackage);
          // },
          async UpdateCurrentService(){
            // var _this=this;
            // this.servicelistdata.forEach((item,index,list)=>{
            //   if(item.ForServiceID==this.ServiceId){
            //     console.log(this.ServiceId);
            //     this.currentservice=item;
            //   }
            // })
            // this.GetServicePackageList();
            await GetShopServiceDetail(this.ServiceId).then(response=>{
              this.currentservice=response;
              console.log(response);
            })
          },
          AddNum(){
            if(this.selectPackage.name==null){
              this.$vux.toast.text('请先选套餐类型~', 'bottom');
            }
            else{
              this.BuyNum=this.BuyNum+1;
            }
          },
          AddPackageCart(shopid,shopname,serviceid,servicename,packageid,packagename,salenum,packageprice,packageoldprice){
            console.log(shopid,shopname,serviceid,servicename,packageid,packagename,salenum,packageprice,packageoldprice);
            this.ADD_PACKAGECART({shopid,shopname,serviceid,servicename,packageid,packagename,salenum,packageprice,packageoldprice});
            this.modalTaggle();
          },
          GoConfirmOrder(){
            // console.log("购买");
            // this.$router.go({path:'/petserviceIndex/serviceshopdetails/confirmorder'});
            this.modalTaggle();
          },
          selectPack(item,index){
            this.selectPackage=item;
            this.selectPackId=index;
            this.HasselectPack=true;
          },
          modalTaggle(){
            this.modal=!this.modal;
            this.selectPackage={
                name:null,
                sprice:null,
                oldprice:null
              };
            this.selectPackId=null;
            this.BuyNum=1;
            this.HasselectPack=false;
          }
        },
        watch: {
          ServiceId:function(value){//此处监控点击购买的服务ServiceId的变化
            console.log(value);
            this.UpdateCurrentService();//更新当前要显示的服务信息数据
          }
        }
    }
</script>

<style lang="scss" scoped="">
  .Buy_ServiceSelect{width:100%;height:100%;z-index:999;position:absolute;top:0rem;left:0rem;padding:0rem 0.3rem;box-sizing: border-box;background-color: rgba(0,0,0,0.7);
    .zhe2{position:absolute;width:100%;height:100%;top:0rem;left:0rem;z-index:98;}
      .Buy_ServiceContent{width:100%;margin-top:0.8rem;background-color:#fff;position:absolute;left:0rem;bottom:0rem;padding:0rem 0.3rem;z-index:99;box-sizing: border-box;
        p{margin:0rem;}
        .Close{position:absolute;top:0.3rem;right:0rem;width:0.57rem;height:0.57rem;right:0.3rem;
          img{width:0.57rem;height:0.57rem;float: left;}
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
        .Mid_MServicePackageList{
          .Title{width:100%;height:1rem;line-height:1rem;font-size:0.38rem;color:#0f0f0f;}
          .ul_serviceCate{list-style:none;width:100%;border-bottom:solid 0.03rem #f4f4f9;overflow:hidden;
            .li_serviceCate{height:1.1rem;padding:0rem 0.25rem;border-radius:0.2rem;background-color:#f5f5f5;display:flex;align-items:center;float:left;margin-right:0.3rem;margin-bottom:0.3rem;
              span{font-size:0.35rem;color:#0f0f0f;}
            }
            .li_serviceCate.active{background-color:#f55b50;
              span{color:#fff;}
            }
          }
          .BuyNum{width:100%;height:2.5rem;padding-bottom:1rem;border-bottom:solid 0.03rem #f4f4f9;display:flex;align-items:center;box-sizing: border-box;
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
          .AddBagActive{width:4.5rem;float:left;height:1.14rem;margin-right:0.4rem;display:flex;align-items:center;justify-content:center;
            border:solid 0.03rem #b4b4b4;border-radius:0.1rem;color:#000;font-size: 0.4rem;
          }
          .AddBag{width:4.5rem;float:left;height:1.14rem;margin-right:0.4rem;display:flex;align-items:center;justify-content:center;
            border:solid 0.03rem #b4b4b4;border-radius:0.1rem;color:#fff;background-color:#b4b4b4;font-size: 0.4rem;
          }
          .Buy_ServiceActive{width:4.5rem;float:left;height:1.14rem;display:flex;align-items:center;justify-content:center;
            border:solid 0.03rem #f55b50;border-radius:0.1rem;color:#fff;background-color:#f55b50;font-size: 0.4rem;
          }
          .Buy_Service{width:4.5rem;float:left;height:1.14rem;display:flex;align-items:center;justify-content:center;
            border:solid 0.03rem #b4b4b4;border-radius:0.1rem;color:#fff;background-color:#b4b4b4;font-size: 0.4rem;
          }
        }
      }
  } 
  .fade-enter-active, .fade-leave-active {
          transition: all .2s;
          transform: translateY(0%);
  }
  .fade-enter, .fade-leave-active {
          transform: translateY(100%);
  }
</style>