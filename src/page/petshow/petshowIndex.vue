<template>
<div>
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
</style>
