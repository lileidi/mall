<!-- 商品参数和尺寸展示 -->
<template>
    <div class='detailparaminfo' v-if="Object.keys(paramInfo).length !== 0">
        <table v-for="(table,index) in paramInfo.sizes" :key="index" class="info-sizes">
            <tr v-for="(tr,indey) in table" :key="indey">
                <td v-for="(td,indez) in tr" :key="indez">{{td}}</td>
            </tr>
        </table>
        <table class="info-param">
            <tr v-for="(info,index) in paramInfo.infos" :key="index">
                <td class="param-key">{{info.key}}</td>
                <td class="param-value">{{info.value}}</td>
            </tr>
        </table>
        <div class="info-image">
            <img :src="paramInfo.image" alt="">
        </div>
    </div>
</template>

<script>

export default {
    name: 'DetailParamInfo',
    data() {
        return {

        }
    },
    props:{
        paramInfo:{
            type:Object,
            default(){
                return {}
            }
        }
    }
}
</script>
<style scoped>
    .detailparaminfo{
        padding: 20px 15px;
        border: 5px solid #f2f5f8;
        font-size: 14px;
    }
    .detailparaminfo table{
        width: 100%;
        /* 合并边框 */
        border-collapse: collapse;
    }
    .detailparaminfo table tr{
        height: 42px;
    }
    .detailparaminfo table tr td{
        border-bottom: 1px solid rgba(100,100,100,.1);
    }
    .info-param{
        border: 1px solid rgba(100,100,100,.1);
    }
    .param-key{
        width: 90px;
    }
    .param-value{
        color: #eb4868;
    }
    .info-image img{
        width: 100%;
    }
    
</style>