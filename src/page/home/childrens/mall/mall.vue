<template>
<div>
<header class="mui-bar mui-bar-nav" id="header">
        <div class="top-sch-box flex-col">
            <div class="centerflex">
                <i class="fdj iconfont icon-search"></i>
                <div class="sch-txt">连衣裙就是你的女人味儿</div>
                <span class="shaomiao"><i class="iconfont icon-saoma"></i></span>
            </div>
        </div>
        <a class="btn" href="">
            <i class="iconfont icon-tixing"></i>
        </a>
        <a class="btn" href="shopcar.html">
            <i class="iconfont icon-cart"></i>
        </a>
    </header>
<div class="Middle">
<scroller ref="scroller" lock-x height="-110" scrollbar-y use-pulldown :use-pullup=true @on-scroll="PageSlide" @on-pullup-loading="UpPagedade" @on-pulldown-loading="DownPageData" v-model="scrollerStaues">
<div>
	<swiper :list="SlideList" auto  v-model="Swiper_index" dots-position="center"></swiper>

        <div class="home-qnav ui-box">
            <div class="ui-flex flex-justify-sb">
                <div><a href="http://www.591zq.com"><img src="static/image/uploads/mallTB9.png" class="ico" /><span class="name">宠物粮食</span></a></div>
                <div><a href="http://www.591zq.com"><img src="static/image/uploads/mallTB7.png" class="ico" /><span class="name">宠物萌窝</span></a></div>
                <div><a href="http://www.591zq.com"><img src="static/image/uploads/mallTB11.png" class="ico" /><span class="name">医疗用品</span></a></div>
                <div><a href="http://www.591zq.com"><img src="static/image/uploads/mallTB5.png" class="ico" /><span class="name">宠物服饰</span></a></div>
            </div>
            <div class="ui-flex flex-justify-sb">
                <div><a href="http://www.591zq.com"><img src="static/image/uploads/mallTB6.png" class="ico" /><span class="name">宠物出行</span></a></div>
                <div><a href="http://www.591zq.com"><img src="static/image/uploads/mallTB12.png" class="ico" /><span class="name">日常饮料</span></a></div>
                <div><a href="http://www.591zq.com"><img src="static/image/uploads/mallTB1.png" class="ico" /><span class="name">洗浴用品</span></a></div>
                <div><a href="http://www.591zq.com"><img src="static/image/uploads/mallTB3.png" class="ico" /><span class="name">日常用品</span></a></div>
            </div>
        </div>


        <div class="home-newgoods ui-box">
            <img class="home-imgtit" src="static/image/img/hometit1.jpg" alt="" />
            <div class="list-type1 plist-puzzle">
                <a class="b" href=""><img src="static/image/uploads/petmallnew.png" alt="" /></a>
                <div class="s ui-flex-vt flex-justify-sb">
                    <a class="box" href=""><img src="static/image/uploads/newLS1.png" alt="" /></a>
                    <a class="box" href=""><img src="static/image/uploads/newLS2.png" alt="" /></a>
                    <a class="box" href=""><img src="static/image/uploads/newLS3.png" alt="" /></a>
                </div>
            </div>
            <img class="home-imgtit" src="static/image/img/hometit2.jpg" alt="" />
            <div class="list-type2 ui-flex flex-justify-sb">
                <a class="box" href=""><img class="figure" src="static/image/uploads/hotLS1.png" alt="" /><span class="tit">品牌推荐</span></a>
                <a class="box" href=""><img class="figure" src="static/image/uploads/hotLS2.png" alt="" /><span class="tit">优惠推荐</span></a>
                <a class="box" href=""><img class="figure" src="static/image/uploads/hotLS3.png" alt="" /><span class="tit">爱心推荐</span></a>
            </div>
        </div>

        <div class="home-fashion ui-box ui-border-t">
            <img class="home-imgtit" src="static/image/img/hometit3.jpg" alt="" />
            <a href=""><img class="db margin-b-s" src="static/image/uploads/Popular.png" width="100%" alt="" /></a>
            <div class="fastion-plist mui-row">
                <div class="mui-col-xs-4">
                    <a class="item">
                        <img src="static/image/uploads/Popular1.png" alt="" class="figure" /><span class="tit">福来恩·第二代</span>
                    </a>
                </div>
                <div class="mui-col-xs-4">
                    <a class="item">
                        <img src="static/image/uploads/Popular2.png" alt="" class="figure" /><span class="tit">优质美·华丹</span>
                    </a>
                </div>
                <div class="mui-col-xs-4">
                    <a class="item">
                        <img src="static/image/uploads/Popular3.png" alt="" class="figure" /><span class="tit">敬思华·若所</span>
                    </a>
                </div>
                <div class="mui-col-xs-4">
                    <a class="item">
                        <img src="static/image/uploads/Popular4.png" alt="" class="figure" /><span class="tit">度撒网·㐈但</span>
                    </a>
                </div>
                <div class="mui-col-xs-4">
                    <a class="item">
                        <img src="static/image/uploads/Popular5.png" alt="" class="figure" /><span class="tit">碳酸钠·IRS</span>
                    </a>
                </div>
                <div class="mui-col-xs-4">
                    <a class="item">
                        <img src="static/image/uploads/Popular6.png" alt="" class="figure" /><span class="tit">源泰德·代言</span>
                    </a>
                </div>
                <div class="mui-col-xs-4">
                    <a class="item">
                        <img src="static/image/uploads/Popular7.png" alt="" class="figure" /><span class="tit">多特瑞·天然</span>
                    </a>
                </div>
                <div class="mui-col-xs-4">
                    <a class="item">
                        <img src="static/image/uploads/Popular8.png" alt="" class="figure" /><span class="tit">阿萨斯·㧅是</span>
                    </a>
                </div>
                <div class="mui-col-xs-4">
                    <a class="item">
                        <img src="static/image/uploads/Popular9.png" alt="" class="figure" /><span class="tit">SYdu·法苏</span>
                    </a>
                </div>
            </div>
        </div>
