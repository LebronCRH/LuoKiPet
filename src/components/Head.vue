<template>
	<div class="ShopHead" ref="HeadTop">
	<slot name="left">
     <div class="shopheadback" v-show="MidType=='0'" @click="$router.go(-1)">
       <img src="static/image/back.png">
     </div>
     <div class="shopheadback" v-show="MidType=='1'" @click="$router.go(-1)">
       <img src="static/image/Bback.png">
     </div>
     </slot>
     <slot name="middle">
     <div class="shopheadmid1" v-show="MidType=='0'" ref="my_shopheadmid">
     <p>{{Title}}</p>
     </div>
     <div class="shopheadmid2" v-show="MidType=='1'" ref="my_shopheadmid">
          <p>{{Title}}</p>
     </div>
     </slot>
     <slot name="right">
     <div class="shopheadedit">
     <img src="static/image/dian.png">
     </div>
     </slot>
    </div>
</template>

<script>
export default {
    components: {
    },
    data () {
      return {
        msg: 'Hello World!'
      }
    },
    mounted(){
    	//       	  setTimeout(() => {
     //  	  if(this.Color==0){
    	// 	this.$refs.my_shopheadmid.style.background="#38dbb0";
    	// }
    	// else{
    	// 	this.$refs.my_shopheadmid.style.background="#000";
    	// }
     //      }, 5000)
    },
    computed: {
  
    },
    props:['Title','Color','MidType'],
    methods: {
    // 	SetColor(){
    // 		    	this.$nextTick(() => {
    // 	if(this.Color==0){
    // 		this.$refs.my_shopheadmid.style.background="#38dbb0";
    // 	}
    // 	else{
    // 		this.$refs.my_shopheadmid.style.background="#000";
    // 	}
    // })
    // 	}
    }
}
</script>

<style lang="scss" scoped="">
.ShopHead{
  width:10rem;height:1.5rem;padding-top:0.5rem;position:fixed;left:0rem;top:0rem;z-index:99;box-sizing:border-box;
  .shopheadback{
    height:100%;width:1.5rem;text-align:center;padding:0.45rem 0.45rem;position:absolute;left:0rem;top:0rem;z-index:99;box-sizing:border-box;
    display:flex;justify-content:center;align-items:center;
    img{
      width:0.6rem;height:0.6rem;
    }
  }
  .shopheadmid1{
    width:10rem;height:100%;list-style:none;margin:0;padding: 0;text-align:center;position:absolute;top:0rem;left:0rem;background:#38dbb0;z-index:98;opacity:1;
    p{line-height:1.5rem;color:#fff;font-size:0.5rem;}
  }
  .shopheadmid2{
    width:10rem;height:100%;list-style:none;margin:0;padding: 0;text-align:center;position:absolute;top:0rem;left:0rem;background:#fff;z-index:98;opacity:1;
    p{line-height:1.5rem;color:#000;font-size:0.5rem;}
  }
  .shopheadedit{
    height:100%;color:#38dbb0;padding:0.45rem 0.45rem;position:absolute;top:0rem;right:0rem;z-index:99;box-sizing:border-box;
    display:flex;justify-content:center;align-items:center;
    img{
      width:0.6rem;height:0.6rem;
    }
    span{font-size:0.4rem;color:#fff;}
  }
  .rightSpanEdit{
    width:1.5rem;height:100%;position:absolute;top:0rem;right:0rem;z-index:99;display:flex;justify-content:center;align-items:center;
    span{
      font-size:0.4rem;
    }
  }
}
</style>