
<template>
	<div class="LineMenuItem">
	   <router-link  :to="{ path: 'changeorderphone',append:true}" tab="div">
	     <span class="Msg">{{MenuLeft}}</span>
	     <p ui-sref="Identity_verification">
	     <span class="mobile">{{MenuRight}}<i></i></span>
	     </p>
	   </router-link>
	</div>
</template>

<script>
    export default {
    	data(){
            return{

            }
        },
        mounted(){

        },
        components: {
        },
        props: ['MenuLeft','MenuRight','UrlPath'],
        beforeDestroy(){
        	clearInterval(this.timer);
        }
    }
</script>

<style lang="scss" scoped>
	.LineMenuItem{width:100%;height:1.3rem;position:relative;display:flex;align-items:center;background-color:#fff;padding:0rem 0.5rem;margin-top:0.03rem;box-sizing: border-box;
		.Msg{font-size:0.4rem;color:#0f0f0f;}
		p{position:absolute;height:1.3rem;top:0rem;right:0.3rem;display:flex;align-items:center;
			.mobile{font-size:0.3rem;color:#8e8e8e;
				i{display:inline-block;width:0.3rem;height:0.3rem;background:url(../../../static/image/right_.png);background-size:0.3rem 0.3rem;margin-left:0.3rem;}
			}
		}
	}
</style>