</div>
<div slot="pulldown" class="xs-plugin-pulldown-container xs-plugin-pulldown-down" style="position: absolute; width: 100%; height:1.4rem; line-height:1.4rem; top:-1.4rem; text-align: center;">
        <span v-show="scrollerStaues.pulldownStatus === 'default'"></span>
        <span class="pulldown-arrow" v-show="scrollerStaues.pulldownStatus === 'down' || scrollerStaues.pulldownStatus === 'up'" :class="{'rotate': scrollerStaues.pulldownStatus === 'up'}">↓</span>
        <span v-show="scrollerStaues.pulldownStatus === 'loading'"><spinner type="ios-small"></spinner></span>
      </div>
      <div slot="pullup" class="xs-plugin-pullup-container xs-plugin-pullup-up" style="position: absolute; width: 100%; height:1.4rem; line-height:1.4rem; bottom:-1.4rem; text-align: center;">
        <span v-show="scrollerStaues.pullupStatus === 'default'"></span>
        <span class="pulldown-arrow" v-show="scrollerStaues.pullupStatus === 'down' || scrollerStaues.pullupStatus === 'down'" :class="{'rotate': scrollerStaues.pullupStatus === 'down'}">↑</span>
        <span v-show="scrollerStaues.pullupStatus === 'loading'"><spinner type="ios-small"></spinner></span>
      </div>
</scroller>
</div>
</div>
</template>

<script>
import { Swiper, Scroller, Spinner } from 'vux'

const baseList = [{
  url: 'javascript:',
  img: './static/image/uploads/mallSlide1.png'
}, {
  url: 'javascript:',
  img: './static/image/uploads/mallSlide2.png'
}, {
  url: 'javascript:',
  img: './static/image/uploads/mallSlide3.png'
}, {
  url: 'javascript:',
  img: './static/image/uploads/mallSlide4.png'
}]


export default{
		data(){
			return{
        SlideList:baseList,
        Swiper_index: 0,
        scrollerStaues: {
          pulldownStatus: 'default',
          pullupStatus: 'default'
        }
			}
		},
		 components: {
      Swiper,
      Scroller,
      Spinner,
        },
		mounted(){

		},
	    methods: {
      onRefresh(done) {
          done()
      },

      onInfinite(done) {
          done()
      },
      PageSlide(pos){

      },
      UpPagedade(){
        console.log(666);
        this.$nextTick(() => {
        setTimeout(() => {
          this.$refs.scroller.donePullup()
        }, 1000)
        })
      },
      DownPageData(){
        console.log("555");
        this.$nextTick(() => {
        setTimeout(() => {
          this.$refs.scroller.donePulldown()
        }, 1000)
       })
      }
  }
	}
