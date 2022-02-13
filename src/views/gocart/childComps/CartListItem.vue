<!-- 商品列表里的一个商品展示 -->
<template>
    <div class='cartlistitem'>
        <div class="checkButton">
            <check-button :isChecked="product.checked" @click.native="checkClick"></check-button>
        </div>
        <div class="item-imge">
            <img :src="product.image" alt="">
        </div>
        <div class="item-info ">
            <div class="title">{{product.title}}</div>
            <div class="desc">{{product.desc}}</div>
            <div class="other">
                <div class="price">￥{{product.price}}</div>
                <div class="count">×{{product.count}}</div>
            </div>
        </div>
    </div>
</template>

<script>
import checkButton from 'components/content/checkButton/checkButton.vue'
export default {
name: 'CartListItem',
    data() {
        return {

        }
    },
    props:{
        product:{
            type:Object,
            default(){
                return {}
            }
        }
    },
    components:{
        checkButton
    },
    methods:{
        checkClick(){
            this.product.checked = !this.product.checked
        }
    }
}
</script>
<style scoped>
    .cartlistitem{
        width: 100%;
        height: 120px;
        color: #333;
        background-color: #fff;
        /* box-sizing: border-box; */
        border-bottom: 1px solid #ccc;
        padding: 10px 12px;

        display: flex;
    }
    .checkButton{
        width: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .item-info{
        width: calc(100% - 24px - 20px - 10px - 70px);
        height: 100px;
    }
    .item-imge{
       flex: 1;
    }
    .item-imge img{
        width: 70px;
        border-radius: 5px;
        height: 100px;
        display: block;
        margin-left: 10px;
    }
    .item-info{
        /* margin-left: 10px; */
    }
    .item-info .title{
        font-size: 18px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;

    }
    .item-info .desc{
        font-size: 13px;
        color: #999;
        margin-top: 15px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    .item-info .other{
        font-size: 18px;
        margin-top: 25px;
    }
    .item-info .other .price{
        color: red;
        float: left;
    }
    .item-info .other .count{
        float: right;
    }
</style>