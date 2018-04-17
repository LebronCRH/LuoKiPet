<template>
<div class="rating_page">
<head-top :Title="Title" :Color="Color" :MidType="MidType">
    <div slot="right" class="rightSpanEdit">
      <span>发表</span>
    </div>
</head-top>
<div class="Middle">
  <scroller ref="scroller" lock-x height="-56" scrollbar-y>
      <div>

      </div>
    </scroller>
</div>
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
        Title:'添加动态',
        Color:0,
        MidType:1,
        EditBtn:true,
      }
    },
    mounted(){

    },
    destroyed(){

    },
    computed: {
      ...mapState([
                'PackageCartList'
            ]),
    },
    props:[],
    methods: {
      ...mapMutations([
                'UPDATE_PACKAGECART',
            ]),
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
</style>
