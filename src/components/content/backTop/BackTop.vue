<!-- 滚动后回到顶部组件-->
<template>
    <div class='back-top' >
        <img src="~assets/img/common/top.png" alt="">
    </div>
</template>

<script>

export default {
    name: 'BackTop',
    data() {
        return {

        }
    },
}
</script>
<style scoped>
    .back-top{
        position: fixed;
        right: 3px;
        bottom: 45px;
    }
    .back-top img{
        width: 43px;
    }
</style>