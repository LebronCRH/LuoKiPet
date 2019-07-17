
<template>
	<div>
	   <transition name="fade">
	     <div class="PayWaySelect" v-show="modal">
	       <div class="zhe2" @click="modalTaggle()"></div>
	       <div class="PayWayContent">
           <div class="HeadTitle">
             <span>在线支付</span>
             <div class="Close" @click="ClosePay()">
               <img src="static/image/Close1.png">
             </div>
           </div>
           <div class="PlanPayMoney">
             <span>需付款</span>
             <span class="Money">￥{{Paymoney}}</span>
           </div>
           <ul class="ul_PayWay">
             <li class="li_PayWayItem" @click="SelectPayItem(1)">
               <div class="Left">
                  <img src="static/image/png/ALiPay.png" alt=""><span>支付宝支付</span>
               </div>
               <div class="Right">
                 <img v-show="SelectPayWay==1" src="static/image/yes.png" alt="">
               </div>
             </li>
             <li class="li_PayWayItem" @click="SelectPayItem(2)">
               <div class="Left">
                  <img src="static/image/png/WeiXinPay.png" alt=""><span>微信支付</span>
               </div>
               <div class="Right">
                 <img v-show="SelectPayWay==2" src="static/image/yes.png" alt="">
               </div>
             </li>
             <li class="li_PayWayItem" @click="SelectPayItem(3)">
               <div class="Left">
                  <img src="static/image/png/LuoKiBeanPay.png" alt=""><span>洛奇豆支付</span>
               </div>
               <div class="Right">
                 <img v-show="SelectPayWay==3" src="static/image/yes.png" alt="">
               </div>
             </li>
           </ul>
           <div class="ConfirmPay" @click="PayOrder">
             <span>确认支付</span>
           </div>
	       </div>
	     </div>
	   </transition>
     <div v-transfer-dom>
        <confirm v-model="CancelPay"
        :title="'确认要离开收银台？'"
        :cancel-text="'继续支付'"
        :confirm-text="'确认离开'"
        :content="'请尽快支付,逾期将自动取消订单'"
        @on-cancel="CancelCancelPay"
        @on-confirm="ConfirmCancelPay">
        </confirm>
      </div>
	</div>
</template>

<script>
import {Confirm,TransferDomDirective as TransferDom } from 'vux'
import {PayServiceOrder} from '@/service/getdata' 
    export default {
        directives: {
          TransferDom
        },
        components: {
          Confirm
        },
    	  data(){
            return{
              modal:false,
              CancelPay:false,
              SelectPayWay:0,
            }
        },
        mounted(){

        },
        methods:{
          modalTaggle(){
            this.modal=!this.modal;
          },

          CancelCancelPay(){

          },
          ConfirmCancelPay(){
            if(this.CancelType==1)
            {
              this.$router.replace({path:'/home/profile/orderdetails/'+this.OrderId});
            }
            else
            {
              this.modalTaggle();
            }
          },
          ClosePay(){
            this.CancelPay=true;
          },
          SelectPayItem(index){
            this.SelectPayWay=index;
          },
          async PayOrder(){
            if(this.SelectPayWay==0)
            {
              this.$vux.toast.text('请选择支付方式!', 'bottom')
            }
            else if(this.SelectPayWay!=3)
            {
              this.$vux.toast.text('当前还不支持该支付方式!', 'bottom')
            }
            else if(this.SelectPayWay==3)
            {
              await PayServiceOrder(this.OrderId).then(response=>{
                if(response=="0")
                {
                  this.$vux.toast.text('账户余额不足!', 'bottom');
                }
                else{
                  console.log(response);
                  this.$router.push({path:'/home/profile/orderdetails/'+this.OrderId});
                }
              })
            }
          }
        },
        props: ['Paymoney','OrderId','CancelType'],
        beforeDestroy(){
        	clearInterval(this.timer);
        }
    }
</script>

<style lang="scss" scoped>
  .PayWaySelect{width:100%;height:100%;z-index:999;position:absolute;top:0rem;left:0rem;padding:0rem 0.2rem;box-sizing: border-box;background-color: rgba(0,0,0,0.7);
    .zhe2{position:absolute;width:100%;height:100%;top:0rem;left:0rem;z-index:98;}
    .PayWayContent{width:100%;margin-top:0.8rem;background-color:#f5f5f5;position:absolute;left:0rem;bottom:0rem;padding:0rem 0rem;z-index:99;box-sizing: border-box;
        p{margin:0rem;}
        .HeadTitle{
          position:relative;display:flex;align-items:center;justify-content:center;width:100%;height:1.4rem;border-bottom:solid 1px #f4f4f4;background:#fff;
          span{
            font-size:0.5rem;color:#000;
          }
          .Close{position:absolute;top:0.3rem;right:0rem;width:0.57rem;height:0.57rem;right:0.3rem;
            img{width:0.57rem;height:0.57rem;float: left;}
          }
        }
        .PlanPayMoney{
          width:100%;height:1.4rem;display:flex;align-items:center;justify-content:space-between;padding:0rem 0.3rem;background:#fff;
          span{font-size:0.45rem;color:#000;
            &.Money{
              font-size:0.5rem;color:#f75952;
            }
          }
        }
        .ul_PayWay{
          width:100%;list-style:none;margin-top:0.3rem;background:#fff;
          .li_PayWayItem{
            width:100%;height:2rem;display:flex;align-items:center;border-bottom:solid 1px #f4f4f4;
            .Left{
              width:80%;height:100%;display:flex;align-items:center;
              img{
                width:1.1rem;height:1.1rem;margin:0rem 0.3rem;
              }
              span{
                font-size:0.4rem;color:#6b6b6b;margin-left:0.3rem;font-family:"微软雅黑";
              }
            }
            .Right{
              width:20%;height:100%;display:flex;align-items:center;justify-content:center;
              img{
                width:0.4rem;height:0.4rem;
              }
            }
          }
        }
        .ConfirmPay{
          width:100%;height:1.4rem;background:#ff5e32;display:flex;align-items:center;justify-content:center;
          span{
            color:#fff;font-size:0.5rem;
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