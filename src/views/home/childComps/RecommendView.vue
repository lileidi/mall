<!-- 推荐信息部分的组件 -->
<template>
<div class='recommend'>
    <div v-for="(item,id) in recommends" :key="id" class="recommendsbox">
        <a :href="item.link">
            <img :src="item.image" alt="">
            <div>{{item.title}}</div>
        </a>
    </div>
</div>
</template>

<script>

export default {
    name:"RecommendView",
    // 父组件与子组件通信用props，在子组件添加props属性获取父组件的数据。
    props:{
        recommends:{
            type:Array,
            default(){
                return []
            
            }
        }
    }
}
</script>
<style scoped>
    .recommend{
        display: flex;
        width:100%;
        text-align: center;
        font-size: 12px;
        padding: 10px 0px 20px;
        border-bottom: 10px solid #eee;
    }
    .recommendsbox{
        flex:1;
        /* padding: 10px 0px 20px; */
    }
    .recommendsbox img{
        width: 70px;
        height: 70px;
        margin-bottom: 10px;
    }
</style>