</script>

<style lang="scss" scoped>
.mui-bar-nav { display: -webkit-box; display: -webkit-flex; display: flex; -webkit-box-align: center; -webkit-align-items: center; align-items: center; font-size: .36rem;    background: #38dbb0; }
.mui-bar-nav .iconfont, .mui-bar-nav .mui-icon { display: block; color: #fafafa; }
.mui-bar-nav .iconfont { font-size: .57rem; }
.mui-bar-nav .btn { position: relative; z-index: 11; display: block; margin: 0 .15rem; padding: 0 .25rem; color: #525252; font-size: .45rem; height: 1.44rem; line-height: 1.44rem; }
.mui-bar-nav .btn .ui-numdot { width: 32px; height: 32px; line-height: 32px; top: 50%; left: 50%; margin-top: -.5rem; margin-left: .1rem; }
.mui-bar-nav .btn-back { padding: 0 .25rem; margin: 0 .15rem; color: #fafafa; }
.mui-bar-nav .btn-back:before { font-family: "iconfont" !important; font-weight: 400; font-style: normal; -webkit-font-smoothing: antialiased; -webkit-text-stroke-width: 0.2px; -moz-osx-font-smoothing: grayscale; content: "\e610"; font-size: .6rem; }
.mui-bar-nav .btn-back ~ .top-sch-box { margin: 0; }
.mui-bar-nav .header-tit { display: block; -webkit-box-flex: 1; -webkit-flex: 1; flex: 1; width: .1px; }
.mui-bar-nav .header-tit .txt { position: absolute; top: 0; right: 0; left: 0; line-height: 1.44rem; padding: 0 1.3rem; display: block; overflow: hidden; white-space: nowrap; text-overflow: ellipsis; font-size: .52rem; color: #3f3f3f; text-align: center; }
.mui-bar-nav.white-mod { background: transparent; }
.mui-bar-nav.white-mod .iconfont, .mui-bar-nav.white-mod .mui-icon, .mui-bar-nav.white-mod .btn { color: #fff; }
.mui-bar-nav.noheight ~ .mui-content { padding-top: 0; }

.top-sch-box { height: 0.9rem; line-height: 0.9rem; margin: 0 .3rem; padding: 0 .3rem; font-size: .36rem; color: #9e9e9e; background-color: #f8f8f8; -webkit-border-radius: 1000px; border-radius: 1000px; }
.top-sch-box .fdj { color: #38dbb0; }
.top-sch-box .sch-input { display: block; padding: 0 0.3rem; margin: 0; height: auto; line-height: 0.9rem; border: none; background: transparent; font-size: 12px; color: #666; }
.top-sch-box .sch-txt { width: 100%; padding: 0 10px; }
.top-sch-box .tag-wrap { position: relative; margin: 0 -.15rem; height: 100%; overflow: hidden; }
.top-sch-box .mui-scroll { width: auto; height: 100%; display: -webkit-box; display: -webkit-flex; display: flex; -webkit-box-align: center; -webkit-align-items: center; align-items: center; }
.top-sch-box .tags { padding-right: 2rem; white-space: nowrap; font-size: 0; }
.top-sch-box .tags .tag { display: inline-block; vertical-align: middle; margin-right: .15rem; padding: 0 .25rem; color: #fff; font-size: .32rem; line-height: .58rem; background-color: #c2c2c2; -webkit-border-radius: 100px; border-radius: 100px; }
.top-sch-box .tags .tag i { font-family: Muiicons; font-weight: 400; font-style: normal; -webkit-font-smoothing: antialiased; display: inline-block; vertical-align: top; height: 1px; line-height: inherit; font-size: .48rem; }
.top-sch-box .tags .tag i:after { content: "\e460"; }
.top-sch-box ~ .sch-submit { display: block; position: static; margin: 0 .3rem; padding: 0 .4rem; font-size: .45rem; line-height: .96rem; border: none !important; -webkit-border-radius: 100px; border-radius: 100px; }
.top-sch-box .mui-icon-clear { margin: 0; padding: 0; font-size: 22px; }
.flex-col { display: block; -webkit-box-flex: 1; -webkit-flex: 1; flex: 1; width: .1px; }
.centerflex { display: -webkit-box; display: -webkit-flex; display: flex; -webkit-box-align: center; -webkit-align-items: center; align-items: center; }
.home-imgtit { display: block; width: 10rem; padding: 1px 0; margin: auto; }

.home-nav { padding: 0.58rem 0.15rem 0.52rem; margin-bottom: 0.3rem; }
.home-nav img { display: block; width: 2.3rem; }

.home-qnav { padding: 0 0.4rem 0.4rem; margin-bottom: 0.3rem; line-height: 1; }
.home-qnav .tiptxt { padding-top: 0.4rem; color: #909090; font-size: .42rem; }
.home-qnav .ico { display: block; width: 1.6rem; margin: 0.35rem auto 0.3rem; }
.home-qnav .name { display: block; text-align: center; font-size: .38rem; color: #363636; }

.home-newgoods { padding: 0 0.15rem 0.35rem; margin-bottom: 0.15rem; }
.home-newgoods .list-type1 { margin: auto; }
.home-newgoods .list-type2 { margin: auto; }
.home-newgoods .list-type2 .box { position: relative; display: block; width: 3.4rem; }
.home-newgoods .list-type2 .box .figure { display: block; width: 100%; }
.home-newgoods .list-type2 .box .tit { position: absolute; top: 50%; left: 50%; -webkit-transform: translate(-50%, -50%); transform: translate(-50%, -50%); margin-top: .4rem; padding: 0 .22rem; line-height: .54rem; font-size: .36rem; color: #fff; white-space: nowrap; background-color: rgba(255, 57, 92, 0.8); }
.home-newgoods .list-type2 .box:nth-child(3) .tit { color: #000; background-color: rgba(255, 255, 255, 0.8); }
.home-newgoods .list-type2 .box:nth-child(3) .tit:after { font-family: "iconfont" !important; font-weight: 400; font-style: normal; -webkit-font-smoothing: antialiased; -webkit-text-stroke-width: 0.2px; -moz-osx-font-smoothing: grayscale; content: "\e60f"; font-size: 12px; display: inline-block; vertical-align: top; height: 1px; line-height: inherit; }

.home-fashion { padding: 0 0.15rem 0.05rem; }
.flex-justify-sb { -webkit-box-pack: justify; -webkit-justify-content: space-between; justify-content: space-between; }
.ui-flex { display: -webkit-box; display: -webkit-flex; display: flex; }
.ui-box { background-color: #fff; }

.plist-puzzle { overflow: hidden; width: 10rem; height: 9.96rem; }
.plist-puzzle img { display: block; width: 100%; height: 100%; }
.plist-puzzle .b { float: left; width: 6.98rem; height: 100%; }
.plist-puzzle .s { margin-left: 7.01rem; height: 100%; }
.plist-puzzle .s .box { display: block; height: 3.3rem; }

.fastion-plist { overflow: hidden; margin-right: -0.15rem; }
.fastion-plist .item { position: relative; display: block; margin: 0 0.15rem 0.15rem 0; }
.fastion-plist .figure { display: block; width: 100%; }
.fastion-plist .tit { position: absolute; right: 0; bottom: 0; left: 0; height: 23px; line-height: 23px; font-size: 13px; color: #3f3f3f; text-align: center; background-color: rgba(255, 255, 255, 0.7); }


    .Middle{
    	position:absolute;top:1.5rem;left:0rem;bottom:0rem;width:100%;background-color:#f2f2f2;
    }

.Slide_Img{
	width:10rem;height:5.5rem;
	a{
		img{width:10rem;height:5.5rem;}
	}
}
.rotate {
  transform: rotate(-180deg);
}
.pulldown-arrow {
  display: inline-block;
  transition: all linear 0.2s;
  color: #666;
  font-size: 0.5rem;
}
</style>