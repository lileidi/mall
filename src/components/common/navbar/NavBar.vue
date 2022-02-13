<!--导航栏封装和使用  -->
<template>
<!-- 导航会多处，用class好点 -->
<div class='nav-bar'>
    <!-- 为外层的div布局，因为每一处用的插槽不一样，不能写死 -->
    <!-- 具名插槽可以指定替换具体的哪一个 -->
    <div class="left"><slot name="left"></slot></div>
    <div class="center"><slot name="center"></slot></div>
    <div class="right"><slot name="right"></slot></div>
</div>

</template>

<script>

    export default {
        name:"NavBar",
        components: {},
        data() {
        return {

        }
        },
    }
</script>
<style scoped>
    /* scoped仅在当前组件起作用 */
    .nav-bar{
        /* 这里导航栏用的三栏布局：父display：flex，左右定宽高，中间flex：1 */
        display: flex;
        height: 44px;
        line-height: 44px;
        text-align: center;
        /* 设置盒子阴影 */
        box-shadow: 0 1px 1px rgba(100, 100, 100, .1);
    }
    .left,.right{
        width: 60px;
        /* background: #999; */
    }
    .center{
        flex: 1;
        /* background: red; */
    }
</style>