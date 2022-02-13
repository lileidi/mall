<!--  -->
<template>
    <div class='goods'>
        <goods-list-item v-for="(item,id) in goods" :key="id" :goodsItems="item" ></goods-list-item>
        <!-- {{goods}} -->
    </div>
</template>

<script>
import GoodsListItem from './GoodsListItem.vue'
export default {
    name: 'GoodsList',
    data() {
        return {

        }
    },
    props:{
        goods:{
            type:Array,
            default(){
                return []
            }
        }
    },
    components:{
        GoodsListItem,
    }
    }
</script>
<style scoped>
    .goods{
        display: flex;
        /* 包裹，换行 */
        flex-flow: wrap;
        justify-content: space-around;
    }
</style>