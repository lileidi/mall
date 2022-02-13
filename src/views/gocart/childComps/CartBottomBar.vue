<!-- 购物车底部结算组件 -->
<template>
    <div class='cartbottombar'>
        <div class="check-content">
            <check-button class="check-botton" :is-checked="isSelectAll" @click.native="checkClick"></check-button>
            <span>全选</span>
        </div>
        <div class="sum">合计：{{totalPrice}}</div>
        <div class="gocomputed" @click="calcClick">去结算({{checkLength}})</div>
    </div>
</template>

<script>
import checkButton from 'components/content/checkButton/checkButton.vue'
import {mapGetters} from 'vuex'
export default {
    name: 'CartBottomBar',
    data() {
        return {

        }
    },
    components:{
        checkButton,
    },
    computed:{
        ...mapGetters(['cartList','catLength']),
        totalPrice(){
            return '￥' + this.cartList.filter(item =>{
                return item.checked
            }).reduce((preValue,item) =>{
                return preValue + item.price * item.count
            },0).toFixed(2)
        },
        checkLength(){
            return this.cartList.filter(item => item.checked).length
        },
        isSelectAll(){
            // 默认都是未全选
            if(this.cartList.length === 0) return false

            // 1、使用高阶函数filter、find、some、every
            // find返回第一个符合条件元素；some是只要有一个符合就返回true；every是全部符合才返回true

            // return !(this.cartList.filter(item => !item.checked).length)
            // return !this.cartList.find(item => !item.checked)
            // return !this.cartList.some(item => !item.checked)
            // return this.cartList.every(item => item.checked)

            // 2、使用普通遍历
            for(let item of this.cartList){
                if(!item.checked){
                    return false
                }
            }
            return true

        }
    },
    methods:{
        checkClick(){
            // 如果原来都是不选中的或者某些不选中，点击一次全部选中；如果原来都是选中，点击一次全部不选中
            if(this.isSelectAll){//全部选中
                this.cartList.forEach(item => item.checked = false)//变成全不选中
            }else{//部分或者全部不选中
                this.cartList.forEach(item => item.checked = true)//变成全选中
            }
        },
        calcClick(){
            if(!this.isSelectAll && this.checkLength === 0){
                this.$toast.show('请选择购买商品')
            }
        }
    }
}
</script>
<style scoped>
    .cartbottombar{
        height: 40px;
        background-color: #f2f5f8;
        position: relative;
    }
    .check-content{
        width: 100px;
        
        padding: 10px 10px;
        position: absolute;
        top: 0px;
        left: 0px;
    }
    .check-content .check-botton{
        transform: scale(80%,80%);
        display: inline-block;
        margin-right: 5px;
    }
    .check-content>span{
        position: relative;
        top: -3px;
        font-size: 13px;
    }
    .sum{
        position: absolute;
        left: 80px;
        right: 100px;

        height: 40px;
        line-height: 40px;
        font-size: 16px;
    }
    .gocomputed{
        width: 100px;
        height: 40px;
        font-size: 16px;
        background-color:red;
        color: #fff;
        text-align: center;
        
        display: flex;
        justify-content: center;
        align-items: center;

        position: absolute;
        top: 0px;
        right: 0px;
    }
</style>