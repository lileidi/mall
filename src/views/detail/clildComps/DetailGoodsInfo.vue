<!-- 详情页商品信息的数据展示 -->
<template>
    <div class='detailInfo' v-if="Object.keys(detailInfo).length !== 0">
        <div class="info-desc clear-fix" >
            <div class="start"></div>
            <div class="desc">{{detailInfo.desc}}</div>
            <div class="end"></div>
        </div>
        <div class="info-key">{{detailInfo.detailImage[0].key}}</div>
        <div class="info-list">
            <img v-for="(item,index) in detailInfo.detailImage[0].list" :key="index" 
            :src="item" alt="" @load="imgLoad">
        </div>
    </div>
</template>

<script>

export default {
    name: 'DetailGoodsInfo',
    data() {
        return {
            counter:0,
            imagesLength:0
        }
    },
    props:{
        detailInfo:{
            type:Object,
            default(){
                return {}
            }
        }
    },
    methods:{
        imgLoad(){
            // 判断，所有的图片都加载完了，那么进行一次回调就可以，减少性能
            if(++this.counter === this.imagesLength){
                this.$emit('imageLoad');
            }
        }

        
    },
    watch:{
        detailInfo(){
            // 监听图片长度变化，获取图片的个数
            this.imagesLength = this.detailInfo.detailImage[0].list.length
        }
    }
}
</script>
<style scoped>
    .detailInfo{
        padding: 20px 0;
        border: 5px solid #f2f5f8;
    }
    .info-desc{
        padding: 0 15px;
    }
    .info-desc .start,.info-desc .end{
        width: 90px;
        height: 1px;
        background-color: #a3a3a5;
        position: relative;
    }
    .info-desc .start{
        float: left;
    }
    .info-desc .end{
        float:right;
    }
    .info-desc .start::before,.info-desc .end::after{
        content: '';
        height: 5px;
        width: 5px;
        border-radius: 50%;
        background-color: #333;
        position: absolute;
        bottom: 0;
    }
    .info-desc .end::after{
        right: 0;
    }
    .info-desc .desc {
        padding: 15px 0;
        font-size: 14px;
    }
    .info-key {
        margin: 10px 0 10px 15px;
        color: #333;
        font-size: 15px;
    }

    .info-list img {
        width: 100%;
    }
</style>