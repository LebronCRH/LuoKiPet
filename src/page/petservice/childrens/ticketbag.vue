<template>
<div class="rating_page">
<head-top :Title="Title" :Color="Color" :MidType="MidType"></head-top>
<div class="Middle" ref="Middle">
	<scroller ref="scroller" lock-x height="-56" scrollbar-y>
      <div>
      <div class="ShopAllPackageCartItem" v-for="(item1,index1) in AllPackageCartList">
      <div class="ShopTop">
      <div class="Left">
      <img class="img1" v-show='!item1.AllSelectStatue' :alt="AllSelectStatue" @click="AllSelectPackage(index1)" src="static/image/yuan.png">
      <img class="img1" v-show='item1.AllSelectStatue' @click="AllClearPackage(index1)" src="static/image/duigou.png">
      <img class="img2" src="static/image/quanshop.png" alt="">
      <span>{{item1.ShopName}}</span>
      </div>
      <div class="Right">
      <span v-show="item1.EditBtn" @click="EditShopBtn(index1)">编辑</span>
      <span v-show="!item1.EditBtn" @click="CompleteShopBtn(index1)">完成</span>
      </div>
      </div>
      <div class="shopcartItem" v-for="(item,index) in item1.ShopPackageList">
        <div class="servicetop">
            <img v-show="!item.SelectStatue" @click="PackageSelect(index1,index,1)" src="static/image/yuan.png">
        	<img v-show="item.SelectStatue" @click="PackageSelect(index1,index,0)" src="static/image/duigou.png" alt="">
        	<span>{{item.ForServiceName}}</span>
        </div>
        <div class="OkState" v-show="item1.EditBtn">
        	<div class="packagename">
               <span>{{item.PackageName}}</span>
            </div>
            <div class="packageprice">
                <div class="Left">
                <span class="price">￥{{item.PackagePrice}}</span>  <span class="oldprice"><del>￥{{item.PackageOldPrice}}</del></span>
                </div>
                <div class="Right">
                <span>{{item.SaleNum}}</span>
                </div>
            </div>
            <div class="ps_liInfoBt">
                <img src="static/image/discount.png">
                <span>全场服务86折优惠</span>
            </div>
        </div>
        <div class="EditState" v-show="!item1.EditBtn">
        	<div class="EditItem">
        	  <div class="Left" @click="SelectServicePackage(item)">
        	  <span>{{item.PackageName}}</span>
        	  <img src="static/image/Down.png">
        	  </div>
        	  <div class="Right">
        	  <div class="jian" @click="JianPackageNum(index1,index)">
        	  	<img src="static/image/jian.png" alt="">
        	  </div>
        	  <span class="num">{{item.SaleNum}}</span>
        	  <div class="jia" @click="JiaPackageNum(index1,index)">
        	  	<img src="static/image/jia.png" alt="">
        	  </div>
        	  </div>
        	</div>
        </div>
      </div>
      </div>
      </div>
    </scroller>
</div>
    <div class="ps_ServiceBag">
   <div class="Left">
   <div class="Img">
   <img src="static/image/bag1.png">
   </div>
     <p class="TotalMoney">￥{{TotalPackageMoney}}</p>
   </div>
   <div class="Right Active">去结算</div>
</div>
<selectpackage :ServiceId='selectpackageServiceId' :CurrentSelectPackageId='CurrentSelectPackageId' :ShopId='selectpackageForShopId' :ShopName='ForShopName' @BtnClick='BtnClick' ref="selectpackage"></selectpackage>
</div>
</template>

