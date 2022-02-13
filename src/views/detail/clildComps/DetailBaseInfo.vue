<!-- 详情页商品基本信息展示 -->
<template>
<!-- 商品对象的属性下标如果为0就不显示，有属性（！==）才显示 -->
    <div class='base-info' v-if="Object.keys(goods).length !== 0">
        <!-- 商品标题描述 -->
        <div class="info-title">{{goods.title}}</div>
        <!-- 商品价格 -->
        <div class="info-price">
            <span class="n-price">{{goods.newPrice}}</span>
            <span class="o-price">{{goods.oldPrice}}</span>
            <span v-if="goods.discount" class="discount">{{goods.discount}}</span>
        </div>
        <!-- 销量、收藏、运费相关问题 -->
        <div class="info-other">
            <span>{{goods.columns[0]}}</span>
            <span>{{goods.columns[1]}}</span>
            <span>{{goods.services[goods.services.length - 1].name}}</span>
        </div>
        <!-- 7天无理由退款、发货时间 -->
        <div class="info-service">
            <!--  v-for="index in goods.services.length-1"：取出下标，goods.services.length-1取出是数字2，则取出 1-2-->
            <span class="info-service-item" v-for="index in goods.services.length-1" :key="index">
                <img :src="goods.services[index - 1].icon" alt="">
                <span>{{goods.services[index - 1].name}}</span>
            </span>
        </div>
    </div>
</template>

<script>

export default {
    name: 'DetailBaseInfo',
    data() {
        return {

        }
    },
    props:{
        goods:{
            type:Object,
            default() {
                return {}
            }
        }
    }
}
</script>
<style scoped>
    .base-info{
        margin-top: 15px;
        padding: 0 8px;
        color: #999;
        border-bottom: 5px solid #f2f5f8;
    }
    .info-title{
        color:#222;
    }
    .info-price{
        margin-top: 10px;
    }
    .info-price .n-price{
        font-size: 24px;
        color: var(--color-tint);
        margin-right: 5px;
    }
    .info-price .o-price{
        text-decoration: line-through;
        font-size: 13px;
        margin-right: 5px;
    }
    .info-price .discount{
        background-color:var(--color-tint);
        color: #fff;
        border-radius: 8px;
        text-align: center;
        font-size: 12px;
        padding: 2px 5px;
          /*让元素上浮一些: 使用相对定位即可*/
        position: relative;
        top: -6px;
    }
    .info-other{
        margin-top: 15px;
        display: flex;
        font-size: 12px;
        line-height: 30px;
        border-bottom: 1px solid rgba(100,100,100,.1);
        justify-content: space-between;
    }
    .info-service {
    display: flex;
    justify-content: space-between;
    line-height: 60px;
  }
  .info-service-item img{
      width: 14px;
      position:relative;
      top: 2px;
  }
  .info-service-item span{
      font-size: 13px;
      color: #333;
  }
</style>