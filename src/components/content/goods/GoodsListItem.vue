<!--  -->
<template>
    <div class='goodslistitem' @click="itemClick">
        <img v-lazy="showImage" alt="" @load="imageLoad">
        <div class="goodsinfo">
            <p>{{goodsItems.title}}</p>
            <span class="price">{{goodsItems.price}}</span>
            <span class="collect">{{goodsItems.cfav}}</span>
        </div>
    </div>
</template>

<script>

export default {
    name: 'GoodsListItem',
    data() {
        return {

        }
    },
    props:{
        goodsItems:{
            type:Object,
            default(){
                return {}
            }
        }
    },
    computed:{
        showImage(){
            return this.goodsItems.image || this.goodsItems.show.img
        }
    },
    methods:{
        imageLoad(){
            // console.log('imageLoad');
                // home.vue和GoodsListItem.vue事件通信方法：1、Vuex($store) 2、事件总线$bus(undefined->去原型设置一个vue实例)
                // $bus是事件总线，面对事件用于组件传输事件，这里传到home.vue组件
            // console.log(this.$bus);

            // if(this.$route.path.indexOf('/home')){
            //     this.$bus.$emit('homeitemImageLoad')
            // }else if(this.$route.path.indexOf('/detail') !== -1){
            //     this.$bus.$emit('detailitemImageLoad')
            // }

            // if(this.$route.path.indexOf('/home') !== -1){
            //     this.$bus.$emit('itemImageLoad')
            // }
            this.$bus.$emit('itemImageLoad')
            
        },
        itemClick(){
                // 路由跳转，这里用push，后面可以back回去
                // console.log('详情页');
            this.$router.push('/detail/' + this.goodsItems.iid)

            // if(this.$route.path.indexOf('home') !== -1){
            //     this.$router.push('/detail/' + this.goodsItems.iid)
            // }else{
            //     this.$router.push('/detail/' + this.goodsItems.item_id)
            // }

        }
    }
}
</script>
<style scoped>
    .goodslistitem{
        padding-bottom: 40px;
        position: relative;
        width:46%;
    }
    .goodslistitem img{
        width:100%;
        border-radius: 8px;
    }
    .goodsinfo{
        font-size: 12px;
        /* 定位到底部 */
        position: absolute;
        bottom: 5px;
        left: 0;
        right: 0;
        text-align: center;
        overflow: hidden;

    }
    .goodsinfo p{
        /* 溢出部分隐藏，不换行 */
        overflow: hidden;
        white-space: nowrap;
        margin-bottom: 5px;
        /* 超出打点展示 */
        text-overflow: ellipsis;
    }
    .goodsinfo .price{
        color:var(--color-high-text);
        margin-right: 22px;
    }
    .goodsinfo .collect{
        position:relative;
    }
    .goodsinfo .collect::before{
        content: '';
        position:absolute;
        left: -15px;
        top: -1px;
        width:14px;
        height:14px;
        background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
    }
</style>