<script>
import axios from 'axios'
import {mapState, mapMutations} from 'vuex'
import headTop from '@/components/Head.vue'
import { Scroller } from 'vux'
import selectpackage from '@/page/petservice/components/selectpackage.vue'
export default {
    components: {
    	headTop,
    	Scroller,
    	selectpackage
    },
    data () {
      return {
        msg: 'Hello World!',
        Title:'券包',
        Color:0,
        MidType:1,
        EditBtn:true,
        ServiceId:10001,
        ForShopId:1001,
        ForShopName:"CHUPPIES摄影工作室",
        PackageList:[{
        	ForShopId:1001,
        	ForServiceID:10001,
        	ForServiceName:"店名",
        	PackageId:0,
        	PackageName:"套餐1",
        	SelectStatue:false,
        	SaleNum:1,
        	PackagePrice:45,
        	PackageOldPrice:55,
        },{
        	ForShopId:1001,
        	ForServiceID:10002,
        	ForServiceName:"店名",
        	PackageId:1,
        	PackageName:"套餐2",
        	SelectStatue:false,
        	SaleNum:1,
        	PackagePrice:55,
        	PackageOldPrice:66,
        },{
        	ForShopId:1001,
        	ForServiceID:10003,
        	ForServiceName:"店名",
        	PackageId:2,
        	PackageName:"套餐3",
        	SelectStatue:false,
        	SaleNum:1,
        	PackagePrice:66,
        	PackageOldPrice:77,
        }],
        selectpackageServiceId:null,
        selectpackageForShopId:1001,
        CurrentSelectPackageId:0,
        AllPackageCartList:[],
        CurrentActiveShopCartIndex:null,
      }
    },
    mounted(){
    	this.initPackageCartList();
        this.initHeadHeight();
    },
    destroyed(){
    	this.AllShopPackageClearSelect();
    },
    computed: {
    	...mapState([
                'PackageCartList','StatusbarHeight','StatusbarHeightRem',
            ]),
    	AllShopPackageCartList: function (){
                return {...this.PackageCartList};
            },
    	AllSelectStatue:{
    		get:function(){
    			var Flag=true;
    			var CurrentIndex=1000;
    			this.AllPackageCartList.forEach((item1,index1)=>{
    				item1.ShopPackageList.forEach(item=>{
    					if(item.SelectStatue==false){
    					   Flag=false;
    				    }
    				})
    				if(Flag==true){
    					CurrentIndex=index1;
    					item1.AllSelectStatue=true;
    				}
    				else{
    					item1.AllSelectStatue=false;
    					Flag=true;
    				}
    		    });
    		    console.log(CurrentIndex);
    		    return CurrentIndex;
    		},
    		set:function(index){
    			this.AllPackageCartList.forEach((item1,index1)=>{
    				if(index1==index){
    					item1.ShopPackageList.forEach(item=>{
    						item.SelectStatue=true;
    					})
    				}
    				else{
    					this.AllClearPackage(index1);
    				}
    			})
    		}
    	},
    	TotalPackageMoney:function(){
    		let Total=0;
    		this.AllPackageCartList.forEach(item1=>{
    			item1.ShopPackageList.forEach(item=>{
    				if(item.SelectStatue==true){
    				   Total+=item.PackagePrice*item.SaleNum;
    			    }
    			})
    		});
    		return Total;
    	},
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
    	EditShopBtn(index){
    		this.AllPackageCartList[index].EditBtn=false;
    	},
    	CompleteShopBtn(index){
    		this.AllPackageCartList[index].EditBtn=true;
    	},
    	initPackageCartList(){//初始化获得所有的券包信息
    		this.AllPackageCartList=[];
    		Object.keys(this.AllShopPackageCartList).forEach(shopid=>{
    			console.log(shopid);
    			let ShopPackageObject={ShopName:null,ShopId:shopid,ShopPackageList:[],EditBtn:true,AllSelectStatue:false};
    			ShopPackageObject.ShopName=this.AllShopPackageCartList[shopid].ShopName;
    			console.log(ShopPackageObject.ShopName);
    			Object.keys(this.AllShopPackageCartList[shopid].ServiceList).forEach(serviceid=>{
    				Object.keys(this.AllShopPackageCartList[shopid].ServiceList[serviceid]).forEach(packageid=>{
    					ShopPackageObject.ShopPackageList.push(this.AllShopPackageCartList[shopid].ServiceList[serviceid][packageid]);
    					console.log(this.AllShopPackageCartList[shopid].ServiceList[serviceid][packageid].SelectStatue)
    				})
    			})
    			this.AllPackageCartList.push(ShopPackageObject);
    		})
    		console.log(this.AllShopPackageCartList);
    	},
    	SelectServicePackage(item){
    		this.selectpackageForShopId=item.ForShopId;
    		this.selectpackageServiceId=item.ForServiceID;
    		this.CurrentSelectPackageId=item.PackageId;
    		this.$refs.selectpackage.modalTaggle();
    	},
    	AllSelectPackage(index){
    		this.AllSelectStatue=index;
    	},
    	AllClearPackage(index){
    		// this.AllClearStatue=index;
    		this.AllPackageCartList.forEach((item1,index1)=>{
    				if(index1==index){
    					item1.ShopPackageList.forEach(item=>{
    						item.SelectStatue=false;
    					})
    					item1.AllSelectStatue=false;
    				}
    			})
    	},
    	AllShopPackageClearSelect(){//当退出页面的时候，取消之前的所有勾选
    		this.AllPackageCartList.forEach((item1,index1)=>{
    			this.AllClearPackage(index1);
    		})
    	},
    	PackageSelect(id1,id,type){
    		this.AllPackageCartList.forEach((item1,index1)=>{
    			if(index1==id1){
    				item1.ShopPackageList.forEach((item,index)=>{
    					if(index==id){
    						if(type==0){
    							item.SelectStatue=false;
    						}
    						else if(type==1){
    							item.SelectStatue=true;
    						}
    					}
    				})
    			}
    			else if(type==1){
    				this.AllClearPackage(index1);
    			}
    		})
    	},
    	JianPackageNum(id1,id){
    		this.AllPackageCartList.forEach((item1,index1)=>{
    			if(index1==id1){
    				item1.ShopPackageList.forEach((item,index)=>{
    					if(index==id){
    						if(item.SaleNum>1){
    							item.SaleNum=item.SaleNum-1;
    						}
    					}
    				})
    			}
    		})
    	},
    	JiaPackageNum(id1,id){
    		this.AllPackageCartList.forEach((item1,index1)=>{
    			if(index1==id1){
    				item1.ShopPackageList.forEach((item,index)=>{
    					if(index==id){
    							item.SaleNum=item.SaleNum+1;
    					}
    				})
    			}
    		})
    	},
    	BtnClick({shopid,serviceid,oldpackageid,newpackageid,newpackagename,newpackageprice,newpackageoldprice}){
    		console.log(shopid,serviceid,oldpackageid,newpackageid,newpackagename,newpackageprice,newpackageoldprice);
            this.AllPackageCartList.forEach((item,index)=>{
                if(item.ShopId==shopid)
                {
                    let NewPackage=null;
                    let OldPackage=null;
                    item.ShopPackageList.forEach((item2,index2)=>{
                        if(item2.PackageId==newpackageid){
                            NewPackage=item2;
                        }
                        if(item2.PackageId==oldpackageid){
                            OldPackage=item2;
                        }
                    })
                    if(NewPackage){
                        console.log("有新的包");
                        NewPackage.SaleNum+=OldPackage.SaleNum;
                        this.DELETE_PACKAGECART({shopid,serviceid,oldpackageid,newpackageid,newpackagename,newpackageprice,newpackageoldprice});//移除Vuex中的数据
                        if (item.ShopPackageList.indexOf(OldPackage)> -1)
                        {
                            item.ShopPackageList.splice(index, 1);//移除本页面显示的数据
                        }
                    }
                    else{
                        console.log("没有新的包");
                        OldPackage.PackageId=newpackageid;
                        OldPackage.PackageName=newpackagename;
                        OldPackage.PackageOldPrice=newpackageoldprice;
                        OldPackage.PackagePrice=newpackageprice;
                    }
                }
            })
    		// this.UPDATE_PACKAGECART({shopid,serviceid,oldpackageid,newpackageid,newpackagename,newpackageprice,newpackageoldprice})
            console.log(this.AllPackageCartList);
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
.shopcartItem{width:10rem;padding:0rem 0.25rem;box-sizing:border-box;background:#fff;margin-bottom:0.1rem;
	.servicetop{
		width:100%;height:1.2rem;display:flex;align-items:center;
		img{width:0.7rem;height:0.7rem;}
		span{margin-left:0.3rem;font-size:0.45rem;}
	}
	.OkState{
		.packagename{
		  width:100%;height:0.7rem;display:flex;align-items:center;
		  span{margin-left:1rem;font-size:0.3rem;color:#b5b6b5;}
	     }
	    .packageprice{
		  width:100%;height:0.9rem;display:flex;align-items:center;padding-left:1rem;border-bottom:solid 1px #f2f3f4;display:flex;align-items:center;
		    .Left{width:85%;height:100%;display:flex;align-items:center;
			    .price{
			       color:#f75952;font-size:0.4rem;
		        }
		        .oldprice{
			       color:#b5b6b5;font-size:0.35rem;margin-left:0.5rem;
		        }
		    }
		    .Right{width:10%;height:100%;display:flex;align-items:center;
			     span{color:#f75952;font-size:0.3rem;}
		    }
	    }
	    .ps_liInfoBt{
			width:100%;height:1.2rem;padding:0.35rem 1rem;display:flex;align-items:center;box-sizing: border-box;
			img{width:0.5rem;height:0.5rem;margin-right:0.3rem;}
			span{line-height:0.5rem;font-size:0.4rem;color:#1c1c1c;height:0.5rem;}
		}
	}
	.EditState{
		width:100%;height:1.3rem;
		.EditItem{
			width:100%;height:100%;display:flex;align-items:center;justify-content:space-between;padding-left:1rem;box-sizing:border-box;
		    .Left{
		    	width:4rem;height:1.1rem;border:solid 1px #dddddd;border-radius:0.2rem;display:flex;align-items:center;justify-content:space-around;padding:0.1rem 0.2rem;box-sizing:border-box;
		    	span{
		    		font-size:0.35rem;line-height:0.4rem;
		    	}
		    	img{width:0.7rem;height:0.6rem;margin-left:0.2rem;}
		    }
		    .Right{
		    	width:4rem;height:1.1rem;border:solid 1px #dddddd;border-radius:0.2rem;display:flex;justify-content:center;align-items:center;
		    	.jian{
		    		width:30%;height:100%;border-right:solid 1px #dddddd;box-sizing:border-box;display:flex;font-size:0.6rem;justify-content:center;align-items:center;
		    		img{
		    			width:0.3rem;height:0.3rem;
		    		}
		    	}
		    	.num{
		    		width:40%;height:100%;border-right:solid 1px #dddddd;box-sizing:border-box;font-size:0.5rem;display:flex;font-size:0.4rem;justify-content:center;align-items:center;
		    	}
		    	.jia{
		    		width:30%;height:100%;box-sizing:border-box;font-size:0.6rem;display:flex;justify-content:center;align-items:center;
		    		img{
		    			width:0.3rem;height:0.3rem;
		    		}
		    	}
		    }
		}
	}

	.packagename{
		width:100%;height:0.7rem;display:flex;align-items:center;
		span{margin-left:1rem;font-size:0.3rem;color:#b5b6b5;}
	}
	.packageprice{
		width:100%;height:0.9rem;display:flex;align-items:center;padding-left:1rem;border-bottom:solid 1px #f2f3f4;display:flex;align-items:center;
		.Left{width:85%;height:100%;display:flex;align-items:center;
			.price{
			color:#f75952;font-size:0.4rem;
		     }
		.oldprice{
			color:#b5b6b5;font-size:0.35rem;margin-left:0.5rem;
		     }
		}
		.Right{width:10%;height:100%;display:flex;align-items:center;
			span{color:#f75952;font-size:0.3rem;}
		}
	}
	.ps_liInfoBt{
			width:100%;height:1.2rem;padding:0.35rem 1rem;display:flex;align-items:center;box-sizing: border-box;
			img{width:0.5rem;height:0.5rem;margin-right:0.3rem;}
			span{line-height:0.5rem;font-size:0.4rem;color:#1c1c1c;height:0.5rem;}
		}
}
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
