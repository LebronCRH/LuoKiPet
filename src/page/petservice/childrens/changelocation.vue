<template>
	<div class="rating_page">
  <head-top :Title="Title" :Color="Color" :MidType="MidType"></head-top>
	<div class="Middle">
    <div class="Line" style="height:0.1rem;width:100%;background-color: #f7f3f7;"></div>
    <div class="CityAndSerach WhiteItem" ref="WhiteItem">
      <div class="Left" @click="TaggleSelectCity()">
        <span>{{UserNode.name}}</span><img src="static/image/sjDown.png" alt="">
      </div>
      <div class="Middle2" :class="SerachFoucs?'active':''">
        <div class="LeftImg">
          <img src="static/image/serach2.png">
        </div>
        <div class="middle">
          <input type="text" ref="serachInput" v-model="SerachNode" placeholder="输入关键字搜索" @focus="SerachInputFoucs()" @blur="SerachInputBlur()">
          <div class="ClearInput" v-show="SerachNodeLength" @click="ClearSerachInput(1)">
            <img src="static/image/png/cuowu.png" alt="">
          </div>
        </div>
      </div>
      <div class="Right" v-show="SerachFoucs" @click="ClearSerachInput(0)">
        <span>取消</span>
      </div>
    </div>

    <div class="State1" v-show="!SerachFoucs">
      <div class="TitleItem">
        <span>当前地址</span>
      </div>
      <div class="WhiteItem Title">
        <span>杭州西斗门工业园区</span>
        <img src="static/image/png/refresh.png" alt="">
      </div>
      <div class="TitleItem">
        <span @click="submit()">历史地址</span>
        <img src="static/image/png/lajitong.png" alt="" @click="ConfirmHistory()">
      </div>
      <ul class="ul_NodeHistory">
        <li class="HistoryItem" v-for="item in placeHistory" @click="SelectPlaceHistoryItem(item)"><p class="Top">{{item.name}}</p><p class="Bottom">{{item.address}}</p></li>
      </ul>

      <ul class="ul_NodeHistory">
        <li class="HistoryItem" v-for="item in chat" ><p class="Top">{{item}}</p></li>
      </ul>
    </div>

    <div class="State2" ref="State2" v-show="SerachFoucs && !SerachNodeLength">
      <div class="TitleItem">
        <span>历史搜索</span>
        <img src="static/image/png/lajitong.png" alt="" @click="ConfirmserachHistory()">
      </div>
      <ul class="ul_SerachHistory">
        <li class="HistoryItem" v-for="item in serachHistory"><span>{{item}}</span></li>
      </ul>
    </div>

    <ul class="SerachResult" ref="SerachResult" v-show="HasSerachResult && SerachFoucs">
      <li class="ResultItem" v-for="(item, index) in SerachNodeResult" @click="SelectNode(index,item.geohash)"><p class="Top">{{item.name}}</p><p class="Bottom">{{item.address}}</p></li>
    </ul>
    <ul class="SerachNoResult" ref="SerachNoResult" v-show="!HasSerachResult && SerachNodeLength">
      <li class="ResultItem"><span>暂无搜索结果，请重新搜索</span></li>
    </ul>
     <div class="BigCity" v-show="SelectCityShow">
       <div class="HotCity">
            <div class="Hotcity_title">
                <span>热门城市</span>
            </div>
            <ul class="Hotcitylistul clear">
                <li v-for="item in hotcity" :key="item.id" @click="ChnageCity(item)">
                    {{item.name}}
                </li>  
            </ul>
       </div>
            <ul class="letter_classify">
                <li v-for="(value, key, index) in sortgroupcity" :key="key"  class="letter_classify_li">
                    <div class="city_title">
                      <span>{{key}}</span><span  v-if="index == 0">（按字母排序）</span>
                    </div>
                    <ul class="groupcity_name_container citylistul clear">
                        <li v-for="item in value" :key="item.id" class="ellipsis" @click="ChnageCity(item)">
                           <span>{{item.name}}</span>
                        </li>
                    </ul>
                </li>
            </ul>
     </div>


    <div v-transfer-dom>
      <confirm v-model="removeHistoryshow"
      :title="'提示'"
      :content="'确定要清空所有的历史地址吗？'"
      @on-cancel="CancelRemoveHistory"
      @on-confirm="ConfirmRemoveHistory">
      </confirm>
    </div>
    <div v-transfer-dom>
      <confirm v-model="removeserachHistoryshow"
      :title="'提示'"
      :content="'确定要清空所有的历史搜索吗？'"
      @on-cancel="CancelRemoveserachHistory"
      @on-confirm="ConfirmRemoveserachHistory">
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
  import headTop from '@/components/Head.vue'
  import {mapState, mapMutations} from 'vuex'
  import { Scroller,Confirm,TransferDomDirective as TransferDom } from 'vux'
  import {cityGuess,searchplace,groupcity,hotcity} from '@/service/getdata' 
  import {getStore, setStore, removeStore} from '@/config/mUtils'
  import io from 'socket.io-client'
  import {imgBaseUrl,socketBaseUrl} from '@/config/env'

  export default {
      directives: {
        TransferDom
      },
      components: {
      	headTop,
      	Scroller,
        Confirm,
      },
      data () {
        return {
          msg: 'Hello World!',
          Title:'选择定位地址',
          Color:0,
          MidType:1,
          SerachNode:'',
          SerachFoucs:false,
          SerachNodeResult:[],
          placeHistory:[], // 历史搜索记录
          removeHistoryshow:false,
          removeserachHistoryshow:false,
          serachHistory:[],
          groupcity:[],
          hotcity:[],
          SelectCityShow:false,
          chat:["12345","34456"],
          socket:null,
          messagesend:"啊哈哈哈哈",
        }
      },
      created() {
            // this.socket=io.connect(socketBaseUrl);
            // this.socket.on('chat message', function(msg){
            //   console.log("收到消息");
            //   console.log(msg);
            // });
      },
      mounted(){
        this.initData();
        //获取热门城市
        hotcity().then(res => {
            this.hotcity = res;
        })
        groupcity().then(res => {
          this.groupcity = res;
          console.log(res);
        });
        // console.log(this.UserNode.id);
      },
      computed:{
        ...mapState([
                    'PackageCartList','UserNode','UserSelectNode',
                ]),
        SerachNodeLength:function(){
          if(this.SerachNode!="")
          {
            return true;
          }
          else
          {
            return false;
          }
        },
        HasSerachResult:function(){
          if(this.SerachNodeResult.length==0)
          {
            return false;
          }
          else
          {
            return true;
          }
        },
        sortgroupcity(){
          let sortobj = {};
          for (let i = 65; i <= 90; i++) {
              if (this.groupcity[String.fromCharCode(i)]) {
                  sortobj[String.fromCharCode(i)] = this.groupcity[String.fromCharCode(i)];
              }
          }
          return sortobj
        },
      },
      props:[],
      methods: {
        	async initData(){
            let H2=this.$refs.WhiteItem.offsetHeight;
            let H=window.innerHeight-(2*H2);
            this.$refs.SerachResult.style.height=H+"px";
            this.$refs.SerachNoResult.style.height=H+"px";
            this.$refs.State2.style.height=H+"px";
            this.GetHistorySerach();
          },
          // submit(){
          //   this.socket.emit('chat message', this.messagesend);
          // },
          SerachInputFoucs(){
            // console.log("得到焦点");
            this.SerachFoucs=true;
            this.SelectCityShow=false;
          },
          GetHistorySerach(){
            if (getStore('placeHistory')) {
                this.placeHistory = JSON.parse(getStore('placeHistory'));
            }else{
                this.placeHistory = [];
            };
            if(getStore('serachHistory')){
              this.serachHistory=JSON.parse(getStore('serachHistory'));
            }else{
              this.serachHistory=[];
            }
          },
          SerachInputBlur(){
            // console.log("失去焦点");
            this.SerachFoucs=false;
          },
          ClearSerachInput(type){
            this.SerachNode="";
            if(type==1)
            {
              this.$refs.serachInput.focus();
            }
          },
          CancelRemoveHistory(){
          },
          ConfirmRemoveHistory(){
            this.placeHistory=[];
            removeStore('placeHistory');
          },
          CancelRemoveserachHistory(){
            this.$refs.serachInput.focus();
          },
          ConfirmRemoveserachHistory(){
            this.$refs.serachInput.focus();
            this.serachHistory=[];
            removeStore('serachHistory');
          },
          ConfirmHistory(){
            this.removeHistoryshow=true;
          },
          ConfirmserachHistory(){
            this.$refs.serachInput.focus();
            this.removeserachHistoryshow=true;
          },
          SelectNode(index, geohash){
            let history = getStore('placeHistory');//操作历史地址开始
            let choosePlace = this.SerachNodeResult[index];
            if (history) {
                let checkrepeat = false;
                this.placeHistory = JSON.parse(history);
                this.placeHistory.forEach(item => {
                     if (item.geohash == geohash) {
                        checkrepeat = true;
                    }
                })
                if (!checkrepeat) {
                    this.placeHistory.unshift(choosePlace)
                }
            }else {
                this.placeHistory.unshift(choosePlace)
            }
            setStore('placeHistory',this.placeHistory)

            let serachhistory = getStore('serachHistory');//操作历史搜索开始
            if (serachhistory) {
                let Flag = false;
                this.serachHistory = JSON.parse(serachhistory);
                this.serachHistory.forEach(item => {
                     if (item == this.SerachNode) {
                        Flag = true;
                    }
                })
                if (!Flag) {
                    this.serachHistory.unshift(this.SerachNode)
                }
            }else {
                this.serachHistory.unshift(this.SerachNode)
            }
            setStore('serachHistory',this.serachHistory);
            this.$store.state.UserSelectNode=this.SerachNodeResult[index];
            this.$router.push({path:'/home/petservice'})
          },
          SelectPlaceHistoryItem(Item){
            this.$store.state.UserSelectNode=Item;
            this.$router.push({path:'/home/petservice'});
          },
          TaggleSelectCity(){
            this.SelectCityShow=!this.SelectCityShow;
          },
          ChnageCity(Item){
            this.$store.state.UserNode=Item;
            this.SelectCityShow=false;
          },
      },
      watch:{
        SerachNode:function(){
            if (this.SerachNode!='') {
                searchplace(this.UserNode.id, this.SerachNode).then(res => {
                  this.SerachNodeResult=res;
                })
            }
            else
            {
              console.log("空的");
              this.SerachNodeResult=[];
            }
        }
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
  		// background-color: #f7f3f7;
      background-color: #fff;
  		z-index: 101;
          p, span{
              font-family: Helvetica Neue,Tahoma,Arial;
          }
  }
  .Middle{
      position:absolute;top:1.5rem;left:0rem;bottom:0rem;width:100%;
      .State2{background:#fff;width:100%;}
      .WhiteItem{
        width:100%;height:1.5rem;background:#fff;display:flex;align-items:center;justify-content:flex-star;position:relative;
        &.Title{
          padding:0rem 0.3rem;display:flex;align-items:center;justify-content:space-between;
          span{
            font-size:0.5rem;
          }
          img{width:0.5rem;height:0.5rem;}
        }
        .Left{
          width:2rem;height:100%;display:flex;align-items:center;justify-content:center;
          span{font-size:0.5rem;}
          img{width:0.3rem;height:0.3rem;}
        }
        .Middle2{
          &.active{
            width:6rem;height:80%;background-color:#f7f3f7;border-radius:0.15rem;display:flex;align-items:center;
            .middle{
              width:4.8rem;height:100%;display:flex;justify-content:space-between;align-items:center;
              input{background:none;padding:0rem;margin:0rem;border:none;font-size:0.5rem;}
              .ClearInput{
                width:1.2rem;height:100%;display:flex;align-items:center;justify-content:center;
                img{width:0.5rem;height:0.5rem;}
              }
            }
          }
          width:7.5rem;height:80%;background-color:#f7f3f7;border-radius:0.15rem;display:flex;align-items:center;
          .LeftImg{
            width:1.2rem;height:100%;display:flex;align-items:center;justify-content:center;
            img{width:0.6rem;height:0.6rem;}
          }
          .middle{
            width:6.3rem;height:100%;display:flex;justify-content:space-between;align-items:center;
            input{background:none;padding:0rem;margin:0rem;border:none;font-size:0.5rem;}
            .ClearInput{
              width:1.2rem;height:100%;display:flex;align-items:center;justify-content:center;
              img{width:0.5rem;height:0.5rem;}
            }
          }
        }
        .Right{
          width:2rem;height:100%;display:flex;align-items:center;justify-content:center;
          span{font-size:0.5rem;}
        }
      }
      .TitleItem{
        width:100%;height:1rem;background-color:#f7f3f7;display:flex;align-items:center;padding:0rem 0.3rem;justify-content:space-between;
        span{
          font-size:0.45rem;color:#8b8b8b;
        }
        img{width:0.5rem;height:0.5rem;}
      }
      .ul_NodeHistory{
        list-style:none;width:100%;
        .HistoryItem{
          // width:100%;height:1.5rem;background:#fff;padding:0rem 0.3rem;display:flex;align-items:center;justify-content:space-between;border-bottom:solid 1px #f9f9f9;
          // span{
          //   font-size:0.45rem;color:#8a8a8a;
          // }
            width:100%;height:1.9rem;background:#fff;padding:0.3rem 0.3rem;border-bottom:solid 1px #f9f9f9;
            span{
              font-size:0.45rem;color:#8a8a8a;
            }
            p.Top{width:100%;height:0.7rem;line-height:0.7rem;font-size:0.45rem;color:#000;}
            p.Bottom{width:100%;height:0.6rem;line-height:0.6rem;font-size:0.35rem;color:#8a8a8a;}
        }
      }
      .ul_SerachHistory{
          list-style:none;width:100%;
            .HistoryItem{
              width:100%;height:1.5rem;background:#fff;padding:0rem 0.3rem;display:flex;align-items:center;justify-content:space-between;border-bottom:solid 1px #f9f9f9;
              span{
                font-size:0.5rem;color:#8a8a8a;
              }
          }
      }
      .SerachResult{
          list-style:none;position:absolute;top:1.5rem;left:0rem;width:100%;height:15rem;overflow-y:auto;background:#fff;
          .ResultItem{
            width:100%;height:1.9rem;background:#fff;padding:0.3rem 0.3rem;border-bottom:solid 1px #f9f9f9;
            span{
              font-size:0.45rem;color:#8a8a8a;
            }
            p.Top{width:100%;height:0.7rem;line-height:0.7rem;font-size:0.45rem;color:#000;}
            p.Bottom{width:100%;height:0.6rem;line-height:0.6rem;font-size:0.35rem;color:#8a8a8a;}
          }
      }
      .SerachNoResult{
          list-style:none;position:absolute;top:1.5rem;left:0rem;width:100%;height:15rem;overflow-y:auto;background:#fff;
          .ResultItem{
            width:100%;height:1.5rem;background:#fff;padding:0.3rem 0.3rem;border-bottom:solid 1px #f9f9f9;display:flex;align-items:center;justify-content:center;
            span{
              font-size:0.45rem;color:#8a8a8a;
            }
          }
      }
      .BigCity{
        position:absolute;top:1.5rem;left:0rem;width:100%;height:15rem;overflow-y:auto;background:#fff;
        .HotCity{
          .Hotcity_title{
              width:100%;height:0.6rem;background-color:#f3f3f3;display:flex;align-items:center;padding:0rem 0.5rem;
                  span{
                      font-size: 0.4rem;
                      color: #999;
                  }
          }
          .Hotcitylistul{
              li{
                      float: left;
                      text-align: center;
                      color: #3190e8;
                      border-bottom: 0.05rem solid #e4e4e4;
                      border-right: 0.05rem solid #e4e4e4;
                      width: 25%;
                      height: 1rem;
                      font: 0.4rem "Microsoft YaHei";
                      line-height:1rem;
                      overflow: hidden;
                      text-overflow: ellipsis;
                      white-space: nowrap;
              }
              li:nth-of-type(4n){
                      border-right: none;
              }
          }
        }
        .letter_classify{
          list-style:none;width:100%;
          .letter_classify_li{
             // margin-bottom: 0.4rem;
             background-color: #fff;
             // border-bottom: 1px solid #e4e4e4;
             .groupcity_name_container{
                 li{
                     color: #666;
                 }
             }
              .city_title{
                width:100%;height:0.6rem;background-color:#f3f3f3;display:flex;align-items:center;padding:0rem 0.5rem;
                  span{
                      font-size: 0.4rem;
                      color: #999;
                  }
              }
              .citylistul{list-style:none;
                  li{
                      float: left;
                      text-align: center;
                      color: #666;
                      border-bottom: 0.05rem solid #e4e4e4;
                      border-right: 0.05rem solid #e4e4e4;
                      width: 25%;
                      height: 1rem;
                      font: 0.4rem "Microsoft YaHei";
                      line-height:1rem;
                      overflow: hidden;
                      text-overflow: ellipsis;
                      white-space: nowrap;
                  }
                  li:nth-of-type(4n){
                      border-right: none;
                  }
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
  .Title{width:100%;height:1.1rem;display:flex;align-items:center;background-color:#fff;
  		p{font-size:0.4rem;color:#8e8e8e;padding:0rem;margin:0rem;}
  	}
  .zhe{position:absolute;width:100%;height:100%;top:0rem;left:0rem;background-color:#000;opacity:0.6;z-index:999;}
  .fadePackageList-enter-active, .fadePackageList-leave-active {
          transition: all .2s;
          transform: translateY(0%);
  }
  .fadePackageList-enter, .fadePackageList-leave-active {
          transform: translateY(100%);
  }
  .zhemodale{position:absolute;left:0rem;top:0rem;bottom:0rem;right:0rem;background-color:rgba(0, 0, 0, 0.5);z-index:97;}

  // .letter_classify_li{
  //    margin-bottom: 0.4rem;
  //    background-color: #fff;
  //    border-bottom: 1px solid $bc;
  //    .groupcity_name_container{
  //        li{
  //            color: #666;
  //        }
  //    }
  // }
</style>
