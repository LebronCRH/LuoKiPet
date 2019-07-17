<template>
<div class="rating_page">
  <head-top :Title="Title" :Color="Color" :MidType="MidType">
      <div slot="right" class="rightSpanEdit">
        <span>保存</span>
      </div>
  </head-top>
  <div class="Middle" ref="Middle">
    <scroller ref="scroller" lock-x height="-56" scrollbar-y>
        <div>
        <ul class="TopInfo">
          <li class="InfoItem">
            <p class="Title"><span>昵称</span></p>
            <p class="Value"><input type="text" v-model="PetName" disabled placeholder="未填写"><img src="static/image/png/xiangyou.png" alt=""></p>
          </li>
          <li class="InfoItem">
            <p class="Title"><span>宠物类型</span></p>
            <p class="Value"><input type="text" v-model="PetCategory" disabled placeholder="未填写"><img src="static/image/png/xiangyou.png" alt=""></p>
          </li>
          <li class="InfoItem" @click="PetCSDateTaggle()">
            <p class="Title"><span>年纪</span></p>
            <p class="Value"><input type="text" v-model="PetCSDate" disabled placeholder="未填写"><img src="static/image/png/xiangyou.png" alt=""></p>
          </li>
          <li class="InfoItem" @click="SelectPetSex()">
            <p class="Title"><span>性别</span></p>
            <p class="Value"><input type="text" v-model="PetSex" disabled placeholder="未填写"><img src="static/image/png/xiangyou.png" alt=""></p>
          </li>
          <li class="InfoItem">
            <p class="Title"><span>体重</span></p>
            <p class="Value"><input type="text" v-model="PetWeight" disabled placeholder="未填写"><img src="static/image/png/xiangyou.png" alt=""></p>
          </li>
          <li class="InfoItem" @click="SelectPetSterilization()">
            <p class="Title"><span>是否绝育</span></p>
            <p class="Value"><input type="text" v-model="PetJueYu" disabled placeholder="未填写"><img src="static/image/png/xiangyou.png" alt=""></p>
          </li>
        </ul>
        <p class="MiddleTitle">特别信息</p>
        <ul class="TeBieInfo">
          <li class="TeBieItem">
            <p class="Title"><span>TA是调皮鬼吗？</span></p>
            <div class="RadioList">
              <div class="radio-box" v-for="(item,index) in radios1" :key="item.id">
                <span class="radio" :class="{'on':item.isChecked}"></span>
                <input v-model="radio1" :value="item.value" class="input-radio" :checked='item.isChecked'  @click="check(index,radios1,radio1)" type="radio">{{item.label}}
              </div>
            </div>
          </li>
          <li class="TeBieItem">
            <p class="Title"><span>你觉得TA聪明吗？</span></p>
            <div class="RadioList">
              <div class="radio-box" v-for="(item,index) in radios2" :key="item.id">
                <span class="radio" :class="{'on':item.isChecked}"></span>
                <input v-model="radio2" :value="item.value" class="input-radio" :checked='item.isChecked'  @click="check(index,radios2,radio2)" type="radio">{{item.label}}
              </div>
            </div>
          </li>
          <li class="TeBieItem">
            <p class="Title"><span>TA胆子特别小吗？</span></p>
            <div class="RadioList">
              <div class="radio-box" v-for="(item,index) in radios3" :key="item.id">
                <span class="radio" :class="{'on':item.isChecked}"></span>
                <input v-model="radio3" :value="item.value" class="input-radio" :checked='item.isChecked'  @click="check(index,radios3,radio3)" type="radio">{{item.label}}
              </div>
            </div>
          </li>
          <li class="TeBieItem">
            <p class="Title"><span>TA和其他宠物相处好吗？</span></p>
            <div class="RadioList">
              <div class="radio-box" v-for="(item,index) in radios4" :key="item.id">
                <span class="radio" :class="{'on':item.isChecked}"></span>
                <input v-model="radio4" :value="item.value" class="input-radio" :checked='item.isChecked'  @click="check(index,radios4,radio4)" type="radio">{{item.label}}
              </div>
            </div>
          </li>
        </ul>
        <p class="MiddleTitle">宠物简介</p>
        <div class="PetIntroduce">
          <textarea name="PetIntroduce" v-model="PetIntroduce" placeholder="这是我的宠物……" id="" cols="30" rows="10"></textarea>
        </div>
        </div>
      </scroller>
  </div>
  <div class="mask" v-show="MaskSelectModel.SexPicker.Flag||MaskSelectModel.SterilizationPicker.Flag" @click="AllSelectHide()"></div>
  <transition name="fadePackageList">
    <div class="SexPicker PetInfoSelect" v-show="MaskSelectModel.SexPicker.Flag">
       <div class="TopEdit"><span @click="AllSelectHide()">取消</span><span @click="DefinePetSex()">确定</span></div>
       <pickercrh :data='Sexlist' v-model='MaskSelectModel.SexPicker.Value' :showNumber=3 @on-change='change'></pickercrh>
    </div>
  </transition>
  <transition name="fadePackageList">
    <div class="SterilizationPicker PetInfoSelect" v-show="MaskSelectModel.SterilizationPicker.Flag">
       <div class="TopEdit"><span @click="AllSelectHide()">取消</span><span @click="DefinePetSterilization()">确定</span></div>
       <pickercrh :data='Sterilizationlist' v-model='MaskSelectModel.SterilizationPicker.Value' :showNumber=3 @on-change='change'></pickercrh>
    </div>
  </transition>
  <datetime v-model="PetCSDate" :show="PetCSDateshoow" :min-year=2000 :max-year=2019 @on-hide="PetCSDateHide()"></datetime>
