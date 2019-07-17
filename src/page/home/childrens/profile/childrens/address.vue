<template>
<div class="rating_page">
<head-top :Title="Title" :Color="Color" :MidType="MidType">
    <div slot="right" class="shopheadedit" @click="AddAddress()">
        <router-link :to="{ path: 'editaddress',append:true}" tag="span">新增</router-link>
    </div>
</head-top>
<div class="Middle" ref="Middle">
	<scroller ref="scroller" lock-x height="-56" scrollbar-y>
      <div>
      <ul class="ul_address">
          <li class="addressItem" v-for="item in this.addressList">
              <div class="addressInfo">
                  <p><span>{{item.Consignee}}</span><span>{{item.ContactPhone}}</span></p>
                  <p><span>{{item.Area}}</span><span>{{item.DetailedNode}}</span></p>
              </div>
              <div class="addressEdit">
                  <div class="Left" v-if="item.IsDefault==1">
                    <img src="static/image/duigou.png" alt=""><span>默认地址</span>
                  </div>
                  <div class="Left" v-if="item.IsDefault!=1" @click="UpdateDefault(item.AddressID)">
                    <img src="static/image/duigouhui.png" alt=""><span>设为默认</span>
                  </div>
                  <div class="Right">
                   <!-- <div class="edit edit1"> -->
                    <router-link :to="{ path: 'editaddress',query:{addressid:item.AddressID},append:true}" class="edit edit1" tag="div">
                      <img src="static/image/png/edit.png" alt=""><span>编辑</span>
                    </router-link>
                    <!-- </div> -->
                    <div class="edit delete" @click="DeleteAddressItem(item.AddressID)">
                      <img src="static/image/png/delete.png" alt=""><span>删除</span>
                    </div>
                  </div>
              </div>
          </li>
      </ul>
      </div>
    </scroller>
    <div v-transfer-dom>
      <confirm v-model="deleteAddressItemshow"
      :title="'提示'"
      :content="'确认要删除改地址吗'"
      @on-cancel="CancelDeleteAddressItem"
      @on-confirm="ConfirmDeleteAddressItem">
      </confirm>
    </div>
</div>

        <transition name="router-slid" mode="out-in">
            <router-view></router-view>
        </transition>
</div>
</template>

<script>
import axios from 'axios'
import {mapState, mapMutations} from 'vuex'
import headTop from '@/components/Head.vue'
import lineMenu from '@/components/common/LineMenu.vue'
import {setStore,getStore,removeStore} from '@/config/mUtils.js'
import {userLogin,MessageSend,JudgeHasUser,GetUserInfoByYzm,GetUserReceivingAddress,DeleteAddressItemAndReturnList,UpdateUserDefaultAddress} from '@/service/getdata'
import { Scroller,Confirm,TransferDomDirective as TransferDom } from 'vux'
export default {
    directives: {
        TransferDom
    },
    components: {
    	headTop,
    	Scroller,
      Confirm,
        lineMenu
    },
    data () {
      return {
        Title:'我的收货地址',
        Color:0,
        MidType:0,
        deleteAddressItemshow:false,
        addressList:[],
        CurrentPlanDeleteAddressId:null,
      }
    },
    mounted(){
      this.initData();
      this.initHeadHeight();
    },
    destroyed(){

    },
    computed: {
    	...mapState([
                'PackageCartList','userInfo','isLogin','StatusbarHeight','StatusbarHeightRem',
            ]),
    },
    props:[],
    methods: {
    	...mapMutations([
                'UPDATE_PACKAGECART',
            ]),
        initHeadHeight(){
          if(this.$refs.Middle)
          {
            this.$refs.Middle.style.top=(1.5+this.StatusbarHeightRem)*window.screen.width / 10+"px";
          }
        },
        AddAddress(){

        },
        async initData(){
          await GetUserReceivingAddress(this.userInfo.UserID).then(response=>{
            this.addressList=response;
            console.log(response);
          })
        },
        CancelDeleteAddressItem(){
            
        },
        async ConfirmDeleteAddressItem(){
          await DeleteAddressItemAndReturnList(this.CurrentPlanDeleteAddressId).then(response=>{
            this.addressList=response;
          })
        },
        DeleteAddressItem(addressid)
        {
          this.CurrentPlanDeleteAddressId=addressid;
          this.deleteAddressItemshow=true;
        },
        async UpdateDefault(addressid)
        {
          this.addressList.forEach(item=>{
            item.IsDefault=0;
            if(item.AddressID==addressid)
            {
              item.IsDefault=1;
            }
          });
          await UpdateUserDefaultAddress(addressid);
        },
    },
    watch:{
      '$route':function(){
        this.initData();
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
.Middle{
    position:absolute;top:1.5rem;left:0rem;bottom:0rem;width:100%;
}
.ShopTop{width:10rem;height:1.2rem;padding:0rem 0.25rem;box-sizing:border-box;background-color:#faf8f8;display:flex;align-items:center;
	.Left{width:90%;height:100%;display:flex;align-items:center;
		.img1{width:0.7rem;height:0.7rem;}
	.img2{width:0.6rem;height:0.5rem;margin-left:0.3rem;}
	span{margin-left:0.3rem;font-size:0.4rem;}
	}
	.Right{width:10%;height:100%;display:flex;align-items:center;
		span{font-size:0.4rem;color:#bcbcbc;}
	}
}
.ul_address{
    width:100%;list-style:none;
    .addressItem:nth-child(1){
      margin-top:0rem;
    }
    .addressItem{
        width:100%;height:3.2rem;background:#fff;margin-top:0.3rem;
        .addressInfo{
            width:100%;height:2rem;padding:0rem 0.3rem;border-bottom:dotted 2px #9e9e9e;
            p{
                width:100%;height:45%;display:felx;line-height:1rem;font-size:0.4rem;color:#000;
                span:nth-child(2){
                    margin-left:0.2rem;
                }
            }
        }
        .addressEdit{
          width:100%;height:1.2rem;
          .Left{
            width:60%;height:100%;float:left;display:flex;align-items:center;padding-left:0.3rem;
            img{
              width:0.6rem;
            }
            span{font-size:0.37rem;color:#4e4e4e;margin-left:0.3rem;}
          }
          .Right{
            width:40%;height:100%;float:left;display:flex;align-items:center;justify-content:center;
            .edit{
              width:50%;height:100%;display:flex;align-items:center;justify-content:center;
              img{width:0.6rem;}
              span{font-size:0.37rem;color:#4e4e4e;margin-left:0.2rem;}
            }
          }
        }
    }
}
.router-slid-enter-active, .router-slid-leave-active {
        transition: all .4s;
    }
    .router-slid-enter, .router-slid-leave-active {
        transform: translate3d(2rem, 0, 0);
        opacity: 0;
    }
</style>
