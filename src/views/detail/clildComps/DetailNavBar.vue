<!-- 详情页中的顶部文字导航栏navbar组件 -->
<template>
    <div class='detailnavbar'>
        <nav-bar>
            <div slot="left" class="back" @click="backClick">
                <img src="~assets/img/common/back.svg" alt="">
            </div>
            <div slot="center" class="title">
                <span v-for="(item,index) in titles" :key="index" 
                      :class="{active:index === currentIndex}"
                      @click="titleClick(index)">{{item}}</span>
            </div>
        </nav-bar>
    </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
export default {
    
    name: 'DetailNavBar',
    data() {
        return {
            // 记录标题
            titles:['商品','参数','评论','推荐'],
            // 记录选中标题的下标
            currentIndex:0,
        }
    },
    components: { 
        NavBar,
     },
     methods:{
         titleClick(index){
             this.currentIndex = index
             this.$emit('titleClick',index)
         },
         backClick(){
            //  路由跳转，跳回去
             this.$router.back()
            //  this.$router.go(-1)
         },
     }
}
</script>
<style scoped>
    .title{
        display: flex;
        justify-content: space-evenly;
        font-size: 13px;
    }
    .active{
        /* color:red */
    color: var(--color-high-text);
}
    .back img{
        /* margin-top: 10px; */
        vertical-align: middle;
    }

</style>