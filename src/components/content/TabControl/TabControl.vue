<!-- 封装文字导航组件 -->
<template>
    <div class='tab-control'>
        <!-- 
             动态加class为活跃active状态，设置活跃时获取该下标，并且有样式显示
             设置监听点击事件，传参数为该下标，点击要切换下标 -->
        <div v-for="(item,index) in titles" :key="index"  
             class="tab-control-item"
             :class="{active:index === currentIndex}"
             @click="itemclick(index)">
            <span>{{item}}</span>
        </div>
    </div>
</template>

<script>

export default {
    name: 'TabControl',
    data() {
        return {
            // 获取当前下标
            currentIndex:0
        }
    },
    props:{
        titles:{
            type:Array,
            default(){
                return []
            }
        }
    },
    // 点击设置切换下标
    methods:{
        itemclick(index){
            this.currentIndex = index;
            // 内部发生事件传给外面$emit，外部传里面用props
            this.$emit('tabClick',index)

        }
    }
}
</script>
<style scoped>
    .tab-control{
        display: flex;
        justify-content: space-evenly;

        text-align: center;
        font-size: 14px;
        height: 40px;
        line-height: 40px;
        background-color: #fff;
    }
    .tab-control-item{
        /* flex:1; */
        /* height: 40px;
        line-height: 40px; */
    }
    .tab-control-item span{
        padding: 5px;
    }
    .active{
        color:var(--color-high-text)
    }
    .active span{
        border-bottom: 3px solid var(--color-tint);
    }
</style>