</div>
</template>

<script>
import axios from 'axios'
import {mapState, mapMutations} from 'vuex'
import headTop from '@/components/Head.vue'
import { Scroller,Datetime  } from 'vux'
import selectpackage from '@/page/petservice/components/selectpackage.vue'
import {AddLoveShowPhotos} from '@/service/getdata'
import {convertBase64UrlToBlob,getBase64Image} from '@/config/mUtils'
import pickercrh from '@/components/picker/index.vue'

export default {
    components: {
      headTop,
      Scroller,
      selectpackage,
      pickercrh,
      Datetime
    },
    data () {
      return {
        PetSexw: [''],
        PetSterilization: [''],
        msg: 'Hello World!',
        Title:'添加宠物',
        Color:0,
        MidType:1,
        EditBtn:true,
        radio1:null,
        radio2:null,
        radio3:null,
        radio4:null,
        radios1:[
          {
            label: '是',
            value:'1',
            isChecked: false,
          },
          {
            label: '否',
            value:'2',
            isChecked: false,
          },
          {
            label: '不确定',
            value:'3',
            isChecked: false,
          },
        ],
        radios2:[
          {
            label: '是',
            value:'1',
            isChecked: false,
          },
          {
            label: '否',
            value:'2',
            isChecked: false,
          },
          {
            label: '不确定',
            value:'3',
            isChecked: false,
          },
        ],
        radios3:[
          {
            label: '是',
            value:'1',
            isChecked: false,
          },
          {
            label: '否',
            value:'2',
            isChecked: false,
          },
          {
            label: '不确定',
            value:'3',
            isChecked: false,
          },
        ],
        radios4:[
          {
            label: '是',
            value:'1',
            isChecked: false,
          },
          {
            label: '否',
            value:'2',
            isChecked: false,
          },
          {
            label: '不确定',
            value:'3',
            isChecked: false,
          },
        ],
        PetName:"",
        PetCategory:"",
        PetAge:"",
        PetSex:"",
        PetWeight:"",
        PetJueYu:"",
        PetIntroduce:"",
        Sextitle:"性别选择",
        Sexlist:[['GG','MM']],
        Sterilizationlist:[['是','否']],
        MaskSelectModel:{
          SexPicker:{
            Flag:false,
            Value:[''],
          },
          SterilizationPicker:{
            Flag:false,
            Value:[''],
          },
        },
        PetCSDate:"",
        PetCSDateshoow:false,
      }
    },
    // beforeRouteEnter (to, from, next) {

    // },
    beforeCreate(){
      
    },
    created(){
      if(this.userInfo==null){
        console.log("去登录");
        this.$router.replace('/loginIndex');
      }
    },
    mounted(){
      this.initHeadHeight();
      console.log(this.years)
    },
    destroyed(){

    },
    computed: {
      ...mapState([
                'PackageCartList','userInfo','StatusbarHeight','StatusbarHeightRem',
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
          console.log("top"+this.$refs.Middle.offsetTop);
          this.$refs.Middle.style.top=(1.5+this.StatusbarHeightRem)*window.screen.width / 10+"px";
        }
      },
      check(index,radios,radio) {
        // 先取消所有选中项
        radios.forEach((item) => {
          item.isChecked = false;
        });
        //再设置当前点击项选中
        radio = radios[index].value;
        // 设置值，以供传递
        radios[index].isChecked = true;
        console.log(radio);
      },
      change (value) {
        console.log('new Value', value)
      },
      AllSelectHide(){
        Object.keys(this.MaskSelectModel).forEach((item)=>{
          this.MaskSelectModel[item].Flag=false;
          this.MaskSelectModel[item].Value=[''];
        })
      },
      SelectPetSex(){
        this.MaskSelectModel.SexPicker.Value=[this.PetSex];
        if(this.MaskSelectModel.SexPicker.Value[0]=="")
        {
          this.MaskSelectModel.SexPicker.Value=[this.Sexlist[0][0]];
        }
        this.MaskSelectModel.SexPicker.Flag=true;
      },
      SelectPetSterilization(){
        this.MaskSelectModel.SterilizationPicker.Value=[this.PetJueYu];
        if(this.MaskSelectModel.SterilizationPicker.Value[0]=="")
        {
          this.MaskSelectModel.SterilizationPicker.Value=[this.Sterilizationlist[0][0]];
        }
        this.MaskSelectModel.SterilizationPicker.Flag=true;
      },
      DefinePetSex(){
        // console.log(this.MaskSelectModel.SexPicker.Value[0]);
        this.PetSex=this.MaskSelectModel.SexPicker.Value[0];
        this.AllSelectHide();
        // console.log(this.PetSex);
      },
      DefinePetSterilization(){
        this.PetJueYu=this.MaskSelectModel.SterilizationPicker.Value[0];
        this.AllSelectHide();
      },
      PetCSDateTaggle(){
        if(!this.PetCSDateshoow)
        {
          this.PetCSDateshoow=true;
        }
      },
      PetCSDateHide(){
        this.PetCSDateshoow=false;
      }
    },
    directives: {
      ImgEdit: {//图片显示按长宽等比居中显示的指令方法
        // 指令的定义
        inserted: function (el,binding) {
          var image=new Image();
          image.src=el.src; //获取图像路径
          image.onload=function(){
            var width1=image.width; //获取图像宽度
            var height1=image.height; //获取图像高度
            var RequestW=binding.value.width/10*window.screen.width;
            var RequestH=binding.value.height/10*window.screen.width;
            var a1=height1/width1;
            var a2=RequestH/RequestW;
            if(a1>a2){
              el.width=RequestW;
              el.height=height1*RequestW/width1;
              el.style.marginTop='-' + Math.round((el.height-RequestH)/2)+ 'px';
            }else{
              el.height=RequestH;
              el.width=width1*RequestH/height1;
              el.style.marginLeft='-' + Math.round((el.width-RequestW)/2)+ 'px';
            }
          };
        }
      }
    },
    watch:{

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
      .TopInfo{
        width:9.5rem;margin:0.5rem auto;border-radius:10px;background-color:#fff;
        .InfoItem{
          width:100%;height:1.4rem;display:flex;justify-content:space-between;line-height:1.4rem;padding:0px 15px;border-bottom:solid 0.5px #eee;
          .Title{
            font-size:14px;color:#444444;
          }
          .Value{
            height:100%;display:flex;align-items:center;
            input{
              width:3rem;max-width:5rem;text-align:right;border:none;font-size:14px;margin:0px;padding-right:5px;
            }
            img{
              width:0.4rem;height:0.4rem;
            }
          }
        }
      }
      .MiddleTitle{
        width:9.5rem;margin:10px auto 0px;line-height:0.7rem;padding-left:15px;
      }
      .TeBieInfo{
        width:9.5rem;margin:0rem auto;border-radius:10px;background-color:#fff;padding:0px 15px;
        .TeBieItem{
          width:100%;padding:15px 0px;border-bottom:solid 0.5px #eee;
          .Title{
            width:100%;height:0.6rem;line-height:0.6rem;font-size:14px;color:#444444;
          }
          .RadioList{
            width:100%;height:0.8rem;display:flex;align-items:center;justify-content:flex-end;font-size:14px;color:#444444;
            .radio-box{
              display: inline-block;
              position: relative;
              height: 25px;
              line-height: 25px;
              margin-right: 5px;
            }
            .radio {
              display: inline-block;
              width: 25px;
              height: 25px;
              vertical-align: middle;
              cursor: pointer;
              background-image: url(../../../static/image/yuan.png);
              background-repeat: no-repeat;
              background-position: 0 0;
              background-size:25px 25px;
            }
            .input-radio {
              display: inline-block;
              position: absolute;
              opacity: 0;
              width: 25px;
              height: 25px;
              cursor: pointer;
              left: 0px;
              outline: none;
              -webkit-appearance: none;
            }
            .on {
              background-image: url(../../../static/image/duigou.png);
            }
          }
        }
      }
      .PetIntroduce{
        width:100%;padding:0.25rem;background-color:#fff;
        textarea{
          width:100%;height:6rem;font-size:14px;border-radius:10px;border-color:#eee;
        }
      }
  }
  .fade-enter-active, .fade-leave-active {
          transition: all .4s;
          transform: translateY(0%);
  }
  .fade-enter, .fade-leave-active {
          transform: translateY(100%);
  }
  .fadePackageList-enter-active, .fadePackageList-leave-active {
          transition: all .2s;
          transform: translateY(0%);
  }
  .fadePackageList-enter, .fadePackageList-leave-active {
          transform: translateY(100%);
  }
  .mask{
    position:absolute;width:100vw;height:100vh;top:0px;left:0px;background-color:#000;opacity:0.5;
  }
  .PetInfoSelect{
    width:10rem;position:absolute;bottom:0rem;left:0rem;background-color:#fff;
    .TopEdit{
      width:100%;height:1rem;display:flex;padding:0px 15px;justify-content:space-between;align-items:center;background-color:#eeeeee;font-size:15px;
    }
  }
</style>
