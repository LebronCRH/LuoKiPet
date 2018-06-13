<template>
<div class="rating_page">
<transition name="router-slid" mode="out-in">
            <router-view></router-view>
        </transition>
</div>
</template>

<script>
	
</script>

<style lang="scss" scoped="">
.router-slid-enter-active, .router-slid-leave-active {
        transition: all .4s;
    }
    .router-slid-enter, .router-slid-leave-active {
        transform: translate3d(2rem, 0, 0);
        opacity: 0;
}

  .rating_page{
  		position: absolute;
  		top: 0;
  		left: 0;
  		right: 0;
  		bottom: 0;
  		background-color: #f7f3f7;
  		z-index: 101;
          p, span{
              font-family: Helvetica Neue,Tahoma,Arial;
          }
  }
</style>
