<template>
<div class="rating_page">
<head-top :Title="Title" :Color="Color" :MidType="MidType">
    <div slot="right" class="shopheadedit" @click="AddAddress()">
        <span>保存</span>
    </div>
</head-top>
<div class="Middle" ref="Middle">
	<scroller ref="scroller" lock-x height="-56" scrollbar-y>
      <div>
        <ul class="ul_Line">
          <li class="Item">
            <p>收货人</p>
            <input type="text" placeholder="姓名" v-model="addressItem.Consignee">
          </li>
          <li class="Item">
            <p>手机号码</p>
            <input type="text" placeholder="11位手机号" v-model="addressItem.ContactPhone">
          </li>
          <li class="Item">
            <p>所在地区</p>
            <input type="text" ref="Area" disabled Value="" placeholder="地区信息" id="picker5">
          </li>
          <li class="Item">
            <p>详细地址</p>
            <input type="text" placeholder="街道门牌信息" v-model="addressItem.DetailedNode">
          </li>
        </ul>

    <group>
      <x-switch :title="Title2" v-model="Setdefault"></x-switch>
    </group>
      </div>
    </scroller>
</div>
</div>
</template>

<script>
import axios from 'axios'
import {mapState, mapMutations} from 'vuex'
import headTop from '@/components/Head.vue'
import lineMenu from '@/components/common/LineMenu.vue'
import {setStore,getStore,removeStore} from '@/config/mUtils.js'
import { Scroller,Group,XSwitch,Confirm,TransferDomDirective as TransferDom} from 'vux'
import {userLogin,MessageSend,JudgeHasUser,GetUserInfoByYzm,GetUserReceivingAddress,AddUserReceivingAddress,GetUserReceivingAddressItem} from '@/service/getdata'
import picker from '@/assets/js/index'

export default {
    components: {
    	headTop,
    	Scroller,
      XSwitch,
      Confirm,
      Group,
        lineMenu
    },
    data () {
      return {
        Title:'编辑收货地址',
        Color:0,
        Title2:'设置为默认地址',
        Setdefault:false,
        MidType:0,
        addressItem:{
          'UserID':'',
          'Consignee':'',
          'ContactPhone':'',
          'Area':'',
          'DetailedNode':'',
          'IsDefault':0
        }
      }
    },
    mounted(){
      var nameEl = document.getElementById('picker5');
      picker.init(nameEl);
      nameEl.addEventListener('click', function () {
        picker.show();
      });
      this.GetAddressInfo();
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
        async AddAddress(){
          this.addressItem.UserID=this.userInfo.UserID;
          this.addressItem.Area=this.$refs.Area.value;
          if(this.Setdefault){
            this.addressItem.IsDefault=1;
          }
          await AddUserReceivingAddress(this.addressItem).then(response=>{
            if(response!=null)
            {
              console.log("成功");
              this.$router.replace('/home/profile/address');
            }
            else
            {
              console.log("失败");
            }
          })
        },
        async GetAddressInfo(){
          if(this.$route.query.addressid){
            await GetUserReceivingAddressItem(this.$route.query.addressid).then(response=>{
              this.addressItem=response;
              this.$refs.Area.value=this.addressItem.Area;
            })
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
.ul_Line{
  width:100%;list-style:none;background:#fff;
  .Item{
    width:100%;height:1.4rem;display:flex;align-items:center;border-bottom:solid 1px #eee;
    p{
      width:2.2rem;height:100%;line-height:1.4rem;margin-left:0.5rem;color:#000;font-size:0.4rem;
    }
    input{
      width:7.8rem;height:90%;border:none;padding:0rem;margin:0rem;font-size:0.4rem;
    }
  }
  .Item:nth-child(4){
    border:none;
  }
}
</style>
